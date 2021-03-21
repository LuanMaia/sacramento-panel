<template>
  <div v-if="isAuthenticated">
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item v-b-toggle.characters-sidebar>
          Personagens
        </b-nav-item>

        <b-nav-item-dropdown text="Criar link" left>
          <b-dropdown-item>Vida do personagem</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item @click="singOut()">
          Deslogar ({{ getUserName() }})
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <CharactersSidebar
      id="characters-sidebar"
      @character="navigateToCharacterSheet($event)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Character } from '@/assets/classes/character'

export default Vue.extend({
  data() {
    return {
      isAuthenticated: false,
    }
  },
  methods: {
    singOut(): void {
      this.$fire.auth.signOut()
      this.$router.replace({ path: '/login' })
    },
    subscribeToAuthStateChanges(): void {
      this.$fire.auth.onAuthStateChanged((user) => {
        this.isAuthenticated = user != null
      })
    },
    getUserName(): string | undefined {
      const user = this.$fire.auth.currentUser
      if (user != null && user.displayName != null) {
        return user.displayName
      } else if (user != null && user.email != null) {
        return user.email
      } else {
        return undefined
      }
    },
    navigateToCharacterSheet(character: Character): void {
      this.$router.replace({
        name: 'character-sheet',
        query: { ...this.$route.query, 'character-uuid': character.uuid },
      })
    },
  },
  created() {
    this.subscribeToAuthStateChanges()
  },
})
</script>