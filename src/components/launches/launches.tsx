import React from "react";
import { SimpleGrid } from "@chakra-ui/react";

import { useSpaceXPaginated } from "../../utils/use-space-x";
import Error from "../error";
import Breadcrumbs from "../breadcrumbs";
import LoadMoreButton from "../load-more-button";
import { LaunchItem } from "./launchItem";
import { Launch } from "../../model";
import { ExampleLaunch } from "../../model/example-launch";


const PAGE_SIZE = 12;

export default function Launches() {
  const { data, error, isValidating, setSize, size } = useSpaceXPaginated<Launch>(
    "/launches/past",
    {
      limit: PAGE_SIZE,
      order: "desc",
      sort: "launch_date_utc",
    }
  );



  const LaunchMapper = (props: { data: Launch[] | undefined }) => {
    return (
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {props.data &&
          (props.data.flat()).map((item, i) => {
            return (
              <LaunchItem launch={item} key={item.flight_number + i} />
            )
          })
        }
      </SimpleGrid>
    )
  }


  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Launches" }]}
      />

      <LaunchMapper data={data} />

      <SimpleGrid >
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launch, i) => ( // Key change used for testing purposes
              <LaunchItem launch={launch} key={launch.flight_number + i} />
            ))}
      </SimpleGrid>
      <SimpleGrid >
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launch, i) => {
              return ( // Key change used for testing purposes
                <LaunchItem launch={launch} key={launch.flight_number + i} />
              )
            })
        }
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


