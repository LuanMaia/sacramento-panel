<template>
  <div>
    <b-card
      bg-variant="dark"
      text-variant="white"
      title="Vantagens e desvantagens"
    >
      <p v-for="(characteristic, index) in characteristics" :key="index">
        <span>{{ characteristic.name }}: </span>
        <span>{{ characteristic.description }}</span>
      </p>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    characteristics: Array,
  },
})
</script>