// Converts a JSON object into an array
export function handleData(json) {
  const result = [];
  for (const i in json) {
    result.push(json[i]);
  }
  return result;
}
// Sanitize a text input to prevent code injection
export function sanitizeInput(text) {
    return text
        .replace(/</g, '')   
        .replace(/>/g, '')   
        .replace(/&/g, '')   
        .replace(/"/g, '')   
        .replace(/'/g, '')   
        .replace(/\//g, '')  
        .trim();             
}