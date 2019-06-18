import Vue from 'vue'
import App from './app.vue'

import './assets/images/bg.jpg'
import './assets/test.css'
import './assets/test_stylus.styl'
const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    render: (h) =>h(App)
}).$mount(root)