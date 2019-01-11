<template>
<div class="content has-text-centered">
  <h1 class="is-title is-bold">Register</h1>

  <div class="columns is-vcentered">
    <div class="column is-6 is-offset-3">
      <div class="box">
        <div v-show="error" style="color:red; word-wrap:break-word;">{{ error }}</div>
        <form v-on:submit.prevent="registerSubmit">
            <label class="label">Student Number</label>
            <p class="control">
              <input v-model="register.data.upid" class="input" placeholder="student number" v-mask="'####-#####'">
            </p>
            <label class="label">First Name</label>
            <p class="control">
              <input v-model="register.data.first_name" class="input" type="text" placeholder="first name">
            </p>
            <label class="label">Last Name</label>
            <p class="control">
              <input v-model="register.data.last_name" class="input" type="text" placeholder="last name">
            </p>
            <label class="label">Email</label>
            <p class="control">
              <input v-model="register.data.email" class="input" type="text" placeholder="email">
            </p>
            <label class="label">Username</label>
            <p class="control">
              <input v-model="register.data.username" class="input" type="text" placeholder="username">
            </p>
            <label class="label">Password</label>
            <p class="control">
              <input v-model="register.data.password" class="input" type="password" placeholder="password">
            </p>
            <label class="label">Confirm Password</label>
            <p class="control">
              <input v-model="register.data.confirm" class="input" type="password" placeholder="password">
            </p>
            <p class="control">
              <center><button type="submit" class="button is-primary">Register</button></center>
            </p>
            <hr>
        </form>
        <button class="button is-default" @click="activateLog()">Login to my account</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Cleave from 'vue-cleave'
import 'cleave.js/dist/addons/cleave-phone.cn'
import Vue from 'vue'
import Notification from 'vue-bulma-notification'
import VueMask from 'v-mask'

Vue.use(VueMask)

const NotificationComponent = Vue.extend(Notification)

const openNotification = (propsData = {
  title: '',
  message: '',
  type: '',
  direction: '',
  duration: 2000,
  container: '.notifications'
}) => {
  return new NotificationComponent({
    el: document.createElement('div'),
    propsData
  })
}

export default {
  components: {
    Cleave,
    Notification
  },

  data () {
    return {
      error: null,
      register: {
        isReg: false,
        data: {
          upid: '',
          username: '',
          first_name: '',
          last_name: '',
          password: '',
          confirm: '',
          email: ''
        }
      }
    }
  },
  beforeCreate () {
    if (this.$auth.check()) {
      this.$router.push('Dashboard')
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
    activateLog () {
      this.$router.push('Login')
    },
    registerSubmit () {
      var newUser = {}
      newUser.first_name = this.register.data.first_name
      newUser.last_name = this.register.data.last_name
      newUser.upid = this.register.data.upid
      newUser.username = this.register.data.username
      newUser.password = this.register.data.password
      newUser.confirm_password = this.register.data.confirm
      newUser.email = this.register.data.email
      // logs (newUser)
      this.axios.post('auth/register/', newUser).then(
        response => {
          openNotification({
            message: 'Successfully registered user.',
            type: 'success',
            duration: 4000
          })
          this.$router.push('Login')
        }
      ).catch(
        error => {
          for (var key in error.response.data) {
            // check if the property/key is defined in the object itself, not in parent
            if (key === '0') {
              openNotification({
                message: error.response.data[0],
                type: 'danger',
                duration: 4000
              })
            } else {
              openNotification({
                message: error.response.data[key][0] + ' (' + key + ')',
                type: 'danger',
                duration: 4000
              })
            }
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.is-title {
    text-transform: capitalize;
}
</style>
