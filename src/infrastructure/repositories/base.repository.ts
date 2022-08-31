import Storage from '../storage';

export class BaseRepository<T = {}> {
  private _key = '';

  constructor(key) {
    this._key = key;
  }

  add(data: T) {
    let _data = Storage.get<T[]>(this._key) || [];
    _data = [..._data, data];

    Storage.set<T[]>(this._key, _data);
  }

  find(itemKey?: keyof T, value?: any) {
    const _data = Storage.get<T[]>(this._key) || [];

    return itemKey ? _data.filter((item) => item[itemKey] === value) : _data;
  }

  findOne(itemKey: keyof T, value: any) {
    const _data = Storage.get<T[]>(this._key) || [];

    return _data.find((item) => item[itemKey] === value);
  }

  delete(itemKey: keyof T, value: any) {
    let _data = Storage.get<T[]>(this._key) || [];

    _data = _data.filter((item) => item[itemKey] !== value);

    Storage.set<T[]>(this._key, _data);
  }

  clear() {
    Storage.set<T[]>(this._key, []);
  }
}
