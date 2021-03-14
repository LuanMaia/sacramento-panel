<template>
  <div>
    <b-form-group
      :label="label"
      :label-for="id"
      :label-cols="labelCols"
      :content-cols="contentCols"
      label-align-sm="right"
    >
      <b-form-spinbutton
        :id="id"
        :value="value"
        @input="updateValue($event)"
        :min="min"
        :max="max"
        :readonly="readonly"
      ></b-form-spinbutton>
    </b-form-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    id: String,
    value: Number,
    label: String,
    labelCols: Number,
    contentCols: Number,
    min: Number,
    max: Number,
    readonly: Boolean,
  },
  methods: {
    updateValue(value: Number): void {
      this.$emit('input', value)
    },
  },
})
</script>