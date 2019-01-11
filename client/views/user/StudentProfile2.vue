<template>
    <div>
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child box">
              <form v-on:submit.prevent="profileSubmit">
              <button style="float: right;" v-if="($auth.user().profile.role == 1 || $auth.user().profile.role == 2 || $auth.user().profile.upid == data.upid) && !this.isEdit" class="button is-primary" @click="editProfileToggle()">
                <i class="fa fa-edit" aria-hidden="true"></i>&nbsp;Edit Profile
              </button>
                <table class="table">
                  <tbody>
                    <h4 class="title">Personal Data</h4>
                    <tr>
                      <th>Name</th>
                      <td v-if="data.user.first_name || data.user.last_name">{{ data.user.first_name }} {{ data.user.last_name }}</td>
                      <td v-else>Unregistered User</td>
                    </tr>
                    <tr>
                      <th>Student Number</th>
                      <td>{{ data.upid }}</td>
                    </tr>
                    <tr>
                      <th>KRH ID Number</th>
                      <td v-if="($auth.user().profile.role == 1 || $auth.user().profile.role == 2) && this.isEdit">
                          <p class="control">
                            <cleave v-model="data.krhid" class="input" :value="data.krhid" :options="{ delimiter: '-', blocks: [3, 4, 3], numericOnly: false }"></cleave>
                          </p>
                      </td>
                      <td v-else>{{ data.krhid }}</td>
                    </tr>
                    <tr>
                      <th>College</th>
                      <td v-if="($auth.user().profile.role == 1 || $auth.user().profile.role == 2) && this.isEdit">
                          <p class="control">
                            <input v-model="data.college" class="input" type="text">
                          </p>
                      </td>
                      <td v-else>{{ data.college }}</td>
                    </tr>
                    <tr>
                      <th>Degree Program</th>
                      <td v-if="($auth.user().profile.role == 1 || $auth.user().profile.role == 2) && this.isEdit">
                          <p class="control">
                            <input v-model="data.course" class="input" type="text">
                          </p>
                      </td>
                      <td v-else>{{ data.course }}</td>
                    </tr>
                    <tr>
                      <th>Religion</th>
                      <td v-if="!this.isEdit">{{ data.religion }}</td>
                      <td v-else>
                          <p class="control">
                            <input v-model="data.religion" class="input" type="text" placeholder="Religion">
                          </p>
                      </td>
                    </tr>
                    <tr>
                      <th>Contact Number</th>
                      <td v-if="!this.isEdit">{{ data.contact }}</td>
                      <td v-else>
                          <p class="control">
                            <input v-model="data.contact" class="input" type="text" placeholder="Contact Number">
                          </p>
                      </td>
                    </tr>
                    <br>
                    <h4 class="title">Emergency Contact</h4>
                    <tr>
                      <th>Name</th>
                      <td v-if="!this.isEdit">{{ data.emergency }}</td>
                      <td v-else>
                          <p class="control">
                            <input v-model="data.emergency" class="input" type="text" placeholder="Name">
                          </p>
                      </td>
                    </tr>
                    <tr>
                      <th>Contact Number</th>
                      <td v-if="!this.isEdit">{{ data.emergency_contact }}</td>
                      <td v-else>
                          <p class="control">
                            <input v-model="data.emergency_contact" class="input" type="text" placeholder="Contact Number">
                          </p>
                      </td>
                    </tr>
                    <br>
                    <h4 class="title">Resident Information</h4>
                    <tr>
                      <th>Sex</th>
                      <td v-if="!this.isEdit">{{ data.gender }}</td>
                      <td v-else>
                        <p class="control">
                          <span class="select">
                            <select v-model="data.gender">
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <th>Room Number</th>
                      <td v-if="($auth.user().profile.role == 1 || $auth.user().profile.role == 2) && this.isEdit">
                          <p class="control">
                            <cleave v-model="data.room" class="input" :options="{ blocks: [5], numericOnly: false }"></cleave>
                          </p>
                      </td>
                      <td v-else>{{ data.room }}</td>
                    </tr>
                    <tr>
                    <tr>
                      <th>Corridor</th>
                      <td v-if="($auth.user().profile.role == 1 || $auth.user().profile.role == 2) && this.isEdit">
                          <p class="control">
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
                          </p>
                      </td>
                      <td v-else>{{ data.corridor }}</td>
                    </tr>
                    <tr>
                      <th>Civil Status</th>
                      <td v-if="($auth.user().profile.role == 1 || $auth.user().profile.role == 2) && this.isEdit">
                          <p class="control">
                            <input v-model="data.civil_status" class="input" type="text">
                          </p>
                      </td>
                      <td v-else>{{ data.civil_status }}</td>
                    </tr>
                    <tr>
                      <th>Birthday</th>
                      <td v-if="($auth.user().profile.role == 1 || $auth.user().profile.role == 2) && this.isEdit">
                          <p class="control">
                            <cleave v-model="data.birthday" placeholder="MM-DD-YYYY" class="input" :options="{ delimiter: '-', blocks: [2, 2, 4], numericOnly: true }"></cleave>
                          </p>
                      </td>
                      <td v-else>{{ data.birthday }}</td>
                    </tr>
                    <tr>
                      <th>STS Bracket</th>
                      <td v-if="($auth.user().profile.role == 1 || $auth.user().profile.role == 2) && this.isEdit">
                          <p class="control">
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
                          </p>
                      </td>
                      <td v-else>{{ data.sts_bracket }}</td>
                    </tr>
                    <br>
                    <h4 class="title">Permanent Address</h4>
                    <tr>
                      <th>Street Address</th>
                      <td v-if="!this.isEdit">{{ data.address }}</td>
                      <td v-else>
                          <p class="control">
                            <input v-model="data.address" class="input" type="text" placeholder="Address">
                          </p>
                      </td>
                    </tr>
                    <tr>
                      <th>City</th>
                      <td v-if="!this.isEdit">{{ data.city }}</td>
                      <td v-else>
                          <p class="control">
                            <input v-model="data.city" class="input" type="text" placeholder="City">
                          </p>
                      </td>
                    </tr>
                    <tr>
                      <th>Region</th>
                      <td v-if="!this.isEdit">{{ data.region }}</td>
                      <td v-else>
                          <p class="control">
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
                          </p>
                      </td>
                    </tr>
                    <br>
                    <h4 class="title">Other Data</h4>
                    <tr>
                      <th>High School</th>
                      <td v-if="!this.isEdit">{{ data.high_school }}</td>
                      <td v-else>
                          <p class="control">
                            <input v-model="data.high_school" class="input" type="text" placeholder="High School">
                          </p>
                      </td>
                    </tr>
                    <tr>
                      <th>Scholarships</th>
                      <td v-if="!this.isEdit">{{ data.scholarships }}</td>
                      <td v-else>
                          <p class="control">
                            <input v-model="data.scholarships" class="input" type="text" placeholder="Scholarships">
                          </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p v-if="this.isEdit" class="control">
                  <center><button type="submit" class="button is-primary">Submit Profile</button></center>
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
import moment from 'moment'

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
  created () {
    let upid = 'residents/' + this.$route.params.own
    if (!this.$route.params.own) {
      upid = 'residents/' + this.$auth.user().profile.upid
    }
    this.axios.get(upid).then(
      response => {
        var test = response.data
        this.data = test
        this.data.birthday = moment(this.data.birthday, 'YYYY-MM-DD').format('MM-DD-YYYY')
        // console.log(test)
      }
    )
  },
  data: function () {
    return {
      data: null,
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
      this.data.birthday = moment(this.data.birthday, 'MM-DD-YYYY').format('YYYY-MM-DD')
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
</script>

<style lang="scss">
.table-responsive {
  display: block;
  width: 100%;
  min-height: .01%;
  overflow-x: auto;
}
</style>
