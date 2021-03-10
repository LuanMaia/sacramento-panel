<template>
  <div>
    <p class="row justify-content-around align-items-center">
      <span>
        <span>{{ characteristic.name }}: </span>
        <span>{{ characteristic.description }}</span>
      </span>
      <b-button v-if="!readonly" variant="outline-danger" @click="showDeleteCharacteristicModal">
        <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
      </b-button>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Characteristic } from '~/assets/classes/characteristic'

export default Vue.extend({
  props: {
    characteristic: Characteristic,
    index: Number,
    readonly: Boolean
  },
  methods: {
    showDeleteCharacteristicModal() {
      this.$bvModal
        .msgBoxConfirm('Você tem certeza que deseja excluir?', {
          title: 'Excluindo vantagem/desvantagem',
          headerBgVariant: 'danger',
          headerTextVariant: 'light',
          okVariant: 'danger',
          okTitle: 'Confirmar',
          cancelTitle: 'Cancelar',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true,
        })
        .then((value: Boolean) => {})
    },
  },
})
</script>