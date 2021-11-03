import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../../redux"
import { toggleFavoritesOpen } from "../../redux/slices/favoritesSlice"
import DrawerContents from "./drawer-contents"


interface SideDrawerProps {

}

const SideDrawer = (props: SideDrawerProps) => {
   const btnRef = React.useRef()
   const dispatch = useDispatch()
   const isOpen = useSelector((state: State) => state.favorites.favoritesOpen)

   const handleToggleIsOpen = () => {
      dispatch(toggleFavoritesOpen())
   }

   return (
      <>
         <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={handleToggleIsOpen}
            finalFocusRef={btnRef.current}
         >
            <DrawerOverlay />
            <DrawerContent>
               <DrawerCloseButton />
               <DrawerHeader>Create your account</DrawerHeader>

               <DrawerBody>
                  <DrawerContents />
               </DrawerBody>

               <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={handleToggleIsOpen}>
                     Cancel
                  </Button>
                  <Button colorScheme="blue">Save</Button>
               </DrawerFooter>
            </DrawerContent>
         </Drawer>
      </>
   )
}

export default SideDrawer