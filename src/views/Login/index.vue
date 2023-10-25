<script setup>
import { reactive, ref } from 'vue'
import { IdentityService } from '../../utils/axios/api.js'
import { ElMessage } from 'element-plus'
import ValidModel from '../../utils/validate/index.js'
import { useRouter } from "vue-router"


const route = useRouter()

var ruleFormRef = ref('default')

const data = reactive({
    formData: {
        email: '',
        password: ''
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
        password: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
        }]
    },
    isAdmin: true,
    banner: '管理员',
    showMsg: '>>点击此处进行车间用户登录<<'
})



const onLoginBtnClicked = (formRef) => {
    //ElMessage({ type: 'error', message: 'data' })
    //console.log(formRef)
    ValidModel.checkFormFormat(formRef, () => {
        if (data.isAdmin)
            IdentityService.login(data.formData.email, data.formData.password)
                .then((res) => {
                    console.log(res)
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("identity", 'admin')
                    ElMessage({
                        type: 'success',
                        message: '登录成功'
                    })
                    if (data.isAdmin)
                        route.push("/admin")
                })
                .catch((err) => {
                    //console.error(localStorage.getItem('token'))
                    console.log(err)
                    ElMessage({
                        type: 'error',
                        message: 'Failed'
                    })
                })
        else
            IdentityService.workshopLogin(data.formData.email, data.formData.password)
                .then((res) => {
                    console.log(res.data)
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("identity", 'user')
                    ElMessage({
                        type: 'success',
                        message: '登录成功'
                    })
                    route.push({ name: "build", params: { id: res.data.workshopId } })
                })
                .catch((err) => {
                    console.log(err)
                    ElMessage({
                        type: 'error',
                        message: 'Failed'
                    })
                })
    })

}

const onSwitchTxtCicked = () => {
    if (data.isAdmin) {
        data.banner = '车间'
        data.isAdmin = false
        data.showMsg = '>>点击此处进行管理员用户登录<<'
    } else {
        data.banner = '管理员'
        data.isAdmin = true
        data.showMsg = '>>点击此处进行车间用户登录<<'
    }
}

</script>

<template>
    <el-card class="login-card">
        <h2>{{ data.banner }}身份认证</h2>
        <el-form ref="ruleFormRef" :model="data.formData" :rules="data.formRule">
            <el-form-item label="邮箱" prop="email">
                <el-input type="email" v-model="data.formData.email" placeholder="请在此处填写邮箱" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input maxlength="128" type="password" v-model="data.formData.password" placeholder="请在此处填写密码" />
            </el-form-item>
            <el-form-item style=" margin-top:40px;">
                <el-button @click="onLoginBtnClicked(ruleFormRef)" type="primary"
                    style="width:100px;height:40px;margin:auto;">
                    登录
                </el-button>
            </el-form-item>
        </el-form>
        <el-text style="font-size:12px;cursor:pointer;" type="primary" @click="onSwitchTxtCicked">
            {{ data.showMsg }}
        </el-text>
    </el-card>
</template>

<style>
.login-card {
    text-align: center;
    width: 300px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>