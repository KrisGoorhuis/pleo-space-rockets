import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()
import fetch from 'jest-fetch-mock';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import LaunchPads from '../launch-pads';
import { ExampleLaunchPad } from '../../../model/example-launch-pad';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import { initialFavoritesState } from '../../../redux/slices/favoritesSlice';


beforeEach(() => {
   fetch.resetMocks();
});


describe('<LaunchPads />', () => {
   const initialState = { favorites: initialFavoritesState }
   const mockStore = configureStore()
   let store

   it('renders three <LaunchPadItem /> components', async () => {
      store = mockStore(initialState)

      fetch.mockResponseOnce(JSON.stringify([ExampleLaunchPad, ExampleLaunchPad, ExampleLaunchPad]))

      // BrowserRouter solves 'useHref() may be used only in the context of a <Router> component.'
      render(
         <Provider store={store}>
            <BrowserRouter>
               <LaunchPads />
            </BrowserRouter>
         </Provider>
      );

      await waitFor(() => expect(screen.getAllByTestId('launchPadItem')).toHaveLength(3))
   });
});