[![Netlify Status](https://api.netlify.com/api/v1/badges/59a03ed4-bf70-4441-b65c-200bcd61c013/deploy-status)](https://app.netlify.com/sites/shortstax/deploys)

### CSS
[PostCSS](https://postcss.org) to  **bundle**, **import from NPM, local or remote URLs**, handy [easings](https://easings.net), plus [postcss-preset-env](https://preset-env.netlify.app/) for **latest CSS features**. 

### JS
[Rollup](https://rollupjs.org) to **bundle**, **treeshake**, **import from NPM, local or remote URLs**, **import processed CSS**, plus [babel-preset-env](https://babeljs.io/docs/en/babel-preset-env) for **latest JS features**. 

### Servers
[Browsersync](https://www.browsersync.io) with all the goodies for local dev: **live reload**, **hot swap CSS**, **scroll syncing**, **remote debugging**, [etc](https://www.browsersync.io). Prod server is just a static server.

<br>

> Watch me break it down on [YouTube!](https://links.argyle.ink/shortstack)

<br><br>

## Getting Started
[use this as a Github template](https://github.com/argyleink/shortstack/generate)

OR

#### Clone Shortstack into a new folder
1. `mkdir new-project-name && cd $_`
1. `git clone --depth=1 https://github.com/argyleink/shortstack.git . && rm -rf ./.git`

OR (essentially the same thing with npx+degit)

1. `npx degit argyleink/shortstack`

#### Install tools and spin it up
1. `npm i`
1. `npm start`

<br><br>

## Development
Running `npm start` runs Browsersync, Rollup and Postcss concurrently, watching changes to your files in `./app` and refreshes connected browsers.

## Production
Running `npm run build` compiles and minifies your code in `app` and outputs the optimised result to a folder called `dist` that's ready for static hosting.

Running `npm run production` will build your project and start a server at `dist`.
