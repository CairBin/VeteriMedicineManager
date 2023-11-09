import request from './request'
import axios from 'axios'

//Please refer to README.md
// export class MyService {
//     static async getTest(params) {
//         return request.getReq('/apiSer/api/Test/testGet', params)
//     }
// }

export class IdentityService {
    static async login(email, password) {
        return request.postReq('/apiSer/manager/login', {
            email,
            password
        })
    }

    static async workshopLogin(email, password) {
        return request.postReq('/apiSer/workshop/login', {
            email,
            password
        })
    }

}

export class UserService {
    static async getAllManager() {
        return request.getReq('/apiSer/manager/queryAllManager', {})
    }

    static async addManager(params) {
        return request.postReq('/apiSer/manager/addManager', params);
    }

    static async getManagerName(params) {
        return request.getReq('/apiSer/manager/getManagerNameById',params)
    }

}

export class MedicineService {
    static async getAllMedicine() {
        return request.getReq('/apiSer/manager/medicineDetail', {})
    }

    static async getOneMedicine(params) {
        return request.getReq('/apiSer/workshop/getMedicineDetailById', params)
    }

    static async getOneMedicineManager(params) {
        return request.getReq('/apiSer/manager/getMedicineDetailById', params)
    }

    static async addMedicine(params) {
        return new Promise((resolve, reject) => {
            console.log(params.medicineImg)
            let promise = axios({
                method: 'POST',
                url: '/apiSer/manager/addMedicine',
                data: params.medicineImg,
                params: {
                    name: params.name,
                    price: params.price,
                    symptom: params.symptom
                },
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': localStorage.getItem('token')
                }
            })

            promise.then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
        // return postReq('/apiSer/manager/addMedicine', params)
    }

    static async changeMedicine(params) {
        return request.postReq('/apiSer/manager/changeMedicineDetail', params)
    }

    static async changePicture(params) {
        return new Promise((resolve, reject) => {
            console.log(params.medicineImg)
            let promise = axios({
                method: 'POST',
                url: '/apiSer/manager/changeImage',
                data: params.medicineImg,
                params: {
                    id:params.id
                },
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': localStorage.getItem('token')
                }
            })

            promise.then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
        return request.postReq('/apiSer/manager/changeImage', params)
    }

    static async deleteMedicine(params) {
        return request.postReq('/apiSer/manager/deleteMedicineById', params)
    }
}


export class OrderService {
    static async getAllOrder() {
        return request.getReq('/apiSer/manager/getAllOrders', {})
    }
    static async addOrder(params) {
        return request.postReq('/apiSer/manager/order', params)
    }
    static async makeTask(params) {
        return request.postReq('/apiSer/manager/makeTasks', params)
    }
    static async getDetail(params){
        return request.postReq('/apiSer/manager/queryWorkshopTaskCount',params)
    }
}


export class WorkshopService {
    static async getAllShop(params) {
        return request.getReq('/apiSer/manager/getAllOfWorkshop', {});
    }

    static async addShop(params) {
        return request.postReq('/apiSer/manager/newWorkshop', params)
    }

    static async changeShopDetil(params) {
        return request.postReq('/apiSer/manager/changeWorkshopDetail', params)
    }

    static async deleteShop(params) {
        return request.postReq('/apiSer/manager/deleteWorkshop', params)
    }

    //管理员修改车间密码
    static async changePasswordByManager(params) {
        return request.postReq('/apiSer/manager/changeWorkshop', params);
    }


    static async seeDaysTask(params) {
        return request.getReq('/apiSer/workshop/order', params)
    }

    static async changePassword(params) {
        return request.postReq('/apiSer/workshop/changePassword', params)
    }

    static async finishOrder(params) {
        return request.postReq('/apiSer/workshop/finish', params)
    }


    static async countOrder(params) {
        return request.getReq('/apiSer/workshop/count', params)
    }

    static async newFinishOrder(params){
        return request.postReq('/apiSer/workshop/finishTheTask',params)
    }

    static async getWorkshopNumber(params){
        return request.getReq('/apiSer/workshop/getNumberById',params)
    }

    static async getWorkshopMission(params){
        return request.getReq('/apiSer/workshop/getWorkshopMission',params)
    }

    static async changeWorkshopInfo(params){
        return request.postReq('/apiSer/manager/changeWorkshop',params)
    }

    static async deleteWorkshop(id){
        return request.postReq('/apiSer/manager/deleteWorkshop',{id})
    }
}


export class ChartService{
    static async viewAllTask(){
        return request.getReq('/apiSer/manager/querySumTaskWorkshop',{})
    }

    static async viewWeekTask(){
        return request.getReq('/apiSer/manager/querySumTaskWorkshopWeek',{})
    }

    static async viewMonthTask(){
        return request.getReq('/apiSer/manager/querySumTaskWorkshopMonth',{})
    }
    static async viewYearTask(){
        return request.getReq('/apiSer/manager/querySumTaskWorkshopYear',{})
    }
}