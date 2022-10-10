import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from 'query-string'
import './Chat.css'
import InfoBar from '../infobar/InfoBar'
import Messages from '../messages/Messages'
import Input from '../input/Input'

let socket;
const ENDPOINT = "http://localhost:5000";

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);
    socket = io(ENDPOINT, {
      withCredentials: true,
    });
    setRoom(room)
    setName(name)
    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnectBitch");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault()
    if(message){
      socket.emit('sendMessage',message,()=>setMessage(''))
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
