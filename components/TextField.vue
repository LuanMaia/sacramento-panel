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
      <b-form-input
        :id="id"
        v-model="value"
        trim
        :readonly="readonly"
      ></b-form-input>
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
  },
})
</script>