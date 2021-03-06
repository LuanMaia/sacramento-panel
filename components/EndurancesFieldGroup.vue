<template>
  <div>
    <b-card bg-variant="dark" text-variant="white" title="Resistências">
      <EnduranceDiceBonusField
        title="Física"
        :diceBonus="endurances.physical"
      />
      <EnduranceDiceBonusField title="Mental" :diceBonus="endurances.mental" />
      <EnduranceDiceBonusField title="Social" :diceBonus="endurances.social" />
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Endurances } from '@/assets/classes/endurances'

export default Vue.extend({
  props: {
    endurances: Endurances,
  },
})
</script>