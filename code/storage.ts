// 单例模式
/** 
 * 实现Storage，使得该对象为单例，基于 localStorage 进行封装。实现方法 setItem(key,value) 和 getItem(key)。
 */

// 1.静态方法
export class Storage {
  static instance: Storage;
  getItem(key: string) {
    return localStorage.getItem(key)
  }
  setItem(key: string, value: string) {
    localStorage.setItem(key, value)
  }
  static getInstance() {
    if (!Storage.instance) Storage.instance = new Storage()
    return Storage.instance
  }
}

const storage1 = Storage.getInstance()
const storage2 = Storage.getInstance()
// 返回true
console.log(storage1 === storage2);

// 2.闭包
class StorageBase {
  constructor() { }
  getItem(key: string) {
    return localStorage.getItem(key)
  }
  setItem(key: string, value: string) {
    localStorage.setItem(key, value)
  }
}


const Storage2 = (function () {
  let instance: any = null
  return function () {
    if (!instance) instance = new StorageBase()
    return instance
  }
})()

const storage3 = Storage2()
const storage4 = Storage2()

console.log(storage3 === storage4) // 返回true
