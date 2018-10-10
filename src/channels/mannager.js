import {Channel} from "./channel";
import {PresenceChannel} from "./presence_channel";
import {PrivateChannel} from "./private_channel";

export class Mannager {
    constructor() {
        this.channels = {};
    }

    add(name, pusher) {
        if (!this.channels[name]) {
            this.channels[name] = createChannel(name, pusher);
        }
        return this.channels[name];
    }

    all() {
        return Object.keys(this.channels);
    }

    find(name) {
        return this.channels[name];
    }

    remove(name) {
        let channel = this.channels[name];
        delete this.channels[name];
        return channel;
    }

    subscribe() {
        for (let i in this.channels) {
            this.channels[i].subscribe();
        }

    }
}

function createChannel(name, pusher) {
    if (name.indexOf('private-') === 0) {
        return new PrivateChannel(name, pusher);
    } else if (name.indexOf('presence-') === 0) {
        return new PresenceChannel(name, pusher);
    } else {
        return new Channel(name, pusher);
    }
}