import {Dispatcher} from "../events/dispatcher";

export class Socket extends Dispatcher {
    constructor(pusher, host) {
        super();

        this.pusher = pusher;
        this.socket = new WebSocket(host + '/' + this.pusher.key);

        this.bindListeners();
    }

    bindListeners() {
        this.socket.onopen = () => {
            this.onOpen();
        };
        this.socket.onerror = (error) => {
            this.onError(error);
        };
        this.socket.onclose = (closeEvent) => {
            this.onClose(closeEvent);
        };
        this.socket.onmessage = (message) => {
            this.onMessage(message);
        };
    }

    onOpen() {
        //初始状态
        this.state = 0;

        this.bind('authorization_success', (e) => {
            this.socket.socket_id = e.socket_id;
            this.state = 1;

            //订阅
            this.pusher.channels.subscribe();
        });

        this.bind('authorization_error', (e) => {
            this.state = -1;
            console.error(e.error)
        });

        //订阅成功
        /*this.bind('subscribe_success', (e) => {

        });*/

        this.send({
            event: 'authorization'
        });
    }

    onError(error) {
        console.error(error)
    }

    onClose(closeEvent) {
        if (this.socket.readyState == WebSocket.CLOSED) {
            if (closeEvent.type == 'close') {
                console.error('socket服务已断开!!')
            } else if (closeEvent.type == 'message') {
                console.error(closeEvent.data)
            } else {
                console.error('已断开!!')
            }
        }
    }

    onMessage(message) {
        let eData = JSON.parse(message.data);
        let event = eData.event;
        let data = eData.data;

        this.emit(event, data);
    }

    send(json) {
        if (this.state !== -1) {
            this.socket.send(JSON.stringify(json))
        }
    }
}