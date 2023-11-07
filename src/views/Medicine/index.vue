<script setup>
import { ref, reactive } from 'vue'
import { MedicineService } from '../../utils/axios/api';
import { ElMessage } from 'element-plus'



const tableRef = ref()

const data = reactive({
    tableData: [],
    multipleSelection: [],
    enableDel: false,
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

const onDeleteBtnClicked = () => {
    for (var i = 0; i < data.multipleSelection.length; i++) {
        MedicineService.deleteMedicine({
            id: data.multipleSelection[i].id
        }).then((res) => {
            window.location.reload();
        }).catch((err) => {
            console.error(err)
            ElMessage({
                type: 'error',
                message: '操作失败，请检查网络'
            })
        })
    }
}

const handleSelectionChange = (val) => {
    data.multipleSelection = val
    data.enableDel = data.multipleSelection.length == 0
}

const onAddBtnClicked = () => {

}

</script>

<template>
    <div>
        <el-button type="primary" @click="onAddBtnClicked">新增</el-button>
        <el-button type="danger" @click="onDeleteBtnClicked" :disabled="data.enableDel">删除</el-button>
    </div>
    <el-table class="full-size" ref="tableRef" :data="data.tableData" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <!-- <el-table-column label="ID" prop="id"></el-table-column> -->
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="单价" prop="price"></el-table-column>
        <el-table-column label="功效" prop="symptom"></el-table-column>
        <el-table-column label="图片" prop="path">
            <template #default="scope">
                <img :src="'/imgSer/' + data.tableData[scope.$index].path" style="width:100px;height:100px;" />
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