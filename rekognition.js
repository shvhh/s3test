//Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
//PDX-License-Identifier: MIT-0 (For details, see https://github.com/awsdocs/amazon-rekognition-developer-guide/blob/master/LICENSE-SAMPLECODE.)

// Load the SDK and UUID
var AWS = require('aws-sdk');

const bucket = 'etalu-s3'; // the bucketname without s3://
const photo = 'getty-media/7aa12e2c-ebb7-40a7-902d-84670746f1bd/1136491081.jpg'; // the name of file


const client = new AWS.Rekognition();
const params = {
    Image: {
        S3Object: {
            Bucket: bucket,
            Name: photo,
        },
    },
    MaxLabels: 10,
};
client.detectLabels(params, function (err, response) {
    if (err) {
        console.log(err, err.stack); // an error occurred
    } else {
        console.log(`Detected labels for: ${photo}`);
        response.Labels.forEach((label) => {
            console.log(`Label:      ${label.Name}`);
            console.log(`Confidence: ${label.Confidence}`);
            console.log('Instances:');
            label.Instances.forEach((instance) => {
                let box = instance.BoundingBox;
                console.log('  Bounding box:');
                console.log(`    Top:        ${box.Top}`);
                console.log(`    Left:       ${box.Left}`);
                console.log(`    Width:      ${box.Width}`);
                console.log(`    Height:     ${box.Height}`);
                console.log(`  Confidence: ${instance.Confidence}`);
            });
            console.log('Parents:');
            label.Parents.forEach((parent) => {
                console.log(`  ${parent.Name}`);
            });
            console.log('------------');
            console.log('');
        }); // for response.labels
    } // if
});
