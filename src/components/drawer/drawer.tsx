import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/react"
import React from "react"
import DrawerContents from "./drawer-contents"


interface SideDrawerProps {
   isOpen: boolean
   toggleIsOpen: () => void
}

const SideDrawer = (props: SideDrawerProps) => {
   const btnRef = React.useRef()

   const handleToggleIsOpen = () => {
      props.toggleIsOpen()
   }

   return (
      <>
         <Drawer
            isOpen={props.isOpen}
            placement="right"
            onClose={handleToggleIsOpen}
            finalFocusRef={btnRef.current}
         >
            <DrawerOverlay />
            <DrawerContent>
               <DrawerCloseButton />
               <DrawerHeader>Favorites</DrawerHeader>

               <DrawerBody>
                  <DrawerContents />
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </>
   )
}

export default SideDrawer