<template>
  <div>
    <b-card
      bg-variant="dark"
      text-variant="white"
      title="Vantagens e desvantagens"
      class="characteristics-card-container"
    >
      <p
        class="d-flex justify-content-between align-items-center"
        v-for="(characteristic, index) in characteristics"
        :key="index"
      >
        <Characteristic :characteristic="characteristic" :readonly="readonly" />
        <b-button
          class="delete-button"
          v-if="!readonly"
          variant="outline-danger"
          @click="showDeleteCharacteristicModal(index)"
        >
          <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
        </b-button>
      </p>
      <b-button
        class="col-10"
        variant="outline-success"
        @click="showAddCharacteristicModal"
        v-if="!readonly"
      >
        Adicionar
      </b-button>
    </b-card>

    <CharacteristicModal
      id="add-characteristic-modal"
      v-if="!readonly"
      @characteristic="addNewCharacteristics($event)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Characteristic } from '@/assets/classes/characteristic'

export default Vue.extend({
  props: {
    characteristics: Array,
    readonly: Boolean,
  },
  methods: {
    showAddCharacteristicModal(): void {
      this.$bvModal.show('add-characteristic-modal')
    },
    addNewCharacteristics(characteristic: Characteristic): void {
      this.characteristics.push(characteristic)
      this.$emit('characteristics', this.characteristics)
    },
    showDeleteCharacteristicModal(index: number) {
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
        .then((shouldDelete: Boolean) => {
          if (shouldDelete) {
            this.characteristics.splice(index, 1)
            this.$emit('characteristics', this.characteristics)
          }
        })
    },
  },
})
</script>

<style lang="scss">
.characteristics-card-container {
  padding: 0 3rem;

  .delete-button {
    margin-left: 1rem;
  }
}
</style>