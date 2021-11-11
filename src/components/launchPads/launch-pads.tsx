import React from "react";
import { SimpleGrid } from "@chakra-ui/react";

import Error from "../error";
import Breadcrumbs from "../breadcrumbs";
import LoadMoreButton from "../load-more-button";
import { useSpaceXPaginated } from "../../utils/use-space-x";
import LaunchPadItem from "./launchPadItem";
import { LaunchPad } from "../../model";


const LAUNCH_PADS_PAGE_SIZE = 12;

export default function LaunchPads() {
  const { data, error, isValidating, size, setSize } = useSpaceXPaginated<LaunchPad>(
    "/launchpads",
    {
      limit: LAUNCH_PADS_PAGE_SIZE,
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
            .map((launchPad, i) => ( // Key change used for testing purposes
              <LaunchPadItem key={launchPad.site_id + i} launchPad={launchPad} />
            ))}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => size && setSize && setSize(size + 1)}
        data={data}
        pageSize={LAUNCH_PADS_PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
}

