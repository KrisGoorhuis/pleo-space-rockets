import { Badge, Flex, Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { format as timeAgo } from "timeago.js";
import { Check, X, Star } from "react-feather";

import { formatDate } from "../../utils/format-date";
import { Launch } from "../../model";
import { useDispatch, useSelector } from "react-redux";
import { addToFavoriteLaunches, removeFromFavoriteLaunches } from "../../redux/slices/favoritesSlice";
import { State } from "../../redux";


interface LaunchItemProps {
   launch: Launch
   isDrawerFavorite?: boolean
}

export function LaunchItem(props: LaunchItemProps) {
   const dispatch = useDispatch()
   const [confirming, setConfirming] = React.useState<boolean>(false)

   const favoriteLaunches = useSelector((state: State) => state.favorites.favoriteLaunches)
   const isFavorited = favoriteLaunches.filter((launch: Launch) => launch.flight_number === props.launch.flight_number).includes(props.launch)
  
  
   const toggleFavorite = () => {
      if (isFavorited) {
         dispatch(removeFromFavoriteLaunches(props.launch))
      }
      else {
         dispatch(addToFavoriteLaunches(props.launch))
      }
   }

   const handleToggleFavorite = (e: any) => { // Event typing 
      e.preventDefault() // Prevent parent's onclick

      if (props.isDrawerFavorite && !confirming) { // Non drawer favorites and confirmation clicks will bypass
         setConfirming(true)
      }
      else toggleFavorite()
   }

   const handleCancel = (e: any) => {
      e.preventDefault()

      setConfirming(false)
   }

 

   return (
      <Box
         as={Link}
         to={`/launches/${props.launch.flight_number.toString()}`}
         boxShadow="md"
         borderWidth={ props.isDrawerFavorite ? 0 : "1px"}
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
               <Box marginLeft="10px">
                  {
                     confirming &&
                     <Box display="flex">
                        <Box
                           style={{ color: 'greenyellow', position: 'relative', top: 5 }}
                           as={Check}
                           onClick={handleToggleFavorite}
                        />
                        <Box
                           style={{ color: 'red', position: 'relative', top: 5 }}
                           as={X}
                           onClick={handleCancel}
                        />

                     </Box>
                  }
                  {
                     !confirming &&
                     <Box
                        style={{ color: isFavorited ? 'gold' : 'darkgray', position: 'relative', top: 5 }}
                        as={Star}
                        onClick={handleToggleFavorite}
                     />
                  }
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
            <Flex flexDirection={props.isDrawerFavorite ? 'column' : 'row'}>
               <Text fontSize="sm">{formatDate(props.launch.launch_date_utc)} </Text>
               <Text color="gray.500" ml="2" fontSize="sm">
                  {timeAgo(props.launch.launch_date_utc)}
               </Text>
            </Flex>
         </Box>
      </Box>
   );
}