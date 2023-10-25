<script setup>
import { ref, reactive } from 'vue'
import { MedicineService } from '../../utils/axios/api';
import { ElMessage } from 'element-plus'

const data = reactive({
    tableData: []
})

const main = () => {
    MedicineService.getAllMedicine().then((res) => {
        console.log('药物列表')
        console.log(res.data.medicines)
        data.tableData = res.data.medicines
    }).catch((err) => {
        console.error(err)
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
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="单价" prop="price"></el-table-column>
        <el-table-column label="功效" prop="symptom"></el-table-column>
        <el-table-column label="图片" prop="path">
            <template #default="scope">
                <img :src="'/imgSer/'+data.tableData[scope.$index].path" style="width:100px;height:100px;" />
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