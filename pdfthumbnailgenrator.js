var fs = require('fs');
var path = require('path');
const { exec } = require('child_process');
const AWS = require('aws-sdk');

const s3 = new AWS.S3();
/**
 * FOR GM layer refer to
 * https://github.com/rpidanny/gm-lambda-layer
 * https://github.com/shelfio/ghostscript-lambda-layer
 */
const tempFileDir = './tmp';
exports.handler = ((event, context, callback) => {
    event = {
        Records: [
            {
                eventVersion: '2.1',
                eventSource: 'aws:s3',
                awsRegion: 'us-east-2',
                eventTime: '2020-07-27T08:35:52.194Z',
                eventName: 'ObjectCreated:Put',
                userIdentity: {
                    principalId: 'A2GEEGJHYIY61M',
                },
                requestParameters: {
                    sourceIPAddress: '42.111.64.5',
                },
                responseElements: {
                    'x-amz-request-id': '9098910338A194CD',
                    'x-amz-id-2':
                        'FG0lzvZ2zXyXeNL5VEObuxOWGMrIrcqRlPmv2oCRjsUNAv7WOoxmbWHNCOlKm9BYU8XAlFKNZnvbBaVTpOYgXcYGDHMUw5Lo',
                },
                s3: {
                    s3SchemaVersion: '1.0',
                    configurationId: '8d12ca90-9d85-4587-adee-1e0cd1047a5c',
                    bucket: {
                        name: 'etalu-s3',
                        ownerIdentity: {
                            principalId: 'A2GEEGJHYIY61M',
                        },
                        arn: 'arn:aws:s3:::fabulate-web',
                    },
                    object: {
                        key:
                            'media/EAadhaar_9194437675062872_29102019173416_451839_1_1.pdf',
                        size: 1034,
                        eTag: 'e53e93546c777cdbbcc669fa3bd2f69c',
                        sequencer: '005F1E91EE07C8F3C2',
                    },
                },
            },
        ],
    };
    callback = console.log;
    if (!fs.existsSync(`${tempFileDir}${path.sep}media`)) {
        fs.mkdirSync(`${tempFileDir}${path.sep}media`);
    }
    const Bucket = event.Records[0].s3.bucket.name;
    const Key = event.Records[0].s3.object.key;

    const thumbnailFileKey = `thumb-${Key.slice(0, -4)}.jpg`;

    var file = require('fs').createWriteStream(
        `${tempFileDir}${path.sep}${Key}`
    );
    s3.getObject({ Bucket, Key })
        .createReadStream()
        .pipe(file)
        .on('finish', (err) => {
            if (err) return callback(err);

            exec(
                `gm convert ${tempFileDir}${path.sep}${Key}[0] -resize 256x256 ${tempFileDir}${
                    path.sep
                }${Key.slice(0, -4)}_1.jpg`,
                function (err, info) {
                     fs.unlinkSync(`${tempFileDir}${path.sep}${Key}`);
                    if (err) return callback(err);
                    s3.putObject(
                        {
                            Bucket,
                            Key: thumbnailFileKey,
                            Body: fs.readFileSync(
                                `${tempFileDir}${path.sep}${Key.slice(
                                    0,
                                    -4
                                )}_1.jpg`
                            ),
                        },
                        (err) => {
                            fs.unlinkSync(
                                `${tempFileDir}${path.sep}${Key.slice(0, -4)}_1.jpg`
                            );
                            if (err) return callback(err);
                            return callback('success');
                        }
                    );
                }
            );
        });
})();
