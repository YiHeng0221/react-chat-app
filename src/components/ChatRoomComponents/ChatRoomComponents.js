import styled from "styled-components";

const ChatWrapper = styled.div`
  height: 100vh;
  background-color: ${(props) => {
    if (props.mode === "password") {
      return "#252b45";
    } else return "#353f67";
  }};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const ChatContentWrapper = styled.div`
  poistion: relative;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  @media screen and (max-width: 479px) {
    ${(props) => (props.isFocus ? `margin-bottom: 80%;` : "")}
  }
`;

const ChatHeader = styled.div`
  poistion: relative;
  z-index: 10;
  width: 100%;
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  color: white;
  background-color: ${(props) => {
    if (props.mode === "password") {
      return "#353f67";
    } else return "#252b45";
  }};
`;

const LeftArrow = styled.div`
  z-index: 11;
  position: absolute;
  top: 27px;
  left: 20px;
  cursor: pointer;
  font-size: 1em;
  font-weight: lighter;
  color: white;
`;

const ChatBarMessage = styled.div`
  position: relative;
  background-color: ${(props) => (props.user ? "#fcd900" : "white")};
  border-radius: ${(props) =>
    props.user ? "30px 30px 0px 30px" : "30px 30px 30px 0px"};
  max-width: 225px;
  display: flex;
  flex-wrap: wrap;
  padding: 15px;
  margin: 15px;
  align-self: ${(props) => (props.user ? "flex-end" : "flex-start")};
`;

// ChatBarInput
const ChatBarInputWrapper = styled.form`
  background-color: #7e8a97;
  width: 100vw;
  position: absolute;
  bottom: 0;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media screen and (max-width: 479px) {
    right: 0;
    left: 0;
    ${(props) => (props.isFocus ? `top: 50%;` : "")}
  }
`;

const ChatBarInputAddFile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: inherit;
  font-weight: lighter;
  font-size: 2em;
  color: #fcd900;
  margin: 0 5px 5px;
`;
const ChatBarInputBar = styled.input`
  background-color: inherit;
  border-radius: 30px;
  width: 80vw;
  height: 40%;
  border: 1px solid #f2f2f2;
  color: white;
  padding: 5px 15px;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #f2f2f2;
  }
  @media screen and (max-width: 479px) {
    width: 250px;
  }
`;
const ChatBarInputSubmit = styled.button`
  display: flex;
  align-items: center;
  background-color: inherit;
  outline: none;
  border: none;
  height: 25px;
  width: 25px;
  margin: 5px;
`;

const MessageTimeStamp = styled.div`
  position: absolute;
  bottom: 0;
  ${(props) => (props.user ? "left: -35px;" : "right: -35px;")}
  color: #fff;
  font-size: 5px;
  font-weight: lighter;
`;
const Nickname = styled.div`
  overflow: visible;
  display: flex;
  flex-wrap: no-wrap;
  position: absolute;
  top: -15px;
  left: 0px;
  color: #fff;
  font-size: 5px;
  font-weight: lighter;
  width: 50vw;
`;

const AdminMessage = styled.div`
  position: relative;
  background-color: rgba(0, 0, 0, 40%);
  border-radius: 10px 10px 10px 10px;
  max-width: 225px;
  display: flex;
  flex-wrap: wrap;
  padding: 15px;
  margin: 5px;
  align-self: center;
  color: white;
  font-size: 5px;
`;

export {
  ChatWrapper,
  ChatContentWrapper,
  ChatHeader,
  ChatBarMessage,
  LeftArrow,
  ChatBarInputWrapper,
  ChatBarInputBar,
  ChatBarInputAddFile,
  ChatBarInputSubmit,
  MessageTimeStamp,
  Nickname,
  AdminMessage,
};
