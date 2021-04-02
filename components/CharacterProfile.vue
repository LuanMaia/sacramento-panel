<template>
  <div class="d-flex profile-container">
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
        :data-text="characterName"
        v-if="!showLife || characterLife == null || characterMaxLife == null"
      >
        {{ characterName }}
      </div>
      <div
        class="col-12 character-life"
        :data-text="`${characterLife}/${characterMaxLife}`"
        v-else
      >
        {{ characterLife }}/{{ characterMaxLife }}
      </div>
      <div class="col-12 player-tag" :data-text="playerTag">
        {{ playerTag }}
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
    > .character-name {
      font-size: 12rem;
    }
    > .character-life {
      font-size: 12rem;
    }
    > .player-tag {
      font-size: 4rem;
    }
  }
}
</style>