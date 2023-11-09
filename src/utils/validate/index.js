import { ElMessage } from "element-plus";

var isJSON = function (str) {

    if (/^[\],:{}\s]*$/.test(str.replace(/\\["\\\/bfnrtu]/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        return true;
    } else {
        return false;
    }

}

const valEmail = (rule, value, callback) => {
    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (regEmail.test(value)) {
        callback()
    }
    else
        callback(new Error("邮箱无效"))
}

const valURL = (rule, value, callback) => {
    const regURL = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
    if (regURL.test(value))
        callback()
    else
        callback(new Error("URL无效"))
}

const valPositiveInt = (rule, value, callback) => {
    const regN = /(^[1-9]\d*$)/
    if (regN.test(value))
        callback
    else
        callback(new Error('数字无效'))
}

const valJSON = (rule, value, callback) => {
    if (isJSON(value))
        callback()
    else
        callback(new Error('内容无效'))
}


const checkFormFormat = (formRef, callback) => {
    if (!formRef) return
    formRef.validate((valid, fields) => {
        if (valid)
            callback()
        else
            ElMessage({ type: 'error', message: '表单格式错误，请检查输入' })
    })
}

export default {
    valEmail,
    valURL,
    valPositiveInt,
    valJSON,
    checkFormFormat
}