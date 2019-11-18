import Watcher from "./Watcher"

/**
 * 主要用作编译 vue 模板，处理dom元素
 * 处理 {{}} 识别
 */

const reg = /\{\{(.*)\}\}/

class Complier {
    constructor(el, vm) {
        this.el = document.querySelector(el)        //对应实例属性
        this.vm = vm
        this.frag = this._createFragment()
        this.el.appendChild(this.frag)
    }

    //创建dom片段
    //将需要操作的元素放进dom片段中处理
    _createFragment() {
        let frag = document.createDocumentFragment()
        let child
        while (child = this.el.firstChild) {
            this._complie(child)                //编译节点
            frag.appendChild(child)             //添加到父节点上
        }
        return frag
    }

    //处理节点
    _complie(node) {

        //1，表示元素
        if(node.nodeType === 1) {           //可根据实际情况进行改变
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

        //3，表示文本
        if(node.nodeType === 3) {
            if(reg.test(node.nodeValue)) {
                let name = RegExp.$1
                name = name.trim()                  //去除多余空格
                new Watcher(node,name,this.vm)      //在此监听文本
            }
        }
    }
}

export default Complier
