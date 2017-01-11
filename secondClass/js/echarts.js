/**
 * Created by huqiwen on 16/8/11. 第二课堂
 */
//折线图json
var Line = {
    "Name": "这里是名字",
    "xname": [
        "学分"
    ],
    "xcolor": [
        "#3a9fdf"
    ],
    "xvalue": [
        "2014.01", "2014.02", "2014.03", "2014.04", "2014.05", "2014.06"
    ],
    "yvalue": [
        {"value": ["100", "1200", "400", "500", "600", "170"]}
    ]
};

//左侧饼状图颜色
var LeftPieColor = new Array("#70d0e9","#fdb163","#fcdf56","#fc8d56","#f05050","#cd8af8","#64f0c8","#70bbef","#c4ef50","#ff95b5");

//左侧饼状图 json
var LeftPie = {
    "xname": ['道德修养', '志愿服务', '技能培训', '学术创新', '实习就业', '文体创业', '身心发展', '其他'],
    "xcolor": [
        "#3a9fdf", "#4ee4c8", "#ea5504", "#f69d08", "#ff6d1d"
    ],
    "xvalue": [
        {value: 20, name: '道德修养'},
        {value: 20, name: '志愿服务'},
        {value: 20, name: '技能培训'},
        {value: 20, name: '学术创新'},
        {value: 20, name: '实习就业'},
        {value: 20, name: '文体创业'},
        {value: 20, name: '身心发展'},
        {value: 20, name: '其他'}
    ],

}
//用于处理饼状图颜色
function SetColor(value) {
    var _length = value.length;
    var _color;
    for (var i = 0; i < _length; i++) {
        _color = {"normal": {"color": LeftPieColor[i]}};
        value[i].itemStyle = _color;
    }
    return value;
}

//折线图初始化
function InitLine(id, xname, xvalue, xcolor, yvalue) {
    var Chart = echarts.init(document.getElementById(id));
    Chart.setOption({
        tooltip: { 
            trigger: 'axis'
        },
        toolbox: {
        },
        //位置 直角坐标系内绘图网格
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        //x轴
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: xvalue
            }
        ],
        //y轴
        yAxis: [
            {
                type: 'value'
            }
        ],
        //数据  系列列表。每个系列通过 type 决定自己的图表类型
        series: [
            {
                name: xname[0],
                type: 'line',
                smooth:true,
                areaStyle: {
                    normal: {
                        color: xcolor[0]
                    }
                },
                lineStyle: {
                    normal: {
                        color: xcolor[0]
                    }
                },
                itemStyle: {
                    normal: {
                        color: xcolor[0]
                    }
                },
                data: yvalue[0].value
            }
        ]
    });
}
//初始化左侧饼状图
function InitLeftPie(id, xvalue) {
    var Chart = echarts.init(document.getElementById(id));
    Chart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['45%', '80%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '14',
                            color:"#333"
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: xvalue
            }
        ]
    });
}