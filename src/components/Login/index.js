/*
 * @Description: file content
 * @FilePath: \wlin-chat-web\src\components\Login\index.js
 */
import React,{ useState } from 'react';
import { useNavigate } from "react-router-dom";
import websocketUtils from '../../lib/websocketUtils';

import './style/index.less';
const Login = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("name");

    const login = () => {
        console.log(name);
        if (!name && name !== 0) {
            return;
        }
        localStorage.name = name;
        websocketUtils.initWebSocket();
        navigate('/ChatPage');
    }
    return (
        <div className="login">
            <i className="icon-chat"></i>
            <h2>请输入您的名字</h2>
            <input type="text" autoFocus onChange={(e) => { setName(e.target.value) }} onKeyUp={(e) => { if (e.key === 'Enter') { login() } }} />
        </div >
    )
}
export default Login;