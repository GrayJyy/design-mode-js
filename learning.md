
## 创建型

### 单例模式

>**保证一个类仅有一个实例，并提供一个访问它的全局访问点**

```typescript
// 方法 1
export class SingleModel {

static instance: SingleModel

show() {

console.log('im single model')

}

static getInstance() {

if (!SingleModel.instance) SingleModel.instance = new SingleModel()

return SingleModel.instance

}

}

  

const s1 = SingleModel.getInstance()

const s2 = SingleModel.getInstance()

console.log(s1 === s2)

  
// 方法 2
class Single {

say() {

console.log('im saying')

}

}

  

const SingleModel2 = (function () {

let instance: any = null

return function () {

if (!instance) instance = new Single()

return instance

}

})()

  

const s3 = SingleModel2()

const s4 = SingleModel2()

console.log(s3 === s4)
```

```typescript
// 实现一个全局唯一的模态框
class SingleModal {

static instance: HTMLDivElement

static getInstance() {

if (!this.instance) {

console.log(this)

  

this.instance = document.createElement('div')

this.instance.innerHTML = 'im a single modal'

this.instance.id = 'modal'

this.instance.style.display = 'none'

document.append(this.instance)

}

return this.instance

}

static open() {

this.instance.style.display = 'block'

}

static close() {

this.instance.style.display = 'none'

}

}

  

const modalA = SingleModal.getInstance()

const modalB = SingleModal.getInstance()

console.log(modalA === modalB)
```

## 原型模式

>在原型模式下，当我们想创建一个对象的时候，会先找到一个对象作为原型，然后通过克隆原型的方式来创建出一个和原型一样（共享一套数据和方法）的对象。所以说 `Object.create`是原型模式的天然实现。

```typescript
// // Object.create(target) 以一个现有对象target作为原型，创建一个新对象
type AnyObject = Record<string, any>

const create = <T extends AnyObject>(target: T | null, properties: PropertyDescriptorMap) => {

if (target !== null && typeof target !== 'object') throw new TypeError('type error!')

function Fn() {}

const newObj = new (Fn as any)()

// 这样写也可以 newObj.__proto__ = target

Fn.prototype = target

if (properties) Object.defineProperties(newObj, properties)

return newObj as T & typeof properties

}

  

const test = create({ a: 1 }, { b: { value: 2 } })

console.log(test)

console.log(test.a)

console.log(test.b)
```

>在 JavaScript 中，每个构造函数都拥有一个`prototype`属性，它指向构造函数的原型对象，这个原型对象中有一个 constructor 属性指回构造函数；每个实例都有一个`__proto__`属性，当我们使用构造函数去创建实例时，实例的`__proto__`属性就会指向构造函数的原型对象。


> 这些彼此相连的`prototype`，就组成了一个原型链。 注： 几乎所有 JavaScript 中的对象都是位于原型链顶端的 Object 的实例，除了`Object.prototype`（当然，如果我们手动用`Object.create(null)`创建一个没有任何原型的对象，那它也不是 Object 的实例）。

```typescript
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

//.  解决循环引用版本
function deepClone<T>(obj: T, hash = new WeakMap()) {

if (obj === null || obj === undefined) return obj // 如果是null或者undefined我就不进行拷贝操作

if (obj instanceof Date) return new Date(obj)

if (obj instanceof RegExp) return new RegExp(obj)

if (typeof obj !== 'object') return obj // 可能是对象或者普通的值 如果是函数的话是不需要深拷贝

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
```
