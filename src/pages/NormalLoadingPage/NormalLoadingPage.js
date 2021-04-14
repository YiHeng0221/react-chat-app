import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  Brand,
  NormalButtonB,
  LoadingDots,
  LoadingHints,
} from "../../components";

import NormalLoadingLogo from "../../images/LoadingIcon/normal_loading_icon@2x.png";

const LoadingWrapper = styled.div`
  z-index: 20;
  height: 100vh;
  poistion: relative;
  background-color: #353f67;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: ${(props) => (props.isNormal ? "300px" : "175px")};
`;

const buttonCSS = {
  position: "absolute",
  top: "588px",
};

export default function NormalLoadingPage() {
  const history = useHistory();
  return (
    <LoadingWrapper>
      <Brand />
      <Logo src={NormalLoadingLogo} />

      <LoadingHints>
        尋找聊客中
        <LoadingDots />
      </LoadingHints>
      <NormalButtonB style={buttonCSS} onClick={() => history.push("chatmode")}>
        離開
      </NormalButtonB>
    </LoadingWrapper>
  );
}
