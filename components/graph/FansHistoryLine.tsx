import Vup from "@/types/Vup";
import ReactECharts from "echarts-for-react";

export default function FansImageWordCloud({
  data,
}: {
  data: { date: string; fans: number }[];
}) {
  const option = {
    tooltip: {
      trigger: "axis",
      position: function (pt: any[]) {
        return [pt[0], "10%"];
      },
    },
    title: {
      text: "粉丝增减",
      subtext: "粉丝随着时间的变化",
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: data.map((data) => data.date),
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "100%"],
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 10
      },
      {
        start: 0,
        end: 10
      }
    ],
    series: [
      {
        name: "粉丝-时间",
        type: "line",
        symbol: "none",
        data: data.map(data => data.fans)
      }
    ]
  };
  return <ReactECharts option={option} />;
}
