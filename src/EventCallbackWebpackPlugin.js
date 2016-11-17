export default class EventCallbackWebpackPlugin {
    constructor(event, callback) {
        if (!event) {
            throw new Error('Require `event` argument');
        }

        if (!callback) {
            throw new Error('Require `callback` argument');
        }

        this.event = event;
        this.callback = callback;
    }

    apply(compiler) {
        compiler.plugin(this.event, (...args) => this.callback(args));
    }
}
