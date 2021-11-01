import React from "react";
import { Badge, Box, SimpleGrid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import Error from "./../miscellaneous/error";
import Breadcrumbs from "./../miscellaneous/breadcrumbs";
import LoadMoreButton from "./../miscellaneous/load-more-button";
import { useSpaceXPaginated } from "../../utils/use-space-x";
import { LaunchPad, LaunchPadProps } from "../../model";

const PAGE_SIZE = 12;



export default function LaunchPads() {
  const { data, error, isValidating, size, setSize } = useSpaceXPaginated(
    "/launchpads",
    {
      limit: PAGE_SIZE,
    }
  );

  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Launch Pads" }]}
      />
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launchPad) => (
              <LaunchPadItem key={launchPad.site_id} launchPad={launchPad} />
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

function LaunchPadItem(props: LaunchPadProps) {
  return (
    <Box
      as={Link}
      to={`/launch-pads/${props.launchPad.site_id}`}
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
    >
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          {props.launchPad.status === "active" ? (
            <Badge px="2" variant="solid" colorScheme="green">
              Active
            </Badge>
          ) : (
            <Badge px="2" variant="solid" colorScheme="red">
              Retired
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
            {props.launchPad.attempted_launches} attempted &bull;{" "}
            {props.launchPad.successful_launches} succeeded
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {props.launchPad.location.name} 
          {/* TODO: added launchPad above */}
        </Box>
        <Text color="gray.500" fontSize="sm">
          {props.launchPad.vehicles_launched.join(", ")}
        </Text>
      </Box>
    </Box>
  );
}
