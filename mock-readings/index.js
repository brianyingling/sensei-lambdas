const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');

const docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1'
});

exports.handler = function(event, context, cb) {
    var params = {
        Item: {
            "readingId": uuidv4(),
            "value": 75.14366132097487,
            "scale": "fahrenheit",
            "device": "MOCK_001",
            "createdAt": "2019-09-16T12:39:47.347Z"
        },
        TableName: 'readings'
    }

    docClient.put(params, function(err, data) {
        if (err) {
            cb(err, null)
        } else {
            cb(null, data);
        }
    });
}
 