/**
 * 自定义的vue模板
 */
import Observer from './Observer'
import Complier from './Complier'

class Vue {
    constructor(options) {
        this.$options = options             //获取绑定参数对象
        this.$el = this.$options.el         //自定义vue的属性
        this._data = this.$options.data

        //Object.keys(obj)，返回对象属性名的数组
        //将每一个属性名的值返回
        Object.keys(this._data).forEach(key => {
            this._proxy(key)
        })

        new Observer(this._data)           //监听data的每一个属性
        new Complier(this.$el, this)       //编译元素、vue实例
    }

    //将vue实例中属性获取变得简单，例：
    //vue.$options.data.message -> vue.message
    //我们称之为：属性代理
    _proxy(key) {
        let self = this
        Object.defineProperty(this, key, {
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
