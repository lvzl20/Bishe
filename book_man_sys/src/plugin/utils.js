/**
 * 工具类
 * 1、一定要在该文件中引用vue和crypto-js。
 * 2、两个方法中的第一个参数word是待加密或者解密的字符串，第二个参数keyStr是AES加密
 *          需要用到的16位字符串的key。
 * 3、如果想对一个js对象加密，需要先把该对象转成json字符串。
 * 
 * 在需要使用加密解密方法的vue组件中使用import引入utils.js文件即可使用了
 */
import Vue from 'vue'
import CryptoJS from 'crypto-js'
export default {
    install(Vue, options) {
        //加密
        Vue.prototype.$encrypt = function (word, keyStr) {
            keyStr = keyStr ? keyStr : 'abcdefgabcdefg12';
            var key = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
            var srcs = CryptoJS.enc.Utf8.parse(word);
            var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
            return encrypted.toString();
        },
            //解密
            Vue.prototype.$decrypt = function (word, keyStr) {
                keyStr = keyStr ? keyStr : 'abcdefgabcdefg12';
                var key = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
                var decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
                return CryptoJS.enc.Utf8.stringify(decrypt).toString();
            }
    }

}