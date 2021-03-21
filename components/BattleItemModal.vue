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
          id="add-battle-item-name-field"
          label="Nome"
          v-model="battleItem.name"
          :labelCols="3"
          :contentCols="9"
        />
        <RatingField
          title="Poder"
          v-model="battleItem.power"
          :labelCols="3"
          :contentCols="9"
        />
      </div>

      <template #modal-footer>
        <div class="w-100">
          <b-button
            @click="addNewBattleItem()"
            variant="success"
            class="float-right"
            :disabled="!battleItem.name"
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
import { BattleItem } from '@/assets/classes/battle-item'
import { uuid } from 'vue-uuid'

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
      this.battleItem.uuid = uuid.v4()
      this.$emit('battleItem', this.battleItem)
      this.battleItem = new BattleItem()
      this.$bvModal.hide(this.id)
    },
  },
})
</script>