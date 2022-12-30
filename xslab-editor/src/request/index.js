import axios from "axios";
import Vue from "vue";

function createService(baseUrl,withCredentials,isToken,timeout){
    const service = axios.create({
        baseURL: baseUrl,
        timeout: timeout, // 请求超时时间
        withCredentials:withCredentials||false
    })
    service.interceptors.request.use(config => {
        if (isToken) {
            if(config.headers&&!config.headers['Authorization']){
                if(isToken) {
                    config.headers['Authorization'] = Vue.prototype.$store.getters.token;
                } else {
                    config.headers['Authorization'] = null;
                }
            }
        }
        return config
    })

    return service
}

function onResponseError(service,callback){
    service.interceptors.response.use((response) => {
        if(response.data.success){
            return Promise.resolve(response.data)
        }else{
            Vue.prototype.$Message.error(response.data.message)
            return Promise.reject(response)
        }
    }, (error) => {
        callback&&callback(error)
        return Promise.reject(error.response)
    })
}

function getErrorText(status){
    switch (status) {
        case 403:
            return '拒绝访问'
        case 500:
            return '后端异常'
        case 404:
            return '很抱歉，资源未找到'
        case 504:
            return '网络超时'
        case 401:
            return '授权过期'
        case 426:
            return '服务器拒绝使用当前协议执行请求'
        default:
            return `未知错误：${status}`
    }
}

function dealWithError(error){
    let message = null
    if(error.response.data){
        message = error.response.data.message
    }else if (error.response.status){
        message =  getErrorText(error.response.status)
    }
    message = message||error.message
    Vue.prototype.$Message.error(message)
}

const axiosService = createService(window.config.baseUrl)
onResponseError(axiosService,(error)=>dealWithError(error))

export function postAction(url, parameter) {
    return axiosService({
        url: url,
        method: 'post',
        data: parameter
    })
}


export function getAction(url, parameter) {
    return axiosService({
        url: url,
        method: 'get',
        params: parameter
    })
}

export function deleteAction(url, parameter) {
    return axiosService({
        url: url,
        method: 'delete',
        params: parameter
    })
}

export function putAction(url, parameter) {
    return axiosService({
        url: url,
        method: 'put',
        data: parameter
    })
}