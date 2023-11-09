import axios from 'axios'
import { ElMessage } from 'element-plus'

import status from './status'

axios.defaults.timeout = 60000      //api timeout time


//http request interceptor
axios.interceptors.request.use(
    config => {
        let token = window.localStorage.getItem('token')
        config.headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'token':localStorage.getItem('token')
        }
        // if (localStorage.getItem('token')) {
        //     config.headers.Authorization = '' + localStorage.getItem('token')
        // }

        return config
    },
    error => {
        return Promise.reject(error)
    }
)


//http response interceptor
axios.interceptors.response.use(
    response => {
        console.log(response)
        if(response.data.state!='200')
        {
            
            return Promise.reject(response.data)
        }
        console.log("成功")
        return response
    },
    error => {
        const { response } = error
        if (response) {
            status.statusFilter(response.data.state)
            return Promise.reject(response.data)
        } else {
            ElMessage({ type: 'error', message: 'Network error' })
        }
    }
)

const getReq = (url, params) => {
    return new Promise((resolve, reject) => {
        let promise = axios({
            url, params
        })

        promise.then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

const postReq = (url, params) => {
    return new Promise((resolve, reject) => {
        let promise = axios({
            method: 'POST',
            url,
            params: params
        })

        promise.then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

const putReq = (url, params) => {
    return new Promise((resolve, reject) => {
        let promise = axios({
            method: 'PUT',
            url,
            params: params
        })

        promise.then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })

    })
}

const deleteReq = (url, params) => {
    return new Promise((resolve, reject) => {
        let promise = axios({
            method: 'DELETE',
            url,
            params,
        })

        promise.then(res => {
            resolve(resolve)
        }).catch(err => {
            reject(err)
        })
    })
}

export default {
    getReq,
    postReq,
    putReq,
    deleteReq
}