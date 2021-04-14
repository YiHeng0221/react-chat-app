import React, { useState } from "react";
import styled from "styled-components";
import {
  HomePage,
  LoginPage,
  ChatPage,
  SearchPage,
  CreatePasswordPage,
} from "./pages";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import io from "socket.io-client";
import {
  RoomContext,
  SocketContext,
  UserInfoContext,
  LoadingContext,
} from "./utils/contexts";

const ENDPOINT = "http://localhost:5000/";

const Root = styled.div`
  poistion: fixed;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  background-color: #353f67;
  display: flex;
  flex-wrap: no-wrap;
  flex-direction: column;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
`;
let socket = io.connect(ENDPOINT, {
  transports: ["websocket"],
  reconnection: false,
});

function App() {
  const [roomInfo, setRoomInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Root>
      <Router>
        <Switch>
          <SocketContext.Provider value={socket}>
            <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
              <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
                <Route exact path="/" component={LoginPage} />
                <RoomContext.Provider value={{ roomInfo, setRoomInfo }}>
                  <Route exact path="/chatmode" component={HomePage} />
                  <Route exact path="/lobby" component={ChatPage} />
                  <Route exact path="/search" component={SearchPage} />
                  <Route exact path="/passwordchat" component={ChatPage} />
                  <Route exact path="/randomchat" component={ChatPage} />
                  <Route
                    exact
                    path="/createpassword"
                    component={CreatePasswordPage}
                  />
                </RoomContext.Provider>
              </LoadingContext.Provider>
            </UserInfoContext.Provider>
          </SocketContext.Provider>
        </Switch>
      </Router>
    </Root>
  );
}

export default App;
