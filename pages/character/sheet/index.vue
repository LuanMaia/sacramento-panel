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
            @maxLife="updateMaxLife($event)"
            :readonly="!isAuthenticated()"
            :profilePictureUrl="character.profileAvatarUrl"
            @uploadProfileAvatar="uploadProfileAvatar($event)"
          />
        </div>
      </div>
    </main>
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
    updateMaxLife(maxLife: Number): void {
      const maxLifeRef = this.$fire.database
        .ref('character')
        .child(`${this.uuidQueryParam}`)
        .child('maxLife')

      maxLifeRef.set(+maxLife)
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
  }
}
</style>
