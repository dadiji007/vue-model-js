/**
 * 入口文件，编辑绑定html元素
 */
import Vue from './Vue'

const vue = new Vue({
    el: '#app',
    data: {
        message: '双向绑定vue'
    },
})

window.vue = vue
