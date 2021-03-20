<template>
  <div>
    <b-modal
      title="Adicionando item"
      :id="id"
      header-bg-variant="success"
      header-text-variant="light"
    >
      <div>
        <InputField
          id="add-characteristic-name-field"
          label="Nome"
          :value="battleItem.name"
          labelCols="3"
          contentCols="9"
        />
        <RatingField
          title="Poder"
          :value="battleItem.power"
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
import { BattleItem } from '~/assets/classes/battle-item'

export default Vue.extend({
  data() {
    return {
      battleItem: new BattleItem(),
    }
  },
  props: {
    id: String,
  },
  methods: {
    addNewBattleItem(): void {
    }
  }
})
</script>