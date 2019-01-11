<template>
    <div>
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child box">
              <form v-on:submit.prevent="pisSubmit">
                <table class="table">
                  <tbody>
                    <h4 class="title">Personal Data</h4>
                    <tr>
                      <th>Student Number</th>
                      <td><p class="control">
                        <input v-model="data.upid" class="input" v-mask="'####-#####'">
                      </p></td>
                    </tr>
                    <br>
                    <h4 class="title">Overnight Instructions</h4>
                    <tr>
                      <th>Go home on weekends</th>
                      <td><p class="control">
                        <label class="checkbox">
                          <input v-model="data.ghwe" type="checkbox">
                          Allow?
                        </label>
                      </p></td>
                    </tr>
                    <tr>
                      <th>Go home on weekdays</th>
                      <td><p class="control">
                        <label class="checkbox">
                          <input v-model="data.ghwd" type="checkbox">
                          Allow?
                        </label>
                      </p></td>
                    </tr>
                    <tr>
                      <th>Weekend with relatives</th>
                      <td><p class="control">
                        <label class="checkbox">
                          <input v-model="data.wewr" type="checkbox">
                          Allow?
                        </label>
                      </p></td>
                    </tr>
                    <tr>
                      <th>Overnight with friends</th>
                      <td><p class="control">
                        <label class="checkbox">
                          <input v-model="data.overn" type="checkbox">
                          Allow?
                        </label>
                      </p></td>
                    </tr>
                    <br>
                    <h4 class="title">Late Night Instructions</h4>
                    <tr>
                      <th>Late night (School-related)</th>
                      <td><p class="control">
                        <label class="checkbox">
                          <input v-model="data.lns" type="checkbox">
                          Allow?
                        </label>
                      </p></td>
                    </tr>
                    <tr>
                      <th>Late night (Non school-related)</th>
                      <td><p class="control">
                        <label class="checkbox">
                          <input v-model="data.lnns" type="checkbox">
                          Allow?
                        </label>
                      </p></td>
                    </tr>
                    <br>
                    <h4 class="title">Early Morning Instructions</h4>
                    <tr>
                      <th>Early morning (School-related)</th>
                      <td><p class="control">
                        <label class="checkbox">
                          <input v-model="data.ems" type="checkbox">
                          Allow?
                        </label>
                      </p></td>
                    </tr>
                    <tr>
                      <th>Early morning (Non school-related)</th>
                      <td><p class="control">
                        <label class="checkbox">
                          <input v-model="data.emns" type="checkbox">
                          Allow?
                        </label>
                      </p></td>
                    </tr>
                    <br>
                    <h4 class="title">Other Instructions</h4>
                    <tr>
                      <th>Attend field trips</th>
                      <td><p class="control">
                        <label class="checkbox">
                          <input v-model="data.ft" type="checkbox">
                          Allow?
                        </label>
                      </p></td>
                    </tr>
                    <tr>
                      <th>Join organizations</th>
                      <td><p class="control">
                        <label class="checkbox">
                          <input v-model="data.org" type="checkbox">
                          Allow?
                        </label>
                      </p></td>
                    </tr>
                    <tr>
                      <th>Join rallies</th>
                      <td><p class="control">
                        <label class="checkbox">
                          <input v-model="data.rallies" type="checkbox">
                          Allow?
                        </label>
                      </p></td>
                    </tr>
                    <tr>
                      <th>Remarks</th>
                      <td><p class="control">
                        <input v-model="data.remarks" class="input" type="text">
                      </p></td>
                    </tr>
                    <br>
                  </tbody>
                </table>
                <p class="control">
                  <center><button type="submit" class="button is-primary">Add PIS</button></center>
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
  created () {
    this.data.upid = this.$route.params.upid
  },
  methods: {
    pisSubmit: function () {
      this.axios.post('instructions/', this.data).then(
        response => {
          openNotification({
            message: 'Successfully added PIS.',
            type: 'success',
            duration: 4000
          })
          this.$router.push('/databases/users')
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
