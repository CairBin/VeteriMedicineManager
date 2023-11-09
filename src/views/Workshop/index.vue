<script setup>
import { ref, reactive } from 'vue'
import { WorkshopService } from '../../utils/axios/api';
import { ElMessage } from 'element-plus'
import ValidModel from '../../utils/validate/index.js'

const formRef = ref()

const data = reactive({
    tableData: [],
    isShowDrawer: false,
    formData: {
        email: '',
        number: ''
    },
    formRule: {
        email: [{
            required: true,
            message: '邮箱不能为空',
            trigger: 'blur'
        }, {
            validator: ValidModel.valEmail,
            trigger: ['blur', 'change']
        }],
        number: [{
            required: true,
            message: '编号不能为空',
            trigger: 'blur'
        }]
    }
})

const main = () => {
    WorkshopService.getAllShop().then((res) => {
        console.log(res.data.workshops)
        data.tableData = res.data.workshops
    }).catch((err) => {
        console.log(err)
        ElMessage({
            type: 'error',
            message: '请求错误，请检查网络'
        })
    })

}

const onSubmitBtnClicked = (formRef) => {
    ValidModel.checkFormFormat(formRef, () => {
        WorkshopService.addShop({
            email: data.formData.email,
            number: data.formData.number
        }).then((res) => {
            ElMessage({
                type: 'success',
                message: '提交成功，请等待刷新页面'
            })
            setTimeout(() => {
                ElMessage({
                    type: 'success',
                    message: '提交成功，请等待2秒'
                })
            }, 1000)
            setTimeout(() => {
                ElMessage({
                    type: 'success',
                    message: '提交成功，请等待1秒'
                })
            }, 2000)
            setTimeout(() => {
                location.reload()
            }, 3000)
        }).catch((err) => {
            console.error(err)
            ElMessage({
                type: 'error',
                message: '提交失败，请检查网络'
            })
        })
    })
}

main()

</script>


<template>
    <el-drawer v-model="data.isShowDrawer" title="新增车间" :with-header="true">
        <el-form ref="formRef" labelPosition="top" :model="data.formData" :rules="data.formRule">
            <el-form-item label="注册邮箱" prop="email">
                <el-input type="email" v-model="data.formData.email" />
            </el-form-item>
            <el-form-item label="车间编号" prop="number">
                <el-input v-model="data.formData.number" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="onSubmitBtnClicked(formRef)" type="primary" style="width:80px;height:40px;">提交</el-button>
        </template>
    </el-drawer>
    <el-button type="primary" @click="data.isShowDrawer = true">新增</el-button>
    <el-table class="full-size" :data="data.tableData">
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="编号" prop="number"></el-table-column>
        <el-table-column label="密码" prop="password"></el-table-column>
        <el-table-column label="注册时间" prop="registerTime"></el-table-column>
    </el-table>
</template>

<style></style>