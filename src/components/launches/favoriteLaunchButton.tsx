import React from 'react'
import { Badge, Box } from '@chakra-ui/react'
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
   const favoriteLaunchNumbers = favoriteLaunches.map((item: Launch) => item.flight_number)
   const isFavorited = favoriteLaunchNumbers.includes(props.launch.flight_number)


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
      <Badge cursor="pointer" padding="2px">
         {
            confirming &&
            <Box display="flex" backgroundColor="whitesmoke">
               <Box
                  style={{ color: 'greenyellow', position: 'relative' }}
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
               padding="2px"
               style={{ color: isFavorited ? 'gold' : 'darkgray', position: 'relative' }}
               as={Star}
               onClick={handleToggleFavorite}
            />
         }
      </Badge>
   )
}

export default FavoriteLaunchButton