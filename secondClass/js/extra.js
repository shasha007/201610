/**
 * Created by huqiwen on 16/8/11. 第二课堂
 */

var getDetailUrl = "common/json/detail.json";

$(function () {
    //初始化下面折线图
    InitLine("H_ECharts_Line", Line.xname, Line.xvalue, Line.xcolor, Line.yvalue);
    //初始化旁边饼状图
    InitLeftPie("H_ECharts", SetColor(LeftPie.xvalue));
});
