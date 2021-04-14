import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { ButtonBg, NormalButtonB } from "../../components";
import Brand from "../../components/Brand";
import lobbyButtonBg from "../../images/BgButton/lobbyButtonBg@2x.png";
import passwordButtonBg from "../../images/BgButton/passwordButtonBg@2x.png";
import randomButtonBg from "../../images/BgButton/randomButtonBg@2x.png";
import {
  RoomContext,
  SocketContext,
  UserInfoContext,
} from "../../utils/contexts";

const HomePageWrapper = styled.div`
  height: 100vh;
  padding-top: 70px;
  background-color: #353f67;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evently;
`;

const Span = styled.span`
  background-color: rgba(0, 0, 0, 0);
  font-weight: bold;
  font-size: 20px;
  color: ${(props) => (props.yellow ? "#fcd900" : "white")};
`;
const Title = styled.div`
  position: absolute;
  left: 15px;
  align-self: center;
  background-color: rgba(0, 0, 0, 0);
`;

const Population = styled.span`
  position: absolute;
  align-self: flex-end;
  left: 15px;
  bottom: 1em;
  font-weight: lighter;
  color: #cdcdcd;
  background-color: rgba(0, 0, 0, 0);
  font-size: 10px;
`;

export default function HomePage() {
  // state
  const [counts, setCounts] = useState({});
  // context
  const socket = useContext(SocketContext);
  const { setRoomInfo } = useContext(RoomContext);
  const { userInfo } = useContext(UserInfoContext);
  // history
  const history = useHistory();
  // handle
  const handleRandomChat = (e) => {
    e.preventDefault();
    socket.emit("randomChatSelect");
  };
  // effect
  useEffect(() => {
    socket.on("randomRoomNum", (randomRoomNum) => {
      setRoomInfo({ mode: "random", room: randomRoomNum });
      history.replace("/randomchat");
    });
  }, []);
  useEffect(() => {
    if (!userInfo) {
      history.replace("/");
    }
    socket.emit("getCount");
    socket.on("counts", (num) => {
      setCounts(num);
    });
    return () => {
      socket.emit("stopGetCount");
    };
  }, []);

  return (
    <React.Fragment>
      <Brand />
      <HomePageWrapper>
        <ButtonBg
          onClick={() => {
            setRoomInfo({ mode: "lobby", room: "lobby" });
          }}
          to="/lobby"
          replace
        >
          <img src={lobbyButtonBg} alt={"lobby"} width="300" height="150"></img>
          <Title>
            <Span yellow={true}>大廳</Span>
            <Span>聊吧</Span>
          </Title>
          <Population>在線聊客：{counts.lobbyCounts}位</Population>
        </ButtonBg>

        <ButtonBg to="/search" replace>
          <img
            src={passwordButtonBg}
            alt={"password"}
            width="300"
            height="150"
          ></img>
          <Title>
            <Span yellow={true}>密語</Span>
            <Span>聊吧</Span>
          </Title>
          <Population>在線聊客：{counts.passwordCounts}位</Population>
        </ButtonBg>

        <ButtonBg onClick={(e) => handleRandomChat(e)} to="/">
          <img
            src={randomButtonBg}
            alt={"random"}
            width="300"
            height="150"
          ></img>
          <Title>
            <Span yellow={true}>隨緣</Span>
            <Span>聊吧</Span>
          </Title>
          <Population>在線聊客：{counts.randomCounts}位</Population>
        </ButtonBg>
        <NormalButtonB
          onClick={() => {
            socket.emit("userLeft", userInfo);
            history.push("/");
          }}
        >
          離開
        </NormalButtonB>
      </HomePageWrapper>
    </React.Fragment>
  );
}
