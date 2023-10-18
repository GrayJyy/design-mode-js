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
