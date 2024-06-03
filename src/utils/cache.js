export default class CacheUtil {
  static #cachedMap = new Map()
  static hasData(key) {
    return this.#cachedMap.has(key)
  }
  static setCachedData(key, data) {
    if (key !== null || key !== undefined) this.#cachedMap.set(key, data)
  }
  static getCachedData(key) {
    if (this.hasData(key)) return this.#cachedMap.get(key)
    return null
  }
}
