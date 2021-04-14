import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  InputBar,
  InputTitle,
  NormalButtonB,
  NormalButtonY,
  InputWrapper,
} from "../../components";
import logo from "../../images/Logo/logo@2x.png";
import { SocketContext, UserInfoContext } from "../../utils/contexts";

const LoginPageWrapper = styled.div`
  height: 100vh;
  poistion: relative;
  background-color: #353f67;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: flex-start;
`;

const Logo = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 300px;
  transition: all 0.3s linear;
  @media screen and (max-width: 479px) {
    ${(props) =>
      props.isFocus
        ? `top: 25%;
      height: 190px;`
        : ""}
  }
`;

const InputForm = styled.form`
  backgounrd-color: inherit;
  position: absolute;
  transition: all 0.3s linear;
  top: 70%;
  @media screen and (max-width: 479px) {
    ${(props) => (props.isFocus ? `top: 40%;` : "")}
  }
`;

const getFourNum = () => {
  const fourNum = Math.random().toString();
  const anonFourNum =
    fourNum[fourNum.length - 1] +
    fourNum[fourNum.length - 2] +
    fourNum[fourNum.length - 3] +
    fourNum[fourNum.length - 4];
  return anonFourNum;
};

export default function LoginPage() {
  // states
  const [isFocus, setFocus] = useState(false);
  const [start, setStart] = useState(false);
  // context
  const socket = useContext(SocketContext);
  const { setUserInfo } = useContext(UserInfoContext);
  // ref
  const inputRef = useRef(null);
  // history
  const history = useHistory();
  // handles
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("login", inputRef.current);
  };
  // effect
  useEffect(() => {
    socket.on("error", (error) => {
      if (error) {
        alert("此暱稱已經有人使用");
        return;
      }
    });
    socket.on("userInfo", (user) => {
      setUserInfo(user);
      history.push("/chatmode");
    });
  }, []);

  return (
    <LoginPageWrapper>
      <Logo src={logo} alt="logo" isFocus={isFocus} />
      <InputForm isFocus={isFocus} onSubmit={handleSubmit}>
        <InputWrapper>
          {isFocus && <InputTitle>暱稱</InputTitle>}
          <InputBar
            ref={inputRef}
            onChange={(e) => {
              inputRef.current = e.target.value;
              if (e.target.value.trim()) {
                setStart(true);
              } else {
                setStart(false);
              }
            }}
            placeholder="輸入暱稱"
            onBlur={(e) => {
              e.target.placeholder = "輸入暱稱";
              setFocus(false);
            }}
            onFocus={(e) => {
              e.target.placeholder = "請輸入中英文數字12個字元內的暱稱";
              setFocus(true);
            }}
          />
        </InputWrapper>
        {start ? (
          <NormalButtonY type="submit">開始聊吧</NormalButtonY>
        ) : (
          <NormalButtonB
            type="submit"
            onClick={() => {
              inputRef.current = `匿名聊客${getFourNum()}`;
            }}
          >
            匿名聊吧
          </NormalButtonB>
        )}
      </InputForm>
    </LoginPageWrapper>
  );
}
