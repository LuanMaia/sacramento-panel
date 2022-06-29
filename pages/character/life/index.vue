<template>
  <LiveStreamLife
    :characterLife="characterLife"
    :characterMaxLife="characterMaxLife"
  />
</template>

<script lang="ts">
import Vue from 'vue'

const UUID_QUERY_PARAM_NAME = 'character-uuid'

export default Vue.extend({
  data() {
    return {
      characterLife: 0,
      characterMaxLife: 0,
    }
  },
  created() {
    this.characterLife = 0
    this.listenToCharacterLifeChange()
    this.listenToCharacterMaxLifeChange()
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
    listenToCharacterMaxLifeChange(): void {
      const uuidQueryParam = this.$route.query[UUID_QUERY_PARAM_NAME]
      if (!uuidQueryParam) {
        return
      }

      const characterMaxLifeRef = this.$fire.database
        .ref('character')
        .child(`${uuidQueryParam}`)
        .child('maxLife')

      characterMaxLifeRef.on('value', (snapshot) => {
        const characterMaxLife: number = snapshot.val()
        this.characterMaxLife = characterMaxLife
      })
    },
  },
})
</script>

<style lang="scss">
.life-text {
  font-size: 70vh;
  font-family: RobotoSlab;
}
</style>