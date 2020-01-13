const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');

const docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1'
});

const MOCK_001 = 'MOCK_001';

const generateMockedReading = () => ({
    "readingId": uuidv4(),
    "value": (Math.random() * 10) + 70,
    "scale": "fahrenheit",
    "device": MOCK_001,
    "createdAt": new Date().toISOString()
});

const generateNewMockedReading = (deviceId) => ({
    "PK": `Reading-${uuidv4()}`,
    "SK": "READING",
    "data": deviceId,
    "value": (Math.random() * 10) + 70,
    "scale":"Fahrenheit",
    "createdAt": new Date().toISOString()
});

exports.handler = function(event, context, cb) {
    // simulate reception from external device
    var reading = generateMockedReading();

    var params = {
        // Item: generateMockedReading(),
        Item: generateNewMockedReading('Device-001'),
        // TableName: 'readings'
        TableName: 'sensei'
    }

    var secondParams = {
        Item: generateNewMockedReading('Device-002'),
        TableName: 'sensei'
    };

    docClient.put(params, function(err, data) {
        if (err) {
            cb(err, null)
        } else {
            docClient.put(secondParams, function(err, resp) {
                cb(null, resp);
            });
        }
    });
}
 