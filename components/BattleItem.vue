<template>
  <div>
    <RatingField
      :title="battleItem.name"
      :value="battleItem.power"
      @input="updateBattleItemPower($event)"
      :readonly="readonly"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BattleItem } from '@/assets/classes/battle-item'

export default Vue.extend({
  props: {
    battleItem: BattleItem,
    readonly: Boolean,
  },
  methods: {
    updateBattleItemPower(power: Number): void {
      this.battleItem.power = power
      this.$emit('battleItem', this.battleItem)
    },
  },
})
</script>