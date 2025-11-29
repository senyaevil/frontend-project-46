import parse from './parsers.js'
import buildDiff from './diffGenerator.js'
import getFormatter from './formatters/index.js'

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parse(filepath1)
  const data2 = parse(filepath2)
  const diff = buildDiff(data1, data2)
  const formatter = getFormatter(formatName)
  return formatter(diff)
}

export default genDiff