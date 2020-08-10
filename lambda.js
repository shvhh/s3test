const AWS = require('aws-sdk');
const Jimp = require('jimp');
const s3 = new AWS.S3();

exports.handler = (event, context, callback) => {
    const event = {
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
                        name: 'fabulate-web',
                        ownerIdentity: {
                            principalId: 'A2GEEGJHYIY61M',
                        },
                        arn: 'arn:aws:s3:::fabulate-web',
                    },
                    object: {
                        key: 'thumb-tinymce/plugins/untitled+%285%29.png',
                        size: 1034,
                        eTag: 'e53e93546c777cdbbcc669fa3bd2f69c',
                        sequencer: '005F1E91EE07C8F3C2',
                    },
                },
            },
        ],
    };

    const Bucket = event.Records[0].s3.bucket.name;
    const Key = event.Records[0].s3.object.key;

    console.log(Bucket, Key);
    if (!Key.includes('thumb-')) {
        s3.getObject({ Bucket, Key }, (err, file) => {
            if (err) callback(err);
            Jimp.read(file.Body) // buffer
                .then((image) => {
                    image
                        .resize(250, Jimp.AUTO)
                        .quality(60) // set JPEG quality
                        .getBuffer(image.getMIME(), (err, buffer) => {
                            s3.putObject(
                                {
                                    Bucket,
                                    Key: 'thumb-' + Key,
                                    Body: buffer,
                                    ContentType: file.ContentType,
                                },
                                (err) => {
                                    if (err) callback(err);
                                    else callback('success');
                                }
                            );
                        });
                })
                .catch((err) => {
                    callback(err);
                });
        });
    }
};


