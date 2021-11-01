import React from "react";
import { Badge, Box, Image, SimpleGrid, Text, Flex } from "@chakra-ui/react";
import { format as timeAgo } from "timeago.js";
import { Link } from "react-router-dom";

import { useSpaceXPaginated } from "../../utils/use-space-x";
import { formatDate } from "../../utils/format-date";
import Error from "../miscellaneous/error";
import Breadcrumbs from "../miscellaneous/breadcrumbs";
import LoadMoreButton from "../miscellaneous/load-more-button";
import { Launch } from "../../model";

const PAGE_SIZE = 12;

export default function Launches() {
  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    "/launches/past",
    {
      limit: PAGE_SIZE,
      order: "desc",
      sort: "launch_date_utc",
    }
  );
  console.log(data, error);
  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Launches" }]}
      />
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launch) => (
              <LaunchItem launch={launch} key={launch.flight_number} />
            ))}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => size && setSize && setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
}

export function LaunchItem(props: {launch: Launch}) {
  return (
    <Box
      as={Link}
      to={`/launches/${props.launch.flight_number.toString()}`}
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
    >
      <Image
        src={
          props.launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
          props.launch.links.mission_patch_small
        }
        alt={`${props.launch.mission_name} launch`}
        height={["200px", null, "300px"]}
        width="100%"
        objectFit="cover"
        objectPosition="bottom"
      />

      <Image
        position="absolute"
        top="5"
        right="5"
        src={props.launch.links.mission_patch_small}
        height="75px"
        objectFit="contain"
        objectPosition="bottom"
      />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          {props.launch.launch_success ? (
            <Badge px="2" variant="solid" colorScheme="green">
              Successful
            </Badge>
          ) : (
            <Badge px="2" variant="solid" colorScheme="red">
              Failed
            </Badge>
          )}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {props.launch.rocket.rocket_name} &bull; {props.launch.launch_site.site_name}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {props.launch.mission_name}
        </Box>
        <Flex>
          <Text fontSize="sm">{formatDate(props.launch.launch_date_utc)} </Text>
          <Text color="gray.500" ml="2" fontSize="sm">
            {timeAgo(props.launch.launch_date_utc)}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
