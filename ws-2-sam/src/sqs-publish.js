const AWS = require('aws-sdk');
const sqs = new AWS.SQS();
const { SQS_QUEUE_URL } = process.env;

const PublishSqs = async function (message) {
  try {
    const results = await sqs
      .sendMessage({
        MessageBody: message,
        QueueUrl: SQS_QUEUE_URL,
      })
      .promise();
    console.log('Publish SQS Success');
    return results;
  } catch (err) {
    console.error('Publish SQS Error: ', err);
    return {};
  }
};

exports.handler = async (event) => {
  console.log(JSON.stringify(event));
  let response = {};

  if (event.httpMethod === 'POST') {
    const data = await PublishSqs(JSON.stringify(event));

    response = {
      statusCode: 200,
      // Response includes required CORS headers.
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
      },
      // Body should be JSON stringified.
      body: JSON.stringify(data),
    };
  }

  console.log('Response: ', JSON.stringify(response));
  return response;
};
