<template>
  <div>
    <b-card bg-variant="dark" text-variant="white" title="Atributos">
      <RatingField
        title="Cabulosidade"
        id="strength-attribute-field"
        :value="attributes.strength"
        @input="updateStrength($event)"
        :readonly="readonly"
      />
      <RatingField
        title="Sagacidade"
        id="wit-attribute-field"
        :value="attributes.wit"
        @input="updateWit($event)"
        :readonly="readonly"
      />
      <RatingField
        title="Malemolência"
        id="charisma-attribute-field"
        :value="attributes.charisma"
        @input="updateCharisma($event)"
        :readonly="readonly"
      />
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Attributes } from '@/assets/classes/attributes'

export default Vue.extend({
  props: {
    attributes: {
      type: Attributes,
      default: new Attributes(),
    },
    readonly: Boolean,
  },
  methods: {
    updateStrength(strength: Number): void {
      this.attributes.strength = strength
      this.$emit('attributes', this.attributes)
    },
    updateWit(wit: Number): void {
      this.attributes.wit = wit
      this.$emit('attributes', this.attributes)
    },
    updateCharisma(charisma: Number): void {
      this.attributes.charisma = charisma
      this.$emit('attributes', this.attributes)
    },
  },
})
</script>