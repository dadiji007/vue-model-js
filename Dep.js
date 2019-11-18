/**
 * 订阅者模块 DEP
 */

class Dep {
    constructor() {
        this.list = []      //订阅者清单
    }
    listen(subs) {  
        this.list.push(subs)            //添加订阅者
    }
    notify() {      
        this.list.forEach(subs => subs.update())    //通知每一个订阅者
    }
}

Dep.prototype.target = null

export default Dep