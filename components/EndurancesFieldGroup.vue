<template>
  <div>
    <b-card bg-variant="light">
      <b-form-group
        label-cols="3"
        label="Resistências"
        label-size="lg"
        label-class="font-weight-bold pt-0"
        class="mb-0"
      >
        <EnduranceDiceBonusField title="Física" :diceBonus="endurances.physical" />
        <EnduranceDiceBonusField title="Mental" :diceBonus="endurances.mental" />
        <EnduranceDiceBonusField title="Social" :diceBonus="endurances.social" />
      </b-form-group>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Endurances } from '@/assets/classes/endurances';

export default Vue.extend({
    props: {
        endurances: Endurances
    }
});
</script>