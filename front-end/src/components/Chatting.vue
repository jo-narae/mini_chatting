<template>
  <div>
    <v-row dense class="mb-5 chat-content" id="container">
      <v-col
        v-for="(item, i) in items"
        :key="i"
        cols="12"
      >
        <div v-if="item.type === 'notice'">
          <v-card flat>
            <v-card-text class="black-font text-center">
              {{item.message}}
            </v-card-text>
          </v-card>
        </div>
        <v-card flat v-else-if="item.from.name !== 'me'">
          <v-card-text>
            <div class="black-font bold-font">{{item.from.name}}</div>
            <v-alert
              class="width-half inline-block pa-2"
              outlined
              rounded="xl"
            >
              <div class="pa-1">{{item.message}}</div>
            </v-alert>
          </v-card-text>
        </v-card>
        <v-card flat v-else>
          <v-card-text>
            <v-alert
              class="width-half align-right pa-2"
              rounded="xl"
              color="primary"
              dark
            >
              <div class="pa-1">{{item.message}}</div>
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense class="chat-submit">
      <v-col cols="12">
        <v-card flat>
          <v-divider ></v-divider>
          <v-card-actions>
            <v-text-field
              flat solo
              background-color="grey lighten-3"
              rounded
              hide-details
              v-model="message"
              v-on:keyup.enter="submitMessageFunc(message)"
            ></v-text-field>
            <v-btn
                class="ml-2"
                text
                icon
                color="primary"
                @click="submitMessageFunc(message)"
              >
                <v-icon>mdi-send</v-icon>
              </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <chatting-login @setUserName="setUserName" />
  </div>
</template>

<script>
import ChattingLogin from '@/components/Login.vue';

export default {
  components: {
    ChattingLogin
  },
  data() {
    return {
      items: [],
      connected: [],
      disconnected: [],
      message: null,
      username: '',
    }
  },
  methods: {
    setUserName(nickname) {
      this.username = nickname;
    },
    scrollToEnd() {    	
      var container = this.$el.querySelector("#container");
      container.scrollTop = container.scrollHeight;
    },
    async submitMessageFunc(message) {
      this.$sendMessage({
        name: this.username,
        message
      });
      await this.items.push({ type: 'chat', from: { name: 'me' }, message });
      await this.scrollToEnd();
      this.message = '';
    },
  },
  created() {
    this.$socket.on('chat', async (data) => {
      await this.items.push(data);
      await this.scrollToEnd();
    });
    this.$socket.on('leave', async (data) => {
      await this.items.push({ type: 'notice', from: { name: data.name }, message: data.message });
    });
  }
}
</script>

<style>
::-webkit-scrollbar {
  display:none;
}
.black-font {
  color: black;
}
.bold-font {
  font-weight: 700;
}
.inline-block {
  display: inline-block !important;
}
.width-half {
  max-width: 70%;
}
.align-right {
  float: right;
}
.v-input__control {
  min-height: 36px !important;
}
.chat-content {
  max-height: 800px;
  overflow-y: auto;
  -ms-overflow-style: none;
}
.chat-submit {
  width: 100%;
  position: fixed;
  background-color: white;
  bottom: 0;
}

@media screen and (max-height: 700px) {
  .chat-content {
    max-height: 550px;
    overflow-y: auto;
    -ms-overflow-style: none;
  }
}
</style>