## [Product Bio](https://docs.google.com/document/d/1FARv6wwxIcxTIKVK32WHXHITO5A19KgjidLm_0TBFmg/edit)

### Problem
I publish content through platforms like YouTube and Instagram, but they don’t let me organize and order my content the way I want. 

Viewers keep asking me to create content that I’ve already made. They’re unable to browse my content in a logical way, so it’s harder to find the content they want.
The platforms choose what videos show up beside mine. I want to be the one to present a viewing path to my audience.
I post content on Instagram and TikTok to supplement my YouTube content, but I can’t add these to my YouTube playlists without reuploading them.

### Narrow the domain:
I create instructional content on YouTube. Many of my videos depend on content I taught in previous videos, and there are a few ways to create logical progressions through my content. I wish I could present these “learning paths” to my audience.
Playlists are linear, so I can’t show a “split” in the learning path.
My videos require supplemental information, but I’m limited to the description box to provide this. The description box only shows this content if the user clicks on it, and they often don’t. I wish I could intersperse my text content with my videos.


### High Level Solution
An app that shows you all of your content and lets you organize it and share those organizations.
Folders
Simple collections of content, modeled after YouTube playlists. 
Order isn’t important
Can have a folder description
Paths / “Content Rolls”
Orders videos into progressions.
Can have splits in the path
Can have labeled sections
Can include text content as nodes in the path
Pages
Contain folders, paths, and videos. This is the “traditional CMS” part of the app, and it gives you a website to present your content. This doesn’t have to be part of the MVP; each folder/path is sharable on its own, and see #3 below.

### Guidelines
Frictionless import: no buy in from platforms, no need to log-in. This lets you create pages for creators as a fan, which is an important use-case and great for adoption.
“Interoperability”: Import videos and images from any platform and be able to use them the same way.
Platform output: Standalone pages shouldn’t be the only way to output; you should be able to output folders & paths back to the platforms. Develop the most native/integrated way to do this. (Generate video w/ rolling thumbnails for TikTok; image for Instagram/Twitter, etc.)
Familiar interface: Don’t get too fancy. Stay rooted in interfaces users have already seen (playlists, roadmaps)


## Usage

Those templates dependencies are maintained via [pnpm](https://pnpm.io) via `pnpm up -Lri`.

This is the reason you see a `pnpm-lock.yaml`. That being said, any package manager will work. This file can be safely be removed once you clone a template.

```bash
$ npm install # or pnpm install or yarn install
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm dev` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)
