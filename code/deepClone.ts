/**
思路 : 深拷贝考虑的是引用类型，因此先做类型判断，把值类型和函数类型以及 null 直接返回

 */
const deepClone = <T>(source: T) => {
  const isArray = Array.isArray(source) // 判断是否为数组
  if (source === null || typeof source === 'function' || typeof source !== 'object') return source // 把 null undefined 值类型 函数类型直接返回
  const output: any = isArray ? [] : {} // 判断是数组还是对象
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      output[key] = deepClone(source[key])
    }
  }
  return output
}

const a = undefined
const b = deepClone(a)
console.log(typeof undefined !== 'object') //false
