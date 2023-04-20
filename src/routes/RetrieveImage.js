const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');



// configure AWS SDK
AWS.config.update({
  accessKeyId: 'AKIATYDAXPPCTH6XDZNR',
  secretAccessKey: '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'
});

// create S3 client
AWS.config.update({ region: 'us-west-2' });
const s3 = new AWS.S3();

// endpoint to retrieve image from S3 bucket
router.get('/:key', (req, res) => {
  const params = {
    Bucket: 'traderrecipeimages',
    Key: req.params.key // use the key from the URL params
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving image');
    } else {
      res.setHeader('Content-Type', data.ContentType);
    res.send(data.Body);
  }
  });
});

module.exports = router;