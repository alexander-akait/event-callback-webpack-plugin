export default class EventCallbackWebpackPlugin {
    constructor(events, ...args) {
        if (Array.isArray(events)) {
            throw new Error("Option `events` should be `object` or `string`");
        }

        if (!events || Object.keys(events).length === 0) {
            throw new Error("Option `events` should not be empty");
        }

        if (typeof events === "string") {
            if (args.length === 0) {
                throw new Error("Require `callback` argument");
            }

            this.events = {};
            this.events[events] = args[0]; // eslint-disable-line prefer-destructuring
        } else {
            if (args.length > 0) {
                throw new Error(
                    "Don't pass second argument if first argument is `object`"
                );
            }

            this.events = events;
        }
    }

    apply(compiler) {
        Object.keys(this.events).forEach(event => {
            const callback = this.events[event];

            if (typeof callback !== "function") {
                throw new Error("Option `callback` should be a function");
            }

            compiler.plugin(event, (...args) => callback(...args));
        });
    }
}
