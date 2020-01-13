const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient({
   region: 'us-east-1' 
});

const params = {
    TableName: 'sensei',
    IndexName: 'SK-data-index',
    KeyConditionExpression: 'SK = :sk',
    ExpressionAttributeValues: {
        ":sk": "LOCATION",
        // ":pk": "Location-001"
    }
};

const FIFTEEN_MINUTES = 1000 * 60 * 15;
const FIFTEEN_MINUTES_AGO = new Date(Date.now() - FIFTEEN_MINUTES).toISOString();

const secondParams = (deviceId) => ({
    TableName: 'sensei',
    IndexName: 'SK-data-index',
    KeyConditionExpression: 'SK = :sk and begins_with(#d, :data)',
    ExpressionAttributeNames: {
        '#d': 'data'
    },
    FilterExpression: 'createdAt > :date',
    ExpressionAttributeValues: {
        ':sk': 'READING',
        ':data': deviceId,
        ':date': FIFTEEN_MINUTES_AGO
    }
});

docClient.query(params, (err, data) => {
    if (err) console.log('error:', err);
    data.Items.map(item => {
        const deviceId = item.data;
        console.log('LOCATION:', item);
        // console.log('device id:', deviceId);
        docClient.query(secondParams(deviceId), (err, res) => {
            const response = { 
                ...res.Items['0'], 
                location: { 
                    name: item.name, 
                    deviceId: item.data
                }};
            if (err) console.log('err:', err)
            else console.log(response);
        });
    });
});