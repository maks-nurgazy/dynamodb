import AWS from 'aws-sdk';

const credentials = new AWS.SharedIniFileCredentials({
  profile: 'bts',
});
AWS.config.credentials = credentials;
AWS.config.update({ region: 'us-west-2' });

export const ddbClient = new AWS.DynamoDB.DocumentClient();
