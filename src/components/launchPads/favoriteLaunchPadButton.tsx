import React from 'react'
import { Badge, Box } from '@chakra-ui/react'
import { Check, X, Star } from "react-feather";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromFavoriteLaunchPads, addToFavoriteLaunchPads } from '../../redux/slices/favoritesSlice';
import { State } from '../../redux';
import { LaunchPad } from '../../model';


interface FavoriteLaunchPadButtonProps {
   launchPad: LaunchPad
   isDrawerFavorite?: boolean
}

const FavoriteLaunchPadButton = (props: FavoriteLaunchPadButtonProps) => {
   const dispatch = useDispatch()
   const [confirming, setConfirming] = React.useState<boolean>(false)

   const favoriteLaunchPads = useSelector((state: State) => state?.favorites?.favoriteLaunchPads)
   const favoriteLaunchPadNumbers = favoriteLaunchPads.map((item: LaunchPad) => item.site_id)
   const isFavorited = favoriteLaunchPadNumbers.includes(props.launchPad.site_id)
   

   const toggleFavorite = () => {
      if (isFavorited) {
         dispatch(removeFromFavoriteLaunchPads(props.launchPad))
      }
      else {
         dispatch(addToFavoriteLaunchPads(props.launchPad))
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
      <Badge cursor="pointer" padding="2px">
         {
            confirming &&
            <Box display="flex" backgroundColor="whitesmoke">
               <Box
                  style={{ color: '#1dbf04', position: 'relative' }}
                  as={Check}
                  onClick={handleToggleFavorite}
               />
               <Box
                  style={{ color: 'red', position: 'relative' }}
                  as={X}
                  onClick={handleCancel}
               />

            </Box>
         }
         {
            !confirming &&
            <Box
               backgroundColor="whitesmoke"
               style={{ color: isFavorited ? 'gold' : 'darkgray', position: 'relative' }}
               as={Star}
               onClick={handleToggleFavorite}
            />
         }
      </Badge>
   )
}

export default FavoriteLaunchPadButton