/*
 * @Description: file content
 * @FilePath: \wlin-chat-web\src\App.js
 */
import React from 'react';
import * as ReactDOM from "react-dom/client";
import Login from './components/Login';
import ChatPage from './components/ChatPage';
import './App.less';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/ChatPage",
    element: <ChatPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />
}
export default App;