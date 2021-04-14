import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  Brand,
  LoadingDots,
  LoadingHints,
  NormalButtonB,
} from "../../components";

import LoadingLogo from "../../images/LoadingIcon/password_loading_icon@2x.png";

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

const buttonCSS = {
  position: "absolute",
  top: "85%",
};
export default function PasswordLoadingPage({ password }) {
  const history = useHistory();
  return (
    <LoadingWrapper>
      <Brand />
      <Logo src={LoadingLogo} />
      <LoadingHints>
        尋找密語「{password}」聊客中
        <LoadingDots />
      </LoadingHints>
      <NormalButtonB style={buttonCSS} onClick={() => history.push("chatmode")}>
        離開
      </NormalButtonB>
    </LoadingWrapper>
  );
}
