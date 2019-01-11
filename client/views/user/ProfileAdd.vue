<template>
    <div>
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child box">
              <form v-on:submit.prevent="profileSubmit">
                <table class="table">
                  <tbody>
                    <h4 class="title">Personal Data</h4>
                    <tr>
                      <th>Student Number</th>
                      <td><p class="control">
                        <input v-model="data.upid" class="input" v-mask="'####-#####'">
                      </p></td>
                    </tr>
                    <tr>
                      <th>College</th>
                      <td><p class="control">
                        <input v-model="data.college" class="input" type="text">
                      </p></td>
                    </tr>
                    <tr>
                      <th>Degree Program</th>
                      <td><p class="control">
                        <input v-model="data.course" class="input" type="text">
                      </p></td>
                    </tr>
                    <tr>
                      <th>Religion</th>
                      <td><p class="control">
                        <input v-model="data.religion" class="input" type="text">
                      </p></td>
                    </tr>
                    <tr>
                      <th>Contact Number</th>
                      <td><p class="control">
                        <input v-model="data.contact" class="input" type="text">
                      </p></td>
                    </tr>
                    <br>
                    <h4 class="title">Emergency Contact</h4>
                    <tr>
                      <th>Name</th>
                      <td><p class="control">
                        <input v-model="data.emergency" class="input" type="text">
                      </p></td>
                    </tr>
                    <tr>
                      <th>Contact Number</th>
                      <td><p class="control">
                        <input v-model="data.emergency_contact" class="input" type="text">
                      </p></td>
                    </tr>
                    <br>
                    <h4 class="title">Resident Information</h4>
                    <tr>
                      <th>KRH ID Number</th>
                      <td><p class="control">
                        <input v-model="data.krhid" class="input" v-mask="'AAA-####-###'">
                      </p></td>
                    </tr>
                    <tr>
                      <th>Sex</th>
                      <td><p class="control">
                        <span class="select">
                          <select v-model="data.gender">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </span>
                      </p></td>
                    </tr>
                    <tr>
                      <th>Room Number</th>
                      <td><p class="control">
                        <input v-model="data.room" class="input" v-mask="'XXXXX'">
                      </p></td>
                    </tr>
                    <tr>
                      <th>Corridor</th>
                      <td><p class="control">
                        <span class="select">
                          <select v-model="data.corridor">
                            <option v-if="!data.gender" value="">---</option>
                            <option v-if="data.gender === 'Female'" value="1FG">1st Floor Girls</option>
                            <option v-if="data.gender === 'Female'" value="CF">Centerfold Girls</option>
                            <option v-if="data.gender === 'Female'" value="2FG">2nd Floor Girls</option>
                            <option v-if="data.gender === 'Female'" value="3FG">3rd Floor Girls</option>
                            <option v-if="data.gender === 'Male'" value="BB">Basement Boys</option>
                            <option v-if="data.gender === 'Male'" value="1FB">1st Floor Boys</option>
                            <option v-if="data.gender === 'Male'" value="2FB">2nd Floor Boys</option>
                            <option v-if="data.gender === 'Male'" value="3FB">3rd Floor Boys</option>
                          </select>
                        </span>
                      </p></td>
                    </tr>
                    <tr>
                      <th>Civil Status</th>
                      <td><p class="control">
                        <input v-model="data.civil_status" class="input" type="text">
                      </p></td>
                    </tr>
                    <tr>
                      <th>Birthday</th>
                      <td><p class="control">
                        <input v-model="data.birthday" placeholder="MM-DD-YYYY" class="input" v-mask="'##-##-####'">
                      </p></td>
                    </tr>
                    <tr>
                      <th>STS Bracket</th>
                      <td><p class="control">
                        <span class="select">
                          <select v-model="data.sts_bracket">
                            <option value="A">Bracket A</option>
                            <option value="B">Bracket B</option>
                            <option value="C">Bracket C</option>
                            <option value="D">Bracket D</option>
                            <option value="E1">Bracket E1</option>
                            <option value="E2">Bracket E2</option>
                          </select>
                        </span>
                      </p></td>
                    </tr>
                    <br>
                    <h4 class="title">Permanent Address</h4>
                    <tr>
                      <th>Street Address</th>
                      <td><p class="control">
                        <input v-model="data.address" class="input" type="text">
                      </p></td>
                    </tr>
                    <tr>
                      <th>City</th>
                      <td><p class="control">
                        <input v-model="data.city" class="input" type="text">
                      </p></td>
                    </tr>
                    <tr>
                      <th>Region</th>
                      <td><p class="control">
                        <span class="select">
                          <select v-model="data.region">
                            <option value="NCR">National Capital Region</option>
                            <option value="I">Region I</option>
                            <option value="II">Region II</option>
                            <option value="III">Region III</option>
                            <option value="IV-A">Region IV-A (CALBARZON)</option>
                            <option value="IV-B">Region IV-B (MIMAROPA)</option>
                            <option value="V">Region V</option>
                            <option value="VI">Region VI</option>
                            <option value="VII">Region VII</option>
                            <option value="VIII">Region VIII</option>
                            <option value="IX">Region IX</option>
                            <option value="X">Region X</option>
                            <option value="XI">Region XI</option>
                            <option value="XII">Region XII</option>
                            <option value="XIII">Region XIII</option>
                            <option value="NIR">Negros Island Region (NIR/Region XVIII)</option>
                            <option value="ARMM">Autonomous Region in Muslim Mindanao (ARMM)</option>
                            <option value="CAR">Cordillera Administrative Region (CAR)</option>
                          </select>
                        </span>
                      </p></td>
                    </tr>
                    <br>
                    <h4 class="title">Other Data</h4>
                    <tr>
                      <th>High School</th>
                      <td><p class="control">
                        <input v-model="data.high_school" class="input" type="text">
                      </p></td>
                    </tr>
                    <tr>
                      <th>Scholarships</th>
                      <td><p class="control">
                        <input v-model="data.scholarships" class="input" type="text">
                      </p></td>
                    </tr>
                  </tbody>
                </table>
                <p class="control">
                  <center><button type="submit" class="button is-primary">Add Profile</button></center>
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
import moment from 'moment'
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
      data: {
        gender: ''
      }
    }
  },
  methods: {
    profileSubmit: function () {
      if (this.data.birthday) {
        this.data.birthday = moment(this.data.birthday, 'MM-DD-YYYY').format('YYYY-MM-DD')
      }
      this.axios.post('residents/', this.data).then(
        response => {
          openNotification({
            message: 'Successfully added profile.',
            type: 'success',
            duration: 4000
          })
          this.$router.push('/user/add/instruction/' + this.data.upid)
        }
      ).catch(
        error => {
          if (this.data.birthday) {
            this.data.birthday = moment(this.data.birthday, 'YYYY-MM-DD').format('MM-DD-YYYY')
          }
          openNotification({
            message: error.response.data,
            type: 'danger',
            duration: 4000
          })
          console.log(error.response.data)
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
