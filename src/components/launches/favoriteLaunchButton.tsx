import React from 'react'
import { Box } from '@chakra-ui/react'
import { Check, X, Star } from "react-feather";
import { useDispatch, useSelector } from 'react-redux';
import { Launch } from '../../model';
import { removeFromFavoriteLaunches, addToFavoriteLaunches } from '../../redux/slices/favoritesSlice';
import { State } from '../../redux';



interface FavoriteLaunchButtonProps {
   launch: Launch
   isDrawerFavorite?: boolean
}

const FavoriteLaunchButton = (props: FavoriteLaunchButtonProps) => {
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

export default FavoriteLaunchButton