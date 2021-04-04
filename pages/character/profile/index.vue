<template>
  <CharacterProfile
    :textColor="textColor"
    :glitchType="glitchType"
    :profilePictureUrl="character.profileAvatarUrl"
    :characterName="character.name"
    :characterLife="character.life"
    :characterMaxLife="character.maxLife"
    :playerTag="character.playerTag"
    :showLife="character.showLifeOnProfile"
    :readonly="true"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { Character } from '@/assets/classes/character'

const UUID_QUERY_PARAM_NAME = 'character-uuid'
const TEXT_COLOR_QUERY_PARAM_NAME = 'text-color'
const GLITCH_TYPE = 'glitch-type'

export default Vue.extend({
  data() {
    return {
      textColor: 'white',
      glitchType: 3,
      character: new Character(),
    }
  },
  created() {
    const uuidQueryParam = this.$route.query[UUID_QUERY_PARAM_NAME]
    if (uuidQueryParam && typeof uuidQueryParam === 'string') {
      this.listenToCharacterDataChange(uuidQueryParam)
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
    listenToCharacterDataChange(characterUUID: string): void {
      const characterRef = this.$fire.database
        .ref('character')
        .child(`${characterUUID}`)

      characterRef.on('value', (snapshot) => {
        const characterData = snapshot.val()
        this.character = this.$convertFirebaseCharacterData(characterData)
      })
    },
  },
})
</script>