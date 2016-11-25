import EventCallbackWebpackPlugin from '../EventCallbackWebpackPlugin';
// eslint-disable-next-line node/no-unpublished-import
import test from 'ava';
// eslint-disable-next-line node/no-unpublished-import
import webpack from 'webpack';
import webpackConfigBase from './config/config-base';

test.cb('should execute successfully if `events` first argument and `callback` second argument', (t) => {
    t.plan(2);

    webpackConfigBase.plugins = [
        new EventCallbackWebpackPlugin('done', (stats) => {
            t.true(stats.compilation.errors.length === 0);
        })
    ];

    const webpackOptions = Object.assign({}, webpackConfigBase);

    webpack(webpackOptions, (error, stats) => {
        if (error) {
            throw error;
        }

        t.true(stats.compilation.errors.length === 0);

        t.end();
    });
});

test.cb('should execute successfully if `events` first argument with multiple events', (t) => {
    t.plan(5);

    webpackConfigBase.plugins = [
        new EventCallbackWebpackPlugin({
            'after-emit': (compilation, callback) => {
                t.true(compilation.errors.length === 0);
                t.true(typeof callback === 'function');

                return callback();
            },
            emit: (compilation, callback) => {
                t.true(compilation.errors.length === 0);
                t.true(typeof callback === 'function');

                return callback();
            }
        })
    ];

    const webpackOptions = Object.assign({}, webpackConfigBase);

    webpack(webpackOptions, (error, stats) => {
        if (error) {
            throw error;
        }

        t.true(stats.compilation.errors.length === 0);

        t.end();
    });
});

test.cb('should accept all argument from `webpack` event', (t) => {
    t.plan(3);

    webpackConfigBase.plugins = [
        new EventCallbackWebpackPlugin('emit', (compilation, callback) => {
            t.true(compilation.errors.length === 0);
            t.true(typeof callback === 'function');

            return callback();
        })
    ];

    const webpackOptions = Object.assign({}, webpackConfigBase);

    webpack(webpackOptions, (error, stats) => {
        if (error) {
            throw error;
        }

        t.true(stats.compilation.errors.length === 0);

        t.end();
    });
});

test('should execute failed when not filled options', (t) => {
    t.throws(() => new EventCallbackWebpackPlugin(), 'Option `events` should not be empty');
});

test('should execute failed when `events` is empty `object`', (t) => {
    t.throws(() => new EventCallbackWebpackPlugin({}), 'Option `events` should not be empty');
});

test('should execute failed when `events` is not empty `object` and `callback` is not a function', (t) => {
    webpackConfigBase.plugins = [
        new EventCallbackWebpackPlugin({
            done: 'test'
        })
    ];

    const webpackOptions = Object.assign({}, webpackConfigBase);

    // eslint-disable-next-line no-empty-function
    t.throws(() => webpack(webpackOptions, () => {}), 'Option `callback` should be a function');
});

test('should execute failed when `events` is not empty `object` and filed `callback`', (t) => {
    t.throws(() => new EventCallbackWebpackPlugin({
        done: () => {} // eslint-disable-line no-empty-function
    }, () => {}), 'Don\'t pass second argument if first argument is `object`'); // eslint-disable-line no-empty-function
});

test('should execute failed when `events` is array', (t) => {
    t.throws(() => new EventCallbackWebpackPlugin([]), 'Option `events` should be `object` or `string`');
});

test('should execute failed when `events` is string and `callback` not filled', (t) => {
    t.throws(() => new EventCallbackWebpackPlugin('done'), 'Require `callback` argument');
});
