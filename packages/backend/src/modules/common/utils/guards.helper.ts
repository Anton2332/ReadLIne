export function getRelationArrayFromArray(relArray: Array<string>): Array<string> {
  return relArray.map((item, index, arr) =>
    arr.reduce((sum, cur, curIndex) => (index >= curIndex ? sum + (sum ? '.' : '') + cur : sum), '')
  );
}

export function getDataFromObject(dataSource, fields: Array<string>) {
  let data = dataSource;
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < fields.length; index++) {
    data = data[fields[index]];
  }
  return data;
}

export function toLowerCase(data: string): string {
  return data.toLowerCase();
}
