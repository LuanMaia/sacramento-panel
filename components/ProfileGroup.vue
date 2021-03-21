<template>
  <div>
    <b-card bg-variant="dark" text-variant="white" title="Perfil">
      <InputField
        id="character-name-field"
        label="Nome"
        :value="name"
        @input="updateName($event)"
        :labelCols="3"
        :contentCols="6"
        :readonly="readonly"
      />
      <InputField
        id="player-name-field"
        label="Jogador"
        :value="player"
        @input="updatePlayer($event)"
        :labelCols="3"
        :contentCols="6"
        :readonly="readonly"
      />
      <InputField
        id="character-description-field"
        label="Conceito"
        :value="description"
        @input="updateDescription($event)"
        :labelCols="3"
        :contentCols="6"
        :readonly="readonly"
      />
      <InputField
        id="character-character-experience-field"
        label="Experiência"
        :value="exp"
        @input="updateExp($event)"
        :labelCols="3"
        :contentCols="6"
        :readonly="readonly"
        type="number"
      />
      <SpinButtonField
        id="character-character-life-field"
        label="Vida"
        :value="life"
        @input="updateLife($event)"
        :labelCols="3"
        :contentCols="6"
        min="0"
        :max="maxLife"
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
    maxLife: Number,
    exp: Number,
  },
  methods: {
    updateName(name: String): void {
      this.$emit('name', name)
    },
    updatePlayer(player: String): void {
      this.$emit('player', player)
    },
    updateDescription(description: String): void {
      this.$emit('description', description)
    },
    updateExp(exp: Number): void {
      this.$emit('exp', exp)
    },
    updateLife(life: Number): void {
      this.$emit('life', life)
    },
  },
})
</script>