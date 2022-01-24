// import { version } from "vue/types/umd"

// 用于将二进制字符串转换为base64编码
export default {
    install(Vue, options) {
        Vue.prototype.$strToBase64 = function (str) {
            // 将二进制字符串转为base64
            var bytes = [];
            for (let i = 2; i < str.length - 1; i++) {
                bytes.push(str[i]);
            }
            return bytes.join("");
        }
    }
}