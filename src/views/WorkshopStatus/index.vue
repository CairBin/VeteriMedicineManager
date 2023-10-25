<script setup>
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { WorkshopService, MedicineService } from '../../utils/axios/api';
import { ElMessage, ElMessageBox } from 'element-plus'

const route = useRoute()
const router = useRouter()


const data = reactive({
    tableData: [],
    isShowDetail: false,
    detailData: [],
    flag: false
})

const onExitBtnClicked = () => {
    localStorage.removeItem('token')
    router.push('/login')
}

const onShowDetailTxtClicked = (index) => {
    var info = data.tableData[index].taskItems
    data.detailData.length = 0
    for (var i = 0; i < info.length; i++) {
        let counts = info[i].counts
        MedicineService.getOneMedicine({ id: info[i].medicineId }).then((res) => {
            var obj = {
                id: res.data.medicine.id,
                name: res.data.medicine.name,
                counts
            }
            data.detailData.push(obj)
        })
    }
    // data.detailData = temp
    // console.warn(data.detailData)
    data.isShowDetail = true

}

var queryTimer = setInterval(() => {
    for (var item of data.tableData) {
        WorkshopService.countOrder({ orderId: item.id }).then((res) => {
            // console.log(res.data.counts)
            if (res.data.counts == 0)
                location.reload()
        })
    }
}, 500)

const onExitDetailBtnClicked = () => {
    data.isShowDetail = false
    clearInterval(queryTimer)
}


const main = () => {
    WorkshopService.seeDaysTask({ id: route.params.id }).then((res) => {
        var tempLst = res.data.orders
        for (var item of tempLst) {
            if (item.state == "1")
                item.state = "已完成"
            else
                item.state = "未完成"

        }
        data.tableData = tempLst

    }).catch((err) => {
        console.error(err)
        ElMessage({
            type: 'error',
            message: '获取任务出错，请检查网络'
        })
    })


}

main()

const onChangePwdBtnClicked = () => {
    ElMessageBox.prompt('请输入新密码', '修改密码', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputErrorMessage: 'Invalid Password',
        inputValidator: (val) => {
            if (val === '')
                return false

            return true
        }
    })
        .then(({ value }) => {
            ElMessageBox.confirm('您将修改车间密码，这可能会造成不良后果，是否继续？', 'warning', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                WorkshopService.changePassword({
                    workshopId: route.params.id,
                    email: localStorage.getItem('email'),
                    password: value
                }).then((res) => {
                    ElMessage({
                        type: 'success',
                        message: '修改成功'
                    })
                }).catch((err) => {
                    ElMessage({
                        type: 'error',
                        message: '修改失败，请检查网络'
                    })
                })
            }).catch(() => { })

        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Input canceled',
            })
        })
}

const onFinishBtnTxtClicked = (id) => {
    WorkshopService.finishOrder({ orderId: id }).then((res) => {
        var cnt = res.data.count
        // console.log(res.data)
        if (cnt == 0) {
            location.reload()
            ElMessage({
                type: 'warning',
                message: '该任务最后一单已经完成，无需重复'
            })
        }
        else {
            ElMessage({
                type: 'success',
                message: `成功完成任务，剩余任务${cnt}`
            })
        }
    }).catch((err) => {
        console.error(err)
        ElMessage({
            type: 'error',
            message: '提交错误，请刷新页面并重新提交'
        })
    })
}

</script>


<template>
    <div class="card-container full-size" v-if="data.isShowDetail">
        <el-card class="tb-card">
            <template #header>
                <div class="card-header">
                    <span>详情信息</span>
                    <el-button class="button" @click="onExitDetailBtnClicked" type="danger">关闭</el-button>
                </div>
            </template>
            <el-table class="full-size" :data="data.detailData">
                <!-- <el-table-column label="ID" prop="id"></el-table-column> -->
                <el-table-column label="药品ID" prop="id"></el-table-column>
                <el-table-column label="药品名称" prop="name"></el-table-column>
                <el-table-column label="数量" prop="counts"></el-table-column>
            </el-table>
        </el-card>
    </div>
    <el-container class="full-size">
        <el-header class="page-header">
            <div class="header-title">
                <h2>兽药车间管理</h2>
            </div>
            <div class="header-state">
                <el-button type="danger" @click="onExitBtnClicked()">
                    <el-icon>
                        <SwitchButton />
                    </el-icon>&nbsp;
                    退出
                </el-button>
            </div>
        </el-header>
        <el-main>
            <el-button type="warning" @click="onChangePwdBtnClicked">修改密码</el-button>
            <el-table class="full-size" :data="data.tableData">
                <el-table-column label="ID" prop="id"></el-table-column>
                <el-table-column label="买家" prop="companyName"></el-table-column>
                <el-table-column label="总价" prop="price"></el-table-column>
                <el-table-column label="完成状态" prop="state"></el-table-column>
                <el-table-column label="下发车间" prop="distribute"></el-table-column>
                <el-table-column label="买家电话" prop="phone"></el-table-column>
                <el-table-column label="录入时间" prop="uploadTime"></el-table-column>
                <el-table-column label="完成时间" prop="finishTime"></el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="onShowDetailTxtClicked(scope.$index)">
                            查看详情
                        </el-button>
                        <el-button link type="primary" size="small" @click="onFinishBtnTxtClicked(scope.row.id)">
                            完成
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer>

        </el-footer>
    </el-container>
</template>

<style scoped>
.full-size {
    width: 100%;
    height: 100%;

}

.header-title {
    color: white;
    height: 100%;
    margin: 0;

}

.header-state {
    height: 100%;
    margin: 0;
}

.header-state .el-button {
    margin: 0;
    margin-left: 20px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 20px;
    width: 90px;
    height: 40px;
}

.header-title h2 {
    margin: 0;
    margin-left: 20px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}

.page-header {
    background-color: darkslategrey;
    padding: 0;
    display: flex;
    justify-content: space-between;
}

.page-aside {
    width: 200px;
    height: 100%;
}

.page-main {}

.page-footer {
    background-color: aqua;
    flex: 0 0 auto;
}

.card-container {
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 5;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
}

.tb-card {
    height: 70%;
    width: 80%;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>