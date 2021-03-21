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
          v-model="characteristic.name"
          :labelCols="3"
          :contentCols="9"
        />
        <TextAreaField
          id="add-characteristic-description-field"
          label="Descrição"
          v-model="characteristic.description"
          :labelCols="3"
          :contentCols="9"
          :rows="4"
        />
      </div>

      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="success"
            class="float-right"
            @click="emitCharacteristic()"
            :disabled="!characteristic.name || !characteristic.description"
          >
            Adicionar
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Characteristic } from '@/assets/classes/characteristic'
import { uuid } from 'vue-uuid'

export default Vue.extend({
  data() {
    return {
      characteristic: new Characteristic(),
    }
  },
  props: {
    id: String,
  },
  methods: {
    emitCharacteristic(): void {
      this.characteristic.uuid = uuid.v4()
      this.$emit('characteristic', this.characteristic)
      this.characteristic = new Characteristic()
      this.$bvModal.hide(this.id)
    }
  }
})
</script>