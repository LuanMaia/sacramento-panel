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
          v-bind:value="expertises.artillery"
        />
        <RatingField
          title="Atletismo"
          id="athleticism-attribute-field"
          v-bind:value="expertises.athleticism"
        />
        <RatingField
          title="Ciência"
          id="science-attribute-field"
          v-bind:value="expertises.science"
        />
        <RatingField
          title="Computação"
          id="computation-attribute-field"
          v-bind:value="expertises.computation"
        />
        <RatingField
          title="Mecânica"
          id="mechanics-attribute-field"
          v-bind:value="expertises.mechanics"
        />
        <RatingField
          title="Medicina"
          id="medicine-attribute-field"
          v-bind:value="expertises.medicine"
        />
        <RatingField
          title="Percepção"
          id="perception-attribute-field"
          v-bind:value="expertises.perception"
        />
        <RatingField
          title="Pilotagem"
          id="piloting-attribute-field"
          v-bind:value="expertises.piloting"
        />
        <RatingField
          title="Sobrevivência"
          id="survival-attribute-field"
          v-bind:value="expertises.survival"
        />
        <RatingField
          title="Surdina"
          id="stealth-attribute-field"
          v-bind:value="expertises.stealth"
        />
        <RatingField
          title="Pistolagem"
          id="anger-attribute-field"
          v-bind:value="expertises.anger"
        />
        <RatingField
          title="Papo reto"
          id="sincerity-attribute-field"
          v-bind:value="expertises.sincerity"
        />
        <RatingField
          title="Trambique"
          id="swindler-attribute-field"
          v-bind:value="expertises.swindler"
        />
      </b-form-group>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Expertises } from '@/assets/classes/expertises'

export default Vue.extend({
  props: {
    expertises: Expertises,
  },
})
</script>

<style>
</style>