import React from "react";
import { Box, Stat, StatLabel, StatNumber, StatHelpText, StatGroup, SimpleGrid } from "@chakra-ui/react";
import { Navigation, Layers } from "react-feather";
import { Launch, LaunchProps } from "../../../model";


interface RocketInfoProps {
   launch: Launch
}


function RocketInfo(props: LaunchProps) {
   const cores = props.launch.rocket.first_stage.cores;

   return (
      <SimpleGrid
         columns={[1, 1, 2]}
         borderWidth="1px"
         mt="4"
         p="4"
         borderRadius="md"
      >
         <Stat>
            <StatLabel display="flex">
               <Box as={Navigation} width="1em" />{" "}
               <Box ml="2" as="span">
                  Rocket
               </Box>
            </StatLabel>
            <StatNumber fontSize={["md", "xl"]}>
               {props.launch.rocket.rocket_name}
            </StatNumber>
            <StatHelpText>{props.launch.rocket.rocket_type}</StatHelpText>
         </Stat>
         <StatGroup>
            <Stat>
               <StatLabel display="flex">
                  <Box as={Layers} width="1em" />{" "}
                  <Box ml="2" as="span">
                     First Stage
                  </Box>
               </StatLabel>
               <StatNumber fontSize={["md", "xl"]}>
                  {cores.map((core) => core.core_serial).join(", ")}
               </StatNumber>
               <StatHelpText>
                  {cores.every((core) => core.land_success)
                     ? cores.length === 1
                        ? "Recovered"
                        : "All recovered"
                     : "Lost"}
               </StatHelpText>
            </Stat>
            <Stat>
               <StatLabel display="flex">
                  <Box as={Layers} width="1em" />{" "}
                  <Box ml="2" as="span">
                     Second Stage
                  </Box>
               </StatLabel>
               <StatNumber fontSize={["md", "xl"]}>
                  Block {props.launch.rocket.second_stage.block}
               </StatNumber>
               <StatHelpText>
                  Payload:{" "}
                  {props.launch.rocket.second_stage.payloads
                     .map((payload) => payload.payload_type)
                     .join(", ")}
               </StatHelpText>
            </Stat>
         </StatGroup>
      </SimpleGrid>
   );
}


export default RocketInfo