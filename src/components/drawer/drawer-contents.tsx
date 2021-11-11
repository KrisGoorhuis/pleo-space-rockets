import { Box, Divider, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../../redux'
import { setDefaultIndex } from '../../redux/slices/favoritesSlice'
import { LaunchItem } from '../launches/launchItem'
import LaunchPadItem from '../launchPads/launchPadItem'


interface DrawerContentsProps {}

const DrawerContents = (props: DrawerContentsProps) => {
   const favoriteLaunches = useSelector((state: State) => state.favorites.favoriteLaunches)
   const favoriteLaunchPads = useSelector((state: State) => state.favorites.favoriteLaunchPads)
   const defaultIndex = useSelector((state: State) => state.favorites.defaultIndex)
   const dispatch = useDispatch()

   const handleSetDefaultIndex = (newIndex: number[]) => {
      dispatch(setDefaultIndex(newIndex))
   }

   return (
      <Accordion defaultIndex={defaultIndex || [0]} allowToggle>
         {
            favoriteLaunches.length > 0 ?
            <AccordionItem border={0} onClick={() => handleSetDefaultIndex([0])}>
               <AccordionButton>
                  <Text flex={1} textAlign="left">
                     Favorite Launches
                  </Text>
                  <AccordionIcon />
               </AccordionButton>
               <AccordionPanel>
                  {
                     favoriteLaunches.map((launch, i) => {
                        return (
                           <Box key={launch.flight_number}>
                              <LaunchItem launch={launch} isDrawerFavorite />
                              {
                                 i < favoriteLaunches.length - 1 && favoriteLaunches.length > 0 &&
                                 <Divider marginBottom="24px" />
                              }
                           </Box>
                        )
                     })
                  }
               </AccordionPanel>
            </AccordionItem>
            :
            <Text>
               No favorite launches yet
            </Text>
         }

         <Divider borderWidth="2px" marginTop="10px" marginBottom="10px" />

         {
            favoriteLaunchPads.length > 0 ?
            <AccordionItem border={0} onClick={() => handleSetDefaultIndex([1])}>
               <AccordionButton>
                  <Text flex={1} textAlign="left">
                     Favorite Launch Pads
                  </Text>
                  <AccordionIcon />
               </AccordionButton>
               <AccordionPanel>
                  {
                     favoriteLaunchPads.map((launchPad, i) => {
                        return (
                           <Box key={launchPad.site_id}>
                              <LaunchPadItem launchPad={launchPad} isDrawerFavorite />
                              {
                                 i < favoriteLaunchPads.length - 1 && favoriteLaunchPads.length > 0 &&
                                 <Divider marginBottom="24px" />
                              }
                           </Box>
                        )
                     })
                  }
               </AccordionPanel>
            </AccordionItem>
            :
            <Text>
               No favorite launch pads yet
            </Text>
         }
      </Accordion>
   )
}

export default DrawerContents