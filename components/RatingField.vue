<template>
  <div>
    <b-form-group
      label-cols="3"
      content-cols="4"
      v-bind:label="title"
      v-bind:label-for="id"
      label-align-sm="right"
    >
      <b-form-rating v-bind:id="id" v-model="value" stars="3" color="#ff8800">
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
  },
})
</script>