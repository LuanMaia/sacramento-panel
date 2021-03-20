<template>
  <div>
    <b-card bg-variant="dark" text-variant="white" title="Treta">
      <b-form-group
        label-cols="3"
        content-cols="9"
        label="Arma"
        label-align-sm="right"
        label-size="lg"
      >
        <div
          class="row justify-content-between align-items-start"
          v-for="(battleItem, index) in battleInventory.weapons"
          :key="index"
        >
          <BattleItem
            :id="`weapon-item-${index}`"
            :battleItem="battleItem"
            @battleItem="updateWeapon(index, $event)"
            :readonly="readonly"
            class="col-10"
          />
          <b-button
            v-if="!readonly"
            variant="outline-danger"
            @click="showDeleteWeaponModal(index)"
          >
            <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
          </b-button>
        </div>
        <b-button class="col-12" variant="outline-success" v-if="!readonly">
          Adicionar
        </b-button>
      </b-form-group>

      <b-form-group
        label-cols="3"
        content-cols="9"
        label="Armadura"
        label-align-sm="right"
        label-size="lg"
      >
        <div
          class="row justify-content-between align-items-start"
          v-for="(battleItem, index) in battleInventory.armors"
          :key="index"
        >
          <BattleItem
            :id="`armor-item-${index}`"
            :battleItem="battleItem"
            @battleItem="updateArmor(index, $event)"
            :readonly="readonly"
            class="col-10"
          />
          <b-button
            v-if="!readonly"
            variant="outline-danger"
            @click="showDeleteArmorModal(index)"
          >
            <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
          </b-button>
        </div>
        <b-button class="col-12" variant="outline-success" v-if="!readonly">
          Adicionar
        </b-button>
      </b-form-group>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BattleInventory } from '@/assets/classes/battle-inventory'
import { BattleItem } from '@/assets/classes/battle-item'

export default Vue.extend({
  props: {
    battleInventory: {
      type: BattleInventory,
      default: new BattleInventory(),
    },
    readonly: Boolean,
  },
  methods: {
    updateWeapon(index: number, newBattleItem: BattleItem): void {
      if (this.battleInventory.weapons) {
        this.battleInventory.weapons[index] = newBattleItem
        this.$emit('battleInventory', this.battleInventory)
      }
    },
    updateArmor(index: number, newBattleItem: BattleItem): void {
      if (this.battleInventory.armors) {
        this.battleInventory.armors[index] = newBattleItem
        this.$emit('battleInventory', this.battleInventory)
      }
    },
    deleteWeapon(index: number): void {
      if (this.battleInventory.weapons) {
        this.battleInventory.weapons.splice(index, 1)
        this.$emit('battleInventory', this.battleInventory)
      }
    },
    deleteArmor(index: number): void {
      if (this.battleInventory.armors) {
        this.battleInventory.armors.splice(index, 1)
        this.$emit('battleInventory', this.battleInventory)
      }
    },
    showDeleteWeaponModal(index: number) {
      this.$bvModal
        .msgBoxConfirm('Você tem certeza que deseja excluir?', {
          title: 'Excluindo arma',
          headerBgVariant: 'danger',
          headerTextVariant: 'light',
          okVariant: 'danger',
          okTitle: 'Confirmar',
          cancelTitle: 'Cancelar',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true,
        })
        .then((value: Boolean) => {
          if (value) {
            this.deleteWeapon(index)
          }
        })
    },
    showDeleteArmorModal(index: number) {
      this.$bvModal
        .msgBoxConfirm('Você tem certeza que deseja excluir?', {
          title: 'Excluindo armadura',
          headerBgVariant: 'danger',
          headerTextVariant: 'light',
          okVariant: 'danger',
          okTitle: 'Confirmar',
          cancelTitle: 'Cancelar',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true,
        })
        .then((value: Boolean) => {
          if (value) {
            this.deleteArmor(index)
          }
        })
    },
  },
})
</script>