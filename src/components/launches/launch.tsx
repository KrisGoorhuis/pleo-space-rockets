import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { format as timeAgo } from "timeago.js";
import { Watch, MapPin, Navigation, Layers } from "react-feather";
import {
  Flex,
  Heading,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Box,
  Text,
  Spinner,
  Image,
  Link,
  Stack,
  AspectRatio,
  StatGroup,
} from "@chakra-ui/react";

import { useSpaceX } from "../../utils/use-space-x";
import { formatDateTime } from "../../utils/format-date";
import Error from "./../miscellaneous/error";
import Breadcrumbs from "./../miscellaneous/breadcrumbs";
import { LaunchProps, Launch as LaunchType } from "../../model";


export default function Launch() {
  let { launchId } = useParams<string>();
  const { data: launch, error } = useSpaceX<LaunchType>(`/launches/${launchId}`);

  if (error) return <Error />;
  if (!launch) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="50vh">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Launches", to: ".." },
          { label: `#${launch.flight_number}` },
        ]}
      />
      <Header launch={launch} />
      <Box m={[3, 6]}>
        <TimeAndLocation launch={launch} />
        <RocketInfo launch={launch} />
        <Text color="gray.700" fontSize={["md", null, "lg"]} my="8">
          {launch.details}
        </Text>
        <Video launch={launch} />
        <Gallery images={launch.links.flickr_images} />
      </Box>
    </div>
  );
}

function Header(props: LaunchProps) {
  return (
    <Flex
      bgImage={`url(${props.launch.links.flickr_images[0]})`}
      bgPos="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      minHeight="30vh"
      position="relative"
      p={[2, 6]}
      alignItems="flex-end"
      justifyContent="space-between"
    >
      <Image
        position="absolute"
        top="5"
        right="5"
        src={props.launch.links.mission_patch_small}
        height={["85px", "150px"]}
        objectFit="contain"
        objectPosition="bottom"
      />
      <Heading
        color="white"
        display="inline"
        backgroundColor="#718096b8"
        fontSize={["lg", "5xl"]}
        px="4"
        py="2"
        borderRadius="lg"
      >
        {props.launch.mission_name}
      </Heading>
      <Stack isInline spacing="3">
        <Badge colorScheme="purple" fontSize={["xs", "md"]}>
          #{props.launch.flight_number}
        </Badge>
        {props.launch.launch_success ? (
          <Badge colorScheme="green" fontSize={["xs", "md"]}>
            Successful
          </Badge>
        ) : (
          <Badge colorScheme="red" fontSize={["xs", "md"]}>
            Failed
          </Badge>
        )}
      </Stack>
    </Flex>
  );
}

function TimeAndLocation(props: LaunchProps) {
  return (
    <SimpleGrid columns={[1, 1, 2]} borderWidth="1px" p="4" borderRadius="md">
      <Stat>
        <StatLabel display="flex">
          <Box as={Watch} width="1em" />{" "}
          <Box ml="2" as="span">
            Launch Date
          </Box>
        </StatLabel>
        <StatNumber fontSize={["md", "xl"]}>
          {formatDateTime(props.launch.launch_date_local)}
        </StatNumber>
        <StatHelpText>{timeAgo(props.launch.launch_date_utc)}</StatHelpText>
      </Stat>
      <Stat>
        <StatLabel display="flex">
          <Box as={MapPin} width="1em" />{" "}
          <Box ml="2" as="span">
            Launch Site
          </Box>
        </StatLabel>
        <StatNumber fontSize={["md", "xl"]}>
          <Link
            as={RouterLink}
            to={`/launch-pads/${props.launch.launch_site.site_id}`}
          >
            {props.launch.launch_site.site_name_long}
          </Link>
        </StatNumber>
        <StatHelpText>{props.launch.launch_site.site_name}</StatHelpText>
      </Stat>
    </SimpleGrid>
  );
}

function RocketInfo(props: LaunchProps) {
  const cores = props.launch.rocket.first_stage.cores;

  return (
    <SimpleGrid
      columns={[1, 1, 2]}
      borderWidth="1px"
      mt="4"
      p="4"
      borderRadius="md"
    >
      <Stat>
        <StatLabel display="flex">
          <Box as={Navigation} width="1em" />{" "}
          <Box ml="2" as="span">
            Rocket
          </Box>
        </StatLabel>
        <StatNumber fontSize={["md", "xl"]}>
          {props.launch.rocket.rocket_name}
        </StatNumber>
        <StatHelpText>{props.launch.rocket.rocket_type}</StatHelpText>
      </Stat>
      <StatGroup>
        <Stat>
          <StatLabel display="flex">
            <Box as={Layers} width="1em" />{" "}
            <Box ml="2" as="span">
              First Stage
            </Box>
          </StatLabel>
          <StatNumber fontSize={["md", "xl"]}>
            {cores.map((core) => core.core_serial).join(", ")}
          </StatNumber>
          <StatHelpText>
            {cores.every((core) => core.land_success)
              ? cores.length === 1
                ? "Recovered"
                : "All recovered"
              : "Lost"}
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel display="flex">
            <Box as={Layers} width="1em" />{" "}
            <Box ml="2" as="span">
              Second Stage
            </Box>
          </StatLabel>
          <StatNumber fontSize={["md", "xl"]}>
            Block {props.launch.rocket.second_stage.block}
          </StatNumber>
          <StatHelpText>
            Payload:{" "}
            {props.launch.rocket.second_stage.payloads
              .map((payload) => payload.payload_type)
              .join(", ")}
          </StatHelpText>
        </Stat>
      </StatGroup>
    </SimpleGrid>
  );
}

function Video(props: LaunchProps) {
  return (
    <AspectRatio maxH="400px" ratio={1.7}>
      <Box
        as="iframe"
        title={props.launch.mission_name}
        src={`https://www.youtube.com/embed/${props.launch.links.youtube_id}`}
        allowFullScreen
      />
    </AspectRatio>
  );
}

function Gallery(props: {images: LaunchType['links']['flickr_images']}) {
  return (
    <SimpleGrid my="6" minChildWidth="350px" spacing="4">
      {props.images.map((image) => (
        <a href={image} key={image}>
          <Image src={image.replace("_o.jpg", "_z.jpg")} />
        </a>
      ))}
    </SimpleGrid>
  );
}
