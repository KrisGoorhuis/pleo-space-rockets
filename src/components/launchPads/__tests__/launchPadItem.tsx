import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()
import fetch from 'jest-fetch-mock';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ExampleLaunchPad } from '../../../model/example-launch-pad';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import { initialFavoritesState } from '../../../redux/slices/favoritesSlice';
import LaunchPadItem from '../launchPadItem';


beforeEach(() => {
   fetch.resetMocks();
});


describe('<LauncheItem />', () => {
   const initialState = { favorites: initialFavoritesState }
   const mockStore = configureStore()
   let store

   it('displays "active" badge when passed launch pad is active', () => {
      store = mockStore(initialState)

      render(
         <Provider store={store}>
            <BrowserRouter>
               <LaunchPadItem launchPad={{ ...ExampleLaunchPad, status: "active" }} />
            </BrowserRouter>
         </Provider>

      )
      const successBadge = screen.getByText('Active')

      expect(successBadge)
   })

   it('displays "retired" badge when passed an inactive launch pad', () => {
      store = mockStore(initialState)

      render(
         <Provider store={store}>
            <BrowserRouter>
               {/* String doesn't matter here as long as it's not 'active' */}
               <LaunchPadItem launchPad={{ ...ExampleLaunchPad, status: "retired" }} />
            </BrowserRouter>
         </Provider>
      )
      const successBadge = screen.getByText('Retired')

      expect(successBadge)
   })
});