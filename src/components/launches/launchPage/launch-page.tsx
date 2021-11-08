import React from "react";
import { useParams } from "react-router-dom";
import {
  Flex,
  SimpleGrid,
  Box,
  Text,
  Spinner,
  Image,
  AspectRatio,
} from "@chakra-ui/react";

import { useSpaceX } from "../../../utils/use-space-x";
import Error from "../../error";
import Breadcrumbs from "../../breadcrumbs";
import { LaunchProps, Launch as LaunchType } from "../../../model";
import RocketInfo from "./rocket-info";
import LaunchPageHeader from "./launch-page-header";
import TimeAndLocation from "./time-and-location";


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
      <LaunchPageHeader launch={launch} />
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

function Gallery(props: { images: LaunchType['links']['flickr_images'] }) {
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
