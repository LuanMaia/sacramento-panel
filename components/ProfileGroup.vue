<template>
  <div>
    <b-card bg-variant="dark" text-variant="white" title="Perfil">
      <InputField
        id="character-name-field"
        label="Nome"
        :value="name"
        labelCols="3"
        contentCols="6"
        :readonly="readonly"
      />
      <InputField
        id="player-name-field"
        label="Jogador"
        :value="player"
        labelCols="3"
        contentCols="6"
        :readonly="readonly"
      />
      <InputField
        id="character-description-field"
        label="Conceito"
        :value="description"
        labelCols="3"
        contentCols="6"
        :readonly="readonly"
      />
      <InputField
        id="character-character-experience-field"
        label="Experiência"
        :value="exp"
        labelCols="3"
        contentCols="6"
        :readonly="readonly"
        type="number"
      />
      <SpinButtonField
        id="character-character-life-field"
        label="Vida"
        :value="life"
        @input="updateLife($event)"
        labelCols="3"
        contentCols="6"
        min="0"
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
    readonly: Boolean,
    life: Number,
    exp: Number,
  },
  methods: {
    updateLife(life: Number): void {
      this.$emit('life', life)
    }
  }
})
</script>