import { createContext } from "react";

const SocketContext = createContext(null);
const RoomContext = createContext(null);
const UserInfoContext = createContext(null);
const LoadingContext = createContext();

export { SocketContext, RoomContext, UserInfoContext, LoadingContext };
