import { ExampleLaunch } from '../../model/example-launch'
import { ExampleLaunchPad } from '../../model/example-launch-pad'
import slice, { addToFavoriteLaunches, addToFavoriteLaunchPads, FavoritesDataSlice, initialFavoritesState } from './favoritesSlice'


test('should return the initial state', () => {
   expect(slice.reducer(undefined, { type: '' })).toEqual(initialFavoritesState)
})

test('should handle a launch being added to an empty list', () => {
   const previousState: FavoritesDataSlice = initialFavoritesState
   expect(slice.reducer(previousState, addToFavoriteLaunches(ExampleLaunch)).favoriteLaunches).toEqual([
      ExampleLaunch
   ])
})

test('should handle a launch being added to an existing list', () => {
   const previousState: FavoritesDataSlice = { ...initialFavoritesState, favoriteLaunches: [ExampleLaunch] }
   expect(slice.reducer(previousState, addToFavoriteLaunches(ExampleLaunch)).favoriteLaunches).toEqual([
      ExampleLaunch,
      ExampleLaunch
   ])
})

test('should handle a launch pad being added to an empty list', () => {
   const previousState: FavoritesDataSlice = initialFavoritesState
   expect(slice.reducer(previousState, addToFavoriteLaunchPads(ExampleLaunchPad)).favoriteLaunchPads).toEqual([
      ExampleLaunchPad
   ])
})
test('should handle a launch pad being added to an existing list', () => {
   const previousState: FavoritesDataSlice = { ...initialFavoritesState, favoriteLaunchPads: [ExampleLaunchPad] }
   expect(slice.reducer(previousState, addToFavoriteLaunchPads(ExampleLaunchPad)).favoriteLaunchPads).toEqual([
      ExampleLaunchPad,
      ExampleLaunchPad
   ])
})