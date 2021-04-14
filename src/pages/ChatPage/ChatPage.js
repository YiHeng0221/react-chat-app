import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  ChatContentWrapper,
  ChatHeader,
  ChatWrapper,
  LeftArrow,
  ChatBarMessage,
  ChatBarInputWrapper,
  ChatBarInputBar,
  ChatBarInputAddFile,
  ChatBarInputSubmit,
  MessageTimeStamp,
  Nickname,
  AdminMessage,
} from "../../components";

import enterIcon from "../../images/icon/ArrowIcon.png";
import cheersIcon from "../../images/icon/cheersIcon.png";
import cheersStick from "../../images/icon/cheersStick.png";
import lock from "../../images/icon/lockIcon.svg";
import {
  RoomContext,
  SocketContext,
  UserInfoContext,
} from "../../utils/contexts";

const CheerStick = styled.div`
  position: relative;
  margin: 15px;
  align-self: ${(props) => (props.user ? "flex-end" : "flex-start")};
`;
const MessageEnd = styled.div`
  max-height: 0;
`;
const PasswordInfo = styled.div`
  background-color: #3e66ff;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 30px;
  color: white;
  font-weight: lighter;
`;
const LockIcon = styled.img`
  margin-right: 10px;
`;

export default function ChatRoom() {
  // history
  const history = useHistory();
  // state
  const [isFocus, setIsFocus] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // context
  const socket = useContext(SocketContext);
  const { roomInfo, setRoomInfo } = useContext(RoomContext);
  const { userInfo } = useContext(UserInfoContext);
  // effect
  useEffect(() => {
    if (!userInfo) {
      history.replace("/");
    }
    if (roomInfo.room) {
      socket.emit("join", { userInfo, roomInfo });
      if (!userInfo.id || !roomInfo.room) {
        history.push("/");
      }
      const leaveRoom = () => {
        setRoomInfo({});
        socket.emit("leaveRoom", {
          userInfo: userInfo,
          roomInfo: roomInfo,
        });
      };
      return () => {
        leaveRoom();
      };
    }
  }, []);
  useEffect(() => {
    socket.on("message", (message) => {
      if (message.user === userInfo.name) return;
      setMessages([
        ...messages,
        {
          name: message.user,
          content: message.text,
          timeStamp: new Date().toLocaleTimeString([], {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    });
  }, [messages, socket]);

  // handle
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    setMessages([
      ...messages,
      {
        name: userInfo.name,
        content: message,
        timeStamp: new Date().toLocaleTimeString([], {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    socket.emit("sendMessage", { message, userInfo, roomInfo });
    setMessage("");
  };
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSendStick = () => {
    setMessages([
      ...messages,
      {
        name: userInfo.name,
        content: `#cheers`,
        timeStamp: new Date().toLocaleTimeString([], {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    socket.emit(
      "sendMessage",
      { message: `#cheers`, userInfo, roomInfo },
      () => {
        setMessage("");
      }
    );
  };

  //  對話置底
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ChatWrapper mode={roomInfo.mode}>
      <LeftArrow onClick={() => history.push("/chatmode")}>離開</LeftArrow>
      <ChatHeader mode={roomInfo.mode}>
        {roomInfo.mode === "lobby" ? "大廳聊吧" : "匿名聊客"}
      </ChatHeader>
      {roomInfo.mode === "password" && (
        <PasswordInfo>
          <LockIcon src={lock} alt="lock" />
          {roomInfo.room}
        </PasswordInfo>
      )}
      <ChatContentWrapper isFocus={isFocus}>
        {messages &&
          messages.map((message, index) =>
            message.name === "admin" ? (
              <AdminMessage key={index}>{message.content}</AdminMessage>
            ) : message.content === `#cheers` ? (
              <CheerStick
                key={index}
                user={message.name === userInfo.name ? true : false}
              >
                {message.name === userInfo.name
                  ? ""
                  : roomInfo.mode !== "random" && (
                      <Nickname>{message.name}</Nickname>
                    )}
                <img src={cheersStick} alt="stick" />
                <MessageTimeStamp
                  user={message.name === userInfo.name ? true : false}
                >
                  {message.timeStamp}
                </MessageTimeStamp>
              </CheerStick>
            ) : (
              <ChatBarMessage
                key={index}
                user={message.name === userInfo.name ? true : false}
              >
                {message.name === userInfo.name
                  ? ""
                  : roomInfo.mode !== "random" && (
                      <Nickname>{message.name}</Nickname>
                    )}
                {message.content}
                <MessageTimeStamp
                  user={message.name === userInfo.name ? true : false}
                >
                  {message.timeStamp}
                </MessageTimeStamp>
              </ChatBarMessage>
            )
          )}
        <MessageEnd ref={messagesEndRef} />
      </ChatContentWrapper>
      <ChatBarInputWrapper isFocus={isFocus} onSubmit={handleSubmit}>
        <ChatBarInputAddFile>+</ChatBarInputAddFile>
        <ChatBarInputBar
          value={message}
          onChange={handleInputChange}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
          placeholder="Aa"
        />

        <ChatBarInputSubmit>
          <img
            src={isFocus ? enterIcon : cheersIcon}
            alt={isFocus ? "submit" : "cheers"}
            onClick={isFocus ? handleSubmit : handleSendStick}
          />
        </ChatBarInputSubmit>
      </ChatBarInputWrapper>
    </ChatWrapper>
  );
}
