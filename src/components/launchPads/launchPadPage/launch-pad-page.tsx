import React from "react";
import { useParams } from "react-router-dom";
import { MapPin, Navigation } from "react-feather";
import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Box,
  Text,
  Spinner,
  Stack,
  AspectRatio,
} from "@chakra-ui/react";

import { useSpaceX } from "../../../utils/use-space-x";
import Error from "../../error";
import Breadcrumbs from "../../breadcrumbs";
import { Launch, LaunchPad as LaunchPadType, LaunchPadProps } from '../../../model/index'
import { LaunchItem } from "../../launches/launchItem";
import LaunchPadHeader from "./launch-pad-header";


export default function LaunchPad() {
  let { launchPadId } = useParams();
  const { data: launchPad, error } = useSpaceX<LaunchPadType>(`/launchpads/${launchPadId}`);

  const { data: launches } = useSpaceX<Launch[]>(launchPad ? "/launches/past" : null, {
    limit: 3,
    order: "desc",
    sort: "launch_date_utc",
    site_id: launchPad?.site_id,
  });

  if (error) return <Error />;
  if (!launchPad) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="50vh">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Launch Pads", to: ".." },
          { label: launchPad.location.name },
        ]}
      />
      <LaunchPadHeader launchPad={launchPad} />
      <Box m={[3, 6]}>
        <LocationAndVehicles launchPad={launchPad} />
        <Text color="gray.700" fontSize={["md", null, "lg"]} my="8">
          {launchPad.details}
        </Text>
        <AspectRatio ratio={16 / 5}>
          <Box
            as="iframe"
            src={`https://maps.google.com/maps?q=${launchPad.location.latitude}, ${launchPad.location.longitude}&z=15&output=embed`}
          />
        </AspectRatio>
        <RecentLaunches launches={launches || []} />
      </Box>
    </>
  );
}


function LocationAndVehicles(props: LaunchPadProps) {
  return (
    <SimpleGrid columns={[1, 1, 2]} borderWidth="1px" p="4" borderRadius="md">
      <Stat>
        <StatLabel display="flex">
          <Box as={MapPin} width="1em" />{" "}
          <Box ml="2" as="span">
            Location
          </Box>
        </StatLabel>
        <StatNumber fontSize="xl">{props.launchPad.location.name}</StatNumber>
        <StatHelpText>{props.launchPad.location.region}</StatHelpText>
      </Stat>
      <Stat>
        <StatLabel display="flex">
          <Box as={Navigation} width="1em" />{" "}
          <Box ml="2" as="span">
            Vehicles
          </Box>
        </StatLabel>
        <StatNumber fontSize="xl">
          {props.launchPad.vehicles_launched.join(", ")}
        </StatNumber>
      </Stat>
    </SimpleGrid>
  );
}


function RecentLaunches(props: { launches: Launch[] }) {
  if (!props.launches?.length) {
    return null;
  }
  return (
    <Stack my="8" spacing="3">
      <Text fontSize="xl" fontWeight="bold">
        Last launches
      </Text>
      <SimpleGrid minChildWidth="350px" spacing="4">
        {props.launches.map((launch) => (
          <LaunchItem launch={launch} key={launch.flight_number} />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
