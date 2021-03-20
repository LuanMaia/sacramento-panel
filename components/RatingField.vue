<template>
  <div>
    <b-form-group
      :label-cols="labelCols"
      :content-cols="contentCols"
      :label="title"
      :label-for="id"
      label-align-sm="right"
    >
      <b-form-rating
        :id="id"
        :value="value"
        @change="updateValue($event)"
        stars="3"
        color="#ff8800"
        :readonly="readonly"
        icon-full="dice6-fill"
        icon-empty="square"
        icon-clear="x-square"
        show-clear
      >
      </b-form-rating>
    </b-form-group>
  </div>
</template>

<script  lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: Number,
    title: String,
    id: String,
    readonly: Boolean,
    labelCols: {
      type: Number,
      default: 4
    },
    contentCols: {
      type: Number,
      default: 6
    },
  },
  methods: {
    updateValue(value: Number): void {
      this.$emit('input', value)
    },
  },
})
</script>