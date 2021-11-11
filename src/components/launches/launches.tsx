import React from "react";
// import { SimpleGrid } from "@chakra-ui/react";

import { useSpaceXPaginated } from "../../utils/use-space-x";
import Error from "../error";
import Breadcrumbs from "../breadcrumbs";
import LoadMoreButton from "../load-more-button";
import { LaunchItem } from "./launchItem";
import { Launch } from "../../model";


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

  console.log("data")
  console.log(data)

  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Launches" }]}
      />
      {/* <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4"> */}
      <div>
        <div>TEXT</div>
        {
          [1, 2, 3, 4, 5].map((launch, i) => {
            console.log("This was actually found")
            return ( // Key change used for testing purposes
              <div>
                Text
                {console.log("testestest")}
              </div>
            )
          })
        }

      </div>
      <div >
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launch, i) => ( // Key change used for testing purposes
              <LaunchItem launch={launch} key={launch.flight_number + i} />
            ))}
      </div>
      <LoadMoreButton
        loadMore={() => size && setSize && setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
}


