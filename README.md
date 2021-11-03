![Drawing of a rocket launching with Pleo logo on the side](https://repository-images.githubusercontent.com/255552950/c9991080-ff11-11ea-8706-5d40322f68fe)

# ¡Space·Rockets! Changelog

## v 0.1.1
- Refactored app with Typescript
   - Updated Chakra UI/dependencies for better TS support (a la https://chakra-ui.com/docs/migration)
   - Added @types/react-router-dom, updated react-router-dom
- Added testing to network requests (TODO)
   - Added react-testing-library (@testing-library/react)
   - @types/jest
   - @types/testing-library__jest-dom




## Additional Technologies


## Updates
### Typescript! 

Updating Chakra was the first step, as TS support has improved with 1.0. I followed the steps documented at https://chakra-ui.com/docs/migration
Some components and the theme provider had their names changed. Some find and replace.


Next was updating utilities to pass type parameters to the imports they used, and in turn update these utilities to accept the type parameters they needed to use.
For example, useParams() from react-routerDom and useSWR() are now taking types

I also added @types/react-router-dom to bring in some missing types.

The types associated with data returned from spacexdata.com were built with a little bit of cheating. 
The launch pad object in particular is huge, so converting it to a hard type by hand would take a fair bit of time.

framer-motion, which came with the Chakra update, required a webpack config update. The following was added to the rules in node_modules\react-scripts\config\webpack.config.js:

   {
      type: 'javascript/auto',
      test: /\.mjs$/,
      use: []
   },

There were a few other small updates, such as removing the "alt" from a Chakra element appearing as an iframe


### Other Updates
Made the logo a home button

btnRef changed to btnRef.current


Moved some large components to new files, collapsed some very small components into just regular code (Maps in launch-pad-page)



## API Notes
Launches are claimed to have a unique `flight_id`, but none of their examples contained as much. I decided to use flight_number as a best alternative, to find that that's what is used as a key in `launch-pad.tsx`.


# pleo-space-rockets

launches: flight_id
pads: site_id



how might favorites feature be extended?

open to correct favorites - keep track of page in Redux?


Are elements within Launch and launch-pads identical? To be taken out?


## Things I'd Do With More Time
There are still `any` types here and there. The 