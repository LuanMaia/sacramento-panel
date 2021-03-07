<template>
  <div>
    <b-card
      bg-variant="dark"
      text-variant="white"
      title="Vantagens e desvantagens"
    >
      <CharacteristicLine
        v-for="(characteristic, index) in characteristics"
        :key="index"
        :characteristic="characteristic"
        :index="index"
        :readonly="readonly"
      />
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    characteristics: Array,
    readonly: Boolean
  },
})
</script>