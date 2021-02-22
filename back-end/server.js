var app = require("express")();
var server = require("http").createServer(app);
var io = require("socket.io")(server, {
  pingTimeout: 1000,
  cors: {
    origin: "*",
  },
});

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// localhost:3000서버에 접속하면 클라이언트로 메세지을 전송한다
app.get("/", function (req, res) {
  res.sendFile("Hellow Chating App Server");
});

io.on("connection", function (socket) {
  socket.name = '';
  console.log(socket.id);

  // 로그인 하면 이름 저장
  socket.on("login", (data) => {
    socket.name = data.name;
    console.log("user connected: " + data.name);
    socket.broadcast.emit("chat", { type: 'notice', from: { name: socket.name }, message: `${socket.name} 님이 입장하셨습니다` });
  });

  // 클라이언트로부터의 메시지가 수신되면
  socket.on("chat", function (data) {
    console.log("Message from %s: %s", data.message, data.name);

    // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
    socket.broadcast.emit("chat", { type: 'chat', from: { name: data.name }, message: data.message });
  });

  socket.on("disconnect", function () {
    console.log("user disconnected: " + socket.name);
    socket.broadcast.emit("leave", { type: 'notice', from: { name: socket.name }, message: `${socket.name} 님이 퇴장하셨습니다` });
  });
});

server.listen(3000, function () {
  console.log("socket io server listening on port 3000");
});
