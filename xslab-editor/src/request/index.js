import axios from "axios";
import Vue from "vue";

function createService(baseUrl,withCredentials,isToken,timeout){
    const service = axios.create({
        baseURL: baseUrl,
        timeout: timeout, // 请求超时时间
        withCredentials:withCredentials||false
    })
    service.interceptors.request.use(config => {
        if (token&&isToken) {
            if(config.headers&&!config.headers['Authorization']){
                if(isToken) {
                    config.headers['Authorization'] = token; // 让每个请求携带自定义 token 请根据实际情况自行修改
                } else {
                    config.headers['Authorization'] = null; // 让每个请求携带自定义 token 请根据实际情况自行修改
                }
            }
        }
        return config
    })

    return service
}

function onResponseError(service,callback){
    service.interceptors.response.use((response) => {
        return response
    }, (error) => {
        callback&&callback(error)
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
            return '未知'
    }
}

function dealWithError(error){
    let data = error.response?error.response.data:error;
    if(typeof(data)==='string'){
        if(data.indexOf('{')===0){
            data = JSON.parse(data);
        }else{
            data = {message:data}
        }
    }
    else {
        data.message = (data.msg||data.message)||getErrorText(error.response.status)
    }
    if(error.response){
        switch (error.response.status){
            case 500:{
                break
            }
            case 401:{
                break
            }
            default:
                break
        }
    }else{
    }
}

const axiosService = createService(window.config.baseUrl)
onResponseError(axiosService,(error)=>dealWithError(error))
axiosService.interceptors.response.use((response) => {
    return response?response.data:{}
})

export function postAction(url, parameter) {
    return axiosService({
        url: url,
        method: 'post',
        data: parameter
    })
}


export function getAction(url, parameter) {
    return axios({
        url: url,
        method: 'get',
        params: parameter
    })
}

export function deleteAction(url, parameter) {
    return axios({
        url: url,
        method: 'delete',
        params: parameter
    })
}

export function putAction(url, parameter) {
    return axios({
        url: url,
        method: 'put',
        data: parameter
    })
}