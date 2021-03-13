<template>
  <div>
    <b-card bg-variant="dark" text-variant="white" title="Atributos">
      <RatingField
        title="Cabulosidade"
        id="strength-attribute-field"
        :value="attributes.strength"
        :readonly="readonly"
      />
      <RatingField
        title="Sagacidade"
        id="wit-attribute-field"
        :value="attributes.wit"
        :readonly="readonly"
      />
      <RatingField
        title="Malemolência"
        id="charisma-attribute-field"
        :value="attributes.charisma"
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
})
</script>