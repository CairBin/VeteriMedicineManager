import request from './request'

//Please refer to README.md
// export class MyService {
//     static async getTest(params) {
//         return request.getReq('/apiSer/api/Test/testGet', params)
//     }
// }

export class IdentityService {
    static async login(email, password) {
        return request.postReq('/apiSer/manager/user', {
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

}

export class MedicineService {
    static async getAllMedicine() {
        return request.getReq('/apiSer/manager/medicineDetail', {})
    }
}


export class OrderService {
    static async getAllOrder() {
        return request.getReq('/apiSer/manager/getAllOrders', {})
    }
    static async addOrder(params) {
        return request.postReq('/apiSer/manager/order', params)
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

    static async makeTask(param) {
        return request.postReq('/apiSer/manager/makeTasks', params)
    }

    static async seeDaysTask(params) {
        return request.getReq('/apiSer/workshop/order', params)
    }
}