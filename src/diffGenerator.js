import _ from 'lodash'

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)))

  return keys.map((key) => {
    const value1 = data1[key]
    const value2 = data2[key]

    if (!_.has(data1, key)) {
      return { key, status: 'added', value: value2 }
    }

    if (!_.has(data2, key)) {
      return { key, status: 'deleted', value: value1 }
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, status: 'nested', children: buildDiff(value1, value2) }
    }

    if (_.isEqual(value1, value2)) {
      return { key, status: 'unchanged', value: value1 }
    }

    return {
      key,
      status: 'changed',
      value1,
      value2,
    }
  })
}

export default buildDiff
