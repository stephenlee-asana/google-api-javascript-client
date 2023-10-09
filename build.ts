async function main() {
  const response = await fetch('https://apis.google.com/js/api.js')
  if (!response.body) {
    throw new Error('Response body is empty')
  }
  const script: string = await Bun.readableStreamToText(response.body)

  await Bun.write(
    './index.js',
    script + '\n' + 'export const gapi = window.gapi;' + '\n',
  )
  await Bun.write(
    './index.cjs',
    script + '\n' + 'module.exports = { gapi: window.gapi }' + '\n',
  )
}

void main()
