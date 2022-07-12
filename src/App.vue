<template>
    <div class="box" :style="{ backgroundImage: `url(${bg})` }">
        <div class="box-left">
            <div class="box-left-card">
                <section>
                    <div>较上日+ {{ store.chinaAdd.localConfirmH5 }}</div>
                    <div>{{ store.chinaTotal.localConfirm }}</div>
                    <div>本土现有确诊</div>
                </section>
                <section>
                    <div>较上日+ {{ store.chinaAdd.nowConfirm }}</div>
                    <div>{{ store.chinaTotal.nowConfirm }}</div>
                    <div>现有确诊</div>
                </section>
                <section>
                    <div>较上日+ {{ store.chinaAdd.confirm }}</div>
                    <div>{{ store.chinaTotal.confirm }}</div>
                    <div>累计确诊</div>
                </section>
                <section>
                    <div>较上日+ {{ store.chinaAdd.noInfect }}</div>
                    <div>{{ store.chinaTotal.noInfect }}</div>
                    <div>无症状感染者</div>
                </section>
                <section>
                    <div>较上日+ {{ store.chinaAdd.importedCase }}</div>
                    <div>{{ store.chinaTotal.importedCase }}</div>
                    <div>境外输入</div>
                </section>
                <section>
                    <div>较上日+ {{ store.chinaAdd.dead }}</div>
                    <div>{{ store.chinaTotal.dead }}</div>
                    <div>累计死亡</div>
                </section>
            </div>
            <div class="box-left-pie"></div>
            <div class="box-left-line"></div>
        </div>
        <div class="box-center">
            <div class="box-center-container" id="china"></div>
        </div>
        <div class="box-right">
            <table class="table" border="1" cellspacing="0">
                <thead>
                    <tr>
                        <th>地区</th>
                        <th>新增确诊</th>
                        <th>累计确诊</th>
                        <th>治愈</th>
                        <th>死亡</th>
                    </tr>
                </thead>
                <transition-group
                    tag="tbody"
                    enter-active-class="animate__animated animate__flipInY"
                >
                    <tr
                        v-for="(item, index) in store.items"
                        :key="item.name + nanoid()"
                    >
                        <td>{{ item.name }}</td>
                        <td>{{ item.today.confirm }}</td>
                        <td>{{ item.total.confirm }}</td>
                        <td>{{ item.total.heal }}</td>
                        <td>{{ item.total.dead }}</td>
                    </tr>
                </transition-group>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as echarts from "echarts";
import { nanoid } from "nanoid";
import "./assets/china";
import bg from "./assets/1.jpeg";
import { useStore } from "./stores";
import { geoCoordMap } from "./assets/geoMap";
import "animate.css";

const store = useStore();

store.getList();

onMounted(async () => {
    await store.getList();

    initCharts();

    initPie();

    initLine();
});

const initCharts = () => {
    const charts = echarts.init(document.querySelector("#china"));
    const city = store.list.diseaseh5Shelf.areaTree[0].children;
    store.items = city[10].children;
    const data = city.map((item) => {
        // console.log(item.name, geoCoordMap[item.name].concat(item.total.nowConfirm))
        return {
            name: item.name,
            value: geoCoordMap[item.name].concat(item.total.nowConfirm),
            children: item.children,
        };
    });
    charts.setOption({
        // backgroundColor: "black",
        geo: {
            map: "china",
            aspectScale: 0.8,
            layoutCenter: ["50%", "50%"],
            layoutSize: "100%",
            itemStyle: {
                // normal: {
                areaColor: {
                    type: "linear-gradient",
                    x: 0,
                    y: 1200,
                    x2: 1000,
                    y2: 0,
                    colorStops: [
                        {
                            offset: 0,
                            color: "#152E6E", // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: "#0673AD", // 50% 处的颜色
                        },
                    ],
                    global: true, // 缺省为 false
                },
                shadowColor: "#0f5d9d",
                shadowOffsetX: 0,
                shadowOffsetY: 15,
                opacity: 0.5,
                // },
            },
            emphasis: {
                areaColor: "#0f5d9d",
            },

            regions: [
                {
                    name: "南海诸岛",
                    itemStyle: {
                        areaColor: "rgba(0, 10, 52, 1)",
                        borderColor: "rgba(0, 10, 52, 1)",
                        // normal: {
                        opacity: 0,
                        label: {
                            show: false,
                            color: "#009cc9",
                        },
                        // },
                    },
                    label: {
                        show: false,
                        color: "#FFFFFF",
                        fontSize: 12,
                    },
                },
            ],
        },
        series: [
            {
                type: "map",
                // sectionedMode: "multiple", //多选
                map: "china",
                aspectScale: 0.8,
                layoutCenter: ["50%", "50%"], //地图位置
                layoutSize: "100%",
                zoom: 1, //当前视角的缩放比例
                // roam: true, //是否开启平游或缩放
                scaleLimit: {
                    //滚轮缩放的极限控制
                    min: 1,
                    max: 2,
                },
                label: {
                    show: true,
                    color: "#FFFFFF",
                    fontSize: 12,
                },
                itemStyle: {
                    // normal: {
                    areaColor: "#0c3653",
                    borderColor: "#1cccff",
                    borderWidth: 1.8,
                    // },
                },
                emphasis: {
                    areaColor: "#56b1da",
                    label: {
                        show: true,
                        color: "#fff",
                    },
                },
                data: data,
            },
            {
                type: "scatter",
                coordinateSystem: "geo",
                //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
                // symbolSize: [30,120],
                // symbolOffset:[0, '-40%'] ,
                symbol: "pin",
                symbolSize: [35, 35],
                label: {
                    show: true,
                    color: "#fff",
                    formatter(value: any) {
                        // console.log(value)
                        return value.data.value[2];
                    },
                },
                itemStyle: {
                    // normal: {
                    color: "#D8BC37", //标志颜色
                    // },
                },
                data: data,
            },
        ],
    });
    charts.on("click", (arg) => {
        store.items = arg.data.children;
    });
};

const initPie = () => {
    const charts = echarts.init(
        document.querySelector(".box-left-pie") as HTMLElement
    );
    const pieData = store.cityDetail.map((v) => {
        return {
            name: v.city,
            value: v.local_confirm_add,
        };
    });
    charts.setOption({
        backgroundColor: "#223651",
        tooltip: {
            show: false,
        },
        series: [
            {
                type: "pie",
                radius: ["40%", "70%"],
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 4,
                    borderColor: "#fff",
                    borderWidth: 2,
                },
                label: {
                    show: true,
                },
                labelLine: {
                    show: true,
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: "15",
                        formatter: (params) => {
                            return (
                                "{a|" +
                                params.name +
                                "}\n{b|" +
                                params.value +
                                "}"
                            );
                        },
                        rich: {
                            a: {},
                            b: {},
                        },
                    },
                },
                data: pieData,
            },
        ],
    });

    // var currentIndex = 0;
    // var timer = 0;
    // function animate() {
    //     timer = setInterval(function () {
    //         var dataLen = option.series[0].data.length;
    //         // 取消之前高亮的图形
    //         myChart.dispatchAction({
    //             type: "downplay",
    //             seriesIndex: 0,
    //             dataIndex: currentIndex,
    //         });
    //         currentIndex = (currentIndex + 1) % dataLen;
    //         // 高亮当前图形
    //         myChart.dispatchAction({
    //             type: "highlight",
    //             seriesIndex: 0,
    //             dataIndex: currentIndex,
    //         });
    //     }, 1500);
    // }
    // animate();

    // myChart.on("mouseover", function (e) {
    //     clearInterval(timer);
    //     // 取消之前高亮的图形
    //     myChart.dispatchAction({
    //         type: "downplay",
    //         seriesIndex: 0,
    //     });
    //     myChart.dispatchAction({
    //         type: "highlight",
    //         dataIndex: e.dataIndex,
    //     });
    // });

    // myChart.on("mouseout", function (e) {
    //     currentIndex = e.dataIndex;
    //     animate();
    // });
};

const initLine = () => {
    const charts = echarts.init(
        document.querySelector(".box-left-line") as HTMLElement
    );
    charts.setOption({
        backgroundColor: "#223651",
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: "category",
            data: store.cityDetail.map(v => v.city),
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        yAxis: {
            type: "value",
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        label: {
            show: true
        },
        series: [
            {
                data: store.cityDetail.map((v) => {
                    // console.log(v)
                    return v.local_wzz_add
                }),
                type: "line",
                smooth: true,
            },
        ],
    });
};
</script>

<style lang="less">
@itemColor: #41b0db;
@itemBg: #223651;
@itemBorder: #212028;
@fontSize14: 14px;
html,
body,
#app {
    height: 100%;
    overflow: hidden;
}
.box {
    display: flex;
    height: 100%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    font-size: @fontSize14;
    &-left {
        width: 350px;
        &-card {
            display: grid;
            grid-template-columns: auto auto auto;
            grid-template-rows: auto auto;
            section {
                background-color: @itemBg;
                border: 1px solid @itemBorder;
                padding: 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
                div {
                    color: #fff;
                    &:nth-child(2) {
                        color: @itemColor;
                        padding: 10px 0;
                        font-size: 20px;
                        font-weight: bold;
                    }
                }
            }
        }
        &-pie {
            height: 350px;
            margin-top: 20px;
        }
        &-line {
            height: 350px;
            margin-top: 20px;
        }
    }
    &-center {
        flex: 1;
        &-container {
            height: 100%;
        }
    }
    &-right {
        width: 350px;
        color: #fff;
    }
}
.table {
    width: 100%;
    background-color: #212028;
    text-align: center;
    tr {
        th {
            padding: 5px;
            white-space: nowrap;
        }
        td {
            padding: 5px 10px;
            width: 100px;
            white-space: nowrap;
        }
    }
}
</style>
