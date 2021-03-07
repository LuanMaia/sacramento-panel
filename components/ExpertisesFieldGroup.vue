<template>
  <div>
    <b-card bg-variant="dark" text-variant="white" title="Perícias">
      <RatingField
        title="Artilharia"
        id="artillery-attribute-field"
        v-bind:value="expertises.artillery"
        :readonly="readonly"
      />
      <RatingField
        title="Atletismo"
        id="athleticism-attribute-field"
        v-bind:value="expertises.athleticism"
        :readonly="readonly"
      />
      <RatingField
        title="Ciência"
        id="science-attribute-field"
        v-bind:value="expertises.science"
        :readonly="readonly"
      />
      <RatingField
        title="Computação"
        id="computation-attribute-field"
        v-bind:value="expertises.computation"
        :readonly="readonly"
      />
      <RatingField
        title="Mecânica"
        id="mechanics-attribute-field"
        v-bind:value="expertises.mechanics"
        :readonly="readonly"
      />
      <RatingField
        title="Medicina"
        id="medicine-attribute-field"
        v-bind:value="expertises.medicine"
        :readonly="readonly"
      />
      <RatingField
        title="Percepção"
        id="perception-attribute-field"
        v-bind:value="expertises.perception"
        :readonly="readonly"
      />
      <RatingField
        title="Pilotagem"
        id="piloting-attribute-field"
        v-bind:value="expertises.piloting"
        :readonly="readonly"
      />
      <RatingField
        title="Sobrevivência"
        id="survival-attribute-field"
        v-bind:value="expertises.survival"
        :readonly="readonly"
      />
      <RatingField
        title="Surdina"
        id="stealth-attribute-field"
        v-bind:value="expertises.stealth"
        :readonly="readonly"
      />
      <RatingField
        title="Pistolagem"
        id="anger-attribute-field"
        v-bind:value="expertises.anger"
        :readonly="readonly"
      />
      <RatingField
        title="Papo reto"
        id="sincerity-attribute-field"
        v-bind:value="expertises.sincerity"
        :readonly="readonly"
      />
      <RatingField
        title="Trambique"
        id="swindler-attribute-field"
        v-bind:value="expertises.swindler"
        :readonly="readonly"
      />
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Expertises } from '@/assets/classes/expertises'

export default Vue.extend({
  props: {
    expertises: Expertises,
    readonly: Boolean,
  },
})
</script>