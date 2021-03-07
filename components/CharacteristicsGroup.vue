<template>
  <div>
    <b-card
      bg-variant="dark"
      text-variant="white"
      title="Vantagens e desvantagens"
    >
      <CharacteristicLine
        v-for="(characteristic, index) in characteristics"
        :key="index"
        :characteristic="characteristic"
        :index="index"
        :readonly="readonly"
      />
      <b-button
        class="col-10"
        variant="outline-success"
        @click="showAddCharacteristicModal"
        v-if="!readonly"
      >
        Adicionar
      </b-button>
    </b-card>

    <CharacteristicModal id="add-characteristic-modal" v-if="!readonly" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    characteristics: Array,
    readonly: Boolean,
  },
  methods: {
    showAddCharacteristicModal() {
      this.$bvModal.show('add-characteristic-modal')
    },
  },
})
</script>