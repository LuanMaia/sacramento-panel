<template>
  <div>
    <b-card bg-variant="dark" text-variant="white" title="Treta">
      <b-form-group
        label-cols="3"
        content-cols="9"
        label="Arma"
        label-align-sm="right"
        label-size="lg"
      >
        <RatingField
          v-for="(value, index) in battleInventory.weapons"
          v-bind:key="index"
          :title="value.name"
          :id="`weapon-item-${index}`"
          :value="value.power"
          :readonly="readonly"
        />
      </b-form-group>

      <b-form-group
        label-cols="3"
        content-cols="9"
        label="Armadura"
        label-align-sm="right"
        label-size="lg"
      >
        <RatingField
          v-for="(value, index) in battleInventory.armors"
          v-bind:key="index"
          :title="value.name"
          :id="`weapon-item-${index}`"
          :value="value.power"
          :readonly="readonly"
        />
      </b-form-group>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BattleInventory } from '@/assets/classes/battle-inventory'

export default Vue.extend({
  props: {
    battleInventory: BattleInventory,
    readonly: Boolean
  },
})
</script>