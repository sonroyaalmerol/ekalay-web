<template>
    <div>
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child box">
              <button style="float: right;" v-if="($auth.user().profile.role == 1 || $auth.user().profile.role == 2) && !this.isEdit" class="button is-primary" @click="editProfileToggle()"><i class="fa fa-edit" aria-hidden="true"></i>&nbsp;Edit PIS</button>
              <form v-on:submit.prevent="profileSubmit">
                <table class="table">
                  <tbody>
                    <h4 class="title">Overnight Instructions</h4>
                    <tr>
                      <th>Go home on weekends</th>
                      <td v-if="!this.isEdit">{{ data.ghwe | humanifyBoolean }}</td>
                      <td v-else>
                          <p class="control">
                            <label class="checkbox">
                              <input v-model="data.ghwe" type="checkbox">
                              Allow?
                            </label>
                          </p>
                      </td>
                    </tr>
                    <tr>
                      <th>Go home on weekdays</th>
                      <td v-if="!this.isEdit">{{ data.ghwd | humanifyBoolean }}</td>
                      <td v-else>
                          <p class="control">
                            <label class="checkbox">
                              <input v-model="data.ghwd" type="checkbox">
                              Allow?
                            </label>
                          </p>
                      </td>
                    </tr>
                    <tr>
                      <th>Weekend with relatives</th>
                      <td v-if="!this.isEdit">{{ data.wewr | humanifyBoolean }}</td>
                      <td v-else>
                          <p class="control">
                            <label class="checkbox">
                              <input v-model="data.wewr" type="checkbox">
                              Allow?
                            </label>
                          </p>
                      </td>
                    </tr>
                    <tr>
                      <th>Overnight with friends</th>
                      <td v-if="!this.isEdit">{{ data.overn | humanifyBoolean }}</td>
                      <td v-else>
                          <p class="control">
                            <label class="checkbox">
                              <input v-model="data.overn" type="checkbox">
                              Allow?
                            </label>
                          </p>
                      </td>
                    </tr>
                    <br>
                    <h4 class="title">Late Night Instructions</h4>
                    <tr>
                      <th>Late night (School-related)</th>
                      <td v-if="!this.isEdit">{{ data.lns | humanifyBoolean }}</td>
                      <td v-else>
                          <p class="control">
                            <label class="checkbox">
                              <input v-model="data.lns" type="checkbox">
                              Allow?
                            </label>
                          </p>
                      </td>
                    </tr>
                    <tr>
                      <th>Late night (Non school-related)</th>
                      <td v-if="!this.isEdit">{{ data.lnns | humanifyBoolean }}</td>
                      <td v-else>
                          <p class="control">
                            <label class="checkbox">
                              <input v-model="data.lnns" type="checkbox">
                              Allow?
                            </label>
                          </p>
                      </td>
                    </tr>
                    <br>
                    <h4 class="title">Early Morning Instructions</h4>
                    <tr>
                      <th>Early morning (School-related)</th>
                      <td v-if="!this.isEdit">{{ data.ems | humanifyBoolean }}</td>
                      <td v-else>
                          <p class="control">
                            <label class="checkbox">
                              <input v-model="data.ems" type="checkbox">
                              Allow?
                            </label>
                          </p>
                      </td>
                    </tr>
                    <tr>
                      <th>Early morning (Non school-related)</th>
                      <td v-if="!this.isEdit">{{ data.emns | humanifyBoolean }}</td>
                      <td v-else>
                          <p class="control">
                            <label class="checkbox">
                              <input v-model="data.emns" type="checkbox">
                              Allow?
                            </label>
                          </p>
                      </td>
                    </tr>
                    <br>
                    <h4 class="title">Other Instructions</h4>
                    <tr>
                      <th>Attend field trips</th>
                      <td v-if="!this.isEdit">{{ data.ft | humanifyBoolean }}</td>
                      <td v-else>
                          <p class="control">
                            <label class="checkbox">
                              <input v-model="data.ft" type="checkbox">
                              Allow?
                            </label>
                          </p>
                      </td>
                    </tr>
                    <tr>
                      <th>Join organizations</th>
                      <td v-if="!this.isEdit">{{ data.org | humanifyBoolean }}</td>
                      <td v-else>
                          <p class="control">
                            <label class="checkbox">
                              <input v-model="data.org" type="checkbox">
                              Allow?
                            </label>
                          </p>
                      </td>
                    </tr>
                    <tr>
                      <th>Join rallies</th>
                      <td v-if="!this.isEdit">{{ data.rallies | humanifyBoolean }}</td>
                      <td v-else>
                          <p class="control">
                            <label class="checkbox">
                              <input v-model="data.rallies" type="checkbox">
                              Allow?
                            </label>
                          </p>
                      </td>
                    </tr>
                    <tr>
                      <th>Remarks</th>
                      <td v-if="!this.isEdit">{{ data.remarks }}</td>
                      <td v-else>
                          <p class="control">
                            <input v-model="data.remarks" class="input" type="text" placeholder="Remarks">
                          </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p v-if="this.isEdit" class="control">
                  <center><button type="submit" class="button is-primary">Submit PIS</button></center>
                </p>
            </form>
            </article>
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
  created () {
    let upid = 'instructions/' + this.$route.params.own
    if (!this.$route.params.own) {
      upid = 'instructions/' + this.$auth.user().profile.upid
    }
    this.axios.get(upid).then(
      response => {
        var test = response.data
        this.data = test
        // logs (test)
      }
    )
  },
  data: function () {
    return {
      data: [],
      columns: [],
      editMode: false
    }
  },
  computed: {
    isEdit: function () {
      return this.editMode
    }
  },
  methods: {
    editProfileToggle: function () {
      this.editMode = !this.editMode
    },
    profileSubmit: function () {
      /* this.data.ghwe = !!this.data.ghwe
      this.data.ghwd = !!this.data.ghwd
      this.data.wewr = !!this.data.wewr
      this.data.overn = !!this.data.overn
      this.data.lns = !!this.data.lns
      this.data.lnns = !!this.data.lnns
      this.data.ems = !!this.data.ems
      this.data.emns = !!this.data.emns
      this.data.ft = !!this.data.ft
      this.data.org = !!this.data.org
      this.data.rallies = !!this.data.rallies */
      this.axios.put('instructions/' + this.data.upid, this.data).then(
        response => {
          this.editMode = false
          openNotification({
            message: 'Successfully updated PIS.',
            type: 'success',
            duration: 4000
          })
        }
      )
    }
  },
  filters: {
    humanifyPIS: function (str) {
      switch (str) {
        case 'ghwe':
          return 'Go home on weekends'
        case 'ghwd':
          return 'Go home on weekdays'
        case 'wewr':
          return 'Weekend with relatives'
        case 'overn':
          return 'Overnight with friends'
        case 'lns':
          return 'Late night (School-related)'
        case 'lnns':
          return 'Late night (Non school-related)'
        case 'ems':
          return 'Early morning (School-related)'
        case 'emns':
          return 'Early morning (Non school-related)'
        case 'ft':
          return 'Field Trips'
        case 'org':
          return 'Organizations'
        case 'rallies':
          return 'Rallies'
        case 'remarks':
          return 'Remarks'
      }
    },
    humanifyBoolean: function (str) {
      if (str === true) {
        return 'Allowed'
      } else if (str === false) {
        return 'Not allowed'
      } else {
        return 'Not allowed'
      }
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
