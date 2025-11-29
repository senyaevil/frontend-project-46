import { fileURLToPath } from 'url'
import path from 'path'
import { readFileSync } from 'fs'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFixture = filename => readFileSync(getFixturePath(filename), 'utf-8')

describe('Formatters', () => {
  describe('stylish format', () => {
    const expected = readFixture('expected_nested_stylish.txt')

    test('JSON files', () => {
      const file1 = getFixturePath('nested1.json')
      const file2 = getFixturePath('nested2.json')
      expect(genDiff(file1, file2, 'stylish')).toEqual(expected)
    })

    test('YAML files', () => {
      const file1 = getFixturePath('nested1.yml')
      const file2 = getFixturePath('nested2.yml')
      expect(genDiff(file1, file2, 'stylish')).toEqual(expected)
    })
  })

  describe('plain format', () => {
    const expected = readFixture('expected_nested_plain.txt')

    test('JSON files', () => {
      const file1 = getFixturePath('nested1.json')
      const file2 = getFixturePath('nested2.json')
      expect(genDiff(file1, file2, 'plain')).toEqual(expected)
    })

    test('YAML files', () => {
      const file1 = getFixturePath('nested1.yml')
      const file2 = getFixturePath('nested2.yml')
      expect(genDiff(file1, file2, 'plain')).toEqual(expected)
    })
  })

  describe('json format', () => {
    test('JSON files', () => {
      const file1 = getFixturePath('nested1.json')
      const file2 = getFixturePath('nested2.json')
      const result = genDiff(file1, file2, 'json')
      expect(() => JSON.parse(result)).not.toThrow()
    })

    test('YAML files', () => {
      const file1 = getFixturePath('nested1.yml')
      const file2 = getFixturePath('nested2.yml')
      const result = genDiff(file1, file2, 'json')
      expect(() => JSON.parse(result)).not.toThrow()
    })
  })
})