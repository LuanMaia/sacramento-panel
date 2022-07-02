<template>
  <div class="life-hud">
    <img src="/img/life-hud.png" class="life-base-image">

    <div class="character-name">
      <span class="character-name-text">{{ characterName }}</span>
    </div>

    <div class="character-avatar" :style="`background: url(${getProfileAvatarUrl()}) no-repeat 50% 0px / cover;`"
      v-bind:class="{ 'life-0': getLifePercentage() <= 0 }" v-if="getProfileAvatarUrl() != null && getProfileAvatarUrl() !== ''"></div>
    <div class="character-avatar" style="
        background: url(/img/profile-picture.png) no-repeat 50% 0px / cover;" v-else></div>
    <div class="character-avatar life-border" style="
        background: url(/img/life-critical-border.png) no-repeat 50% 0px / cover;" v-bind:class="{ 'life-border-on': getLifePercentage() <= 50 && getLifePercentage() > 0 }"></div>
    <div class="character-avatar life-border" style="
        background-color: rgba(0, 0, 0, 0.55);" v-bind:class="{ 'life-border-on': getLifePercentage() <= 0 }"></div>

    <div class="progress life-box" id="life-progress-bar" v-bind:class="{ 'life-0': getLifePercentage() <= 0 }">
      <div class="progress-bar" role="progressbar" :style="{ width: getLifePercentage() + '%' }">
      </div>
    </div>
    <div class="life-box" id="life-text-box">
      <span id="life-description" class="life-text" v-bind:class="{ 'life-0': getLifePercentage() <= 0 }">HP</span>
      <span id="life-number" class="life-text" v-bind:class="{ 'life-0': getLifePercentage() <= 0 }">{{ characterLife }}/{{ characterMaxLife }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    characterLife: Number,
    characterMaxLife: Number,
    characterName: String,
    profileAvatarUrl: String,
  },
  methods: {
    getLifePercentage(): number {
      return (this.characterLife / this.characterMaxLife) * 100;
    },
    getProfileAvatarUrl(): String {
      return this.profileAvatarUrl;
    }
  }
})
</script>

<style lang="scss">
.life-hud {
  width: 100vw;
  height: 100vh;

  >.character-avatar {
    z-index: 0;
    position: absolute;
    top: 60px;
    left: 60px;

    width: 246px;
    height: 246px;

    -webkit-transition: all 500ms ease-in-out;
    -moz-transition: all 500ms ease-in-out;
    -ms-transition: all 500ms ease-in-out;
    -o-transition: all 500ms ease-in-out;
    transition: all 500ms ease-in-out;

    &.life-0 {
      filter: grayscale(100%);
    }

    &.life-border {
      z-index: 1;
      opacity: 0;

      &.life-border-on {
        opacity: 1;
      }
    }
  }

  >.character-name {
    z-index: 3;
    position: absolute;
    top: 53px;
    left: 366px;

    >.character-name-text {
      color: white;
      font-family: RobotoSlab;
      font-size: 72px;
      font-weight: bolder;
    }
  }

  >.life-base-image {
    position: absolute;
    z-index: 2;
    width: 1280px;
  }

  >.progress {
    z-index: 1;

    &#life-progress-bar {
      -webkit-transition: background-color 500ms linear;
      -ms-transition: background-color 500ms linear;
      -moz-transition: background-color 500ms linear;
      -o-transition: background-color 500ms linear;
      transition: background-color 500ms linear;

      &:not(.life-0)  {
        background-color: #383838;
      }

      &.life-0 {
        background-color: #000;
      }

      >.progress-bar {
        background-color: #b60606;
      }
    }
  }

  .life-box {
    position: absolute;
    top: 178px;
    left: 366px;
    width: 853px;
    height: 127px;

    &#life-text-box {
      display: flex;
      align-items: center;
      justify-content: space-between;

      >.life-text {
        position: relative;
        z-index: 3;

        color: white;
        font-family: RobotoSlab;
        font-size: 72px;
        font-weight: bolder;

        -webkit-transition: opacity 500ms ease-in-out;
        -moz-transition: opacity 500ms ease-in-out;
        -ms-transition: opacity 500ms ease-in-out;
        -o-transition: opacity 500ms ease-in-out;
        transition: opacity 500ms ease-in-out;

        &:not(.life-0) {
          opacity: 1;
        }

        &.life-0 {
          opacity: 0;
        }

        &#life-description {
          left: 48px;
        }

        &#life-number {
          right: 48px;
        }
      }
    }
  }
}
</style>