<template>
  <div class="login-container">
    <b-card class="login-card mt-3" header="Login">
      <b-form @submit="onLoginSubmit" @reset="onReset">
        <b-form-group
          id="input-group-email"
          label="Email:"
          label-for="input-email"
        >
          <b-form-input
            id="input-email"
            v-model="loginForm.email"
            type="email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-passowrd"
          label="Senha:"
          label-for="input-passowrd"
        >
          <b-form-input
            id="input-passowrd"
            v-model="loginForm.password"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <b-button id="login-submit" type="submit" variant="primary"
          >Entrar</b-button
        >
      </b-form>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    onLoginSubmit(event: Event) {
      event.preventDefault()
      this.$fire.auth
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then((userCredential) => {
          this.$router.push({ path: '/' })
        })
        .catch((error) => {
          alert('Usuário/senha incorreto')
        })
    },
  },
})
</script>

<style lang="scss">
.login-container {
  width: 30rem;
  margin: 10rem auto;
}

#login-submit {
  float: right;
  width: 10rem;
}
</style>