import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Launch, LaunchPad } from "../../model"
import { LocalStorageKeys } from "../../model/constants"


export interface FavoritesDataSlice {
   favoriteLaunches: Launch[] // flight_number, ex 1
   favoriteLaunchPads: LaunchPad[] // site_id, ex 'vafb_slc_4e'
   defaultIndex: number[]
}

export const initialFavoritesState: FavoritesDataSlice = {
   favoriteLaunches: JSON.parse(localStorage.getItem(LocalStorageKeys.favoriteLaunches) || "[]"),
   favoriteLaunchPads: JSON.parse(localStorage.getItem(LocalStorageKeys.favoriteLaunchPads) || "[]"),
   defaultIndex: JSON.parse(localStorage.getItem(LocalStorageKeys.defaultIndex) || "[0]")
}

const favoritesSlice = createSlice({
   name: "FavoritesSlice",
   initialState: initialFavoritesState,
   reducers: {
      // launches
      addToFavoriteLaunches: (state, { payload }: PayloadAction<Launch>) => {
         const newState = [...state.favoriteLaunches, payload]

         localStorage.setItem(LocalStorageKeys.favoriteLaunches, JSON.stringify(newState))
         state.favoriteLaunches = newState
      },
      removeFromFavoriteLaunches: (state, { payload }: PayloadAction<Launch>) => {
         const newState = state.favoriteLaunches.filter((launch: Launch) => payload.flight_number !== launch.flight_number)

         localStorage.setItem(LocalStorageKeys.favoriteLaunches, JSON.stringify(newState))
         state.favoriteLaunches = newState
      },

      // launch pads
      addToFavoriteLaunchPads: (state, { payload }: PayloadAction<LaunchPad>) => {
         const newState = [...state.favoriteLaunchPads, payload]

         localStorage.setItem(LocalStorageKeys.favoriteLaunchPads, JSON.stringify(newState))
         state.favoriteLaunchPads = newState
      },
      removeFromFavoriteLaunchPads: (state, { payload }: PayloadAction<LaunchPad>) => {
         const newState = state.favoriteLaunchPads.filter((launchPad: LaunchPad) => payload.site_id !== launchPad.site_id)

         localStorage.setItem(LocalStorageKeys.favoriteLaunchPads, JSON.stringify(newState))
         state.favoriteLaunchPads = newState
      },

      // misc
      setDefaultIndex: (state, { payload }: PayloadAction<number[]>) => {
         localStorage.setItem(LocalStorageKeys.defaultIndex, JSON.stringify(payload))
         state.defaultIndex = payload
      },
   },
})

export const {
   addToFavoriteLaunches,
   removeFromFavoriteLaunches,

   addToFavoriteLaunchPads,
   removeFromFavoriteLaunchPads,

   setDefaultIndex
} = favoritesSlice.actions

export default favoritesSlice
