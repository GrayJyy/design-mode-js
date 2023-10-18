// 单例模式
// 实现一个全局的模态框
export class Modal {
  static instance: HTMLDivElement
  static getInstance() {
    if (!this.instance) {
      this.instance = document.createElement('div')
      this.instance.id = 'modal'
      this.instance.innerHTML = 'modal'
      this.instance.style.display = 'none'
      document.body.appendChild(this.instance)
    }
    return Modal
  }
  static open() {
    Modal.instance.style.display = 'block'
  }
  static close() {
    Modal.instance.style.display = 'none'
  }
}
const Modal2 = (function () {
  let modal: HTMLDivElement | null = null
  return () => {
    if (!modal) {
      modal = document.createElement('div')
      modal.id = 'modal'
      modal.innerHTML = 'modal'
      modal.style.display = 'none'
      document.body.appendChild(modal)
    }
    return modal
  }
})()

// for test
const modal = Modal.getInstance()
const modal2 = Modal.getInstance()
const modal3 = (Modal2 as any)()
const modal4 = (Modal2 as any)()
console.log(modal3 === modal4) // true
console.log(modal === modal2) // true
document.getElementById('btn')!.addEventListener('click', () => {
  modal.open()
  modal3.style.display = 'block'
})
document.getElementById('btn2')!.addEventListener('click', () => {
  modal.close()
  modal3.style.display = 'none'
})

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
