/**
 * 监听数据变化，需要订阅者
 */
import Dep from './Dep'

class Observer {
    constructor(data) {
        this.data = data
        Object.keys(this.data).forEach(key => {
            this._bind(data, key, data[key])
        })
    }

    //
    _bind(data, key, value) {
        let myDep = new Dep()
        Object.defineProperty(data, key, {
            get() {
                if(Dep.target) myDep.listen(Dep.target)     //判断是否存在target，有则添加订阅者
                return value
            },
            set(newValue) {
                if (newValue === value) return
                value = newValue
                myDep.notify()      //数据变化后，通知订阅者
            }
        })
    }
}

export default Observer
