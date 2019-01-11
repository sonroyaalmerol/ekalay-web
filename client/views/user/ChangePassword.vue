<template>
<div class="content has-text-centered">
  <h1 class="is-title is-bold">Login</h1>

  <div class="columns is-vcentered">
    <div class="column is-6 is-offset-3">
      <div class="box">
        <div v-show="error" style="color:red; word-wrap:break-word;">{{ error }}</div>
        <form v-on:submit.prevent="changepassword">
          <label class="label">Current Password</label>
          <p class="control">
            <input v-model="data.body.currpass" class="input" type="password" placeholder="current password">
          </p>
          <label class="label">New Password</label>
          <p class="control">
            <input v-model="data.body.newpass" class="input" type="password" placeholder="new password">
          </p>
          <label class="label">Confirm New Password</label>
          <p class="control">
            <input v-model="data.body.confirmnewpass" class="input" type="password" placeholder="confirm new password">
          </p>
          <p class="control">
            <center><button type="submit" class="button is-primary">Change Password</button></center>
          </p>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import Notification from 'vue-bulma-notification'

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
    Notification
  },
  data () {
    return {
      data: {
        currpass: null,
        newpass: null,
        confirmnewpass: null
      },
      error: null
    }
  },
  methods: {
    changepassword: function () {
      if (this.data.newpass === this.data.confirmnewpass) {
        this.axios.put('residents/' + this.data.upid, this.data).then(
          response => {
            this.editMode = false
            openNotification({
              message: 'Successfully updated profile.',
              type: 'success',
              duration: 4000
            })
          }
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.is-title {
    text-transform: capitalize;
}
</style>
