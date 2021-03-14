<template>
  <div class="glitch" :class="`gl-${glitchType}`">
    <p class="life-text" :data-text="characterLife" v-if="characterLife != null" :style="`color: ${textColor};`">
      {{ characterLife }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

const UUID_QUERY_PARAM_NAME = 'character-uuid'
const TEXT_COLOR_QUERY_PARAM_NAME = 'text-color'
const GLITCH_TYPE = 'glitch-type'

export default Vue.extend({
  data() {
    return {
      characterLife: 0,
      textColor: 'white',
      glitchType: 1
    }
  },
  created() {
    this.characterLife = 0
    this.listenToCharacterLifeChange()

    const textColor = this.$route.query[TEXT_COLOR_QUERY_PARAM_NAME]
    if (typeof textColor === 'string') {
        this.textColor = textColor
    }
    const glitchType = this.$route.query[GLITCH_TYPE]
    if (typeof glitchType === 'string') {
        this.glitchType = +glitchType
    }
  },
  methods: {
    listenToCharacterLifeChange(): void {
      const uuidQueryParam = this.$route.query[UUID_QUERY_PARAM_NAME]
      if (!uuidQueryParam) {
        return
      }

      const characterLifeRef = this.$fire.database
        .ref('character')
        .child(`${uuidQueryParam}`)
        .child('life')

      characterLifeRef.on('value', (snapshot) => {
        const characterLife: number = snapshot.val()
        this.characterLife = characterLife
      })
    },
  },
})
</script>

<style lang="scss">
.life-text {
    font-size: 80vh;
}
</style>