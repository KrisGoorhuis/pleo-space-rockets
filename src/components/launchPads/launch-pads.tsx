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


  // This is essentially the same as what already existed in this component, but for some reason Netlify likes this much better.
  // Mapped items simply didn't appear before as they did locally.
  const LaunchPadMapper = (props: { data: LaunchPad[] | undefined }) => {
    return (
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {props.data &&
          (props.data.flat()).map((item, i) => {
            return (
              <LaunchPadItem launchPad={item} key={item.site_id + i} />
            )
          })
        }
      </SimpleGrid>
    )
  }

  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Launch Pads" }]}
      />
      <LaunchPadMapper data={data} />
      <LoadMoreButton
        loadMore={() => size && setSize && setSize(size + 1)}
        data={data}
        pageSize={LAUNCH_PADS_PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
}

