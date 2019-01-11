<template>
  <modal>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="content has-text-centered">
          <form v-on:submit.prevent="submit">
            <p class="control">
              <input name="batch" id="batch" ref="batch" @change="upload" class="file" type="file">
            </p>
          </form>
        </div>
      </section>
      <footer class="modal-card-foot">
        <a class="button is-primary" @click="submit">Upload</a>
      </footer>
    </div>
  </modal>
</template>

<script>
import { Modal } from 'vue-bulma-modal'
import Cleave from 'vue-cleave'
import 'cleave.js/dist/addons/cleave-phone.cn'
import Vue from 'vue'
import Notification from 'vue-bulma-notification'
import VueMask from 'v-mask'
import Papa from 'papaparse'

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
    Modal
  },

  props: {
    visible: Boolean,
    title: String,
    content: String,
    url: String
  },

  data () {
    return {
      src: require('assets/logo.svg'),
      data: {
        file: ''
      }
    }
  },

  methods: {
    open (url) {
      window.open(url)
    },
    close () {
      this.$emit('close')
    },
    upload () {
      this.file = this.$refs.batch.files[0]
      console.log(this.file)
    },
    submit () {
      let self = this
      Papa.parse(this.file, {
        header: true,
        complete: function (results) {
          console.log('Finished:', results.data)
          self.axios.post('residents/', results.data).then(
            response => {
              openNotification({
                message: 'Successfully added profiles. Refresh the page to view updated list of profiles.',
                type: 'success',
                duration: 4000
              })
              self.$children[0].deactive()
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
      })
    }
  }
}
</script>
