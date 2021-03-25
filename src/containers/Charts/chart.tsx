import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react/lib/core';
//按需加载echarts
// import * as echarts from 'echarts/core';
import * as echarts from 'echarts/core';
// Import charts, all with Chart suffix
import {
    LineChart,
    BarChart,
} from 'echarts/charts';
// import components, all suffixed with Component
import {
    GridComponent,
    TooltipComponent,
    TitleComponent,
} from 'echarts/components';
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
    CanvasRenderer,
} from 'echarts/renderers';

// Register the required components
echarts.use(
    [TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer, LineChart]
);

import dayjs from 'dayjs';
import cloneDeep from 'lodash/clonedeep';
import { ITodo } from '../../constants';

type chartsProps = {
    todos: ITodo[];
}


const ChartComponent: React.FC<chartsProps> = (props) => {
    const { todos } = props;
    const defaultOption = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['完成率', '未完成', '已完成']
        },
        toolbox: {
            feature: {
                // saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                data: (function () {
                    let now = dayjs().get('date')
                    let res = [now];
                    let len = 1;
                    while (len < 7) {
                        const tmp = dayjs().subtract(len, 'day');
                        res.unshift(tmp.date())
                        len++;
                    }
                    return res;
                })()
            },
        ],
        yAxis: [
            {
                type: 'value',
                name: '完成率',
                scale: true,
                max: 1,
                min: 0,
                boundaryGap: [0.2, 0.2]

            },
            {
                type: 'value',
                name: '数量',
                min: 0,
                scale: true,
                boundaryGap: [0.2, 0.2]
            }
        ],

        series: [
            {
                name: '完成率',
                type: 'line',
                stack: '分析',
                lineStyle: {
                    color: '#0279fa'
                },
                xAxisIndex: 0,
                yAxisIndex: 0,
                areaStyle: {
                    color: 'transparent'
                    // {
                    //     type: 'linear',
                    //     x: 0,
                    //     y: 0,
                    //     x2: 0,
                    //     y2: 1,
                    //     colorStops: [{
                    //         offset: 0, color: '#fd7a00' // 0% 处的颜色
                    //     }, {
                    //         offset: 1, color: '#fff' // 100% 处的颜色
                    //     }],
                    //     global: false // 缺省为 false
                    // }
                },
                data: [0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: '已完成',
                type: 'bar',
                stack: '分析',
                xAxisIndex: 0,
                yAxisIndex: 1,
                itemStyle: {},
                animationEasing: 'elasticOut',
                data: [0, 0, 0, 0, 0, 0, 0]
            },

            {
                name: '未完成',
                type: 'bar',
                stack: '分析',
                xAxisIndex: 0,
                yAxisIndex: 1,
                itemStyle: {},
                animationEasing: 'elasticOut',
                data: [0, 0, 0, 0, 0, 0, 0]
            },

        ]
    };

    const [option, setOption] = useState(defaultOption)
    const freshData = () => {
        const newOptions = cloneDeep(option);
        const d1 = [];
        const d2 = [];
        const d3 = [];
        let len = 6;
        while (len >= 0) {
            const tmp = dayjs().subtract(len, 'day');
            const part = todos.filter((t: ITodo) => tmp.isSame(t.scheduleTime, 'date'))
            const f = part.filter((t: ITodo) => t.completed).length;
            const uf = part.length - f;
            d1.push(Number((f / part.length).toFixed(1)));
            d2.push(Number(f));
            d3.push(Number(uf));
            len--;
        }
        newOptions.series[0].data = d1;
        newOptions.series[1].data = d2;
        newOptions.series[2].data = d3;
        setOption(newOptions);
    }

    useEffect(() => {
        freshData();
    }, [])


    return <ReactECharts
        option={ option }
        style={ { height: 300 } }
        echarts={ echarts }
        notMerge={ true }
        lazyUpdate={ true }
    />;
}

export default ChartComponent;