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
Typescript! The first step was moving through files, changing the extensions, and resolving any issues that arose. First of these was that Chakra UI v1.0 has better Typescript support


I followed the steps documented at https://chakra-ui.com/docs/migration
   - /core changed to /react AspectRatioBox is now AspectRatio
   - passing type parameters (react-router-dom useParams<>, swr useSwr<>)

I also added @types/react-router-dom to bring in some missing types.# pleo-space-rockets

I cheated a bit with the types returned from the API.

Added       rules: [
        {
          type: 'javascript/auto',
          test: /\.mjs$/,
          use: []
        },
        to the webpack config

Modifying utilities to accept type parameters

"alt" does not exist on html element 'iframe'


# pleo-space-rockets
