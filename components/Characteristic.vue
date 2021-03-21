<template>
  <div>
    <strong>{{ characteristic.name }}: </strong>
    <span>{{ characteristic.description }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Characteristic } from '@/assets/classes/characteristic'

export default Vue.extend({
  props: {
    characteristic: Characteristic,
    readonly: Boolean,
  },
})
</script>