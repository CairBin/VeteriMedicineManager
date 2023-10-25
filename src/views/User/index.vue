<script setup>
import { ref, reactive } from 'vue'
import { UserService } from '../../utils/axios/api';
import { ElMessage } from 'element-plus'

const data = reactive({
    tableData: []
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

</script>

<template>
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