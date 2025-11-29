import { readFileSync } from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const getAbsolutePath = filepath => path.resolve(process.cwd(), filepath)
const getFormat = filepath => path.extname(filepath).slice(1)

const readFile = (filepath) => {
  const absolutePath = getAbsolutePath(filepath)
  return readFileSync(absolutePath, 'utf-8')
}

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data)
    case 'yml':
    case 'yaml':
      return yaml.load(data)
    default:
      throw new Error(`Unsupported format: ${format}`)
  }
}

export default (filepath) => {
  const data = readFile(filepath)
  const format = getFormat(filepath)
  return parse(data, format)
}