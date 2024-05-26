/*
 * @Description: file content
 * @FilePath: \wlin-chat-web\src\lib\websocketUtils.js
 */
const path = 'http://' + window.location.hostname;
const port = '8081';
const WebSocketClient = {
    messageHandlers:[],
    initWebSocket: () => { // 建立连接
        // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
        var userId = localStorage.name;
        var url = path.replace("https://", "wss://").replace("http://", "ws://") + ':' + port + "/websocket/" + userId;
        const websockt = new WebSocket(url);
        websockt.onopen = WebSocketClient.websocketonopen;
        websockt.onerror = WebSocketClient.websocketonerror;
        websockt.onmessage = WebSocketClient.websocketonmessage;
        websockt.onclose = WebSocketClient.websocketclose;
        return websockt;
    },
    // 连接成功后调用
    websocketonopen: function () {
        console.log("WebSocket连接成功");
    },
    // 发生错误时调用
    websocketonerror: function (e) {
        console.log("WebSocket连接发生错误");
    },
    // 接收后端消息
    websocketonmessage: function (e) {
        console.log(e);
        WebSocketClient.messageHandlers.forEach((cb)=>{
            cb(e);
        })
    },
    // 关闭连接时调用
    websocketclose: function (e) {
        console.log("connection closed (" + e.code + ")");
    }
}
let websocketClient = null;
const initWebSocket = ()=>{
    websocketClient = WebSocketClient.initWebSocket();
}
const websocketUtils = {
    initWebSocket,
    registerHandlers:(handler)=>{
        WebSocketClient.messageHandlers.push(handler);
    },
    send: (message) => {
        if(!websocketClient){
            initWebSocket();
            setTimeout(() => { websocketUtils.send(message) }, 1000);
            
            return;
        }
        websocketClient.send(JSON.stringify(message));
    }
};
export default websocketUtils;