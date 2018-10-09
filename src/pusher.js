import {Socket} from './connection/socket';
import {Dispatcher} from './events/dispatcher';
import {ChannelsMannager} from "./channels/channels_mannager";

export class Pusher {
    constructor(app_key, options) {
        this.checkAppKey(app_key);

        this.key = app_key;
        this.options = options || {};
        this.dispatcher = new Dispatcher();
        this.channels = new ChannelsMannager();

        this.connect();
    }

    connect() {
        this.socket = new Socket(this, this.options.host);
    }

    subscribe(channel_name) {
        this.channels.add(channel_name, this);
    }

    unsubscribe(channel_name) {
        this.channels.remove(channel_name);
    }

    getSocketId() {
        return this.socket.socket.socket_id;
    }

    send(json) {
        this.socket.send(json);
    }

    checkAppKey(key) {
        if (key !== 'a82393d886a0e6ddfae5') {
            throw "你的密钥不正确!";
        }
    }
}