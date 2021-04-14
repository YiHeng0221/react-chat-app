export const initWebSocket = (ws) => {
  //對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
  ws.on("getMessage", (message) => {
    console.log(message);
  });
  ws.on("joinRoom", (message) => {
    console.log(message);
  });
};
