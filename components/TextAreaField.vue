<template>
  <div>
    <b-form-group
      :label="label"
      :label-for="id"
      :label-cols="labelCols"
      :content-cols="contentCols"
      label-align-sm="right"
    >
      <b-form-textarea
        :id="id"
        :v-model="value"
        :placeholder="placeholder"
        :rows="rows"
        :max-rows="maxRows"
        :plaintext="plaintext"
      ></b-form-textarea>
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
    labelCols: Number,
    contentCols: Number,
    placeholder: String,
    rows: Number,
    maxRows: Number,
    plaintext: Boolean,
  },
})
</script>