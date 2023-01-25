<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <h1>Start chatting here</h1>
  <div v-if="chatter">
    <h1>{{ chatter.name }}</h1>
    <p class="description">{{ chatter.message }}</p>
    <p class="compay"> {{ chatter.alive ? 'is alive' : 'is dead' }}</p>
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
</style>