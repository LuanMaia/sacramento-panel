<template>
  <CharacterProfile
    :profilePictureUrl="profilePictureUrl"
    :textColor="textColor"
    :glitchType="glitchType"
    :characterName="characterName"
    :characterLife="characterLife"
    :characterMaxLife="characterMaxLife"
    :playerTag="playerTag"
    :showLife="showLife"
    :readonly="true"
  />
</template>

<script lang="ts">
import Vue from 'vue'

const UUID_QUERY_PARAM_NAME = 'character-uuid'
const TEXT_COLOR_QUERY_PARAM_NAME = 'text-color'
const GLITCH_TYPE = 'glitch-type'

export default Vue.extend({
  data() {
    return {
      profilePictureUrl: '',
      textColor: 'white',
      glitchType: 3,
      characterName: '',
      playerTag: '',
      characterLife: 0,
      characterMaxLife: 0,
      showLife: false,
    }
  },
  created() {
    const uuidQueryParam = this.$route.query[UUID_QUERY_PARAM_NAME]
    if (uuidQueryParam && typeof uuidQueryParam === 'string') {
      this.listenProfilePictureURLChange(uuidQueryParam)
      this.listenToCharacterNameChange(uuidQueryParam)
      this.listenToPlayerTagChange(uuidQueryParam)
      this.listenToCharacterLifeChange(uuidQueryParam)
      this.listenToCharacterMaxLifeChange(uuidQueryParam)
      this.listenToCharacterShowLifeChange(uuidQueryParam)
    }

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
    listenProfilePictureURLChange(characterUUID: string): void {
      const profileAvatarUrlRef = this.$fire.database
        .ref('character')
        .child(`${characterUUID}`)
        .child('profileAvatarUrl')

      profileAvatarUrlRef.on('value', (snapshot) => {
        const profileAvatarUrl: string = snapshot.val()
        this.profilePictureUrl = profileAvatarUrl
      })
    },
    listenToCharacterNameChange(characterUUID: string): void {
      const characterNameRef = this.$fire.database
        .ref('character')
        .child(`${characterUUID}`)
        .child('name')

      characterNameRef.on('value', (snapshot) => {
        const characterName: string = snapshot.val()
        this.characterName = characterName
      })
    },
    listenToPlayerTagChange(characterUUID: string): void {
      const characterPlayerTagRef = this.$fire.database
        .ref('character')
        .child(`${characterUUID}`)
        .child('playerTag')

      characterPlayerTagRef.on('value', (snapshot) => {
        const playerTag: string = snapshot.val()
        this.playerTag = playerTag
      })
    },
    listenToCharacterLifeChange(characterUUID: string): void {
      const characterLifeRef = this.$fire.database
        .ref('character')
        .child(`${characterUUID}`)
        .child('life')

      characterLifeRef.on('value', (snapshot) => {
        const characterLife: number = snapshot.val()
        this.characterLife = characterLife
      })
    },
    listenToCharacterMaxLifeChange(characterUUID: string): void {
      const characterMaxLifeRef = this.$fire.database
        .ref('character')
        .child(`${characterUUID}`)
        .child('maxLife')

      characterMaxLifeRef.on('value', (snapshot) => {
        const characterMaxLife: number = snapshot.val()
        this.characterMaxLife = characterMaxLife
      })
    },
    listenToCharacterShowLifeChange(characterUUID: string): void {
      const characterShowLifeRef = this.$fire.database
        .ref('character')
        .child(`${characterUUID}`)
        .child('showLifeOnProfile')

      characterShowLifeRef.on('value', (snapshot) => {
        const showLife: boolean = snapshot.val()
        this.showLife = showLife
      })
    },
  },
})
</script>