# event-callback-webpack-plugin

[![NPM version](https://img.shields.io/npm/v/event-callback-webpack-plugin.svg)](https://www.npmjs.org/package/event-callback-webpack-plugin) 
[![Travis Build Status](https://img.shields.io/travis/itgalaxy/event-callback-webpack-plugin/master.svg?label=build)](https://travis-ci.org/itgalaxy/event-callback-webpack-plugin) 
[![devDependencies Status](https://david-dm.org/itgalaxy/event-callback-webpack-plugin/dev-status.svg)](https://david-dm.org/itgalaxy/event-callback-webpack-plugin?type=dev)

Add callbacks to webpack events.

## Install

```shell
npm install --save-dev event-callback-webpack-plugin
```

## Usage

```js
import EventCallbackWebpackPlugin from 'event-callback-webpack-plugin';

export default {
  plugins: [
    new EventCallbackWebpackPlugin('done', () => {
        console.log('Hello `done`!');
    })
  ]
};
```

Or

```js
import EventCallbackWebpackPlugin from 'event-callback-webpack-plugin';

export default {
  plugins: [
    new EventCallbackWebpackPlugin({
        emit: (compilation, callback) => {
            console.log('Hello `emit`!');
            
            return callback();
        },
        'after-emit': (compilation, callback) => {
            console.log('Hello `after-emit`!');
            
            return callback();
        }
    })
  ]
};
```

## Options

-   `events` - (require) `string` or `object` webpack events.
-   `callback` - (optional) callback function.

## Contribution

Feel free to push your code if you agree with publishing under the MIT license.

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
