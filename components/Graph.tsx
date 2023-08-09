import Tab from "@/types/Tab";
import {
  Tabs,
  TabList,
  TabPanels,
  Item,
  Text,
  IllustratedMessage,
  Heading,
  Content,
  ListView,
  ActionButton,
  Flex,
  View,
} from "@adobe/react-spectrum";
import NotFound from "@spectrum-icons/illustrations/NotFound";
import Close from "@spectrum-icons/workflow/Close";
import * as React from "react";
import * as _ from "lodash";

export default function Graph({
  tabData,
  setTabData,
  selectedKey,
  setSelectedKey,
}: {
  tabData: Tab[];
  setTabData: React.Dispatch<React.SetStateAction<Tab[]>>;
  selectedKey: React.Key;
  setSelectedKey: React.Dispatch<React.SetStateAction<React.Key>>;
}) {
  const [tabs, setTabs] = [tabData, setTabData];
  const [selectedTab, setSelectedTab] = [selectedKey, setSelectedKey];

  if (tabs.length !== 0)
    return (
      <Tabs selectedKey={selectedTab} onSelectionChange={setSelectedTab}>
        <TabList>
          {tabs.map((tab) => (
            <Item key={tab.id}>
              <Flex direction={"row"} gap={"size-50"} alignItems={"center"}>
                <Text>{tab.name}</Text>
                <ActionButton
                  isQuiet
                  onPress={() => {
                    setTabs(_.filter(tabs, (t) => t.id !== tab.id));
                  }}
                >
                  <Close />
                </ActionButton>
              </Flex>
            </Item>
          ))}
        </TabList>
        <TabPanels>
          {tabs.map((tab) => (
            <Item key={tab.id}>
              <View paddingX={"size-150"} paddingY={"size-200"}>
                {tab.panel}
              </View>
            </Item>
          ))}
        </TabPanels>
      </Tabs>
    );
  return (
    <IllustratedMessage>
      <NotFound />
      <Heading>No panel displayed.</Heading>
      <Content>Select VUp source and choose a perspective.</Content>
    </IllustratedMessage>
  );
}
