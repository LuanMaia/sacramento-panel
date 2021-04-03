<template>
  <div
    ref="profileContainer"
    :style="{ height: height + 'px' }"
    class="d-flex profile-container"
  >
    <img
      class="character-avatar col-3"
      :src="`${profilePictureUrl}&${timestamp}`"
      alt="Avatar do personagem"
      v-if="profilePictureUrl != null && profilePictureUrl !== ''"
    />
    <img
      class="character-avatar col-3"
      src="/img/profile-picture.png"
      alt="Avatar do personagem vazio"
      v-else
    />

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
      timestamp: Date.now(),
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
  },
})
</script>

<style lang="scss">
.profile-container {
  > .character-avatar {
    border-radius: 50%;
    object-fit: cover;
  }

  > .profile-info {
    align-content: center;

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