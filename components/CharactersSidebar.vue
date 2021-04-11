<template>
  <div>
    <b-sidebar
      :id="id"
      title="Personagens"
      bg-variant="dark"
      text-variant="light"
      shadow
    >
      <template #default="{ hide }">
        <b-input-group id="characters-search-group" class="col-12">
          <template #prepend>
            <b-input-group-text>
              <b-icon icon="search"></b-icon>
            </b-input-group-text>
          </template>
          <b-form-input v-model="filterInput"></b-form-input>
        </b-input-group>
        <div class="px-3 py-2">
          <b-button-group class="col-12" vertical>
            <b-button
              variant="outline-light"
              v-for="(character, index) in charactersFiltered()"
              :key="index"
              @click="
                hide()
                chooseCharacter(character)
              "
            >
              <b-avatar :src="character.profileAvatarUrl" size="sm"></b-avatar>
              <span> {{ character.name }} </span>
            </b-button>
          </b-button-group>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import { Character } from '@/assets/classes/character'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

export default Vue.extend({
  props: {
    id: String,
  },
  data() {
    return {
      characters: new Array<Character>(),
      filterInput: '',
    }
  },
  created() {
    this.$fire.database.ref('character').on('value', (snapshot) => {
      this.characters = []
      const characters = snapshot.val()
      const firebaseCharacters: any[] = this.$firebaseArrayToArrayOf<any>(
        characters
      )

      firebaseCharacters.forEach((firebaseCharacter) => {
        const character = this.$convertFirebaseCharacterData(firebaseCharacter)
        character.uuid = firebaseCharacter['uuid']
        this.characters.push(character)
      })
    })
  },
  methods: {
    charactersFiltered() {
      return this.characters.filter(
        (character) =>
          !this.filterInput ||
          character.name
            ?.toLowerCase()
            .includes(this.filterInput.toLowerCase()) ||
          character.playerTag
            ?.toLowerCase()
            .includes(this.filterInput.toLowerCase())
      )
    },
    chooseCharacter(character: Character): void {
      this.$emit('character', character)
    },
  },
})
</script>

<style lang="scss">
#characters-search-group {
  margin: 0.5rem 0;
}

#characters-search-button {
  margin-left: 2px;
}
</style>