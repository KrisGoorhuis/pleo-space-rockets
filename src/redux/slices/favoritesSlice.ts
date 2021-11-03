import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface FavoritesDataSlice {
   favoritesOpen: boolean
   favoriteLaunches: string[]
   favoriteLaunchPads: number[]
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
      addToFavoriteLaunches: (state, { payload }: PayloadAction<string>) => { state.favoriteLaunches.push(payload) },
      addToFavoriteLaunchPads: (state, { payload }: PayloadAction<number>) => { state.favoriteLaunchPads.push(payload) }
   },
})

export const {
   toggleFavoritesOpen,
   addToFavoriteLaunches,
   addToFavoriteLaunchPads,
} = favoritesSlice.actions

export default favoritesSlice
