const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');

const docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1'
});

const MOCK_001 = 'MOCK_001';

const generateMockedReading = () => ({
    "value": (Math.random() * 10) + 70,
    "scale": "fahrenheit",
    "device": MOCK_001,
    "createdAt": new Date()
});

exports.handler = function(event, context, cb) {
    var params = {
        Item: {
            "readingId": uuidv4(),
            "value": generateMockedReading(),
            "scale": "fahrenheit",
            "device": MOCK_001,
            "createdAt": new Date()
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
 