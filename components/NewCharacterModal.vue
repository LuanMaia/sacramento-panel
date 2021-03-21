<template>
  <div>
    <b-modal
      title="Criando personagem"
      :id="id"
      header-bg-variant="success"
      header-text-variant="light"
    >
      <div>
        <InputField
          id="character-name-field"
          label="Nome"
          v-model="character.name"
          :labelCols="2"
          :contentCols="10"
          :readonly="readonly"
        />
        <InputField
          id="player-name-field"
          label="Jogador"
          v-model="character.player"
          :labelCols="2"
          :contentCols="10"
          :readonly="readonly"
        />
        <InputField
          id="character-description-field"
          label="Conceito"
          v-model="character.description"
          :labelCols="2"
          :contentCols="10"
          :readonly="readonly"
        />
      </div>

      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="success"
            class="float-right"
            @click="createCharacter()"
            :disabled="
              !character.name || !character.player || !character.description
            "
          >
            Adicionar
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { uuid } from 'vue-uuid'
import { Character } from '@/assets/classes/character'

export default Vue.extend({
  data() {
    return {
      character: new Character(),
    }
  },
  props: {
    id: String,
  },
  methods: {
    createCharacter(): void {
      this.character.uuid = uuid.v4()
      this.character.life = 6
      this.character.maxLife = 6
      this.character.public = true
      this.character.exp = 1000

      this.$fire.database
        .ref('character')
        .child(this.character.uuid)
        .set(this.character)

      this.character = new Character()
      this.$bvModal.hide(this.id)
    },
  },
})
</script>