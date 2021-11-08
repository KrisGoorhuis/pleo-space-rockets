import React from 'react'
import { Box } from '@chakra-ui/react'
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
 
   const favoriteLaunchPads = useSelector((state: State) => state.favorites.favoriteLaunchPads)
   const isFavorited = favoriteLaunchPads.filter((launch: LaunchPad) => launch.site_id === props.launchPad.site_id).includes(props.launchPad)
  
  
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
   )
}

export default FavoriteLaunchPadButton