import Xsc from './components/Xsc'
const install = function (Vue, opts = {}) {
  Vue.component(Xsc.name, Xsc)
}
/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  install,
  Xsc
}
