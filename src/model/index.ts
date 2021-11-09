import { ExampleLaunch } from "./example-launch";
import { ExampleLaunchPad } from "./example-launch-pads";



export interface BreadcrumbObject {
   label: string
   to?: string
}

export interface LaunchPadProps {
   launchPad: LaunchPad
}

export interface LaunchProps {
   launch: Launch
}

// Our type cheat doesn't work with empty arrays, so we'll replace 'never[]'
interface UpdatedLinks extends Omit<typeof ExampleLaunch.links, 'flickr_images'> {
   flickr_images: string[]
}

export interface Launch extends Omit<typeof ExampleLaunch, 'links'> { 'links': UpdatedLinks }

export type LaunchPad = typeof ExampleLaunchPad