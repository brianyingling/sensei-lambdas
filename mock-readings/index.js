const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1'
});

exports.handler = function(event, context, cb) {
    // context.succeed("hello world from mock readings!");
    var params = {
        Item: {
            date: Date.now(),
            message: "I love your website!"
        },
        TableName: 'guestbook'
    };

    docClient.put(params, function(err, data) {
        if (err) {
            cb(err, null)
        } else {
            cb(null, data);
        }
    });
}
 