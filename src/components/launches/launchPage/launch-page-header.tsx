import React from "react";
import { Flex, Heading, Stack, Badge, Image } from "@chakra-ui/react";

import { LaunchProps } from "../../../model";
import FavoriteLaunchButton from "../favoriteLaunchButton";


const LaunchPageHeader = (props: LaunchProps) => {
   return (
      <Flex
         bgImage={`url(${props.launch.links.flickr_images[0]})`}
         bgPos="center"
         bgSize="cover"
         bgRepeat="no-repeat"
         minHeight="30vh"
         position="relative"
         p={[2, 6]}
         alignItems="flex-end"
         justifyContent="space-between"
      >
         <Image
            position="absolute"
            top="5"
            right="5"
            src={props.launch.links.mission_patch_small}
            height={["85px", "150px"]}
            objectFit="contain"
            objectPosition="bottom"
         />
         <Heading
            color="white"
            display="inline"
            backgroundColor="#718096b8"
            fontSize={["lg", "5xl"]}
            px="4"
            py="2"
            borderRadius="lg"
         >
            {props.launch.mission_name}
         </Heading>

         <Stack isInline spacing="3" alignItems="center" justifyContent="center" display="flex">
            <FavoriteLaunchButton {...props} />
            <Badge colorScheme="purple" fontSize={["xs", "md"]}>
               #{props.launch.flight_number}
            </Badge>
            {props.launch.launch_success ? (
               <Badge colorScheme="green" fontSize={["xs", "md"]}>
                  Successful
               </Badge>
            ) : (
               <Badge colorScheme="red" fontSize={["xs", "md"]}>
                  Failed
               </Badge>
            )}

         </Stack>
      </Flex>
   );
}

export default LaunchPageHeader