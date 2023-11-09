<script setup>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide } from 'vue';

use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
]);

provide(THEME_KEY);

const option = ref({
    title: {
        text: 'Traffic Sources',
        left: 'center',
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
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
            },
        },
    ],
});
</script>

<template>
    <el-container class="full-size">
        <el-row style="width:100%;height:50%">
            <el-col class="full-height">
                <el-card class="full-height">
                    <v-chart class="chart" :option="option" autoresize />
                </el-card>
            </el-col>
            <el-col class="full-height">
                <el-card class="full-height">Test</el-card>
            </el-col>
        </el-row>
        <el-row style="width:100%;height:50%">
            <el-col class="full-height">
                <el-card class="full-height">Test</el-card>
            </el-col>
            <el-col class="full-height">
                <el-card class="full-height">Test</el-card>
            </el-col>
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
    height: 400px;
    width: 800px;
}
</style>