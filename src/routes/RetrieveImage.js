const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

// configure AWS SDK
AWS.config.update({
  accessKeyId: 'AKIATYDAXPPCTH6XDZNR',
  secretAccessKey: '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',
  region: 'us-west-2'
});

// create S3 client
const s3 = new AWS.S3();

// endpoint to retrieve image from S3 bucket
router.get('/:key', (req, res) => {
  const params = {
    Bucket: 'traderrecipeimages',
    Key: req.params.key // use the key from the URL params
  };

  // generate a presigned URL for the image with a 10 expiration time
  const url = s3.getSignedUrl('getObject', {
    Bucket: params.Bucket,
    Key: params.Key,
    Expires: 315360000  
  });

  // redirect the user to the presigned URL to retrieve the image
  res.redirect(url);
});

// endpoint to upload image to S3 bucket
router.post('/upload', (req, res) => {
  if (!req.files || !req.files.file) {
    res.status(400).send('No file uploaded');
    console.log(req.files);
    return;
  }

  const file = req.files.file;
  const key =  file.name;
  const params = {
    Bucket: 'traderrecipeimages',
    Key: key,
    Body: file.data,
    ContentType: file.mimetype
  };
  contentType = params.ContentType

  s3.putObject(params, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error uploading image');
    } else {
      res.send('Image uploaded successfully');
    }
  });
});

module.exports = router;