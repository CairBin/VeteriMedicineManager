<script setup>
import { reactive, provide, ref } from 'vue'
import { OrderService, MedicineService } from '../../utils/axios/api'
import { ElMessage } from 'element-plus'


import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';


use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
]);

provide(THEME_KEY);


const data = reactive({
    tableData: [

    ],
    formData: {
        companyName: '',
        phone: '',
        finishTime: 1,
        medicines: []
    },

    medicineObj: {
        id: 1,
        name: '',
        number: 0
    },
    options: [],
    isShowDrawer: false,
    showDetail: false,
    chartForm: {
        begin: '',
        end: '',
        data: {}
    },
    tempId: ''
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

    MedicineService.getAllMedicine().then((res) => {
        data.options = res.data.medicines
    })
}

const handleCloseTag = (tag) => {
    data.formData.medicines.splice(data.formData.medicines.indexOf(tag), 1)
    ElMessage({
        type: 'info',
        message: `已删除药品${tag.name}，数量${tag.number}`
    })
}

const onSubmitBtnClicked = () => {
    if (data.formData.companyName == '' || data.formData.phone == '' || data.formData.finishTime <= 0 || data.formData.medicines.length == 0) {
        ElMessage({
            type: 'error',
            message: '表单数据错误'
        })
        return;
    }

    var params = new Map()
    params.set('companyName', data.formData.companyName)
    params.set('phone', data.formData.phone)
    params.set('date', data.formData.finishTime)
    console.warn(data.formData.medicines)
    for (var i = 0; i < data.formData.medicines.length; i++) {
        params.set(`${data.formData.medicines[i].id}`, data.formData.medicines[i].number)
    }

    OrderService.addOrder(Object.fromEntries(params.entries())).then((res) => {
        ElMessage({
            type: 'success',
            message: '提交成功'
        })
    }).catch((err) => {
        console.error(err)
        ElMessage({ type: 'error', message: '提交错误，请检查网络' })
    })
}

main()

const onAddKindBtnClicked = () => {
    let number = data.medicineObj.number
    var flag = false
    for (var i = 0; i < data.formData.medicines.length; i++) {
        if (data.formData.medicines[i].id === data.medicineObj.id) {
            data.formData.medicines[i].number += number
            flag = true
            break;
        }
    }

    if (!flag)
        MedicineService.getOneMedicineManager({ id: data.medicineObj.id }).then((res) => {
            data.formData.medicines.push({
                name: res.data.medicine.name,
                id: res.data.medicine.id,
                number: number
            })
            data.medicineObj.id = 1
            data.medicineObj.number = 1
            data.name = ''
            ElMessage({
                type: 'success',
                message: '添加成功'
            })
        }).catch((err) => {
            console.error(err)
            ElMessage({
                type: 'error',
                message: '错误的请求'
            })
        })

}

const onDistributeBtnClicked = (index) => {
    let id = data.tableData[index].id
    OrderService.makeTask({ id: id }).then((res) => {
        ElMessage({
            type: 'success',
            message: '下发成功'
        })
        location.reload()
    }).catch((err) => {
        console.error(err)
        ElMessage({
            type: 'error',
            message: '下发订单错误'
        })
    })
}



const onDetailTxtClicked = (orderId, beginTime, finishTime) => {
    data.tempId = orderId

    OrderService.getDetail({
        orderId, beginTime, finishTime
    }).then((res) => {
        let result = {
            title: {
                text: '药物详情',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)',

            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: [],
            },
            series: [
                {
                    name: 'Traffic Sources',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: 335, name: 'Direct' },
                        { value: 310, name: 'Email' },
                        { value: 234, name: 'Ad Networks' },
                        { value: 135, name: 'Video Ads' },
                        { value: 1548, name: 'Search Engines' },
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    }
                }
            ]
        }

        console.log(res.data.data)
        let lst = res.data.data
        let nameLst = []
        let series = []
        let obj = {
            name: "完成总量",
            type: 'pie',
            radius: '55%',
            center: ["50%", "60%"],
            data: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
            isShow: true
        }

        result.isShow = lst.length != 0
        for (var i = 0; i < lst.length; i++) {
            nameLst.push(lst[i].workshopNumber)
            obj.data.push({
                value: lst[i].count,
                name: lst[i].workshopNumber
            })
        }
        series.push(obj)
        result.series = series
        result.legend.data = nameLst
        data.chartForm.data = result
        data.showDetail = true


    }).catch((err) => {
        console.error(err)
        ElMessage({
            type: 'error',
            message: '请求错误'
        })
    })
}

const flushPie = () => {
    onDetailTxtClicked(data.tempId,data.chartForm.begin,data.chartForm.end)
}

</script>

<template>
    <div class="card-container full-size" style="width:1000px;height:800px;" v-if="data.showDetail">
        <el-card class="tb-card">
            <template #header>
                <div class="card-header">
                    <span>详情信息</span>

                    <el-button class="button" @click="data.showDetail = false" type="danger">关闭</el-button>
                </div>
            </template>
            <v-chart style="width:100%;height:400px;margin-top:10px;" :option="data.chartForm.data">
            </v-chart>
            <el-row justify="center">
                <el-date-picker v-model="data.chartForm.begin" type="datetime" placeholder="开始时间"
                    @change="flushPie" format="YYYY/MM/DD hh:mm:ss"
                    value-format="YYYY-MM-DD hh:mm:ss" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <el-date-picker v-model="data.chartForm.end" type="datetime" placeholder="结束时间" format="YYYY/MM/DD hh:mm:ss"
                    value-format="YYYY-MM-DD hh:mm:ss" @change="flushPie"/>
            </el-row>
        </el-card>
    </div>

    <el-drawer v-model="data.isShowDrawer" title="新增订单" :with-header="true">
        <el-form labelPosition="top">
            <el-form-item label="公司名称">
                <el-input v-model="data.formData.companyName" placeholder="公司名" />
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input v-model="data.formData.phone" placeholder="电话" />
            </el-form-item>
            <el-form-item label="完成期限">
                <el-input-number style="width:100%;" v-model="data.formData.finishTime" :min="1" />
            </el-form-item>
            <el-form-item label="药品种类">
                <el-select v-model="data.medicineObj.id" placeholder="选择药品种类" style="width:100%;">
                    <el-option v-for="item in data.options" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="数量">
                <el-input-number style="width:100%;" v-model="data.medicineObj.number" :min="1" />
            </el-form-item>
            <el-form-item>
                <el-button type="warning" @click="onAddKindBtnClicked" style="width:200px;">添加</el-button>
            </el-form-item>
            <el-form-item label="已选药品">
                <el-tag v-for="tag in data.formData.medicines" :key="tag.id" type="success" closable
                    @close="handleCloseTag(tag)">
                    {{ tag.name }}&nbsp;:&nbsp;{{ tag.number }}
                </el-tag>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" @click="onSubmitBtnClicked" style="height:40px;width:100px;">提交</el-button>
        </template>
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
            <template #default="scope">
                <el-button link type="primary" size="small" @click="onDetailTxtClicked(scope.row.id, null, null)">
                    查看详情
                </el-button>
                <el-button @click="onDistributeBtnClicked(scope.$index)" link type="primary" size="small"
                    :disabled="data.tableData[scope.$index].distribute == '已下发'">
                    下发车间
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

.card-container {
    background-color: rgba(0, 0, 0, 0);
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