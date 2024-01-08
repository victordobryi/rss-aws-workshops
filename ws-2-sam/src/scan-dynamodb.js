const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
const { DDB_TABLE_NAME } = process.env;

const ScanDynamoDB = async function () {
  try {
    const results = await ddb
      .scan({
        TableName: DDB_TABLE_NAME,
      })
      .promise();
    console.log('Scan DynamoDB Success');
    return results.Items.sort((a, b) => a.order - b.order);
  } catch (err) {
    console.error('Scan DynamoDB Error: ', err);
    return {};
  }
};

exports.handler = async (event) => {
  console.log(JSON.stringify(event));
  let response = {};

  if (event.httpMethod === 'GET') {
    const data = await ScanDynamoDB();

    response = {
      statusCode: 200,
      // Response includes required CORS headers.
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,GET',
      },
      // Body should be JSON stringified.
      body: JSON.stringify(data),
    };
  }

  console.log('Response: ', JSON.stringify(response));
  return response;
};
