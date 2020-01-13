const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient({
   region: 'us-east-1' 
});

// var params = {
//     TableName: 'Table',
//     IndexName: 'Index',
//     KeyConditionExpression: 'HashKey = :hkey and RangeKey > :rkey',
//     ExpressionAttributeValues: {
//       ':hkey': 'key',
//       ':rkey': 2015
//     }
//   };
  
//   var documentClient = new AWS.DynamoDB.DocumentClient();
  
//   documentClient.query(params, function(err, data) {
//      if (err) console.log(err);
//      else console.log(data);
//   });

const params = {
    TableName: 'sensei',
    // IndexName: 'SK-data-index',
    // KeyConditionExpression: 'PK = :pk and SK = :sk',
    KeyConditionExpression: 'PK = :pk and SK = :sk',
    // FilterExpression: 'begins_with(#n, :name)',
    // ExpressionAttributeNames: {
    //     '#n': 'name'
    //     // '#d':'data'
    // },
    ExpressionAttributeValues: {
        // ":name": "Den",
        ":sk": "LOCATION",
        ":pk": "Location-001"
        // ":data": "Device-002",
    }
};

const secondParams = (deviceId) => ({
    TableName: 'sensei',
    IndexName: 'SK-data-index',
    KeyConditionExpression: 'SK = :sk and begins_with(#d, :data)',
    ExpressionAttributeNames: {
        '#d': 'data'
    },
    ExpressionAttributeValues: {
        ':sk': 'READING',
        ':data': deviceId
    }
});

docClient.query(params, (err, data) => {
    if (err) console.log('error:', err);
    console.log(data);
    data.Items.map(item => {
        const deviceId = item.data;
        docClient.query(secondParams(deviceId), (err, res) => {
            if (err) console.log('err:', err)
            else console.log(res);
        });
    });
});