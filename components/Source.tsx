import Vup from "@/types/Vup";

import {
  Item,
  ListView,
  SearchField,
  Flex,
  Text,
  Image,
  ActionButton,
  View,
} from "@adobe/react-spectrum";

import ViewDetail from "@spectrum-icons/workflow/ViewDetail";

import Fuse from "fuse.js";

import * as React from "react";

export default function Source({
  vups,
  selectedVupKeys,
  setSelectedVupKeys,
}: {
  vups: Vup[];
  selectedVupKeys: Set<string>;
  setSelectedVupKeys: React.Dispatch<React.SetStateAction<Set<string>>>;
}) {
  function searchVup(vups: Vup[], searchText: string): Vup[] {
    const fuse = new Fuse(vups, {
      keys: ["name", "uid"],
    });
    return fuse.search(searchText).map((result) => result.item);
  }

  const [searchText, setSearchText] = React.useState<string>();
  const [selectedKeys, setSelectedKeys] = [selectedVupKeys, setSelectedVupKeys];

  return (
    <Flex direction={"column"} gap={"size-150"}>
      <View paddingX={"size-100"} paddingTop={"size-150"}>
        <SearchField
          value={searchText}
          onChange={setSearchText}
          width={"100%"}
        />
      </View>
      <View paddingX={"size-100"} paddingBottom={"size-150"}>
        <ListView
          selectionMode="multiple"
          aria-label="vup sources"
          items={searchText ? searchVup(vups, searchText) : vups}
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          {(vup) => (
            <Item key={vup.uid}>
              <Image src={vup.avatar} />
              <ActionButton
                onPress={() =>
                  setSelectedKeys(() => {
                    const s = new Set();
                    s.add(vup.uid);
                    return s;
                  })
                }
              >
                <ViewDetail />
              </ActionButton>
              <Text>{vup.name}</Text>
              <Text slot="description">fans: {vup.fansCount}</Text>
            </Item>
          )}
        </ListView>
      </View>
    </Flex>
  );
}
