/* External dependencies */
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

/* Local dependencies */
import { findItems } from '../helpers/listItems';
import { writeToJson } from '../helpers/writeToFile';
import { CONSIGNEES_TABLE_NAME } from '../settings';

async function generateJSON(items: any) {
  const jsonFilePath = 'src/datas/consignees.json';

  const data = items.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
    };
  });

  await writeToJson({ fileName: jsonFilePath, data });
}

async function execute() {
  const params: DocumentClient.ScanInput = {
    TableName: CONSIGNEES_TABLE_NAME,
  };

  findItems(params).then(generateJSON);
}

execute();
