<template>
  <div>
    <b-modal
      title="Adicionando vantagem/desvantagem"
      :id="id"
      header-bg-variant="success"
      header-text-variant="light"
    >
      <div>
        <InputField
          id="add-characteristic-name-field"
          label="Nome"
          :value="characteristic.name"
          labelCols="3"
          contentCols="9"
        />
        <TextAreaField
          id="add-characteristic-description-field"
          label="Descrição"
          :value="characteristic.description"
          labelCols="3"
          contentCols="9"
          rows="4"
        />
      </div>

      <template #modal-footer>
        <div class="w-100">
          <b-button variant="success" class="float-right"> Adicionar </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Characteristic } from '@/assets/classes/characteristic'

export default Vue.extend({
  data() {
    return {
      characteristic: new Characteristic(),
    }
  },
  props: {
    id: String,
  },
})
</script>