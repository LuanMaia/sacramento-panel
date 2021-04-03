<template>
  <div>
    <Navbar />
    <main class="container">
      <div class="character-sheet">
        <div class="character-profile">
          <ProfileGroup
            :name="character.name"
            @name="updateName($event)"
            :playerTag="character.playerTag"
            @playerTag="updatePlayerTag($event)"
            :description="character.description"
            @description="updateDescription($event)"
            :exp="character.exp"
            @exp="updateExp($event)"
            :life="character.life"
            @life="updateLife($event)"
            :maxLife="character.maxLife"
            :readonly="!isAuthenticated()"
            :profilePictureUrl="character.profileAvatarUrl"
            @uploadProfileAvatar="uploadProfileAvatar($event)"
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
              @characteristics="updateCharacteristics($event)"
              :readonly="!isAuthenticated()"
            />
          </div>
        </div>
      </div>
    </main>
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
import { Characteristic } from '@/assets/classes/characteristic'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

const uuidQueryParamName = 'character-uuid'

export default Vue.extend({
  data() {
    return {
      character: new Character(),
      uuidQueryParam: this.$route.query[uuidQueryParamName],
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path === this.$route.path) {
      this.stopListeningCharacterDataChange()
      this.uuidQueryParam = to.query[uuidQueryParamName]
      if (this.uuidQueryParam) {
        this.listenToCharacterDataChange()
      } else {
        this.$router.push({ path: '/' })
      }
    }
    next()
  },
  mounted() {
    if (this.uuidQueryParam) {
      this.listenToCharacterDataChange()
    } else {
      this.$router.push({ path: '/' })
    }
  },
  methods: {
    stopListeningCharacterDataChange(): void {
      this.$fire.database.ref('character').child(`${this.uuidQueryParam}`).off()
    },
    listenToCharacterDataChange(): void {
      const characterRef = this.$fire.database
        .ref('character')
        .child(`${this.uuidQueryParam}`)

      characterRef.on('value', (snapshot) => {
        const characterData = snapshot.val()
        this.character = this.$convertFirebaseCharacterData(characterData)
      })
    },
    isAuthenticated(): boolean {
      return this.$fire.auth.currentUser != null
    },
    updateProfilePictureURL(): void {
      this.$fire.storage
        .ref('character/profile/picture')
        .child(`${this.uuidQueryParam}.png`)
        .getDownloadURL()
        .then((url: string) => {
          const profileAvatarRef = this.$fire.database
            .ref('character')
            .child(`${this.uuidQueryParam}`)
            .child('profileAvatarUrl')

          profileAvatarRef.set(`${url}&timestamp=${Date.now()}`)
        })
    },
    uploadProfileAvatar(file: File): void {
      this.$fire.storage
        .ref('character/profile/picture')
        .child(`${this.uuidQueryParam}.png`)
        .put(file)
        .then(() => {
          this.updateProfilePictureURL()
        })
    },
    updateName(name: String): void {
      const nameRef = this.$fire.database
        .ref('character')
        .child(`${this.uuidQueryParam}`)
        .child('name')

      nameRef.set(name)
    },
    updatePlayerTag(playerTag: String): void {
      const playerRef = this.$fire.database
        .ref('character')
        .child(`${this.uuidQueryParam}`)
        .child('playerTag')

      playerRef.set(playerTag)
    },
    updateDescription(description: String): void {
      const descriptionRef = this.$fire.database
        .ref('character')
        .child(`${this.uuidQueryParam}`)
        .child('description')

      descriptionRef.set(description)
    },
    updateExp(exp: Number): void {
      const expRef = this.$fire.database
        .ref('character')
        .child(`${this.uuidQueryParam}`)
        .child('exp')

      expRef.set(+exp)
    },
    updateLife(life: Number): void {
      const lifeRef = this.$fire.database
        .ref('character')
        .child(`${this.uuidQueryParam}`)
        .child('life')

      lifeRef.set(+life)
    },
    updateAttributes(attributes: Attributes): void {
      const attributesRef = this.$fire.database
        .ref('character')
        .child(`${this.uuidQueryParam}`)
        .child('attributes')

      attributesRef.set(attributes)
    },
    updateEndurances(endurances: Endurances): void {
      const attributesRef = this.$fire.database
        .ref('character')
        .child(`${this.uuidQueryParam}`)
        .child('endurances')

      attributesRef.set(this.$convertEnduranceEndurancesToFirebase(endurances))
    },
    updateBattleInventory(battleInventory: BattleInventory): void {
      const attributesRef = this.$fire.database
        .ref('character')
        .child(`${this.uuidQueryParam}`)
        .child('battleInventory')

      attributesRef.set(this.$convertBattleInventoryToFirebase(battleInventory))
    },
    updateExpertises(expertises: Expertises): void {
      const expertisesRef = this.$fire.database
        .ref('character')
        .child(`${this.uuidQueryParam}`)
        .child('expertises')

      expertisesRef.set(expertises)
    },
    updateCharacteristics(characteristics: Characteristic[]): void {
      const characteristicsRef = this.$fire.database
        .ref('character')
        .child(`${this.uuidQueryParam}`)
        .child('characteristics')

      characteristicsRef.set(this.$firebaseArrayFromArrayOf(characteristics))
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
