/**
 * 
 */
import Dep from './Dep'


class Observer {
    constructor(data) {
        this.data = data
        Object.keys(this.data).forEach(key => {
            this._bind(data, key, data[key])
        })
    }
    _bind(data, key, value) {
        let myDep = new Dep()
        Object.defineProperty(data, key, {
            get() {
                if(Dep.target) myDep.listen(Dep.target)
                return value
            },
            set(newValue) {
                if (newValue === value) return
                value = newValue
                myDep.notify()
            }
        })
    }
}

export default Observer
