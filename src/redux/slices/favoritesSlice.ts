import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Launch, LaunchPad } from "../../model"


interface FavoritesDataSlice {
   favoritesOpen: boolean
   favoriteLaunches: Launch[] // flight_number, ex 1
   favoriteLaunchPads: LaunchPad[] // site_id, ex 'vafb_slc_4e'
}

const initialBoardDataState: FavoritesDataSlice = {
   favoritesOpen: false,
   favoriteLaunches: [],
   favoriteLaunchPads: [],
}

const favoritesSlice = createSlice({
   name: "FavoritesSlice",
   initialState: initialBoardDataState,
   reducers: {
      toggleFavoritesOpen: (state) => { state.favoritesOpen = !state.favoritesOpen },

      addToFavoriteLaunches: (state, { payload }: PayloadAction<Launch>) => { state.favoriteLaunches.push(payload) },
      removeFromFavoriteLaunches: (state, { payload }: PayloadAction<Launch>) => {
         state.favoriteLaunches = state.favoriteLaunches.filter((launch: Launch) => payload.flight_number !== launch.flight_number)
      },

      addToFavoriteLaunchPads: (state, { payload }: PayloadAction<LaunchPad>) => { state.favoriteLaunchPads.push(payload) },
      removeFromFavoriteLaunchPads: (state, { payload }: PayloadAction<LaunchPad>) => {
         state.favoriteLaunchPads = state.favoriteLaunchPads.filter((launchPad: LaunchPad) => payload.site_id !== launchPad.site_id)
      },
   },
})

export const {
   toggleFavoritesOpen,

   addToFavoriteLaunches,
   removeFromFavoriteLaunches,

   addToFavoriteLaunchPads,
   removeFromFavoriteLaunchPads
} = favoritesSlice.actions

export default favoritesSlice
