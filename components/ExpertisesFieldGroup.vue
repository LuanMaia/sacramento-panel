<template>
  <div>
    <b-card bg-variant="dark" text-variant="white" title="Perícias">
      <RatingField
        title="Artilharia"
        id="artillery-attribute-field"
        :value="expertises.artillery"
        @input="updateArtillery($event)"
        :readonly="readonly"
      />
      <RatingField
        title="Atletismo"
        id="athleticism-attribute-field"
        :value="expertises.athleticism"
        @input="updateAthleticism($event)"
        :readonly="readonly"
      />
      <RatingField
        title="Ciência"
        id="science-attribute-field"
        :value="expertises.science"
        @input="updateScience($event)"
        :readonly="readonly"
      />
      <RatingField
        title="Computação"
        id="computation-attribute-field"
        :value="expertises.computation"
        @input="updateComputation($event)"
        :readonly="readonly"
      />
      <RatingField
        title="Mecânica"
        id="mechanics-attribute-field"
        :value="expertises.mechanics"
        @input="updateMechanics($event)"
        :readonly="readonly"
      />
      <RatingField
        title="Medicina"
        id="medicine-attribute-field"
        :value="expertises.medicine"
        @input="updateMedicine($event)"
        :readonly="readonly"
      />
      <RatingField
        title="Percepção"
        id="perception-attribute-field"
        :value="expertises.perception"
        @input="updatePerception($event)"
        :readonly="readonly"
      />
      <RatingField
        title="Pilotagem"
        id="piloting-attribute-field"
        :value="expertises.piloting"
        @input="updatePiloting($event)"
        :readonly="readonly"
      />
      <RatingField
        title="Sobrevivência"
        id="survival-attribute-field"
        :value="expertises.survival"
        @input="updateSurvival($event)"
        :readonly="readonly"
      />
      <RatingField
        title="Surdina"
        id="stealth-attribute-field"
        :value="expertises.stealth"
        @input="updateStealth($event)"
        :readonly="readonly"
      />
      <RatingField
        title="Pistolagem"
        id="anger-attribute-field"
        :value="expertises.anger"
        @input="updateAnger($event)"
        :readonly="readonly"
      />
      <RatingField
        title="Papo reto"
        id="sincerity-attribute-field"
        :value="expertises.sincerity"
        @input="updateSincerity($event)"
        :readonly="readonly"
      />
      <RatingField
        title="Trambique"
        id="swindler-attribute-field"
        :value="expertises.swindler"
        @input="updateSwindler($event)"
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
    expertises: {
      type: Expertises,
      default: () => new Expertises(),
    },
    readonly: Boolean,
  },
  methods: {
    updateArtillery(value: Number): void {
      this.expertises.artillery = value
      this.$emit('expertises', this.expertises)
    },
    updateAthleticism(value: Number): void {
      this.expertises.athleticism = value
      this.$emit('expertises', this.expertises)
    },
    updateScience(value: Number): void {
      this.expertises.science = value
      this.$emit('expertises', this.expertises)
    },
    updateComputation(value: Number): void {
      this.expertises.computation = value
      this.$emit('expertises', this.expertises)
    },
    updateMechanics(value: Number): void {
      this.expertises.mechanics = value
      this.$emit('expertises', this.expertises)
    },
    updateMedicine(value: Number): void {
      this.expertises.medicine = value
      this.$emit('expertises', this.expertises)
    },
    updatePerception(value: Number): void {
      this.expertises.perception = value
      this.$emit('expertises', this.expertises)
    },
    updatePiloting(value: Number): void {
      this.expertises.piloting = value
      this.$emit('expertises', this.expertises)
    },
    updateSurvival(value: Number): void {
      this.expertises.survival = value
      this.$emit('expertises', this.expertises)
    },
    updateStealth(value: Number): void {
      this.expertises.stealth = value
      this.$emit('expertises', this.expertises)
    },
    updateAnger(value: Number): void {
      this.expertises.anger = value
      this.$emit('expertises', this.expertises)
    },
    updateSincerity(value: Number): void {
      this.expertises.sincerity = value
      this.$emit('expertises', this.expertises)
    },
    updateSwindler(value: Number): void {
      this.expertises.swindler = value
      this.$emit('expertises', this.expertises)
    },
  },
})
</script>