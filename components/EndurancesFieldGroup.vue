<template>
  <div>
    <b-card bg-variant="dark" text-variant="white" title="Resistências">
      <EnduranceDiceBonusField
        title="Física"
        :diceBonus="endurances.physical"
        @diceBonus="updatePhysicalEndurance($event)"
        :readonly="readonly"
      />
      <EnduranceDiceBonusField
        title="Mental"
        :diceBonus="endurances.mental"
        @diceBonus="updateMentalEndurance($event)"
        :readonly="readonly"
      />
      <EnduranceDiceBonusField
        title="Social"
        :diceBonus="endurances.social"
        @diceBonus="updateSocialEndurance($event)"
        :readonly="readonly"
      />
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Endurances } from '@/assets/classes/endurances'
import { EnduranceDiceBonus } from '@/assets/classes/endurance-dice-bonus'

export default Vue.extend({
  props: {
    endurances: {
      type: Endurances,
      default: new Endurances(),
    },
    readonly: Boolean,
  },
  methods: {
    updatePhysicalEndurance(physical: EnduranceDiceBonus): void {
      this.endurances.physical = physical
      this.$emit('endurances', this.endurances)
    },
    updateMentalEndurance(mental: EnduranceDiceBonus): void {
      this.endurances.mental = mental
      this.$emit('endurances', this.endurances)
    },
    updateSocialEndurance(social: EnduranceDiceBonus): void {
      this.endurances.social = social
      this.$emit('endurances', this.endurances)
    },
  },
})
</script>