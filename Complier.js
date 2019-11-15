import Watcher from "./Watcher"

/**
 * 主要用作编译模板
 */

const reg = /\{\{(.*)\}\}/

class Complier {
    constructor(el, vm) {
        this.el = document.querySelector(el)
        this.vm = vm
        this.frag = this._createFragment()
        this.el.appendChild(this.frag)
    }
    _createFragment() {
        let frag = document.createDocumentFragment()
        let child
        while (child = this.el.firstChild) {
            this._complie(child)
            frag.appendChild(child)
        }
        return frag
    }
    _complie(node) {
        if(node.nodeType === 1) {
            let self = this
            let attr = node.attributes
            if(attr.hasOwnProperty('v-model')) {
                let name = attr['v-model'].nodeValue
                node.addEventListener('input', function(event) {
                    self.vm[name] = event.target.value
                })
                node.value = this.vm[name]
            }
        }
        if(node.nodeType === 3) {
            if(reg.test(node.nodeValue)) {
                let name = RegExp.$1
                name = name.trim()
                new Watcher(node,name,this.vm)
            }
        }
    }
}

export default Complier
