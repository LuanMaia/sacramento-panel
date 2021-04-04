<template>
  <div id="life-link-generator-container">
    <Navbar />
    <main class="life-link-generator-content">
      <b-card class="login-card mt-3" header="Vida do personagem">
        <b-form @submit="onLinkGeneratorSubmit">
          <b-form-group
            id="input-group-character"
            label="Personagem:"
            label-for="input-character"
          >
            <b-form-select
              id="input-character"
              v-model="linkGeneratorForm.character"
              :options="characterOptions"
              required
            ></b-form-select>
          </b-form-group>
          <b-form-group
            id="input-group-text-color"
            label="Cor do texto (em inglês):"
            label-for="input-text-color"
          >
            <b-form-input
              id="input-text-color"
              v-model="linkGeneratorForm.textColor"
              type="text"
              required
            ></b-form-input>
          </b-form-group>
          <SpinButtonField
            id="input-text-glitch-type"
            label="Tipo de glitch"
            v-model="linkGeneratorForm.glitchType"
            :labelCols="1"
            :contentCols="2"
            :min="1"
            :max="6"
          />

          <InputField
            id="life-generated-link"
            v-model="generatedLink"
            :contentCols="12"
            :readonly="true"
          />

          <b-button id="link-generator-submit" type="submit" variant="primary">
            Gerar
          </b-button>
        </b-form>
      </b-card>

      <LiveStreamLife
        id="live-stream-life-preview"
        :characterLife="linkGeneratorForm.character.life"
        :characterMaxLife="linkGeneratorForm.character.maxLife"
        :textColor="linkGeneratorForm.textColor"
        :glitchType="linkGeneratorForm.glitchType"
      />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Character } from '@/assets/classes/character'

export default Vue.extend({
  middleware: 'authentication-guard',
  data() {
    return {
      linkGeneratorForm: {
        textColor: 'white',
        glitchType: 2,
        character: new Character(),
      },
      generatedLink: '',
      characterOptions: new Array<{ value: Character; text: string }>(),
      characters: new Array<Character>(),
    }
  },
  methods: {
    onLinkGeneratorSubmit(event: Event) {
      event.preventDefault()

      this.generatedLink =
        `${this.getHttpOrHttps()}://${location.host}/character/life` +
        `?character-uuid=${this.linkGeneratorForm.character.uuid}` +
        `&glitch-type=${this.linkGeneratorForm.glitchType}` +
        `&text-color=${this.linkGeneratorForm.textColor}` +
        `&timestamp=${Date.now()}`
    },
    getHttpOrHttps(): string {
      if (location.href.includes('https')) {
        return 'https'
      } else {
        return 'http'
      }
    },
  },
  created() {
    this.$fire.database.ref('character').on('value', (snapshot) => {
      this.characters = []
      const characters = snapshot.val()
      const firebaseCharacters: any[] = this.$firebaseArrayToArrayOf<any>(
        characters
      )

      firebaseCharacters.forEach((firebaseCharacter) => {
        const character = this.$convertFirebaseCharacterData(firebaseCharacter)
        character.uuid = firebaseCharacter['uuid']

        if (character.public) {
          this.characters.push(character)
        }
      })

      this.characterOptions = this.characters.map((character) => {
        return {
          value: character,
          text: character.name?.toString() || '',
        }
      })
    })
  },
})
</script>

<style lang="scss">
#life-link-generator-container {
  background-color: #00000075;
  min-height: 100vh;

  .life-text {
    font-size: 20rem;
  }
}

.life-link-generator-content {
  width: 70%;
  margin: 2rem auto;
}

#link-generator-submit {
  float: right;
  width: 10rem;
}

#live-stream-life-preview {
  position: absolute;
  transform: translate(50%, 0);
}
</style>