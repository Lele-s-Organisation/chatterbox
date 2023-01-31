<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-deprecated-router-link-tag-prop -->

<template>
  <h1>Select Chat:</h1>
  <div class="chatters-list">
    <div v-for="chatter in chatters" :key="chatter.id" class="chatter" :style="'background-image: url(' + chatter.image + ')'">
      <router-link :to="'/chats/' + chatter.id">
        <p class="inline">{{ chatter.name }}</p>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  data() {
    return {
      chatters: []
    }
  },
  mounted() {
    if(document.getElementById('eye-disctractor'))
      document.getElementById('eye-disctractor').remove();

    fetch('http://localhost:3000/chatters')
      .then(res => res.json())
      .then(data => {
        this.chatters = data;
      })
  }
}
</script>
<style scoped lang="scss">
.chatters-list {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}
.chatter {
    display: flex;
    padding: 1rem;
    border: 1px solid var(--color-border);
    border-radius: 5px;
    margin-bottom: 1rem;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    p{
      color: white;
    }
    
  }
.chatter::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
}

</style>