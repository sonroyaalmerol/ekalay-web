<template>
<div class="content has-text-centered">
  <h1 class="is-title is-bold">Login</h1>

  <div class="columns is-vcentered">
    <div class="column is-6 is-offset-3">
      <div class="box">
        <div v-show="error" style="color:red; word-wrap:break-word;">{{ error }}</div>
        <form v-on:submit.prevent="login">
          <label class="label">Username</label>
          <p class="control">
            <input v-model="data.body.username" class="input" type="text" placeholder="username">
          </p>
          <label class="label">Password</label>
          <p class="control">
            <input v-model="data.body.password" class="input" type="password" placeholder="password">
          </p>
          <p class="control">
            <center><button type="submit" class="button is-primary">Login</button></center>
          </p>
        </form>
        <hr>
        <button class="button is-default" @click="activateReg()">Don't have an account?</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {

  data () {
    return {
      data: {
        body: {
          username: null,
          password: null
        }
      },
      error: null
    }
  },
  beforeCreate () {
    if (this.$auth.check()) {
      this.$router.push('dashboard')
    }
  },
  mounted () {
    if (this.$auth.redirect()) {
      // logs ('Redirect from: ' + this.$auth.redirect().from.name)
      this.error = 'Session expired.'
    }
    // Can set query parameter here for auth redirect or just do it silently in login redirect.
  },
  methods: {
    activateReg () {
      this.$router.push('register')
    },
    login () {
      var redirect = this.$auth.redirect()
      if (this.data.body.username && this.data.body.password) {
        this.$auth.login({
          data: this.data.body,
          rememberMe: this.data.rememberMe,
          redirect: {name: redirect ? redirect.from.name : 'Dashboard'},
          success (res) {
            // logs ('Auth Success')
            this.$router.push('Dashboard')
          },
          error (err) {
            if (err.response) {
              // The request was made, but the server responded with a status code
              // that falls out of the range of 2xx
              // // logs (err.response.status)
              // // logs (err.response.data)
              // // logs (err.response.headers)
              this.error = err.response.data
              if (err.response.data.non_field_errors != null) {
                this.error = err.response.data.non_field_errors[0]
              }
            } else {
              // Something happened in setting up the request that triggered an Error
              // logs ('Error', err.message)
            }
            // logs (err.config)
          }
        })
      }
    }
    // filters: {
    //   json: function (value) {
    //     // logs (value)
    //     return value
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.is-title {
    text-transform: capitalize;
}
</style>
