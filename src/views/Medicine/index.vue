<script setup>
import { ref, reactive } from 'vue'
import { MedicineService } from '../../utils/axios/api';
import { ElMessage } from 'element-plus'



const tableRef = ref()

const data = reactive({
    tableData: [],
    multipleSelection: [],
    enableDel: false,
    showDrawer: false,
    dataForm: {
        name: '',
        price: 0,
        symptom: '',
        medicineImg: ''
    }
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
    data.showDrawer = true
}

const onSubmitBtnClicked = () => {
    if (!data.dataForm.name || !data.dataForm.symptom || data.dataForm.price <= 0) {
        ElMessage({
            type: 'error',
            message: '无效的字段'
        })
    }

    MedicineService.addMedicine(data.dataForm).then((res) => {
        ElMessage({
            type: 'success',
            message: '操作成功'
        })
        window.location.reload();
    })
        .catch((err) => {
            console.error(err)
            ElMessage({
                type: 'error',
                message: '操作失败，请检查网络'
            })
        })
}

const onUploadChanged = (file, filelist) => {
    var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
    const extension = testmsg === 'png' || testmsg === 'jpg'
    if (!extension) {
        ElMessage({
            type: 'error',
            message: '错误的文件格式'
        })
        return;
    }


    const reader = new FileReader()
    reader.readAsDataURL(file.raw)
    reader.fileName = file.name
    reader.onload = () => {
        if (reader.result) {
            // var result = reader.result
            // let arr = result.split(',')
            // let mime = arr[0].match(/:(.*?);/)[1]
            // let bstr = atob(arr[1])
            // let n = bstr.length
            // let u8arr = new Uint8Array(n)
            // while (n--) {
            //     u8arr[n] = bstr.charCodeAt(n)
            // }
            // data.dataForm.medicineImg = new File([u8arr], file.name, { type: mime })
            data.dataForm.medicineImg = reader.result
        } else {
            ElMessage({
                type: 'error',
                message: '错误的格式'
            })
        }
    }

}

</script>

<template>
    <el-drawer v-model="data.showDrawer">
        <template #header>
            新增药物
        </template>
        <template #default>
            <el-form labelPosition="top">
                <el-form-item label="名称">
                    <el-input v-model="data.dataForm.name"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="data.dataForm.price"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-upload :on-change="onUploadChanged" :auto-upload="false" drag style="width:180px;">
                        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                        <div class="el-upload__text">
                            拖动文件至此 或 <em>点击上传</em>
                        </div>
                        <template #tip>
                            <div class="el-upload__tip">
                                jpg/png 文件不超过20MB
                            </div>
                        </template>
                    </el-upload>
                </el-form-item>
                <el-form-item label="功效">
                    <el-input placeholder="请输入功效" :row="8" type="textarea" v-model="data.dataForm.symptom"></el-input>
                </el-form-item>

            </el-form>
        </template>
        <template #footer>
            <el-button @click="onSubmitBtnClicked" style="width:100px;height:40px;" type="primary">
                提交
            </el-button>
        </template>
    </el-drawer>
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