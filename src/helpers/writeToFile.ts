import fs from 'fs';

interface WriteToJSONInput {
  fileName: string;
  data: any;
}

export async function writeToJson(params: WriteToJSONInput) {
  const { fileName, data } = params;

  let input = JSON.stringify(data, null, 2);

  fs.writeFile(fileName, input, (err) => {
    if (err) throw err;

    console.log('Data written to file');
  });
}
