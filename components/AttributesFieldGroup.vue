<template>
  <div>
    <b-card bg-variant="dark" text-variant="white" title="Atributos">
      <RatingField
        title="Cabulosidade"
        id="strength-attribute-field"
        v-bind:value="attributes.strength"
      />
      <RatingField
        title="Sagacidade"
        id="wit-attribute-field"
        v-bind:value="attributes.wit"
      />
      <RatingField
        title="Malemolência"
        id="charisma-attribute-field"
        v-bind:value="attributes.charisma"
      />
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Attributes } from '@/assets/classes/attributes'

export default Vue.extend({
  props: {
    attributes: Attributes,
  },
})
</script>