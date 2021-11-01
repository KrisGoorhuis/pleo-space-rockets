import useSWR, { SWRInfiniteResponseInterface, useSWRInfinite } from "swr";
import { Launch, LaunchPad } from "../model";
import { ExampleLaunch } from "../model/exampleLaunch";

interface QueryOptions {
  [x: string]: any // Keys in options dependent upon spacex api endpoint
}

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
) => {
  const response = await fetch(input, init); // previously '...args' - 
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return await response.json();
};

function getSpaceXUrl(path: string, options: QueryOptions) { 
  const searchParams = new URLSearchParams();
  for (const property in options) {
    searchParams.append(property, options[property]);
  }

  const spaceXApiBase = process.env.REACT_APP_SPACEX_API_URL;
  return `${spaceXApiBase}${path}?${searchParams.toString()}`;
}

export function useSpaceX<T>(path: string | null, options = {}) {
  let endpointUrl = null
  if (path) {
    endpointUrl = getSpaceXUrl(path, options);
  }
  return useSWR<T>(endpointUrl, fetcher);
}

export function useSpaceXPaginated<T>(path: string, options: QueryOptions) {
  return useSWRInfinite((pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) {
      return null;
    }
    return getSpaceXUrl(path, {
      ...options,
      offset: options.limit * pageIndex,
    });
  }, fetcher);
}
