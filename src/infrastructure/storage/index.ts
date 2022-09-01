import NodeCache from 'node-cache';

export default class Storage {
  private static _cache: NodeCache;

  static initializeCache() {
    if (!Storage._cache) Storage._cache = new NodeCache();
  }

  static set<T>(key: string, data: T) {
    this._cache.set(key, data);
  }

  static get<T>(key: string) {
    return this._cache.get<T>(key);
  }

  static clean(key: string) {
    return this._cache.set(key, null);
  }
}
