/**
 * 自定义的vue模板
 */
import Observer from './Observer'
import Complier from './Complier'

class Vue {
    constructor(options) {  
        this.$options = options             //获得对象
        this.$el = this.$options.el
        this._data = this.$options.data

        Object.keys(this._data).forEach(key => {        //Object.keys(obj)，返回对象属性名的数组
            this._proxy(key)
        })

        new Observer(this._data)           //转化
        new Complier(this.$el, this)       //编译
    }
    _proxy(key) {
        let self = this
        Object.defineProperty(this,key,{
            get() {
                return self._data[key]
            },
            set(value) {
                self._data[key] = value
            }
        })
    }
}

export default Vue
