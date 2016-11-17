# event-callback-webpack-plugin

[![NPM version](https://img.shields.io/npm/v/event-callback-webpack-plugin.svg)](https://www.npmjs.org/package/event-callback-webpack-plugin) 
[![Travis Build Status](https://img.shields.io/travis/itgalaxy/event-callback-webpack-plugin/master.svg?label=build)](https://travis-ci.org/itgalaxy/event-callback-webpack-plugin) 
[![devDependencies Status](https://david-dm.org/itgalaxy/event-callback-webpack-plugin/dev-status.svg)](https://david-dm.org/itgalaxy/event-callback-webpack-plugin?type=dev)

## Install

```shell
npm install --save-dev event-callback-webpack-plugin
```

## Usage

```js
const EventCallbackWebpackPlugin = require('event-callback-webpack-plugin').default;

module.exports = {
  plugins: [
    new EventCallbackWebpackPlugin('done', () => {
        console.log('Hello World!');
    })
  ]
}
```

Or

```js
import EventCallbackWebpackPlugin from 'event-callback-webpack-plugin';

export default {
  plugins: [
    new EventCallbackWebpackPlugin('done', () => {
        console.log('Hello World!');
    })
  ]
};
```

## Options

- `event` - (require) webpack event.
- `callback` - (require) callback function.

## Contribution

Feel free to push your code if you agree with publishing under the MIT license.

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
