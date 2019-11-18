/**
 * 存放订阅对象，通过 Dep 传入
 */

import Dep from './Dep'

 class Watcher {
     constructor(node,name,vm) {
        this.node = node
        this.name = name
        this.vm = vm
        Dep.target = this     //用作判断订阅者初始化，缓存
        this.update()         //
        Dep.target = null     //添加成功后消除，释放
     }
     update() {
        this.node.nodeValue = this.vm[this.name]
     }
 }

 export default Watcher