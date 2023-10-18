// // Object.create(target) 以一个现有对象target作为原型，创建一个新对象
type AnyObject = Record<string, any>
const create = <T extends AnyObject>(target: T | null, properties: PropertyDescriptorMap) => {
  if (target !== null && typeof target !== 'object') throw new TypeError('type error!')
  function Fn() {}
  const newObj = new (Fn as any)()
  //   这样写也可以 newObj.__proto__ = target
  Fn.prototype = target
  if (properties) Object.defineProperties(newObj, properties)
  return newObj as T & typeof properties
}

const test = create({ a: 1 }, { b: { value: 2 } })
console.log(test)
console.log(test.a)
console.log(test.b)
