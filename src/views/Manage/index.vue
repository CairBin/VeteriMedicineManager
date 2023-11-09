<script setup>
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { UserService } from '../../utils/axios/api';
const router = useRouter()
const route = useRoute()

const data = reactive({
    userName:''
})

const onExitBtnClicked = () => {
    //console.log('Hello')
    localStorage.removeItem('token')
    router.push('/login')
}

const main = () => {
    UserService.getManagerName({
        id:localStorage.getItem('id')
    }).then((res) => {
        data.userName = res.data.data.name
    }).catch((err) => {
        console.error(err)
        ElMessage({
            type: 'error',
            message:'获取管理员信息失败'
        })
    })
}

main()

</script>

<template>
    <el-container class="full-size">
        <el-header class="page-header">
            <div class="header-title">
                <h2>兽药车间管理</h2>
            </div>
            <div class="header-state">
                <span style="color:white;">
                    欢迎使用, <strong>&nbsp;&nbsp;{{ data.userName }}</strong>&nbsp;~
                </span>
                <el-button type="danger" @click="onExitBtnClicked()">
                    <el-icon>
                        <SwitchButton />
                    </el-icon>&nbsp;
                    退出
                </el-button>
            </div>
        </el-header>
        <el-container class="full-size">
            <el-aside class="page-aside">
                <el-menu class="full-size" :default-active="route.path" :router="true">
                    <el-menu-item index="/admin">
                        <el-icon>
                            <House />
                        </el-icon>
                        首页
                    </el-menu-item>
                    <el-menu-item index="/admin/medicine">
                        <el-icon>
                            <Sugar />
                        </el-icon>
                        药物管理
                    </el-menu-item>
                    <el-menu-item index="/admin/order">
                        <el-icon>
                            <Document />
                        </el-icon>
                        订单管理
                    </el-menu-item>

                    <el-menu-item index="/admin/user">
                        <el-icon>
                            <User />
                        </el-icon>
                        人员管理
                    </el-menu-item>

                    <el-menu-item index="/admin/workshop">
                        <el-icon>
                            <Box />
                        </el-icon>
                        车间管理
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container style="height:100%;">
                <el-main class="page-main">
                    <router-view></router-view>
                </el-main>
                <el-footer class="page-footer">
                   &copy;济南大学信息科学与工程学院
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<style>
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

.header-state>span {
    margin-left: 20px;
    position: relative;
    top: 12px;
    transform: translateY(-50%);
    margin-right: 20px;
    font-size:17px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    text-decoration: underline;
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
    display: flex;
    justify-content: center;
    flex: 0 0 auto;
    text-align: center;
    flex-direction: column;
    background: #EDF1F2;
}
</style>