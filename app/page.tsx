"use client";

import Info from "@/components/Info";
import Source from "@/components/Source";
import Vup from "@/types/Vup";
import { Divider, Grid, View } from "@adobe/react-spectrum";
import React from "react";
import * as _ from "lodash";
import Graph from "@/components/Graph";
import Tab from "@/types/Tab";
import FansImageWordCloud from "@/components/graph/FansImageWordCloud";

export default function Home() {
  const [selectedVupKeys, setSelectedVupKeys] = React.useState<Set<string>>(
    new Set()
  );
  const [tabs, setTabs] = React.useState<Tab[]>([]);
  const [tabNumber, setTabNumber] = React.useState<number>(0);
  const [selectedTabKey, setSelectedTabKey] = React.useState<React.Key>("0");
  const vups: Vup[] = [
    {
      name: "蒂法",
      uid: "luvvvvvvvv",
      fansCount: 114514,
      avatar:
        "https://cdn.vox-cdn.com/thumbor/-15WN9boKqn6xwhGzy7Wd8qS3Ps=/0x0:866x861/1820x1213/filters:focal(428x184:566x322):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/69733631/E8n7yHJWYAAN0Ne.0.png",
      level: 6,
      description: "大家好啊，今天想看什么姿势呢？",
      fanTag: [{ tag: "hard", frequency: 12 }],
    },
    {
      name: "家庭",
      uid: "home",
      fansCount: 1029,
      avatar: "http://www.adobe.com/",
      level: 0,
      description: "Home...",
      fanTag: [],
    },
  ];

  return (
    <Grid
      columnGap={"size-125"}
      areas={["sidebar info divider graph"]}
      columns={["size-3000", "size-3400", "size-100", "auto"]}
      position={"fixed"}
      top={0}
      bottom={0}
      left={0}
      right={0}
    >
      <View overflow="auto" gridArea={"sidebar"}>
        <Source
          vups={vups}
          selectedVupKeys={selectedVupKeys}
          setSelectedVupKeys={setSelectedVupKeys}
        />
      </View>
      <View gridArea={"info"} paddingY={"size-150"}>
        <Info
          vups={_.filter(vups, (v) =>
            _.includes(Array.from(selectedVupKeys), v.uid)
          )}
          onFansImage={(vup) => {
            setTabs([
              ...tabs,
              {
                id: `${tabNumber}`,
                name: `${vup.name} | fans image`,
                panel: <FansImageWordCloud data={vup.fanTag} />,
              },
            ]);
            setSelectedTabKey(`${tabNumber}`);
            setTabNumber(tabNumber + 1);
          }}
        />
      </View>
      <View gridArea={"divider"} paddingY={"size-150"}>
        <Divider orientation="vertical" size="S" height={"100%"} />
      </View>
      <View paddingEnd={"size-200"} gridArea={"graph"} paddingY={"size-150"}>
        <Graph
          tabData={tabs}
          setTabData={setTabs}
          selectedKey={selectedTabKey}
          setSelectedKey={setSelectedTabKey}
        />
      </View>
    </Grid>
  );
}
