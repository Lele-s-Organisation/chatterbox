<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-if="chatter">
    <h3>Chatting with {{ chatter.name }}</h3>
    <img class="profile-picture-medium" :src="chatter.image" alt="loading">
    <div class="chat">
      <div v-for="message in chatter.messages" :key="message.id" class="message">
        <p :class="message.source === 'client' ? 'message-text-client' : 'message-text'">{{ message.text }}</p>
        <p class="message-time">{{ message.time ? message.time : now }}</p>
      </div>
      <div class="chat-input">
        <input @keyup.enter="sendMessage()" type="text" placeholder="Type your message here" v-model="inputMessage">
        <button @click="sendMessage()">Send</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'

export default {
  data() {
    return {
      chatterID: this.$route.params.id,
      chatter: null,
      now: new Date().toLocaleTimeString(),
      inputMessage: '',
      clientMessages: [],
      chatHistory: [],
    }
  },
  mounted() {
    this.getMessages();
    if(this.chatter)
      this.setInitialTime();
  },
  methods: {
    getMessages():void {
      fetch(`http://localhost:3000/chatters/${this.$route.params.id}`)
        .then(res => res.json())
        .then(
          data => this.chatter = data,
          // Add Existing Messages to Chat History
          data => this.chatHistory = data.messages,
        )
        .catch(err => console.log(err.message))
    },
    setInitialTime():void {
      for(let i = 0; i < this.chatter.messages.length; i++) {
        this.chatter.messages[i].time = new Date().toLocaleTimeString();
      }
    },
    sendMessage():void {
      let messageToSend = {
        id: this.chatter.id,
        name: this.chatter.name,
        image: this.chatter.image,
        messages: [],
        age: this.chatter.age,
        alive: this.chatter.alive,
      }

      for (let i = 0; i < this.chatter.messages.length; i++) {
        messageToSend.messages.push(this.chatter.messages[i]);
      }

      messageToSend.messages.push({
        id: this.chatter.messages.length + 1,
        text: this.inputMessage,
        time: new Date().toLocaleTimeString(),
        source: 'client',
      })

      axios.put(`/chatters/${this.chatterID}`, messageToSend)
        .then(function (response) {
          console.log(response);
          this.getMessages();
          this.clientMessage = ''
        })
        .catch(function (error) {
          console.log(error);
        });

    }
  }
}
</script>

<style scoped lang="scss">
.message {
  background: rgb(64, 64, 64);
  border-radius: 12px;
  padding: 15px 15px 22px;
  color: white;
  margin: 10px;
  width: fit-content;
}

.message:has(.message-text) {
  margin-right: 35%;
  :before {
    /* Message Bubble Tail */
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-right-color: rgb(64, 64, 64);
    border-left: 0;
    border-bottom: 0;
    margin-top: -10px;
    margin-left: -20px;
  }
  .message-time:before {
    display: none;
  }

}

.message:has(.message-text-client) {
  background: rgb(0, 0, 0);
  margin-left: 35%;
  float: right;
  :before {
    content: "";
    position: absolute;
    top: 0;
    right: -22px;
    width: 0;
    height: 0;
    transform: rotate(180deg);
    border: 10px solid transparent;
    border-right-color: rgb(0, 0, 0) !important;
    border-bottom: 0;
    margin-right: -10px;
  }
  .message-time:before {
    display: none;
  }
}

.message-time {
  font-size: 10px;
  position: absolute;
  right: 7px;
  bottom: 7px;
  opacity: 0.7;
}


.chat-input {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
  input {
    width: 80%;
    padding: 10px;
    border: none;
    border-radius: 12px;
    outline: none;
  }
}

</style>