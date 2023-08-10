import Vup from "@/types/Vup";
import * as React from "react";
import {
  asSets,
  extractCombinations,
  generateCombinations,
  UpSetJS,
  VennDiagram,
} from "@upsetjs/react";
import { Flex } from "@adobe/react-spectrum";

export default function FansCoverageUpset({ vups }: { vups: Vup[] }) {
  const rawSets = React.useMemo(
    () =>
      vups.map((vup) => ({
        name: vup.name,
        elems: vup.fans,
      })),
    []
  );
  const sets = React.useMemo(() => asSets(rawSets), [rawSets]);
  const combinations = React.useMemo(
    () => generateCombinations(sets),
    [rawSets]
  );
  const [selection, setSelection] = React.useState();
  return (
    <Flex direction={"column"} gap={"size-100"}>
      <UpSetJS
        sets={sets}
        combinations={combinations}
        width={700}
        height={360}
        selection={selection}
        onHover={setSelection}
        title={"DD 重合度"}
      />
      <VennDiagram
        sets={sets}
        width={500}
        height={180}
        selection={selection}
        onHover={setSelection}
      />
    </Flex>
  );
}
