<template>
  <div
    ref="profileContainer"
    :style="{ height: height + 'px' }"
    class="d-flex profile-container"
  >
    <div
      class="character-avatar col-3"
      :class="{ editable: !readonly }"
      :style="`background: url(${profilePictureUrl}) no-repeat 50% 0px / cover;`"
      @click="emitAvatarClick()"
      v-if="profilePictureUrl != null && profilePictureUrl !== ''"
    ></div>
    <div
      class="character-avatar col-3"
      :class="{ editable: !readonly }"
      style="
        background: url(/img/profile-picture.png) no-repeat 50% 0px / cover;
      "
      @click="emitAvatarClick()"
      v-else
    ></div>

    <div
      :class="`gl-${glitchType}`"
      class="glitch profile-info row col-9"
      :style="`color: ${textColor};`"
    >
      <div
        class="col-12 character-name"
        :style="{ 'font-size': characterNameFontSize + 'px' }"
        :data-text="characterName"
        v-if="!showLife || characterLife == null || characterMaxLife == null"
      >
        {{ characterName }}
      </div>
      <div
        class="col-12 character-life"
        :style="{ 'font-size': characterLifeFontSize + 'px' }"
        :data-text="`${characterLife}/${characterMaxLife}`"
        v-else
      >
        {{ characterLife }}/{{ characterMaxLife }}
      </div>
      <div
        class="col-12 player-tag"
        :style="{ 'font-size': playerTagFontSize + 'px' }"
        :data-text="`@${playerTag}`"
        v-if="playerTag != null && playerTag !== ''"
      >
        @{{ playerTag }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      height: 0,
      characterNameFontSize: 0,
      characterLifeFontSize: 0,
      playerTagFontSize: 0,
    }
  },
  props: {
    profilePictureUrl: String,
    textColor: String,
    glitchType: Number,
    characterName: String,
    characterLife: Number,
    characterMaxLife: Number,
    playerTag: String,
    showLife: Boolean,
    readonly: Boolean,
  },
  mounted() {
    this.resizeLengths()
    window.addEventListener('resize', this.resizeLengths)
  },
  methods: {
    resizeLengths(): void {
      const container = this.$refs['profileContainer']

      if (container instanceof Element) {
        this.height = container.clientWidth * 0.235
        this.characterNameFontSize = container.clientWidth * 0.12
        this.characterLifeFontSize = container.clientWidth * 0.12
        this.playerTagFontSize = container.clientWidth * 0.04
      }
    },
    emitAvatarClick(): void {
      this.$emit('avatarClick')
    },
  },
})
</script>

<style lang="scss">
.profile-container {
  > .character-avatar {
    padding: 0;
    border-radius: 50%;
  }
  > .character-avatar.editable {
    cursor: pointer;

    &:hover {
      box-shadow: inset 0 0 0 500px rgba(173, 173, 173, 0.445);
    }
  }

  > .profile-info {
    align-content: center;
    padding-left: 2rem;

    > .character-name,
    .character-life,
    .player-tag {
      padding: 0;
      font-family: BenderBlack;
      font-style: italic;
      line-height: normal;
      text-transform: uppercase;
    }
  }
}
</style>