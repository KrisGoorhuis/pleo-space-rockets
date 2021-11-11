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


  const MyComponent = () => {
    const array = [1, 2, 3]
    return (
      <div>
        {
          array.map(() => {
            return (
              <div>things</div>
            )
          })
        }
      </div>
    )
  }
  const MyComponent2 = () => {
    return (
      <div >
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launch, i) => ( // Key change used for testing purposes
              <LaunchItem launch={launch} key={launch.flight_number + i} />
            ))}
      </div>
    )
  }
  const MyComponent3 = () => {
    return (
      <div>
        {data && data.map((launch, i) => {
          console.log("This ran")
          return ( // Key change used for testing purposes
            <LaunchItem launch={launch} key={launch.flight_number + i} />
          )
        })
        }
      </div>
    )
  }

  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Launches" }]}
      />
      {/* <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4"> */}
      <div>
        <MyComponent />
      </div>
      component 2
      <div>
        <MyComponent2 />
      </div>
      component3
      <div>
        <MyComponent3 />
      </div>

      {/* <div >
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launch, i) => ( // Key change used for testing purposes
              <LaunchItem launch={launch} key={launch.flight_number + i} />
            ))}
      </div> */}
      <LoadMoreButton
        loadMore={() => size && setSize && setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
}


