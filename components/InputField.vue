<template>
  <div>
    <b-form-group
      :label="label"
      :label-for="id"
      :description="description"
      :label-cols="labelCols"
      :content-cols="contentCols"
      label-align-sm="right"
    >
      <b-input-group :prepend="prepend" :append="append">
        <b-form-input
          :id="id"
          :value="value"
          @input="updateValue($event)"
          trim
          :readonly="readonly"
          :type="type"
        ></b-form-input>
      </b-input-group>
    </b-form-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    id: String,
    label: String,
    value: String,
    description: String,
    labelCols: Number,
    contentCols: Number,
    readonly: Boolean,
    type: String,
    prepend: String,
    append: String,
  },
  methods: {
    updateValue(value: String | number): void {
      this.$emit('input', value)
    },
  },
})
</script>