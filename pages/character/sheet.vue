<template>
  <div class="container">
    <div class="character-sheet">
      <div class="character-profile">
        <ProfileGroup
          :name="name"
          :player="player"
          :description="description"
          :exp="exp"
          :life="life"
          :readonly="true"
        />
      </div>
      <div class="character-info row">
        <div class="col">
          <AttributesFieldGroup
            class="info-group"
            v-bind:attributes="attributes"
            :readonly="true"
          />
          <EndurancesFieldGroup
            class="info-group"
            v-bind:endurances="endurances"
            :readonly="true"
          />
          <BattleInventoryGroup
            class="info-group"
            :battleInventory="battleInventory"
            :readonly="true"
          />
        </div>
        <div class="col">
          <ExpertisesFieldGroup
            class="info-group"
            v-bind:expertises="expertises"
            :readonly="true"
          />
          <CharacteristicsGroup
            class="info-group"
            :characteristics="characteristics"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import { Attributes } from '@/assets/classes/attributes'
import { Expertises } from '@/assets/classes/expertises'
import { Endurances } from '@/assets/classes/endurances'
import { EnduranceAttributeType } from '@/assets/classes/endurance-attribute-type'
import { DiceType } from '@/assets/classes/dice-type'
import { BattleInventory } from '@/assets/classes/battle-inventory'
import { Characteristic } from '@/assets/classes/characteristic'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

export default Vue.extend({
  data() {
    return {
      attributes: {
        strength: 1,
        wit: 3,
        charisma: 2,
      } as Attributes,
      expertises: {
        anger: 0,
        artillery: 0,
        athleticism: 0,
        computation: 0,
        mechanics: 0,
        medicine: 1,
        perception: 1,
        piloting: 0,
        science: 2,
        sincerity: 1,
        stealth: 2,
        survival: 1,
        swindler: 0,
      } as Expertises,
      endurances: {
        physical: {
          type: EnduranceAttributeType.STRENGTH,
          dice: DiceType.DICE_1D8,
        },
        mental: {
          type: EnduranceAttributeType.WIT,
          dice: DiceType.DICE_1D8,
        },
        social: {
          type: EnduranceAttributeType.CHARISMA,
          dice: DiceType.DICE_1D8,
        },
      } as Endurances,
      battleInventory: {
        armors: [
          {
            power: 1,
            name: 'Sobtraje nanóico',
          },
        ],
        weapons: [
          {
            power: 1,
            name: 'Calyptra (Arco) [S]',
          },
        ],
      } as BattleInventory,
      characteristics: [
        {
          name: 'Camuflagem camaleônica',
          description:
            'Stella ganha mais 1d6 nas rolagens de Surdina com Sagacidade.',
        },
      ] as Characteristic[],
      name: 'Stella',
      player: 'Luauler',
      description: 'Cientista telepática camaleônica',
      exp: 1000,
      life: 10,
    }
  },
})
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  > .character-sheet {
    width: 100vw;

    > .character-profile {
      width: 50%;
      margin: 2rem auto 2rem auto;
    }

    > .character-info .info-group {
      margin-bottom: 1rem;
    }
  }
}
</style>
