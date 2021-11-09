import React from "react";
import { Stat, StatLabel, StatNumber, StatHelpText, Tooltip, SimpleGrid, Box, Link } from "@chakra-ui/react";
import { Watch, MapPin } from "react-feather";
import { format as timeAgo } from "timeago.js";
import { Link as RouterLink } from "react-router-dom";


import { LaunchProps } from "../../../model";
import { formatDateLong, formatDateTargetZone } from "../../../utils/format-date";



function TimeAndLocation(props: LaunchProps) {

   return (
     <SimpleGrid columns={[1, 1, 2]} borderWidth="1px" p="4" borderRadius="md">
       <Stat>
         <StatLabel display="flex">
           <Box as={Watch} width="1em" />{" "}
           <Box ml="2" as="span">
             Launch Date
           </Box>
         </StatLabel>
         <StatNumber fontSize={["md", "xl"]} cursor="default" borderBottom="1px dotted black" display="inline-block">
           <Tooltip label={formatDateLong(props.launch.launch_date_local)} aria-label="Local time tooltip">
             {formatDateTargetZone(props.launch.launch_date_local)}
           </Tooltip>
         </StatNumber>
         <StatHelpText>{timeAgo(props.launch.launch_date_utc)}</StatHelpText>
       </Stat>
       <Stat>
         <StatLabel display="flex">
           <Box as={MapPin} width="1em" />{" "}
           <Box ml="2" as="span">
             Launch Site
           </Box>
         </StatLabel>
         <StatNumber fontSize={["md", "xl"]}>
           <Link
             as={RouterLink}
             to={`/launch-pads/${props.launch.launch_site.site_id}`}
           >
             {props.launch.launch_site.site_name_long}
           </Link>
         </StatNumber>
         <StatHelpText>{props.launch.launch_site.site_name}</StatHelpText>
       </Stat>
     </SimpleGrid>
   );
 }

 export default TimeAndLocation