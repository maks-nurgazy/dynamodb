/* External dependencies */
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

/* Local dependencies */
import { ddbClient } from './client';

export async function findItems(
  params: DocumentClient.ScanInput
): Promise<any> {
  console.log(`About to find consignees in the database.`);

  let ExclusiveStartKey;
  let items: any = [];

  do {
    params.ExclusiveStartKey = ExclusiveStartKey;

    const response: DocumentClient.ScanOutput = await ddbClient
      .scan(params)
      .promise();

    const { Count, LastEvaluatedKey, Items, ScannedCount } = response;

    ExclusiveStartKey = LastEvaluatedKey;

    items.push(...((Items as any) || []));

    console.log(`Fetched ${Count} more items`);
    console.log(`items.length: ${items.length}`);
    console.log(`LastEvaluatedKey: ${LastEvaluatedKey}`);
    console.log(`ScannedCount: ${ScannedCount}`);
  } while (ExclusiveStartKey);

  console.log(`The total number of fetched items is ${items.length}`);

  return items;
}
