import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()
import fetch from 'jest-fetch-mock';
import { ExampleLaunch } from '../model/example-launch';
import { fetcher, getSpaceXUrl } from './use-space-x'
import { ExampleLaunchPad } from '../model/example-launch-pad';

beforeEach(() => {
  fetch.resetMocks();
});

describe('favoritesSlice', () => {
  test('spacex fetcher returns intended launch data', async () => {
    const targetUrl = `https://api.spacexdata.com/v3/launches/past?limit=12&order=desc&sort=launch_date_utc&offset=0`
    fetch.mockResponseOnce(JSON.stringify(ExampleLaunch))
    const result = await fetcher(targetUrl)

    expect(result).toEqual(ExampleLaunch)
  });

  test('spacex fetcher returns intended launch pad data', async () => {
    const targetUrl = `https://api.spacexdata.com/v3/launchpads?limit=12&offset=0`
    fetch.mockResponseOnce(JSON.stringify(ExampleLaunchPad))
    const result = await fetcher(targetUrl)

    expect(result).toEqual(ExampleLaunchPad)
  });

  test('spacex url function returns intended strings for launches and fetcher returns expected data', async () => {
    const path = "/launches/past"
    const options = { limit: 12, order: 'desc', sort: 'launch_date_utc', offset: 0 } // Offsets added by pagination function, aren't part of original set
    const targetUrl = "https://api.spacexdata.com/v3/launches/past?limit=12&order=desc&sort=launch_date_utc&offset=0"

    const resultUrl = getSpaceXUrl(path, options)

    expect(resultUrl).toEqual(targetUrl)
  });

  test('spacex url function returns intended strings for launch pads and fetcher returns expected data', async () => {
    const path = "/launchpads"
    const options = { limit: 12, offset: 0 }
    const targetUrl = "https://api.spacexdata.com/v3/launchpads?limit=12&offset=0"

    const resultUrl = getSpaceXUrl(path, options)

    expect(resultUrl).toEqual(targetUrl)
  });
})

