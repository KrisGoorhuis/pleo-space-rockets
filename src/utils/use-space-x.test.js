import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()
import React from 'react';
import { isExternalModule } from 'typescript';
import { ExampleLaunch } from '../model/example-launch';
import { fetcher } from './use-space-x'


beforeEach(() => {
  fetch.resetMocks();
});

const testUrl = `https://api.spacexdata.com/v3/launches/past?limit=12&order=desc&sort=launch_date_utc&offset=0`

test('spacex fetcher returns proper response', async () => {
  fetch.mockResponseOnce(JSON.stringify(ExampleLaunch))
  const result = await fetcher(testUrl)

  expect(result).toEqual(ExampleLaunch)
});



// test('spacex url function returns proper string', async () => {
//   const path = "/launches/past"
//   const options = {
//     limit: PAGE_SIZE,
//     order: "desc",
//     sort: "launch_date_utc",
//   }
//   const resultString = "https://api.spacexdata.com/v3/launches/past?limit=12&order=desc&sort=launch_date_utc&offset=0"
  
//   const result = getSpaceXUrl(path, )

//   expect(result).toEqual(ExampleLaunch)
// });
