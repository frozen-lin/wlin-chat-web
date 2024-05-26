/*
 * @Author: linwei wlin@amarsoft.com
 * @Date: 2024-05-22 21:44:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-05-25 22:30:06
 * @FilePath: \wlin-chat-web\src\components\ChatPage\index.js
 */
import React from 'react';
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

    function handleSend(type, val) {
        if (type === 'text' && val.trim()) {
            appendMsg(messageUtils.createSendMesage({ text: val }));
            websocketUtils.send({
                messageType: 'text',
                messageData: val,
            });


            setTyping(true);

            setTimeout(() => {
                appendMsg(messageUtils.createRobotMessage({ text: 'Bala bala' }));
            }, 1000);
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