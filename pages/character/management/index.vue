<template>
  <div>
    <Navbar />
    <main id="management-container" class="d-flex justify-content-center">
      <b-card title="Gerenciar personagens" class="col-8">
        <b-table striped small :fields="fields" :items="items">
          <template #cell(name)="data">
            <b-avatar :src="items[data.index].profileAvatarUrl"></b-avatar>
            {{ data.value }}
          </template>

          <template #cell(playerTag)="data"> @{{ data.value }} </template>

          <template #head(public)="data">
            <span
              v-b-tooltip.hover
              title="Um personagem público pode ser visualizado por quem não está logado no painel e pode ser usado no OBS"
            >
              {{ data.label }}
            </span>
          </template>
          <template #cell(public)="data">
            <b-form-checkbox
              :id="`checkbox-public-${data.index}`"
              v-model="items[data.index].public"
              :name="`checkbox-public-${data.index}`"
              @change="updateCharacter(items[data.index])"
              v-b-tooltip.hover
              title="Um personagem público pode ser visualizado por quem não está logado no painel e pode ser usado no OBS"
              switch
            >
            </b-form-checkbox>
          </template>

          <template #cell(showLifeOnProfile)="data">
            <b-form-checkbox
              :id="`checkbox-showLife-${data.index}`"
              v-model="items[data.index].showLifeOnProfile"
              :name="`checkbox-showLife-${data.index}`"
              @change="updateCharacter(items[data.index])"
              switch
            >
            </b-form-checkbox>
          </template>

          <template #head(selected)="">
            <div class="d-flex align-items-center">
              <b-form-checkbox
                id="checkbox-all-selected"
                name="checkbox-all-selected"
                :checked="isAllSelected()"
                :indeterminate="isIndeterminate()"
                @change="toggleAll"
              >
              </b-form-checkbox>
              <b-dropdown :disabled="selected.length === 0" right>
                <b-dropdown-item @click="changeSelectedsPublic(true)">
                  Tornar público
                </b-dropdown-item>
                <b-dropdown-item @click="changeSelectedsPublic(false)">
                  Tornar privado
                </b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item
                  @click="changeSelectedsShowLifeOnProfile(true)"
                >
                  Mostrar vida
                </b-dropdown-item>
                <b-dropdown-item
                  @click="changeSelectedsShowLifeOnProfile(false)"
                >
                  Mostrar nome
                </b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item variant="danger" @click="deleteSelecteds()">
                  Deletar
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </template>
          <template #cell(selected)="data">
            <b-form-checkbox
              :id="`checkbox-selected-${data.index}`"
              :name="`checkbox-selected-${data.index}`"
              :checked="isSelected(data.item.uuid)"
              @change="select(data.item.uuid, $event)"
            >
            </b-form-checkbox>
          </template>

          <template #cell()="data">
            <i>{{ data.value }}</i>
          </template>
        </b-table>
        <div class="d-flex justify-content-end">
          <b-button
            class="col-2"
            variant="success"
            @click="showNewCharacterModal()"
          >
            Criar
          </b-button>
        </div>
      </b-card>
    </main>

    <NewCharacterModal id="navbar-new-character-modal" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Character } from '@/assets/classes/character'

export default Vue.extend({
  middleware: 'authentication-guard',
  data() {
    return {
      fields: [
        { key: 'name', label: 'Nome' },
        { key: 'playerTag', label: 'Jogador' },
        { key: 'public', label: 'Público' },
        { key: 'showLifeOnProfile', label: 'Mostrar vida no OBS' },
        { key: 'selected', label: '' },
      ],
      items: new Array<Character>(),
      selected: new Array<string>(),
    }
  },
  created() {
    this.$fire.database.ref('character').on('value', (snapshot) => {
      this.items = []
      const characters = snapshot.val()
      const firebaseCharacters: any[] = this.$firebaseArrayToArrayOf<any>(
        characters
      )

      firebaseCharacters.forEach((firebaseCharacter) => {
        const character = this.$convertFirebaseCharacterData(firebaseCharacter)
        character.uuid = firebaseCharacter['uuid']
        this.items.push(character)
      })

      this.selected.slice().forEach((selectedItem) => {
        if (this.items.findIndex((item) => item.uuid === selectedItem) === -1) {
          this.selected.splice(
            this.selected.findIndex((uuid) => uuid === selectedItem),
            1
          )
        }
      })
    })
  },
  methods: {
    toggleAll(checked: boolean): void {
      this.selected = checked ? this.items.map((item) => item.uuid) : []
    },
    select(uuid: string, checked: boolean): void {
      if (checked && !this.selected.includes(uuid)) {
        this.selected.push(uuid)
      } else if (!checked && this.selected.includes(uuid)) {
        this.selected.splice(
          this.selected.findIndex((item) => item === uuid),
          1
        )
      }
    },
    isSelected(uuid: string): boolean {
      return this.selected.includes(uuid)
    },
    isAllSelected(): boolean {
      return this.items.length === this.selected.length
    },
    isIndeterminate(): boolean {
      return !this.isAllSelected() && this.selected.length > 0
    },
    changeSelectedsPublic(flag: boolean): void {
      this.selected.forEach((uuid) => {
        const character = this.items.find((item) => item.uuid === uuid)

        if (character) {
          character.public = flag
        }
      })

      this.updateCharacters()
    },
    changeSelectedsShowLifeOnProfile(flag: boolean): void {
      this.selected.forEach((uuid) => {
        const character = this.items.find((item) => item.uuid === uuid)

        if (character) {
          character.showLifeOnProfile = flag
        }
      })

      this.updateCharacters()
    },
    updateCharacters(): void {
      this.items.forEach((character) => this.updateCharacter(character))
    },
    updateCharacter(character: Character): void {
      this.$fire.database.ref('character').child(character.uuid).update({
        public: character.public,
        showLifeOnProfile: character.showLifeOnProfile,
      })
    },
    deleteSelecteds(): void {
      this.$bvModal
        .msgBoxConfirm(this._getDeleteSelectedsMessage(), {
          title: 'Excluindo personagens',
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
            this.selected.forEach((uuid) => this.deleteCharacter(uuid))
          }
        })
    },
    deleteCharacter(uuid: string): void {
      this.$fire.database.ref('character').child(uuid).remove()
    },
    _getDeleteSelectedsMessage(): string {
      if (this.selected.length === 1) {
        return `Você tem certeza que deseja deletar o personagem ${
          this.items.find((item) => item.uuid === this.selected[0])?.name
        }?`
      } else {
        return `Você tem certeza que deseja deletar ${this.selected.length} personagens?`
      }
    },
    showNewCharacterModal() {
      this.$bvModal.show('navbar-new-character-modal')
    },
  },
})
</script>

<style lang="scss">
#management-container {
  margin-top: 2rem;
}
</style>