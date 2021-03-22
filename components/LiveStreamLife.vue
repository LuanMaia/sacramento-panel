<template>
  <div class="glitch" :class="`gl-${glitchType}`">
    <p
      class="life-text"
      :data-text="`${characterLife}/${characterMaxLife}`"
      v-if="characterLife != null"
      :style="`color: ${textColor};`"
    >
      {{ characterLife }}/{{ characterMaxLife }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    characterLife: Number,
    characterMaxLife: Number,
    textColor: String,
    glitchType: Number,
  },
})
</script>

<style lang="scss">
.life-text {
  font-size: 70vh;
  font-family: BenderBlack;
}
</style>