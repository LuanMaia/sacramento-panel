<template>
  <div>
    <b-card bg-variant="dark" text-variant="white" title="Perfil">
      <TextField
        id="character-name-field"
        label="Nome"
        :value="name"
        labelCols="3"
        contentCols="6"
      />
      <TextField
        id="player-name-field"
        label="Jogador"
        :value="player"
        labelCols="3"
        contentCols="6"
      />
      <TextField
        id="character-description-field"
        label="Conceito"
        :value="description"
        labelCols="3"
        contentCols="6"
      />
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    name: String,
    player: String,
    description: String,
  },
})
</script>