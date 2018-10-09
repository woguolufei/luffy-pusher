# luffy-pusher


## 安装

``` bash
npm i luffy-pusher
```
  
## 使用

### 初始化

``` js
import {Pusher} from './pusher';

let pusher = new Pusher('a82393d886a0e6ddfae5', {
    host: 'ws://192.168.10.10:8081'
});

pusher.subscribe('order');
pusher.subscribe('private-order');
pusher.subscribe('presence-order');

```