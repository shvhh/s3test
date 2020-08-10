// const S3 = require('aws-s3');
var AWS = require('aws-sdk');

var config = 'personal';
var config = 'fabulate';
const Jimp = require('jimp');

const sizeOf = require('image-size');



const s3 = new AWS.S3();

var uploadParams = { Bucket: 'etalu-s3', Key: '', Body: '' };

var file = 'download.jpg';
// Configure the file stream and obtain the upload parameters
// var fs = require('fs');
// var fileStream = fs.createReadStream(file);
// fileStream.on('error', function(err) {
//   console.log('File Error', err);
// });
// uploadParams.Body = fileStream;
// var path = require('path');
// uploadParams.Key = path.basename(file);

// // call S3 to retrieve upload file to specified bucket
// s3.upload (uploadParams, function (err, data) {
//   if (err) {
//     console.log("Error", err);
//   } if (data) {
//     console.log("Upload Success", data.Location);
//   }
// });
// s3.getObject({ Bucket: 'etalu-s3', Key: file }, (err, file) => {
//     console.log(file.ContentType.includes("image"));
//     Jimp.read(file.Body) // buffer
//         .then((image) => {
//             image
//                 .resize(250, Jimp.AUTO)
//                 .quality(60) // set JPEG quality
//                 .getBuffer(image.getMIME(), (err, buffer) => {
//                     s3.putObject(
//                         {
//                             Bucket: 'etalu-s3',
//                             Key: 'thumb-' + file,
//                             Body: buffer,
//                             ContentType: file.ContentType,
//                         },
//                         (err) => {
//                             if (err) console.log(err);
//                             else console.log('success');
//                         }
//                     );
//                 });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// s3.headObject({ Bucket: 'etalu-s3', Key: 'media/001d385439a6788634e5a4c7f9f97d8da703ccbcbb4373358c98a75705f53085.jpeg' }, console.log);

// params = {
//     CopySource: '/etalu-s3/' + file,
//     Bucket: 'etalu-s3',
//     Key: file,
//     ContentDisposition: 'attachment',
//     // Metadata: { 'Content-Disposition': 'attachment' },
//     MetadataDirective: 'REPLACE',
// };

// s3.copyObject(params, (err, file) => {
//     console.log(err, file);
// });


s3.getObject({ Bucket: 'etalu-s3', Key: file }, (err, file) => {
        console.log(file.Body);
        console.log(sizeOf(file.Body))
    });
    