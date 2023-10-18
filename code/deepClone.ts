function deepClone<T>(obj: T, hash = new WeakMap()) {
  if (obj === null || obj === undefined) return obj // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  if (typeof obj !== 'object') return obj // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj)
  const cloneObj = Object.create(Object.getPrototypeOf(obj))
  hash.set(obj, cloneObj)
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], hash) // 实现一个递归拷贝
    }
  }
  return cloneObj
}

const a = { a: 1 }
const b = deepClone(a)
console.log(a === b) // false
