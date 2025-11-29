import _ from 'lodash';

const formatValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const buildPath = (currentPath, key) => (currentPath ? `${currentPath}.${key}` : key);

const formatDiff = (diff, path = '') => {
  const lines = diff.flatMap((node) => {
    const currentPath = buildPath(path, node.key);

    switch (node.status) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${formatValue(node.value)}`;
      case 'deleted':
        return `Property '${currentPath}' was removed`;
      case 'changed':
        return `Property '${currentPath}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`;
      case 'nested':
        return formatDiff(node.children, currentPath);
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown status: ${node.status}`);
    }
  });

  return lines.join('\n');
};

export default formatDiff;