// Converts a JSON object into an array
export function handleData(json) {
  const result = [];
  for (const i in json) {
    result.push(json[i]);
  }
  return result;
}
