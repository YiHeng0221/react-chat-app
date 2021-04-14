import { Link } from "react-router-dom";
import styled from "styled-components";
const NormalButtonY = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
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
  transition: all 0.05s linear;
  text-decoration: none;
  :focus {
    outline: none;
  }
  :active {
    opacity: 50%;
  }
  :mousedown {
    opacity: 50%;
  }
`;

const NormalButtonB = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: inherit;
  width: 300px;
  height: 45px;
  border-radius: 30px;
  border: 1.5px solid #fcd900;
  text-align: center;
  color: #fcd900;
  margin: 1.5em;
  margin-top: 0;
  padding: 1em;
  font-size: 0.9em;
  transition: all 0.05s linear;
  text-decoration: none;
  :focus {
    outline: none;
  }
  :active {
    opacity: 50%;
  }
  ${(props) => props.disabled && `opacity: 50%;`}
`;

const ButtonBg = styled(Link)`
  display: flex;
  position: relative;
  width: 300px;
  height: 150px;
  margin: 1.4em;
  margin-top: 0;
  transition: all 0.05s linear;
  text-decoration: none;
  :active {
    opacity: 50%;
  }
`;

export { NormalButtonB, NormalButtonY, ButtonBg };
