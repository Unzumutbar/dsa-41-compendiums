const MODULE_JSON_PATH = './module.json'
const MODULE_NAME = 'dsa-41-compendiums'
const REPO_BASE_PATH = 'https://github.com/Oromis/dsa-41-compendiums'

const fs = require('fs')
const packageJson = require('../package.json')

const moduleJson = JSON.parse(fs.readFileSync(MODULE_JSON_PATH, { encoding: 'utf-8' }))
moduleJson.version = packageJson.version
moduleJson.download = `${REPO_BASE_PATH}/releases/download/v${packageJson.version}/${MODULE_NAME}-v${packageJson.version}.zip`

console.log(`Setting module version to ${moduleJson.version}, download URL to ${moduleJson.download}`)

fs.writeFileSync(MODULE_JSON_PATH, JSON.stringify(moduleJson, null, 2), { encoding: 'utf-8' })
