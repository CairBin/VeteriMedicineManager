<script setup>
import { ref, reactive } from 'vue'
import { UserService } from '../../utils/axios/api';
import { ElMessage } from 'element-plus'

const data = reactive({
    tableData: [],
    isShowDrawer: false,
    formData: {
        email: '',
        password: '',
        name: '',
        phone: ''
    }
})

const main = () => {
    UserService.getAllManager().then((res) => {
        data.tableData = res.data.managers
    }).catch((err) => {
        console.log(err)
        ElMessage({
            type: 'error',
            message: '请求错误，请检查网络'
        })
    })
}

main()

const onAddBtnClicked = () => {
    data.isShowDrawer = true
}

const onSubmitBtnClicked = () => {
    if (data.formData.email == "" || data.formData.name == ""
        || data.formData.phone == "" || data.formData.phone == ""
    ) {
        ElMessage({
            type: 'error',
            message: '字段不能为空'
        })
        return;
    }

    var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    var tel = /^0\d{2,3}-?\d{7,8}$/
    var regMail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (!regMail.test(data.formData.email)) {
        ElMessage({ type: 'error', message: '无效的邮箱' })
        return;
    }
    if (!reg.test(data.formData.phone) && !tel.test(data.formData.phone)) {
        ElMessage({ type: 'error', message: '非法的号码' })
        return;
    }

    UserService.addManager(data.formData).then((res) => {
        window.location.reload()
    }).catch((err) => {
        console.error(err)
        ElMessage({
            type: 'error',
            message: '操作失败，请检查网络'
        })
    })


}

</script>

<template>
    <el-drawer v-model="data.isShowDrawer">
        <template #header>
            新增管理员
        </template>
        <template #default>
            <el-form labelPosition="top">
                <el-form-item label="邮箱">
                    <el-input type="email" v-model="data.formData.email"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="data.formData.password"></el-input>
                </el-form-item>
                <el-form-item label="名字">
                    <el-input v-model="data.formData.name"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input type="tel" v-model="data.formData.phone"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <el-button @click="onSubmitBtnClicked" type="primary" style="width:100px;height:40px;">
                提交
            </el-button>
        </template>
    </el-drawer>
    <div>
        <el-button type="primary" @click="onAddBtnClicked">新增</el-button>
    </div>
    <el-table class="full-size" :data="data.tableData">
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
    </el-table>
</template>


<style>
.full-size {
    width: 100%;
    height: 100%;
}
</style>