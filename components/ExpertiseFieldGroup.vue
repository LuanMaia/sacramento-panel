<template>
  <div>
    <b-card bg-variant="light">
      <b-form-group
        label-cols="3"
        label="Perícias"
        label-size="lg"
        label-class="font-weight-bold pt-0"
        class="mb-0"
      >
        <RatingField
          title="Artilharia"
          id="artillery-attribute-field"
          v-bind:value="expertise.artillery"
        />
        <RatingField
          title="Atletismo"
          id="athleticism-attribute-field"
          v-bind:value="expertise.athleticism"
        />
        <RatingField
          title="Ciência"
          id="science-attribute-field"
          v-bind:value="expertise.science"
        />
        <RatingField
          title="Computação"
          id="computation-attribute-field"
          v-bind:value="expertise.computation"
        />
        <RatingField
          title="Mecânica"
          id="mechanics-attribute-field"
          v-bind:value="expertise.mechanics"
        />
        <RatingField
          title="Medicina"
          id="medicine-attribute-field"
          v-bind:value="expertise.medicine"
        />
        <RatingField
          title="Percepção"
          id="perception-attribute-field"
          v-bind:value="expertise.perception"
        />
        <RatingField
          title="Pilotagem"
          id="piloting-attribute-field"
          v-bind:value="expertise.piloting"
        />
        <RatingField
          title="Sobrevivência"
          id="survival-attribute-field"
          v-bind:value="expertise.survival"
        />
        <RatingField
          title="Surdina"
          id="stealth-attribute-field"
          v-bind:value="expertise.stealth"
        />
        <RatingField
          title="Pistolagem"
          id="anger-attribute-field"
          v-bind:value="expertise.anger"
        />
        <RatingField
          title="Papo reto"
          id="sincerity-attribute-field"
          v-bind:value="expertise.sincerity"
        />
        <RatingField
          title="Trambique"
          id="swindler-attribute-field"
          v-bind:value="expertise.swindler"
        />
      </b-form-group>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Expertise } from '@/assets/classes/expertise'

export default Vue.extend({
  props: {
    expertise: Expertise,
  },
})
</script>

<style>
</style>