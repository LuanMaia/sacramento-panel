<template>
  <div>
    <b-card bg-variant="light">
      <b-form-group
        label-cols="3"
        label="Atributos"
        label-size="lg"
        label-class="font-weight-bold pt-0"
        class="mb-0"
      >
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
      </b-form-group>
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

<style>
</style>