import {Channel} from "./channel";
import axios from 'axios';

export class PrivateChannel extends Channel {
    constructor(name, pusher) {
        super(name, pusher);

        this.auth = null;
    }

    subscribe() {
        if (this.auth === null) {
            axios.get('http://tests.test/api/pusher/auth', {
                params: {
                    channel_name: this.name,
                    socket_id: this.pusher.getSocketId()
                }
            }).then((e) => {
                this.auth = e.data.auth;
                this.pusher.send({
                    event: 'subscribe',
                    data: {
                        channel: this.name,
                        auth: this.auth
                    }
                });
            }).catch((e) => {
                console.error('私有频道权限不足!');
            });
        }
        /*this.pusher.socket.send({
            event: 'subscribe',
            data: {
                channel: this.name
            }
        });*/
    }
}