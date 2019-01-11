<template>
    <div>
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child box">
              <form v-on:submit.prevent="profileSubmit">
                <table class="table">
                  <tbody>
                    <h4 class="title">RA Data</h4>
                    <tr>
                      <th>Profile Image</th>
                      <td>
                        <img v-if="data.image_thumb" :src="data.image_thumb"></img><br>
                        <input type="file" name="avatar" id="avatar" @change="upload" accept="image/*" capture="camera">
                      </td>
                    </tr>
                    <tr>
                      <th>Student Number</th>
                      <td><p class="control">
                        <input v-model="data.upid" class="input" v-mask="'####-#####'" disabled>
                      </p></td>
                    </tr>
                    <tr>
                      <th>KRH ID Number</th>
                      <td><p class="control">
                        <input v-model="data.krhid" class="input" v-mask="'AAA-####-##'">
                      </p></td>
                    </tr>
                    <tr>
                      <th>Corridor</th>
                      <td><p class="control">
                        <span class="select">
                          <select v-model="data.corridor">
                            <option value="1FG">1st Floor Girls</option>
                            <option value="CF">Centerfold Girls</option>
                            <option value="2FG">2nd Floor Girls</option>
                            <option value="3FG">3rd Floor Girls</option>
                            <option value="BB">Basement Boys</option>
                            <option value="1FB">1st Floor Boys</option>
                            <option value="2FB">2nd Floor Boys</option>
                            <option value="3FB">3rd Floor Boys</option>
                          </select>
                        </span>
                      </p></td>
                    </tr>
                    <tr>
                      <th>Birthday</th>
                      <td><p class="control">
                        <cleave v-model="data.birthday" placeholder="MM-DD-YYYY" class="input" :options="{ delimiter: '-', blocks: [2, 2, 4], numericOnly: true }"></cleave>
                      </p></td>
                    </tr>
                  </tbody>
                </table>
                <p class="control">
                  <center><button type="submit" class="button is-primary">Edit RA</button></center>
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
        upid: '',
        krhid: '',
        corridor: '',
        birthday: ''
      },
      image_new: []
    }
  },
  created () {
    this.axios.get('assistants/' + this.$route.params.upid).then(
      response => {
        var test = response.data
        this.data = test
        this.data.birthday = moment(this.data.birthday, 'YYYY-MM-DD').format('MM-DD-YYYY')
        // logs (test)
      }
    )
  },
  methods: {
    profileSubmit: function () {
      this.data.birthday = moment(this.data.birthday, 'MM-DD-YYYY').format('YYYY-MM-DD')
      this.axios.put('assistants/' + this.$route.params.upid, this.data).then(
        response => {
          openNotification({
            message: 'Successfully edited profile.',
            type: 'success',
            duration: 4000
          })
          this.$router.push('/databases/assistants')
        }
      ).catch(
        error => {
          this.data.birthday = moment(this.data.birthday, 'YYYY-MM-DD').format('MM-DD-YYYY')
          openNotification({
            message: error.response.data,
            type: 'danger',
            duration: 4000
          })
        }
      )
    },
    upload: function (e) {
      e.preventDefault()
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      /* eslint-env browser */
      this.image_new = new FormData()
      this.image_new.append('image', files[0])
      this.image_new.append('krhid', this.data.krhid)
      this.axios.post('images/', this.image_new).then(
        response => {
          openNotification({
            message: 'Successfully updated image.',
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
