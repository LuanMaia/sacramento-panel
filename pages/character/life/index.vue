<template>
  <LiveStreamLife :characterLife="characterLife" :characterMaxLife="characterMaxLife"
    :profileAvatarUrl="profileAvatarUrl" />
</template>

<script lang="ts">
import Vue from 'vue'

const UUID_QUERY_PARAM_NAME = 'character-uuid'

export default Vue.extend({
  data() {
    return {
      characterLife: 0,
      characterMaxLife: 0,
      profileAvatarUrl: '',
    }
  },
  created() {
    this.characterLife = 0
    this.profileAvatarUrl = ''
    this.listenToCharacterLifeChange()
    this.listenToCharacterMaxLifeChange()
    this.listenToCharacterProfileAvatarUrl()
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
    listenToCharacterProfileAvatarUrl(): void {
      const uuidQueryParam = this.$route.query[UUID_QUERY_PARAM_NAME]
      if (!uuidQueryParam) {
        return
      }

      const characterProfileAvatarUrl = this.$fire.database
        .ref('character')
        .child(`${uuidQueryParam}`)
        .child('profileAvatarUrl')

      characterProfileAvatarUrl.on('value', (snapshot) => {
        const profileAvatarUrl: string = snapshot.val()
        this.profileAvatarUrl = profileAvatarUrl
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