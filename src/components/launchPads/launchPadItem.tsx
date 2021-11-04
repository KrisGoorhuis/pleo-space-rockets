import { Link, Box, Badge, Text } from "@chakra-ui/react";
import React from "react";
import { Check, X, Star } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { LaunchPad, LaunchPadProps } from "../../model";
import { State } from "../../redux";
import { addToFavoriteLaunchPads, removeFromFavoriteLaunchPads } from "../../redux/slices/favoritesSlice";

interface launchPadItemProps extends LaunchPadProps {
  isDrawerFavorite?: boolean
}

const LaunchPadItem = (props: launchPadItemProps) => {
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
    <Box
      as={Link}
      to={`/launch-pads/${props.launchPad.site_id}`}
      boxShadow="md"
      borderWidth={ props.isDrawerFavorite ? 0 : "1px"}
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