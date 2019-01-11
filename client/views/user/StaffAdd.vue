<template>
    <div>
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child box">
              <form v-on:submit.prevent="profileSubmit">
                <table class="table">
                  <tbody>
                    <h4 class="title">Staff Data</h4>
                    <tr>
                      <th>KRH ID Number</th>
                      <td><p class="control">
                        <input v-model="data.krhid" class="input" v-mask="'AAA-####-##'">
                      </p></td>
                    </tr>
                    <tr>
                      <th>First Name</th>
                      <td><p class="control">
                        <input v-model="data.first_name" class="input">
                      </p></td>
                    </tr>
                    <tr>
                      <th>Last Name</th>
                      <td><p class="control">
                        <input v-model="data.last_name" class="input">
                      </p></td>
                    </tr>
                    <tr>
                      <th>Position</th>
                      <td><p class="control">
                        <input v-model="data.position" class="input">
                      </p></td>
                    </tr>
                  </tbody>
                </table>
                <p class="control">
                  <center><button type="submit" class="button is-primary">Add Staff</button></center>
                </p>
            </form>
            </article>
        </div>
    </div>
</div>
</template>

<script>
import Cleave from 'vue-cleave'
import 'cleave.js/dist/addons/cleave-phone.cn'
import Vue from 'vue'
import Notification from 'vue-bulma-notification'
import Datepicker from 'vue-bulma-datepicker'
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
    Notification,
    Datepicker
  },
  data: function () {
    return {
      data: {}
    }
  },
  methods: {
    profileSubmit: function () {
      this.axios.post('staffs/', this.data).then(
        response => {
          openNotification({
            message: 'Successfully added staff.',
            type: 'success',
            duration: 4000
          })
          this.$router.push('/databases/staffs')
        }
      ).catch(
        error => {
          openNotification({
            message: error.response.data,
            type: 'danger',
            duration: 4000
          })
        }
      )
    }
  }
}
</script>

<style lang="scss">
.table-responsive {
  display: block;
  width: 100%;
  min-height: .01%;
  overflow-x: auto;
}
</style>
