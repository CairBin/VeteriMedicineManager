<script setup>
import { ChartService } from '../../utils/axios/api'
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide, reactive } from 'vue';
import { ElMessage } from 'element-plus'

use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
]);

provide(THEME_KEY);

const data = reactive({
    chartTotal: {},
    chartWeek: {},
    chartMonth: {},
    chartYear: {},
    
})




const main = () => {
    getPie(ChartService.viewAllTask, 'chartTotal','完成总量')
    getBar(ChartService.viewWeekTask, 'chartWeek','周完成总量'),
    getPie(ChartService.viewMonthTask, 'chartMonth','月完成总量')
    getBar(ChartService.viewYearTask, 'chartYear','年完成总量')
    ChartService.viewWeekTask().then((res) => {
        console.log(res.data.data)
        let chartWeek = []
    }).catch((err) => {
        console.error(err)
    })
}

const getBar = (reqFunc, key, title) => {
    if (!reqFunc) {
        ElMessage({
            type: 'error',
            message: '请求函数错误'
        })
        return;
    }
    let option = {
        title: {
            text:title,
            left: 'center'
        },
        xAxis: {
            data: []
        },
        yAxis: {},
        series: {
            type: 'bar',
            data: []
        },
        isShow: true
    }

    reqFunc().then((res) => {
        let lst = res.data.data
        console.warn(lst)
        option.isShow = lst.length != 0
        for (var i = 0; i < lst.length; i++) {
            option.xAxis.data.push(lst[i].workshopNumber)
            option.series.data.push({
                name: lst[i].workshopNumber,
                value: lst[i].count
            })
        }

        data[key] = option
        // console.error(option.series.data)
        // console.info(option.xAxis.data)
    }).catch((err) => {
        console.error(err)
        ElMessage({
            type: 'error',
            message: '请求错误'
        })
    })
}

const getPie = (reqFunc, key, title) => {
    if (!reqFunc) {
        ElMessage({
            type: 'error',
            message: '请求函数错误'
        })
        return
    }

    reqFunc().then((res) => {
        let result = {
            title: {
                text: title,
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
        data[key] = result
    }).catch((err) => {
        console.error(err)
        ElMessage({
            type: 'error',
            message: '错误的请求'
        })
    })
}


main();

</script>

<template>
    <el-container style="width:100%;height:100%;">
        <el-row style="width:100%;height:100%;">
            <v-chart v-if="data.chartTotal.isShow" class="chart" :option="data.chartTotal" autoresize />
        </el-row>
        <el-row style="width:100%;height:100%;">
            <v-chart v-if="data.chartWeek.isShow" class="chart" :option="data.chartWeek" autoresize />
        </el-row>
        <el-row style="width:100%;height:100%;">
            <v-chart v-if="data.chartMonth.isShow" class="chart" :option="data.chartMonth" autoresize />
        </el-row>
        <el-row style="width:100%;height:100%;">
            <v-chart v-if="data.chartYear.isShow" class="chart" :option="data.chartYear" autoresize />
        </el-row>
    </el-container>
</template>

<style>
.full-size {
    width: 100%;
    height: 100%;
}

.full-height {
    height: 100%;
    margin-bottom: 10px;
    margin-right: 10px;
}

.el-card {
    margin-bottom: 10px;
}

.chart {
    height: 100%;
    width: 100%;
}
</style>