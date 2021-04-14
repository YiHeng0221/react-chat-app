import styled from "styled-components";
const InputBarBlack = styled.input`
  position: relative;
  box-sizing: border-box;
  background-color: inherit;
  width: 300px;
  height: 45px;
  border-radius: 30px;
  border: 1.5px solid #fcd900;
  text-align: center;
  color: #353f67;
  margin: 1.5em;
  margin-top: 0;
  padding: 1em;
  font-size: 0.9em;
  outline: none;
  :focus {
    color: white;
    font-weight: lighter;
  }
  ::placeholder {
    color: #cdcdcd;
    font-weight: lighter;
    font-size: 5px;
  }
`;
const InputTitleBlack = styled.span`
  padding: 0 2em;
  background-color: #252b45;
  position: absolute;
  top: -5px;
  left: 145px;
  z-index: 10;
  font-size: 0.5em;
  color: #fcd900;
  font-weight: lighter;
`;

const InputBar = styled.input`
  position: relative;
  box-sizing: border-box;
  background-color: #fcd900;
  width: 300px;
  height: 45px;
  border-radius: 30px;
  border: 1.5px solid #fcd900;
  text-align: center;
  color: #353f67;
  margin: 1.5em;
  margin-top: 0;
  padding: 1em;
  font-size: 0.9em;
  outline: none;
  ::placeholder {
    color: #353f67;
  }
  :focus {
    background-color: rgba(0, 0, 0, 0);
    color: white;
    ::placeholder {
      color: #cdcdcd;
      font-weight: lighter;
    }
  }
`;

const InputTitle = styled.span`
  padding: 0 1em;
  background-color: #353f67;
  position: absolute;
  top: -8px;
  left: 140px;
  z-index: 10;
  font-size: 1em;
  color: #fcd900;
  font-weight: lighter;
`;
const InputWrapper = styled.div`
  position: relative;
`;
export { InputBar, InputTitle, InputWrapper, InputBarBlack, InputTitleBlack };
