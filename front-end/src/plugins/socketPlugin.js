import Vue from "vue";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

const SocketPlugin = {
  install(vue) {
    vue.mixin({});

    vue.prototype.$sendMessage = $payload => {
      socket.emit("chat", {
        message: $payload.message,
        name: $payload.name
      });
    };

    vue.prototype.$joinUser = $name => {
      socket.emit("login", {
        name: $name
      });
    };

    // 인스턴스 메소드 추가
    vue.prototype.$socket = socket;
  }
};

Vue.use(SocketPlugin);
