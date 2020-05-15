import { isObject } from './is-object.utils'

describe('isObject', () => {
  it('should return false when value is a string', () => {
    expect(isObject('')).toEqual(false)
  })

  it('should return false when value is null', () => {
    expect(isObject(null)).toEqual(false)
  })

  it('should return true when value is an array', () => {
    expect(isObject([])).toEqual(true)
  })

  it('should return true when value is an object', () => {
    expect(isObject({})).toEqual(true)
  })
})
