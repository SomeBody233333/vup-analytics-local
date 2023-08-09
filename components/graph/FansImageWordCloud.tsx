import ReactECharts from "echarts-for-react";
import "echarts-wordcloud";

export default function FansImageWordCloud({
  data,
}: {
  data: { tag: string; frequency: number }[];
}) {
  const option = {
    title: {
      text: "粉丝画像",
      subtext: "虚拟主播粉丝的相关标签",
    },
    tooltip: {},
    series: [
      {
        type: "wordCloud",
        gridSize: 20,
        sizeRange: [12, 50],
        rotationRange: [0, 0],
        shape: "circle",
        data: data.map((d) => ({ name: d.tag, value: d.frequency })),
      },
    ],
  };

  return <ReactECharts option={option} />;
}
