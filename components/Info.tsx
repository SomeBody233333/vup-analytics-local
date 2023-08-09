import Vup from "@/types/Vup";
import ConfidenceThree from "@spectrum-icons/workflow/ConfidenceThree";
import DataUser from "@spectrum-icons/workflow/DataUser";
import User from "@spectrum-icons/workflow/User";
import ChevronRight from "@spectrum-icons/workflow/ChevronRight";
import {
  Avatar,
  Content,
  Flex,
  Heading,
  IllustratedMessage,
  View,
  Image,
  Text,
  Divider,
  Badge,
  Well,
  ActionGroup,
  Item,
  ActionButton,
} from "@adobe/react-spectrum";
import NotFound from "@spectrum-icons/illustrations/NoSearchResults";

export default function Info({
  vups,
  onFansImage,
}: {
  vups: Vup[];
  onFansImage: (vup: Vup) => void;
}) {
  if (vups.length === 0) return <Empty />;
  if (vups.length === 1)
    return <MonoInfo vup={vups[0]} onFansImage={onFansImage} />;
  return <MultiInfo vups={vups} />;
}

function Empty() {
  return (
    <IllustratedMessage>
      <NotFound />
      <Heading>No VUp chosen</Heading>
      <Content>
        Try choose one vup to view its details, or choose more to compare.
      </Content>
    </IllustratedMessage>
  );
}

function MonoInfo({
  vup,
  onFansImage,
}: {
  vup: Vup;
  onFansImage: (vup: Vup) => void;
}) {
  return (
    <View height={"100%"}>
      <Flex
        direction={"column"}
        alignItems={"center"}
        gap={"size-150"}
        height={"100%"}
      >
        <Avatar src={vup.avatar} size={75} marginTop={"size-250"} />
        <Heading level={2} margin={0}>
          {vup.name}
        </Heading>
        <Flex direction={"row"} gap={"size-75"}>
          <Text>
            <DataUser size="XS" />
            <Text> {vup.uid}</Text>
          </Text>
          <Divider orientation="vertical" size="S" />
          <Text>
            <User size="XS" />
            <Text> {vup.fansCount}</Text>
          </Text>
        </Flex>
        <Flex direction={"column"} gap={"size-75"} alignItems={"center"}>
          <Badge variant={"info"}>
            <ConfidenceThree />
            <Text>Level {6}</Text>
          </Badge>
        </Flex>
        <Well>
          <Text>{vup.description}</Text>
        </Well>

        <Flex
          marginTop={"auto"}
          marginBottom={"size-125"}
          direction={"column"}
          gap={"size-100"}
        >
          <ActionButton onPress={() => onFansImage(vup)}>
            <Text>粉丝画像</Text>
            <ChevronRight />
          </ActionButton>
          <ActionButton>
            <Text>View 1.2</Text>
            <ChevronRight />
          </ActionButton>
        </Flex>
      </Flex>
    </View>
  );
}

function MultiInfo({ vups }: { vups: Vup[] }) {
  return (
    <View height={"100%"}>
      <Flex
        direction={"column"}
        alignItems={"center"}
        gap={"size-150"}
        height={"100%"}
      >
        <Flex direction={"row"} gap={"size-100"} wrap={"wrap"}>
          {vups.map((vup) => (
            <Avatar
              src={vup.avatar}
              size={"avatar-size-700"}
              marginTop={"size-250"}
            />
          ))}
        </Flex>
        <Heading level={2} margin={0}>
          {vups.map((vup) => vup.name + " ")}
        </Heading>

        <Flex
          marginTop={"auto"}
          marginBottom={"size-125"}
          direction={"column"}
          gap={"size-100"}
        >
          <ActionButton>
            <Text>View 1</Text>
            <ChevronRight />
          </ActionButton>
          <ActionButton>
            <Text>View 1.2</Text>
            <ChevronRight />
          </ActionButton>
        </Flex>
      </Flex>
    </View>
  );
}