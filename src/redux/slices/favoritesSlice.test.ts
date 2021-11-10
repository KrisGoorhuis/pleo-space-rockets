import { ExampleLaunch } from '../../model/example-launch'
import slice, { addToFavoriteLaunches, FavoritesDataSlice, initialFavoritesState } from './favoritesSlice'




test('should return the initial state', () => {
  expect(slice.reducer(undefined, {type: ''})).toEqual(initialFavoritesState)
})

test('should handle a launch being added to an empty list', () => {
  const previousState: FavoritesDataSlice = initialFavoritesState
  console.log("slice.reducer(previousState, addToFavoriteLaunches(ExampleLaunch)")
  console.log(slice.reducer(previousState, addToFavoriteLaunches(ExampleLaunch)))
  expect(slice.reducer(previousState, addToFavoriteLaunches(ExampleLaunch)).favoriteLaunches).toEqual([
    ExampleLaunch
  ])
})

// test('should handle a todo being added to an existing list', () => {
//   const previousState = [
//     {
//       text: 'Run the tests',
//       completed: true,
//       id: 0
//     }
//   ]
//   expect(reducer(previousState, todoAdded('Use Redux'))).toEqual([
//     {
//       text: 'Run the tests',
//       completed: true,
//       id: 0
//     },
//     {
//       text: 'Use Redux',
//       completed: false,
//       id: 1
//     }
//   ])
// })