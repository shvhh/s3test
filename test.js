//Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
//PDX-License-Identifier: MIT-0 (For details, see https://github.com/awsdocs/amazon-rekognition-developer-guide/blob/master/LICENSE-SAMPLECODE.)

// Load the SDK and UUID
var AWS = require('aws-sdk');

const bucket = 'etalu-s3'; // the bucketname without s3://
const photo = 'NEW-sexy-surf-swim-briefs-men-swimwear-men-shorts-beach-shorts-men-swim-shorts-board-Surf.jpg'; // the name of file

const client = new AWS.Rekognition();
const params = {
    Image: {
        S3Object: {
            Bucket: bucket,
            Name: photo,
        },
    }
};

const array = [];
client.detectModerationLabels(params, console.log);
// client.detectLabels(params, function (err, response) {
//     if (err) {
//         console.log(err, err.stack); // an error occurred
//     } else {
//         console.log(JSON.stringify(response,null,2))
//         console.log(`Detected labels for: ${photo}`);
//         // response.Labels.forEach(({ Name, Confidence }) => {
//         //     console.log(`Label:      ${Name}`);
//         //     console.log(`Confidence: ${Confidence}`);
//         //     console.log('Parents:');
//         //     console.log('------------');
//         //     console.log('');
//         //     array.push({ Name, Confidence });
//         // }); // for response.labels

//         console.log(array);
//     } // if
// });
