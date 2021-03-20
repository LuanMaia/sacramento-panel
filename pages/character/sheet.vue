<template>
  <div class="container">
    <div class="character-sheet">
      <div class="character-profile">
        <ProfileGroup
          :name="character.name"
          @name="updateName($event)"
          :player="character.player"
          @player="updatePlayer($event)"
          :description="character.description"
          @description="updateDescription($event)"
          :exp="character.exp"
          @exp="updateExp($event)"
          :life="character.life"
          @life="updateLife($event)"
          :maxLife="character.maxLife"
          :readonly="!isAuthenticated()"
        />
      </div>
      <div class="character-info row">
        <div class="col">
          <AttributesFieldGroup
            class="info-group"
            :attributes="character.attributes"
            @attributes="updateAttributes($event)"
            :readonly="!isAuthenticated()"
          />
          <EndurancesFieldGroup
            class="info-group"
            :endurances="character.endurances"
            @endurances="updateEndurances($event)"
            :readonly="!isAuthenticated()"
          />
          <BattleInventoryGroup
            class="info-group"
            :battleInventory="character.battleInventory"
            @battleInventory="updateBattleInventory($event)"
            :readonly="!isAuthenticated()"
          />
        </div>
        <div class="col">
          <ExpertisesFieldGroup
            class="info-group"
            :expertises="character.expertises"
            @expertises="updateExpertises($event)"
            :readonly="!isAuthenticated()"
          />
          <CharacteristicsGroup
            class="info-group"
            :characteristics="character.characteristics"
            :readonly="!isAuthenticated()"
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
import { Attributes } from '@/assets/classes/attributes'
import { Expertises } from '@/assets/classes/expertises'
import { Endurances } from '@/assets/classes/endurances'
import { BattleInventory } from '@/assets/classes/battle-inventory'

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
    isAuthenticated(): boolean {
      return this.$fire.auth.currentUser != null
    },
    updateName(name: String): void {
      const uuidQueryParam = this.$route.query[uuidQueryParamName]
      if (!uuidQueryParam) {
        return
      }

      const nameRef = this.$fire.database
        .ref('character')
        .child(`${uuidQueryParam}`)
        .child('name')

      nameRef.set(name)
    },
    updatePlayer(player: String): void {
      const uuidQueryParam = this.$route.query[uuidQueryParamName]
      if (!uuidQueryParam) {
        return
      }

      const playerRef = this.$fire.database
        .ref('character')
        .child(`${uuidQueryParam}`)
        .child('player')

      playerRef.set(player)
    },
    updateDescription(description: String): void {
      const uuidQueryParam = this.$route.query[uuidQueryParamName]
      if (!uuidQueryParam) {
        return
      }

      const descriptionRef = this.$fire.database
        .ref('character')
        .child(`${uuidQueryParam}`)
        .child('description')

      descriptionRef.set(description)
    },
    updateExp(exp: Number): void {
      const uuidQueryParam = this.$route.query[uuidQueryParamName]
      if (!uuidQueryParam) {
        return
      }

      const expRef = this.$fire.database
        .ref('character')
        .child(`${uuidQueryParam}`)
        .child('exp')

      expRef.set(exp)
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
    updateAttributes(attributes: Attributes): void {
      const uuidQueryParam = this.$route.query[uuidQueryParamName]
      if (!uuidQueryParam) {
        return
      }

      const attributesRef = this.$fire.database
        .ref('character')
        .child(`${uuidQueryParam}`)
        .child('attributes')

      attributesRef.set(attributes)
    },
    updateEndurances(endurances: Endurances): void {
      const uuidQueryParam = this.$route.query[uuidQueryParamName]
      if (!uuidQueryParam) {
        return
      }

      const attributesRef = this.$fire.database
        .ref('character')
        .child(`${uuidQueryParam}`)
        .child('endurances')

      attributesRef.set(this.$convertEnduranceEndurancesToFirebase(endurances))
    },
    updateBattleInventory(battleInventory: BattleInventory): void {
      const uuidQueryParam = this.$route.query[uuidQueryParamName]
      if (!uuidQueryParam) {
        return
      }

      const attributesRef = this.$fire.database
        .ref('character')
        .child(`${uuidQueryParam}`)
        .child('battleInventory')

      attributesRef.set(this.$convertBattleInventoryToFirebase(battleInventory))
    },
    updateExpertises(expertises: Expertises): void {
      const uuidQueryParam = this.$route.query[uuidQueryParamName]
      if (!uuidQueryParam) {
        return
      }

      const expertisesRef = this.$fire.database
        .ref('character')
        .child(`${uuidQueryParam}`)
        .child('expertises')

      expertisesRef.set(expertises)
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
