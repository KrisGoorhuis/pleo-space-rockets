import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import LaunchPads, { LAUNCH_PADS_PAGE_SIZE } from './launch-pads';
import LaunchPadItem from './launchPadItem';

describe('<MyComponent />', () => {
   it('renders three <LaunchPadItem /> components', () => {
      render(<BrowserRouter><LaunchPads /></BrowserRouter>);
      const selected = screen.queryByTestId('launchPadItem')

      console.log("selected")
      console.log("selected")
      console.log("selected")
      console.log("selected")
      console.log("selected")
      console.log("selected")
      console.log("selected")
      console.log("selected")
      console.log("selected")
      console.log("selected")
      console.log("selected")
      console.log("selected")
      console.log("selected")
      console.log(selected)
      expect(selected).toHaveLength(12);
      // expect(selected).toHaveLength(12);
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