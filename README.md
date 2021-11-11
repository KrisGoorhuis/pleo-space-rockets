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



# Notes

## Updates

### Typescript! 

Updating Chakra was the first step, as TS support was improved with 1.0. I followed the steps documented at https://chakra-ui.com/docs/migration
Some components and the theme provider had their names changed. Some find and replace.

Next was updating utilities to pass type parameters to the imports they used, and in turn updated these utilities to accept the type parameters they needed to use.
For example, useParams() from react-routerDom and useSWR() are now receiving types

The types associated with data returned from spacexdata.com were built with a little bit of `typeof` cheating. 
The launch pad object in particular is huge, so converting it to a hard type by hand would take a fair bit of time. I'd do this for production, but this method came with bonus overlap with testing.

`framer-motion`, which came with the Chakra update, required a webpack config update relating to a `.mjs`. Because `create-react-app` doesn't let us modify its webpack config directly, I addressed it with `react-app-rewired`. A config-overrides files was added at the root with
```
   {
     test: /\.mjs$/,
     include: /node_modules/,
     type: "javascript/auto"
   }
```

There were a few other small updates, such as removing the "alt" from a Chakra element appearing as an iframe.
Reconfiguring and refactoring in response to this switch was the most difficult part of the project. Lots of time spent doing something other than writing code.


## Testing
The question of *what* to test seems eternal. This is something I expect to better be able to figure out as experience comes, but for now, I had three ideas: network requests, conditional rendering, and state updates.

Network requests were tested with mocked responses. Swr was new technology to me and, while very cool, it was a conundrum to test. Google's suggestion was to just address the fetch itself, but while actual network requests in tests may be more reliable, if breakable by somebody else, that might be a bit much. This involved bringing in `jest-fetch-mock`.

The Redux tests were fairly straightforward, as there isn't a lot of complicated logic there. Call a reducer, examine the new state, and try to cover everything.

The most difficult part was deciding which parts of the React components themselves would benefit. For the time being, all tests regard conditional rendering and mapping of children. This involved setting up redux-mock-store and, through debugging, adding the `--env=jest-environment-jsdom-sixteen` flag to the test script ('MutationObserver is not a constructor').


### Other Updates
- The logo was made into a home button.
- Several large component files were split into separate pieces. Small components were left with their parent, but anything larger than a couple dozen lines was separated.


## Things I'd Do With More Time
There are still `any` types here and there. Most are intractible event types, but with more time and effort some of the others could likely done away with.

Calling additional pieces of the spacex API would be a straightforward bonus, but I like to believe I aimed for difficult enhancements of substance instead of just *more*. 


# Task Notes

## Drawer
Redux was added to keep track of favorites. Uneccessary if we're just using local storage for now, but following the logic of preparation over just getting things done, it felt like a reasonable add. And I like writing Toolkit slices. Persisting data just occurs in the reducers.

Saving something to favorites or removing it from its non-drawer card are a single click, but they can feel like they're vanishing into the ether when removed from the drawer. A confirmation prompt was added because the potential negative consequences were greater.
Indent on 'ago' was not intentional, but I decided I liked it for the grayed subtext.

Documentation claims that launches have a unique `flight_id`, but none of their examples contained as much. For Redux reducer logic I decided to use `flight_number` as a best alternative, to find that that's what was already used as a key in `launch-pad.tsx`. 

At the risk of overengineering, the app keeps track of which accordion of favorites was last opened.


## Bug Fix
Javascript's vanilla time-related objects are often at least a little frustrating, so I decided to use Moment.js.
Additionally, time zones are ticky without being explicitly told - all we have is the time stamp itself (well, and coordinates, but making a
call to something like Google Maps to determine a time zone for every card would be a bit much.) I decided to show the UTC offset in place of 
a time zone instead.

Default behavior is to parse time in the user's time zone. Moment's `.parseZone()` will keep the original string's offset intact. Adding an underline was the best method of suggesting that something is hoverable.



# Lessons, Learnings
Swr was an interesting thing to discover. Some don't like the proliferation of packages in web dev, but from my perspective, it's more and more of the potentially tricky best practices being rolled into relatively easy to learn tools. I've handled parts of what swr does, like imitating Suspense's function with loading-handling components, but there's a lot left to benefit from. It may become a standard part of what I use.

I hadn't had occasion to think about pagination beyond awareness before, but it's a big win for the right app. And a package makes it simple!

Configuration isn't terribly fun, but it's something you can *just be done with* and continue building, for the most part. 
