<template>
  <div>
    <Navbar />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: 'authentication-guard',
})
</script>