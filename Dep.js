/**
 * 订阅者 DEP
 */

class Dep {
    constructor() {
        this.list = []      //订阅者清单
    }
    listen(subs) {  
        this.list.push(subs)            //添加订阅者
    }
    notify() {      
        for(let i = 0; i<this.list.length; i++) {
            this.list[i].update()       //通知每一个订阅者
        }
    }
}

Dep.prototype.target = null

export default Dep