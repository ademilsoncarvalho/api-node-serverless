const AWS = require('aws-sdk');

const dynamodbOfflineOptions = {
    region: "localhost",
    endpoint: "http://localhost:8001"
}

const isOffline = () => process.env.IS_OFFLINE;

const dynamoDb = isOffline()
    ? new AWS.DynamoDB.DocumentClient(dynamodbOfflineOptions)
    : new AWS.DynamoDB.DocumentClient();

module.exports = dynamoDb;