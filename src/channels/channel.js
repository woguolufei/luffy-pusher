import {BaseChannel} from "./base_channel";

export class Channel extends BaseChannel {
    constructor(name, pusher) {
        super(name, pusher);
    }

    subscribe() {
        this.pusher.send({
            event: 'subscribe',
            data: {
                channel: this.name
            }
        });
    }
}