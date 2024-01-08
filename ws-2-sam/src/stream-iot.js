const AWS = require('aws-sdk');
const { IOT_ENDPOINT, IOT_TOPIC } = process.env;
const iot = new AWS.IotData({ endpoint: IOT_ENDPOINT });

exports.handler = async (event) => {
  console.log(JSON.stringify(event));
  console.log('IOT_ENDPOINT: ', IOT_ENDPOINT);
  console.log('IOT_TOPIC: ', IOT_TOPIC);

  const data = event.Records.map((record) => {
    return {
      id: record.dynamodb.Keys.PK.S,
      votes: record.dynamodb.NewImage.votes.N,
    };
  });

  // Data received from DyanmoDB stream is published to the an IoT topic for real-time updates.
  const result = await iot
    .publish({
      topic: IOT_TOPIC,
      payload: JSON.stringify(data),
    })
    .promise();

  console.log('Result: ', JSON.stringify(result));
  return;
};
