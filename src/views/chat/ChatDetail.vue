<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div v-if="chatter">
    <h1>{{ chatter.name }}</h1>
    <p class="description">{{ chatter.message }}</p>
    <p class="compay"> {{ chatter.alive ? 'is alive' : 'is dead' }}</p>
    <button>{{ chatter.alive ? 'start chatting' : 'revive ⭐' }}</button>
  </div>
  <div v-if="chatter">
    <img class="profile-picture" :src="chatter.image" alt="loading">
  </div>
</template>

<script lang="ts">
export default {
  props: ['id'],
  data() {
    return {
      chatter: null,
    }
  },
  mounted() {
    fetch(`http://localhost:3000/chatters/${this.$route.params.id}`)
      .then(res => res.json())
      .then(data => this.chatter = data)
      .catch(err => console.log(err.message))
  },
  methods: {
    startChatting() {
      this.$router.push(`/chats/${this.$route.params.id}/chat`)
    }
  }
}
</script>
<style scoped>
  
  .description {
    margin-top: 2rem;
  }
  .compay {
    font-style: italic;
    font-weight: 600;
    margin-top: 2rem;
  }

  .profile-picture {
    width: 350px;
    height: 350px;
    margin: auto;
    object-fit: cover;
    border-radius: 50%;
  }
</style>