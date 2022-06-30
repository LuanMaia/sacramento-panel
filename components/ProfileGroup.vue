<template>
  <div>
    <b-card bg-variant="dark" text-variant="white" title="Perfil">
      <div class="col-8" id="profile-wrapper">
        <CharacterProfile
          :profilePictureUrl="profilePictureUrl"
          textColor="white"
          :glitchType="3"
          :characterName="name"
          :characterLife="life"
          :characterMaxLife="maxLife"
          :playerTag="playerTag"
          :showLife="false"
          :readonly="readonly"
          @avatarClick="openFileUpload()"
        />
        <input
          type="file"
          accept="image/png"
          @change="uploadProfileAvatar($event)"
          style="display: none"
          ref="profileAvatarInput"
          id="profile-avatar-input"
        />
      </div>
      <InputField
        id="character-name-field"
        label="Nome"
        :value="name"
        @input="updateName($event)"
        :labelCols="3"
        :contentCols="6"
        v-if="!readonly"
      />
      <InputField
        id="player-name-field"
        label="Jogador"
        prepend="@"
        :value="playerTag"
        @input="updatePlayerTag($event)"
        :labelCols="3"
        :contentCols="6"
        v-if="!readonly"
      />
      <InputField
        id="character-description-field"
        label="Conceito"
        :value="description"
        @input="updateDescription($event)"
        :labelCols="3"
        :contentCols="6"
        :readonly="readonly"
      />
      <InputField
        id="character-character-experience-field"
        label="Experiência"
        :value="`${exp}`"
        @input="updateExp($event)"
        :labelCols="3"
        :contentCols="6"
        :readonly="readonly"
        type="number"
      />
      <SpinButtonField
        id="character-character-life-field"
        label="Vida máxima"
        :value="maxLife"
        @input="updateMaxLife($event)"
        :labelCols="3"
        :contentCols="6"
        :readonly="readonly"
        :min="0"
        :max="999999999"
      />
      <SpinButtonField
        id="character-character-life-field"
        label="Vida"
        :value="life"
        @input="updateLife($event)"
        :labelCols="3"
        :contentCols="6"
        :min="0"
        :max="maxLife"
      />
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    profilePictureUrl: String,
    name: String,
    description: String,
    readonly: Boolean,
    life: Number,
    maxLife: Number,
    exp: Number,
    playerTag: String,
  },
  methods: {
    openFileUpload(): void {
      const profileAvatarInputElement = this.$refs['profileAvatarInput']

      if (profileAvatarInputElement instanceof HTMLInputElement) {
        profileAvatarInputElement.click()
      }
    },
    updateName(name: String): void {
      this.$emit('name', name)
    },
    updatePlayerTag(playerTag: String): void {
      this.$emit('playerTag', playerTag)
    },
    updateDescription(description: String): void {
      this.$emit('description', description)
    },
    updateExp(exp: Number): void {
      this.$emit('exp', exp)
    },
    updateLife(life: Number): void {
      this.$emit('life', life)
    },
    updateMaxLife(maxLife: Number): void {
      this.$emit('maxLife', maxLife)
    },
    uploadProfileAvatar(event: any): void {
      if (
        event.target.files[0] instanceof File &&
        event.target.files[0].type.includes('png')
      ) {
        this.$emit('uploadProfileAvatar', event.target.files[0])
      }
    },
  },
})
</script>

<style lang="scss">
#profile-wrapper {
  margin: 0 auto;
  margin-bottom: 1rem;
}
</style>