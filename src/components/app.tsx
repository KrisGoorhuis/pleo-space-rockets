import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Box, Flex, Text, } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react"
import { Star } from "react-feather";

import Launches from "./launches/launches";
import Launch from "./launches/launch-page";
import Home from "./home";
import LaunchPads from "./launchPads/launch-pads";
import LaunchPad from "./launchPads/launch-pad-page";
import SideDrawer from "./drawer/drawer";
import { toggleFavoritesOpen } from "../redux/slices/favoritesSlice";
import { useDispatch } from "react-redux";


export default function App() {

  return (
    <div>
      <SideDrawer />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launches" element={<Launches />} />
        <Route path="/launches/:launchId" element={<Launch />} />
        <Route path="/launch-pads" element={<LaunchPads />} />
        <Route path="/launch-pads/:launchPadId" element={<LaunchPad />} />
      </Routes>
    </div>
  );
}

function NavBar() {
  const dispatch = useDispatch()

  const handleToggleIsOpen = () => {
    dispatch(toggleFavoritesOpen())
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="6"
      bg="gray.800"
      color="white"
    >
      <Text
        fontFamily="mono"
        letterSpacing="2px"
        fontWeight="bold"
        fontSize="lg"
        as={Link}
        to={"/"}
      >
        ¡SPACE·R0CKETS!
      </Text>

      <Button variant={'outline'} onClick={handleToggleIsOpen} >
        <Box style={{color: 'gold', marginRight: 10, marginLeft: -5, position: 'relative', top: 1 }} as={Star} />
        Favorites
      </Button>
    </Flex>
  );
}

