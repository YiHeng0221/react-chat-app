export const setLocalStorage = (userInfo) => {
  return localStorage.setItem("userInfo", JSON.stringify(userInfo));
};
export const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem("userInfo"));
};

export const setRoomLocalStorage = (roomInfo) => {
  return localStorage.setItem("roomInfo", JSON.stringify(roomInfo));
};
export const getRoomLocalStorage = () => {
  return JSON.parse(localStorage.getItem("roomInfo"));
};
