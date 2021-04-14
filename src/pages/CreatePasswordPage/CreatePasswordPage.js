import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  Brand,
  InputBarBlack,
  InputTitleBlack,
  InputWrapper,
  NormalButtonB,
  NormalButtonY,
} from "../../components";

import LoadingLogo from "../../images/LoadingIcon/password_loading_fail_icon@2x.png";
import {
  RoomContext,
  SocketContext,
  UserInfoContext,
} from "../../utils/contexts";

const LoadingWrapper = styled.div`
  z-index: 11;
  height: 100vh;
  poistion: relative;
  background-color: #252b45;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-40%, -50%);
  height: 175px;
`;
const Hints = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 65%;
  line-height: 1.5em;
  text-align: center;
  text-weight: lighter;
  color: #fcd900;
  font-size: 12px;
`;
const buttonCSS = {
  position: "absolute",
  top: "85%",
};
const CreateForm = styled.form`
  backgounrd-color: inherit;
  position: absolute;
  transition: all 0.3s linear;
  top: 75%;
  // @media screen and (max-width: 479px) {
  //   ${(props) => (props.isFocus ? `top: 40%;` : "")}
  // }
`;
export default function PasswordLoadingPage() {
  // state
  const [start, setStart] = useState(false);
  const history = useHistory();
  const socket = useContext(SocketContext);
  const passwordRef = useRef(null);
  const { setRoomInfo } = useContext(RoomContext);
  const { userInfo } = useContext(UserInfoContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    setRoomInfo({ mode: "password", room: passwordRef.current });
    socket.emit("addPasswordRoom", passwordRef.current);
    history.push("/passwordchat");
  };

  useEffect(() => {
    if (!userInfo) {
      history.replace("/");
    }
  }, []);
  return (
    <LoadingWrapper>
      <Brand />
      <Logo src={LoadingLogo} />
      <Hints>
        <span>抱歉！</span>
        <span>目前沒有相關密語聊客</span>
        <span>請試著輸入其他密語</span>
      </Hints>
      <CreateForm onSubmit={(e) => handleSubmit(e)}>
        <InputWrapper>
          <InputTitleBlack>密語</InputTitleBlack>
          <InputBarBlack
            onChange={(e) => {
              passwordRef.current = e.target.value.trim();
              if (e.target.value.trim()) {
                setStart(true);
              } else {
                setStart(false);
              }
            }}
            placeholder="請輸入密語如:台中、美食、劍與遠征、2020總統"
          />
        </InputWrapper>
        {start ? (
          <NormalButtonY style={buttonCSS} type="submit">
            創建聊天室
          </NormalButtonY>
        ) : (
          <NormalButtonB
            style={buttonCSS}
            onClick={() => {
              history.push("/chatmode");
            }}
          >
            離開
          </NormalButtonB>
        )}
      </CreateForm>
    </LoadingWrapper>
  );
}
