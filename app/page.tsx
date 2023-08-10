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
import FansHistoryLine from "@/components/graph/FansHistoryLine";
import FansCoverageUpset from "@/components/graph/FansCoverageUpset";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
import useSWR from "swr";

export default function Home() {
  // const [vups, setVups] = React.useState<Vup[]>([
  //   {
  //     name: "ad",
  //     uid: "213782163",
  //     fansCount: 12783,
  //     avatar: "",
  //     level: 6,
  //     description: "asudtas",
  //     fanTag: [
  //       {
  //         tag: "asyud",
  //         frequency: 12,
  //       },
  //     ],
  //     fansHistory: [
  //       {
  //         fans: 123,
  //         date: "123-123",
  //       },
  //     ],
  //     fans: ["123", "23"],
  //   },
  // ]);

  const [selectedVupKeys, setSelectedVupKeys] = React.useState<Set<string>>(
    new Set()
  );
  const [tabs, setTabs] = React.useState<Tab[]>([]);
  const [tabNumber, setTabNumber] = React.useState<number>(0);
  const [selectedTabKey, setSelectedTabKey] = React.useState<React.Key>("0");

  // React.useEffect(() => {
  //   fetch("api/data")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((str) => {
  //       const data = JSON.parse(str) as Vup[];
  //       setVups(data);
  //     });
  // });

  const { data } = useSWR("/api/data", (url) =>
    fetch(url)
      .then((res) => res.json())
      .then((str) => JSON.parse(str) as Vup[])
  );
  const vups = data ?? [];

  return (
    <Provider theme={defaultTheme}>
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
            onFansHistory={(vup) => {
              setTabs([
                ...tabs,
                {
                  id: `${tabNumber}`,
                  name: `${vup.name} | fans history`,
                  panel: <FansHistoryLine data={vup.fansHistory} />,
                },
              ]);
              setSelectedTabKey(`${tabNumber}`);
              setTabNumber(tabNumber + 1);
            }}
            onCoverage={(vups) => {
              setTabs([
                ...tabs,
                {
                  id: `${tabNumber}`,
                  name: `${vups.map((vup) => `${vup.name} `)} | coverage`,
                  panel: <FansCoverageUpset vups={vups} />,
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
    </Provider>
  );
}
