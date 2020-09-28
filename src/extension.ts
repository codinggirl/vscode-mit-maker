import vscode from 'vscode'
import fs from 'fs'
import path from 'path'

function getLicenseText(name) {
  const sourceText = fs.readFileSync(path.resolve(__dirname, 'template.txt')).toString()
  const normalizedText = sourceText.replace('<YEAR> <NAME>', `${new Date().getFullYear()} $`)
  return normalizedText
}

function makerCallback(target: vscode.Uri, a) {

  const name = vscode.workspace.getConfiguration().get('name')
  const licenseText = getLicenseText(name)
  if (target) {
    const uri = vscode.Uri.parse(`${target}/LICENSE`)
    const exists = fs.existsSync(path.resolve(`${target}/LICENSE`))
    if (!exists) {
      vscode.workspace.fs.writeFile(uri, Buffer.from(licenseText, 'utf-8'))
    } else {
      vscode.window.showWarningMessage(`The LICENSE file has already in your workspace, nothing has done. If you want to generate a new file, please delete the old LICENSE file first.`)
    }
  } else {
    console.warn('could not find a path to generate LICENSE file')
  }
}

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand('mit-license-generator.generate', makerCallback)
}

export function deactivate() {

}
