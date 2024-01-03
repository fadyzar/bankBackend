import path from 'path'
// export const filePath = path.join(path.resolve(), 'data/bank.json')
// export const filePath = new URL('data/bank.json', import.meta.url).pathname;

let filePath;
if (typeof window === 'undefined') {
  // Server-side code
  filePath = path.join(path.resolve(), 'data/bank.json');
} else {
  // Client-side code
  filePath = new URL('data/bank.json', import.meta.url).pathname;
}

export { filePath };

