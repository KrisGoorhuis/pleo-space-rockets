import React from "react";
import { Spinner, Flex, Button } from "@chakra-ui/react";


interface LoadMoreButtonProps {
  loadMore: () => void
  data: any[] | undefined
  pageSize: number
  isLoadingMore: boolean
}


export default function LoadMoreButton(props: LoadMoreButtonProps) {
  const isReachingEnd =
    props.data?.[0]?.length === 0 ||
    (props.data && props.data[props.data.length - 1]?.length < props.pageSize);

  return (
    <Flex justifyContent="center" my="100px">
      <Button onClick={props.loadMore} disabled={isReachingEnd || props.isLoadingMore}>
        {props.isLoadingMore ? (
          <Spinner />
        ) : isReachingEnd ? (
          "That's all!"
        ) : (
          "Show more..."
        )}
      </Button>
    </Flex>
  );
}
