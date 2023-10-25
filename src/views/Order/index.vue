<script setup>
import { reactive, ref } from 'vue'
import { OrderService } from '../../utils/axios/api'
import { ElMessage } from 'element-plus'

const data = reactive({
    tableData: [

    ],
    formData: {

    },
    isShowDrawer: false
})


const main = () => {
    OrderService.getAllOrder().then((res) => {
        //console.log(res.data)
        var tempLst = res.data.orders
        for (var item of tempLst) {
            if (item.state == "1")
                item.state = "已完成"
            else
                item.state = "未完成"

            if (item.distribute == "1")
                item.distribute = "已下发"
            else
                item.distribute = "未下发"
        }
        data.tableData = tempLst
    }).catch((err) => {
        console.error(err)
        ElMessage({
            type: 'error',
            message: '获取订单出错，请检查网络'
        })
    })
}

main()

</script>

<template>
    <el-drawer v-model="data.isShowDrawer" title="新增订单" :with-header="true">
        <el-form labelPosition="top">
            <el-form-item label="公司名称">
                <el-input />
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input />
            </el-form-item>
            <el-form-item label="截止时间">
                <el-date-picker style="width:400px;" type="datetime" placeholder="选择截止时间" />
            </el-form-item>
        </el-form>
    </el-drawer>
    <el-button type="primary" @click="data.isShowDrawer = true">新增</el-button>
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
            <template #default>
                <el-button link type="primary" size="small">
                    查看详情
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<style>
.full-size {
    width: 100%;
    height: 100%;
}
</style>