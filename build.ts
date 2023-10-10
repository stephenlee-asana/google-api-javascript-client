const loadCode = `
async function load(apiName) {
    await new Promise(function(resolve) { window.gapi.load(apiName, resolve) });   
} 
`
async function main() {
    const response = await fetch('https://apis.google.com/js/api.js')
    if (!response.body) {
        throw new Error('Response body is empty')
    }
    const script: string = await Bun.readableStreamToText(response.body)

    await Bun.write(
        './index.js',
        [script, loadCode, 'export const gapi = window.gapi;'].join("\n") + '\n'
    )
    await Bun.write(
        './index.cjs',
        [script, loadCode, 'module.exports = { gapi: window.gapi }'].join("\n") + '\n'
    )
}

void main()
