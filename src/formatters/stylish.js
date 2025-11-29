import _ from 'lodash'

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value)
  }

  const indent = ' '.repeat(depth * 4)
  const bracketIndent = ' '.repeat((depth - 1) * 4)
  const lines = Object.entries(value).map(([key, val]) => {
    const formattedValue = stringify(val, depth + 1)
    return `${indent}${key}: ${formattedValue}`
  })

  return `{\n${lines.join('\n')}\n${bracketIndent}}`
}

const formatDiff = (diff, depth = 1) => {
  const indent = ' '.repeat(depth * 4 - 2)
  const bracketIndent = ' '.repeat((depth - 1) * 4)

  const lines = diff.map((node) => {
    switch (node.status) {
      case 'added':
        return `${indent}+ ${node.key}: ${stringify(node.value, depth + 1)}`
      case 'deleted':
        return `${indent}- ${node.key}: ${stringify(node.value, depth + 1)}`
      case 'unchanged':
        return `${indent}  ${node.key}: ${stringify(node.value, depth + 1)}`
      case 'changed':
        return [
          `${indent}- ${node.key}: ${stringify(node.value1, depth + 1)}`,
          `${indent}+ ${node.key}: ${stringify(node.value2, depth + 1)}`,
        ].join('\n')
      case 'nested':
        return `${indent}  ${node.key}: ${formatDiff(node.children, depth + 1)}`
      default:
        throw new Error(`Unknown status: ${node.status}`)
    }
  })

  return `{\n${lines.join('\n')}\n${bracketIndent}}`
}

export default formatDiff
