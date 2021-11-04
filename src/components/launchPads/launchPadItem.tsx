import { Link, Box, Badge, Text } from "@chakra-ui/react";
import React from "react";
import { LaunchPadProps } from "../../model";

const LaunchPadItem = (props: LaunchPadProps) => {
   return (
     <Box
       as={Link}
       to={`/launch-pads/${props.launchPad.site_id}`}
       boxShadow="md"
       borderWidth="1px"
       rounded="lg"
       overflow="hidden"
       position="relative"
     >
       <Box p="6">
         <Box d="flex" alignItems="baseline">
           {props.launchPad.status === "active" ? (
             <Badge px="2" variant="solid" colorScheme="green">
               Active
             </Badge>
           ) : (
             <Badge px="2" variant="solid" colorScheme="red">
               Retired
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
             {props.launchPad.attempted_launches} attempted &bull;{" "}
             {props.launchPad.successful_launches} succeeded
           </Box>
         </Box>
 
         <Box
           mt="1"
           fontWeight="semibold"
           as="h4"
           lineHeight="tight"
           isTruncated
         >
           {props.launchPad.location.name} 
         </Box>
         <Text color="gray.500" fontSize="sm">
           {props.launchPad.vehicles_launched.join(", ")}
         </Text>
       </Box>
     </Box>
   );
 }
 
 export default LaunchPadItem