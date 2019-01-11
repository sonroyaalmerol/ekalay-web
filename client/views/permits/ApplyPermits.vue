<template>
  <div>
    <message :title="'Online Permits Guidelines'" :type="'info'" :direction="'right'" :message="'The cut-off time for the online permits is 4:00 pm. All permits not filed by that time will be queued for the next day unless it\'s Friday. On Fridays, all permits filed after 4:00 pm are rejected by the system. The online permits are closed during weekends since office hours are only during weekdays. You can only submit 1 online permit for early morning and 1 online permit for late night per day (except for Fridays). On Fridays, you are allowed to submit 3 online permits for early morning and late night. It is up to you on how you will use it. Send your waivers/letters to kalayaanrh.upd@up.edu.ph and include the sender\'s email address in the additional notes.'" :duration="0"></message><br />
    <div class="tile is-ancestor">
      <div class="tile is-parent is-12">
        <article class="tile is-child box">
          <div class="block is-flex">
            <tabs :only-fade="true">
              <tab-pane label="Late Night" selected>
                  <h4 class="title">Late Night Permit Application</h4>
                  <div class="block">
                      <div v-if="$auth.user().profile.role == 1" class="control is-horizontal">
                        <div class="control-label">
                          <label class="label">Student Number (Resident)</label>
                        </div>
                        <div class="control">
                          <input v-model="permits.admin_upid" class="input" placeholder="Student Number" v-mask="'####-#####'">
                        </div>
                      </div>
                    <div class="control is-horizontal">
                      <div class="control-label">
                        <label class="label">Date/Time</label>
                      </div>
                      <div class="control is-grouped">
                        <p class="control is-expanded">
                          <datepicker placeholder="When" :config="{ dateFormat: 'm-d-Y', minDate: 'today' }" v-model="permits.ln_date"></datepicker>
                        </p>
                        <p class="control is-expanded">
                          <datepicker placeholder="Until" :config="{ dateFormat: 'h:i K', enableTime: true, enableSeconds: false, noCalendar: true }" v-model="permits.ln_time"></datepicker>
                        </p>
                      </div>
                    </div>
                    <div class="control is-horizontal">
                      <div class="control-label">
                        <label class="label">Where</label>
                      </div>
                      <div class="control">
                        <input class="input" type="text" v-model="permits.ln_where">
                      </div>
                    </div>
                    <div class="control is-horizontal">
                      <div class="control-label">
                        <label class="label">Reason</label>
                      </div>
                      <div class="control">
                        <textarea class="textarea" v-model="permits.ln_reason"></textarea>
                      </div>
                    </div>
                    <div class="control is-horizontal">
                      <div class="control-label">
                        <label class="label">Additional Notes</label>
                      </div>
                      <div class="control">
                        <input class="input" type="text" v-model="permits.ln_remarks">
                      </div>
                    </div>
                    <div class="control is-horizontal">
                      <div class="control-label">
                        <label class="label"></label>
                      </div>
                      <div class="control">
                        <button class="button is-primary" @click="lateNightSubmit()">Submit</button>
                      </div>
                    </div>
                  </div>
              </tab-pane>
              <tab-pane label="Overnight">
                  <h4 class="title">Overnight Permit Application</h4>
                  <div class="block">
                      <div v-if="$auth.user().profile.role == 1" class="control is-horizontal">
                        <div class="control-label">
                          <label class="label">Student Number (Resident)</label>
                        </div>
                        <div class="control">
                          <input v-model="permits.admin_upid" class="input" placeholder="Student Number" v-mask="'####-#####'">
                        </div>
                      </div>
                    <div class="control is-horizontal">
                      <div class="control-label">
                        <label class="label">Date Range</label>
                      </div>
                      <div class="control is-grouped">
                        <p class="control is-expanded">
                          <datepicker placeholder="From" :config="{ dateFormat: 'm-d-Y', minDate: 'today' }" v-model="permits.on_date1"></datepicker>
                        </p>
                        <p class="control is-expanded">
                          <datepicker placeholder="To" :config="{ dateFormat: 'm-d-Y', minDate: permits.on_date1 }" v-model="permits.on_date2"></datepicker>
                        </p>
                      </div>
                    </div>
                    <div class="control is-horizontal">
                      <div class="control-label">
                        <label class="label">Where</label>
                      </div>
                      <div class="control">
                        <input class="input" type="text" v-model="permits.on_where">
                      </div>
                    </div>
                    <div class="control is-horizontal">
                      <div class="control-label">
                        <label class="label">Reason</label>
                      </div>
                      <div class="control">
                        <textarea class="textarea" v-model="permits.on_reason"></textarea>
                      </div>
                    </div>
                    <div class="control is-horizontal">
                      <div class="control-label">
                        <label class="label">Additional Notes</label>
                      </div>
                      <div class="control">
                        <input class="input" type="text" v-model="permits.on_remarks">
                      </div>
                    </div>
                    <div class="control is-horizontal">
                      <div class="control-label">
                        <label class="label"></label>
                      </div>
                      <div class="control">
                        <button class="button is-primary" @click="overNightSubmit()">Submit</button>
                      </div>
                    </div>
                  </div>
              </tab-pane>
              <tab-pane label="Early Morning">
                  <h4 class="title">Early Morning Permit Application</h4>
                  <div class="block">
                      <div v-if="$auth.user().profile.role == 1" class="control is-horizontal">
                        <div class="control-label">
                          <label class="label">Student Number (Resident)</label>
                        </div>
                        <div class="control">
                          <input v-model="permits.admin_upid" class="input" placeholder="Student Number" v-mask="'####-#####'">
                        </div>
                      </div>
                    <div class="control is-horizontal">
                      <div class="control-label">
                        <label class="label">Date/Time</label>
                      </div>
                      <div class="control is-grouped">
                        <p class="control is-expanded">
                          <datepicker placeholder="When" :config="{ dateFormat: 'm-d-Y', minDate: 'today' }" v-model="permits.em_date"></datepicker>
                        </p>
                        <p class="control is-expanded">
                          <datepicker placeholder="Until" :config="{ dateFormat: 'h:i K', enableTime: true, enableSeconds: false, noCalendar: true }" v-model="permits.em_time"></datepicker>
                        </p>
                      </div>
                    </div>
                    <div class="control is-horizontal">
                      <div class="control-label">
                        <label class="label">Where</label>
                      </div>
                      <div class="control">
                        <input class="input" type="text" v-model="permits.em_where">
                      </div>
                    </div>
                    <div class="control is-horizontal">
                      <div class="control-label">
                        <label class="label">Reason</label>
                      </div>
                      <div class="control">
                        <textarea class="textarea" v-model="permits.em_reason"></textarea>
                      </div>
                    </div>
                    <div class="control is-horizontal">
                      <div class="control-label">
                        <label class="label">Additional Notes</label>
                      </div>
                      <div class="control">
                        <input class="input" type="text" v-model="permits.em_remarks">
                      </div>
                    </div>
                    <div class="control is-horizontal">
                      <div class="control-label">
                        <label class="label"></label>
                      </div>
                      <div class="control">
                        <button class="button is-primary" @click="earlyMorningSubmit()">Submit</button>
                      </div>
                    </div>
                  </div>
              </tab-pane>
            </tabs>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { Tabs, TabPane } from 'vue-bulma-tabs'
import Datepicker from 'vue-bulma-datepicker'
import moment from 'moment'
import Vue from 'vue'
import Notification from 'vue-bulma-notification'
import Cleave from 'vue-cleave'
import 'cleave.js/dist/addons/cleave-phone.cn'
import Message from 'vue-bulma-message'
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
    Tabs,
    TabPane,
    Datepicker,
    Notification,
    Message,
    Cleave
  },

  data () {
    return {
      permits: {
        admin_upid: '',
        error: '',
        ln_date: moment().format('MM-DD-YYYY'),
        ln_time: '11:59 PM',
        ln_where: '',
        ln_reason: '',
        ln_remarks: '',
        on_date1: moment().format('MM-DD-YYYY'),
        on_date2: '',
        on_where: '',
        on_reason: '',
        on_remarks: '',
        em_date: moment().format('MM-DD-YYYY'),
        em_time: '4:00 AM',
        em_where: '',
        em_reason: '',
        em_remarks: ''
      }
    }
  },

  methods: {
    onRawValueChanged (newVal) {
      this.demo.rawValue = newVal
    },
    lateNightSubmit () {
      var toSubmit = {}
      toSubmit.permit_type = 1
      toSubmit.upid = this.$auth.user().profile.upid
      if (this.permits.admin_upid) {
        toSubmit.upid = this.permits.admin_upid
      }
      toSubmit.data_one = moment(this.permits.ln_date, 'MM-DD-YYYY').format()
      toSubmit.data_two = moment(this.permits.ln_time, 'h:mm a').format()
      toSubmit.location = this.permits.ln_where
      if (this.permits.ln_remarks) {
        toSubmit.reason = this.permits.ln_reason + ' | ' + this.permits.ln_remarks
      } else {
        toSubmit.reason = this.permits.ln_reason
      }
      this.axios.post('permits/', toSubmit).then(
        response => {
          openNotification({
            message: 'Successfully submitted permit.',
            type: 'success',
            duration: 4000
          })
          this.permits.ln_date = moment().format('MM-DD-YYYY')
          this.permits.ln_time = '11:59 PM'
          this.permits.ln_where = ''
          this.permits.ln_reason = ''
          this.permits.ln_remarks = ''
          this.permits.admin_upid = ''
        }
      ).catch(
        error => {
          openNotification({
            message: error.response.data.message,
            type: 'danger',
            duration: 4000
          })
        }
      )
    },
    overNightSubmit () {
      var toSubmit = {}
      toSubmit.permit_type = 0
      toSubmit.upid = this.$auth.user().profile.upid
      if (this.permits.admin_upid) {
        toSubmit.upid = this.permits.admin_upid
      }
      toSubmit.data_one = moment(this.permits.on_date1, 'MM-DD-YYYY').format()
      toSubmit.data_two = moment(this.permits.on_date2, 'MM-DD-YYYY').format()
      toSubmit.location = this.permits.on_where
      if (this.permits.on_remarks) {
        toSubmit.reason = this.permits.on_reason + ' | ' + this.permits.on_remarks
      } else {
        toSubmit.reason = this.permits.on_reason
      }
      this.axios.post('permits/', toSubmit).then(
        response => {
          openNotification({
            message: 'Successfully submitted permit.',
            type: 'success',
            duration: 4000
          })
          this.permits.on_date1 = moment().format('MM-DD-YYYY')
          this.permits.on_date2 = ''
          this.permits.on_where = ''
          this.permits.on_reason = ''
          this.permits.on_remarks = ''
          this.permits.admin_upid = ''
        }
      ).catch(
        error => {
          openNotification({
            message: error.response.data.message,
            type: 'danger',
            duration: 4000
          })
        }
      )
    },
    earlyMorningSubmit () {
      var toSubmit = {}
      toSubmit.permit_type = 2
      toSubmit.upid = this.$auth.user().profile.upid
      if (this.permits.admin_upid) {
        toSubmit.upid = this.permits.admin_upid
      }
      toSubmit.data_one = moment(this.permits.em_date, 'MM-DD-YYYY').format()
      toSubmit.data_two = moment(this.permits.em_time, 'h:mm a').format()
      toSubmit.location = this.permits.em_where
      if (this.permits.em_remarks) {
        toSubmit.reason = this.permits.em_reason + ' | ' + this.permits.em_remarks
      } else {
        toSubmit.reason = this.permits.em_reason
      }
      this.axios.post('permits/', toSubmit).then(
        response => {
          openNotification({
            message: 'Successfully submitted permit.',
            type: 'success',
            duration: 4000
          })
          this.permits.em_date = moment().format('MM-DD-YYYY')
          this.permits.em_time = '4:00 AM'
          this.permits.em_where = ''
          this.permits.em_reason = ''
          this.permits.em_remarks = ''
          this.permits.admin_upid = ''
        }
      ).catch(
        error => {
          openNotification({
            message: error.response.data.message,
            type: 'danger',
            duration: 4000
          })
        }
      )
    }
  },

  watch: {
    'demo.value' (newVal, oldVal) {
      // logs ('value: new ->', newVal, 'old ->', oldVal)
    },
    'demo.rawValue' (newVal, oldVal) {
      // logs ('rawValue: new ->', newVal, 'old ->', oldVal)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/mixins';

.button {
  margin: 5px 0 0;
}

.control .button {
  margin: inherit;
}

.control.has-addons {
  @include mobile() {
    input {
      width: 100%;
    }

    input.is-expanded {
      flex-shrink: 1;
    }
  }
}
</style>
