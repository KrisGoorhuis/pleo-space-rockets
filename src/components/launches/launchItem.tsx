import { Badge, Flex, Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { format as timeAgo } from "timeago.js";

import { formatDateSimple } from "../../utils/format-date";
import { Launch } from "../../model";
import FavoriteLaunchButton from "./favoriteLaunchButton";


interface LaunchItemProps {
   launch: Launch
   isDrawerFavorite?: boolean
}

export function LaunchItem(props: LaunchItemProps) {

   return (
      <Box
         data-testid={"launchItem"}
         as={Link}
         to={`/launches/${props.launch.flight_number.toString()}`}
         boxShadow="md"
         borderWidth={props.isDrawerFavorite ? 0 : "1px"}
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
            height={props.isDrawerFavorite ? [100] : ["200px", null, "300px"]}
            width="100%"
            objectFit={"cover"}
            objectPosition={props.isDrawerFavorite ? "center" : "bottom"}
         />

         {
            !props.isDrawerFavorite &&
            <Image
               position="absolute"
               top="5"
               right="5"
               src={props.launch.links.mission_patch_small}
               height="75px"
               objectFit="contain"
               objectPosition="bottom"
            />
         }

         <Box p="6">
            <Box d="flex" alignItems="baseline">
               <Box d="flex" style={{ width: '100%' }}>
                  {props.launch.launch_success ? (
                     <Badge px="2" variant="solid" colorScheme="green" display="flex" alignItems="center">
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
               <FavoriteLaunchButton {...props} />
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
            <Flex flexDirection={props.isDrawerFavorite ? 'column' : 'row'}>
               <Text fontSize="sm">{formatDateSimple(props.launch.launch_date_utc)} </Text>
               <Text color="gray.500" ml="2" fontSize="sm">
                  {timeAgo(props.launch.launch_date_utc)}
               </Text>
            </Flex>
         </Box>
      </Box>
   );
}

export default LaunchItem