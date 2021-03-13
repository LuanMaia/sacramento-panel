<template>
  <div>
    <b-card bg-variant="dark" text-variant="white" title="Resistências">
      <EnduranceDiceBonusField
        title="Física"
        :diceBonus="endurances.physical"
        :readonly="readonly"
      />
      <EnduranceDiceBonusField
        title="Mental"
        :diceBonus="endurances.mental"
        :readonly="readonly"
      />
      <EnduranceDiceBonusField
        title="Social"
        :diceBonus="endurances.social"
        :readonly="readonly"
      />
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Endurances } from '@/assets/classes/endurances'

export default Vue.extend({
  props: {
    endurances: {
      type: Endurances,
      default: new Endurances(),
    },
    readonly: Boolean,
  },
})
</script>