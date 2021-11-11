import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()
import fetch from 'jest-fetch-mock';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ExampleLaunch } from '../../../model/example-launch';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import { initialFavoritesState } from '../../../redux/slices/favoritesSlice';
import Launches from './../launches';


beforeEach(() => {
   fetch.resetMocks();
});


describe('<Launches />', () => {
   const initialState = { favorites: initialFavoritesState}
   const mockStore = configureStore()
   let store

   it('renders three <LaunchPadItem /> components', async () => {
      store = mockStore(initialState)

      fetch.mockResponseOnce(JSON.stringify([ExampleLaunch, ExampleLaunch, ExampleLaunch]))

      // BrowserRouter solves 'useHref() may be used only in the context of a <Router> component.'
      render(
         <Provider store={store}>
            <BrowserRouter>
               <Launches />
            </BrowserRouter>
         </Provider>
      );

      await waitFor(() => expect(screen.getAllByTestId('launchItem')).toHaveLength(3))
   });

   //   it('renders an `.icon-star`', () => {
   //     const wrapper = shallow(<LaunchPads />);
   //     expect(wrapper.find('.icon-star')).toHaveLength(1);
   //   });

   //   it('renders children when passed in', () => {
   //     const wrapper = shallow((
   //       <LaunchPads>
   //         <div className="unique" />
   //       </LaunchPads>
   //     ));
   //     expect(wrapper.contains(<div className="unique" />)).to.equal(true);
   //   });

   //   it('simulates click events', () => {
   //     const onButtonClick = sinon.spy();
   //     const wrapper = shallow(<Foo onButtonClick={onButtonClick} />);
   //     wrapper.find('button').simulate('click');
   //     expect(onButtonClick).to.have.property('callCount', 1);
   //   });
});