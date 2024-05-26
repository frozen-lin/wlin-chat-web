/*
 * @Author: linwei wlin@amarsoft.com
 * @Date: 2024-05-22 21:44:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-05-26 15:24:21
 * @FilePath: \wlin-chat-web\src\components\ChatPage\index.js
 */
import React,{ useState, useEffect } from 'react';
import '@chatui/core/es/styles/index.less';
import websocketUtils from '../../lib/websocketUtils';
import messageUtils from '../../lib/messageUtils';
// 引入组件
import Chat, { Bubble, useMessages } from '@chatui/core';
// 引入样式
import '@chatui/core/dist/index.css';

const ChatPage = () => {
    const initialMessages = [
        messageUtils.createSystemMessage({ text: `${localStorage.name}，请开始聊天吧！` }),
    ];
    
    const { messages, appendMsg, setTyping } = useMessages(initialMessages);

    useEffect(() => {
        websocketUtils.registerHandlers((e) => {
            console.log(e);
            const messageResp = JSON.parse(e.data);
            const content = {
                text: messageResp.message,
            };
            if (messageResp.messageType === 'System') {
                appendMsg(messageUtils.createSystemMessage(content));
            }
            if (messageResp.messageType === 'User') {
                appendMsg(messageUtils.createOtherUserMesage(content, messageResp.fromUserId));
            }
    
            if (messageResp.messageType === 'AI') {
                appendMsg(messageUtils.createRobotMessage(content));
            }
        })
    },[]);

    function handleSend(type, val) {
        if (type === 'text' && val.trim()) {
            appendMsg(messageUtils.createSendMesage({ text: val }));
            websocketUtils.send({
                messageType: 'text',
                messageData: val,
            });

        }
    }

    function renderMessageContent(msg) {
        const { content } = msg;
        return <Bubble content={content.text} />;
    }

    return (
        <Chat
            navbar={{ title: '群聊' }}
            messages={messages}
            renderMessageContent={renderMessageContent}
            onSend={handleSend}
        />
    );
};

export default ChatPage;