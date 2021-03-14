<template>
  <div class="container">
    <div class="character-sheet">
      <div class="character-profile">
        <ProfileGroup
          :name="character.name"
          :player="character.player"
          :description="character.description"
          :exp="character.exp"
          :life="character.life"
          @life="updateLife($event)"
          :readonly="true"
        />
      </div>
      <div class="character-info row">
        <div class="col">
          <AttributesFieldGroup
            class="info-group"
            v-bind:attributes="character.attributes"
            :readonly="true"
          />
          <EndurancesFieldGroup
            class="info-group"
            v-bind:endurances="character.endurances"
            :readonly="true"
          />
          <BattleInventoryGroup
            class="info-group"
            :battleInventory="character.battleInventory"
            :readonly="true"
          />
        </div>
        <div class="col">
          <ExpertisesFieldGroup
            class="info-group"
            v-bind:expertises="character.expertises"
            :readonly="true"
          />
          <CharacteristicsGroup
            class="info-group"
            :characteristics="character.characteristics"
            :readonly="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import { Character } from '@/assets/classes/character'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

const uuidQueryParamName = 'character-uuid'

export default Vue.extend({
  mounted() {
    this.listenToCharacterDataChange()
  },
  data() {
    return {
      character: new Character(),
    }
  },
  methods: {
    listenToCharacterDataChange(): void {
      const uuidQueryParam = this.$route.query[uuidQueryParamName]
      if (!uuidQueryParam) {
        return
      }

      const characterRef = this.$fire.database
        .ref('character')
        .child(`${uuidQueryParam}`)

      characterRef.on('value', (snapshot) => {
        const characterData = snapshot.val()
        this.character = this.$convertFirebaseCharacterData(characterData)
      })
    },
    updateLife(life: Number): void {
      const uuidQueryParam = this.$route.query[uuidQueryParamName]
      if (!uuidQueryParam) {
        return
      }

      const lifeRef = this.$fire.database
        .ref('character')
        .child(`${uuidQueryParam}`)
        .child('life')

      lifeRef.set(life)
    },
  },
})
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  > .character-sheet {
    width: 100vw;

    > .character-profile {
      width: 50%;
      margin: 2rem auto 2rem auto;
    }

    > .character-info .info-group {
      margin-bottom: 1rem;
    }
  }
}
</style>
