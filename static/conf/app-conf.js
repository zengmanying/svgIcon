/**
 * @file 本文件是应用静态配置文件
 * @author PRD UX R&D Dept.
 * @description 配置参数说明:
 * baseURL -- 基础URL，同axios配置中的baseURL。如果配置
 *            了它，那么本配置将覆盖axios.config.js中
 *            的baseURL配置；如果配置了空字符串或null，
 *            那么这里的配置将被忽略
 * @example <caption>定义服务调用对象foo对应的基础路径</caption>
 * window.APP_CONF = {
 *   baseURL: {
 *     foo: 'http://10.192.168.1/bar'
 *   }
 * }
 */

window.APP_CONF = {
  baseURL: {}
}
