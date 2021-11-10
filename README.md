![Drawing of a rocket launching with Pleo logo on the side](https://repository-images.githubusercontent.com/255552950/c9991080-ff11-11ea-8706-5d40322f68fe)

# ¡Space·Rockets! Changelog

## v 0.2.0
- Refactored the app with Typescript
   - Updated Chakra UI/dependencies for better TS support (a la https://chakra-ui.com/docs/migration)
   - Added @types/react-router-dom, updated react-router-dom
- Added testing to network request utilities
   - @types/jest, jest-fetch-mock added to dependencies
- Added Favorites functionality for launches and launch pads - items can be collected in a side drawer via click of a star
   - Added Redux (Toolkit) to keep track


## v 0.1.1
- Fixed an issue where launch datetimes displayed the user's time zone rather than the launch's time zone as intended. The user's time zone is instead displayed in tooltip. 



## Notes
### Typescript! 

Updating Chakra was the first step, as TS support was improved with 1.0. I followed the steps documented at https://chakra-ui.com/docs/migration
Some components and the theme provider had their names changed. Some find and replace.

Next was updating utilities to pass type parameters to the imports they used, and in turn updated these utilities to accept the type parameters they needed to use.
For example, useParams() from react-routerDom and useSWR() are now receiving types

The types associated with data returned from spacexdata.com were built with a little bit of `typeof` cheating. 
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

how might favorites feature be extended?

open to correct favorites - keep track of page in Redux?



## Things I'd Do With More Time
There are still `any` types here and there. Most are event types, but with more time and effort some of the others could be done away with.

Calling additional pieces of the spacex API would be a straightforward bonus, but I settled for 


## Drawer
Confirmation on removal because it's far easier to remove than add back.
Indent on 'ago' was not intentional, but I decided I liked it for the grayed subtext


## Bug Fix Notes
Javascript's vanilla time-related objects are often at least a little frustrating, so I decided to use Moment.js.
Additionally, time zones are ticky without being explicitly told - all we have is the time stamp itself (well, and coordinates, but making a
call to something like Google Maps to determine a time zone for every card would be a bit much.) I decided to show the UTC offset in place of 
a time zone instead.

Default behavior is to parse time in the user's time zone. Moment's `.parseZone()` will keep the original string's offset intact. Adding an underline was the best method of suggesting that something is hoverable.


## Testing
npm run test -- --silent=false

The question of *what* to test seems eternal. This is something I expect to better be able to figure out as experience comes, but for now, I have three ideas: network requests, conditional rendering, and state updates.

Network requests were tested with mocked responses. Swr was new technology to me and, while very cool, it was a conundrum to test. Google's suggestion was to just address the fetch itself, but while actual network requests may be more reliable, if breakable by somebody else, that's perhaps too large a load.

The Redux tests were fairly straightforward, as there isn't a lot of complicated logic there. Call a reducer, examine the new state, and try to cover everything.

The most vague part was deciding which parts of the React components themselves would benefit. For the time being, all tests regard conditional rendering.


## Lessons & Learnings
Swr was an interesting thing to discover. Some don't like the proliferation of packages, but from my perspective, it's more and more of the potentially tricky best practices being rolled into relatively easy to learn tools. I've handled parts of what it does, like Suspense, with loading-handling components, but there's a lot left to benefit from. It may become a standard part of what I use.

The biggest takewaway may be about pagination. I hadn't had occasion to think about it before, but it's a big win for the right app.