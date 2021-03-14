<template>
  <div>
    <b-form-group
      label-cols="3"
      content-cols="4"
      :label="title"
      label-size="lg"
      :description="`${diceBonus.attribute} + ${diceBonus.dice}`"
      v-if="!readonly"
    >
      <b-form-group
        label-cols="4"
        content-cols="8"
        label="Atributo"
        label-align-sm="right"
        label-size="sm"
      >
        <b-form-select
          v-model="diceBonus.attribute"
          :options="typeOptions"
        ></b-form-select>
      </b-form-group>
      <b-form-group
        label-cols="4"
        content-cols="8"
        label="Dado"
        label-align-sm="right"
        label-size="sm"
      >
        <b-form-select
          v-model="diceBonus.dice"
          :options="diceOptions"
        ></b-form-select>
      </b-form-group>
    </b-form-group>

    <p v-else>
      <span class="endurance-field-title">{{ title }}: </span>
      <span>{{ diceBonus.attribute }} + {{ diceBonus.dice }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { EnduranceDiceBonus } from '@/assets/classes/endurance-dice-bonus'
import { EnduranceAttributeType } from '@/assets/classes/endurance-attribute-type'
import { DiceType } from '@/assets/classes/dice-type'

export default Vue.extend({
  data() {
    return {
      typeOptions: Object.values(EnduranceAttributeType),
      diceOptions: Object.values(DiceType),
    }
  },
  props: {
    title: String,
    diceBonus: {
      type: EnduranceDiceBonus,
      default: new EnduranceDiceBonus(),
    },
    readonly: Boolean,
  },
})
</script>

<style lang="scss">
.endurance-field-title {
  font-weight: bolder;
  font-size: 1.2rem;
}
</style>