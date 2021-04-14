import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Brand } from "../../components";
import {
  InputTitleBlack,
  InputBarBlack,
  NormalButtonB,
  NormalButtonY,
  InputWrapper,
} from "../../components";

import { PasswordLoadingPage } from "../../pages";

import searchLogo from "../../images/Logo/password_chatroom_logo@2x.png";
import {
  LoadingContext,
  RoomContext,
  SocketContext,
} from "../../utils/contexts";

const SearchPageWrapper = styled.div`
  height: 100vh;
  poistion: relative;
  background-color: #252b45;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
const Logo = styled.img`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  transition: all 0.3s linear;
`;

const SearchForm = styled.form`
  position: absolute;
  top: 45%;
`;
const placeholderStyle = {
  "::placeholder": {
    "font-size": "8px",
  },
};
const LeftArrow = styled.div`
  z-index: 10;
  position: fixed;
  top: 35px;
  left: 30px;
  border: solid white;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 5px;
  transform: rotate(135deg);
  cursor: pointer;
`;
export default function SearchPage() {
  // state
  const [start, setStart] = useState(false);
  // context
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { roomInfo, setRoomInfo } = useContext(RoomContext);
  const socket = useContext(SocketContext);
  // ref
  const passwordRef = useRef(null);
  // history
  const history = useHistory();
  // handle
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    socket.emit("sendPassword", passwordRef.current);
  };
  // effect
  useEffect(() => {
    socket.on("isPasswordRoomExist", ({ boolean, password }) => {
      if (boolean && roomInfo) {
        setRoomInfo({ mode: "password", room: password });
        setIsLoading(false);
        history.replace("passwordchat");
      } else if (!boolean && roomInfo) {
        setIsLoading(false);
        history.replace("createpassword");
      }
    });
    return () => {
      setIsLoading(false);
    };
  }, []);
  return (
    <React.Fragment>
      {isLoading && <PasswordLoadingPage password={passwordRef.current} />}
      <SearchPageWrapper>
        <LeftArrow
          onClick={() => {
            history.push("/chatmode");
          }}
        />
        <Brand />
        <Logo src={searchLogo} />
        <SearchForm onSubmit={(e) => handleSubmit(e)}>
          <InputWrapper>
            <InputTitleBlack>密語</InputTitleBlack>
            <InputBarBlack
              ref={passwordRef}
              style={placeholderStyle}
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
            <NormalButtonY type="submit">尋找聊客</NormalButtonY>
          ) : (
            <NormalButtonB
              disabled
              onClick={(e) => {
                e.preventDefault();
                return;
              }}
            >
              尋找聊客
            </NormalButtonB>
          )}
        </SearchForm>
      </SearchPageWrapper>
    </React.Fragment>
  );
}
