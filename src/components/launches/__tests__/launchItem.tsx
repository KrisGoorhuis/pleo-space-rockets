import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()
import fetch from 'jest-fetch-mock';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ExampleLaunch } from '../../../model/example-launch';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import { initialFavoritesState } from '../../../redux/slices/favoritesSlice';
import { LaunchItem } from '../launchItem';


beforeEach(() => {
   fetch.resetMocks();
});


describe('<LauncheItem />', () => {
   const initialState = { favorites: initialFavoritesState }
   const mockStore = configureStore()
   let store

   it('displays success when passed launch was successful', () => {
      store = mockStore(initialState)

      render(
         <Provider store={store}>
            <BrowserRouter>
               <LaunchItem launch={{ ...ExampleLaunch, launch_success: true }} />
            </BrowserRouter>
         </Provider>

      )
      const successBadge = screen.getByText('Successful')

      expect(successBadge)
   })

   it('displays failure badge when passed launch was unsuccessful', () => {
      store = mockStore(initialState)

      render(
         <Provider store={store}>
            <BrowserRouter>
               <LaunchItem launch={ExampleLaunch} />
            </BrowserRouter>
         </Provider>
      )
      const successBadge = screen.getByText('Failed')

      expect(successBadge)
   })
});