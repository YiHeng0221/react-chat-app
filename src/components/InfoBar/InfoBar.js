import styled, { keyframes } from "styled-components";

const LoadingDotsAniKey = keyframes`
  0%, 20% {
    color: rgba(0,0,0,0);
    text-shadow:
      .25em 0 0 rgba(0,0,0,0),
      .5em 0 0 rgba(0,0,0,0);
    }
  40% {
    color: #cdcdcd;
    text-shadow:
      .25em 0 0 rgba(0,0,0,0),
      .5em 0 0 rgba(0,0,0,0);
    }
  60% {
    text-shadow:
      .25em 0 0 #cdcdcd,
      .5em 0 0 rgba(0,0,0,0);
    }
  80%, 100% {
    text-shadow:
      .25em 0 0 #cdcdcd,
      .5em 0 0 #cdcdcd;
    }
`;
const LoadingDots = styled.span`
  :after {
    content: " .";
    animation: ${LoadingDotsAniKey} 1s steps(5, end) infinite;
  }
`;

const LoadingHints = styled.div`
  position: absolute;
  top: 70%;
  text-align: center;
  text-weight: lighter;
  color: #cdcdcd;
  background-color: rgba(0, 0, 0, 0);
  opacity: 50%;
`;

export { LoadingDots, LoadingHints };
