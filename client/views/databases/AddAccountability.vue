<template>
  <modal>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="content has-text-centered">
          <form v-on:submit.prevent="accountabilitySubmit">
            <p class="control">
              <input v-model="data.upid" placeholder="Student Number" class="input" v-mask="'####-#####'">
            </p>
            <p class="control">
              <input v-model="data.reason" placeholder="Reason" class="input" type="text">
            </p>
          </form>
        </div>
      </section>
      <footer class="modal-card-foot">
        <a class="button is-primary" @click="accountabilitySubmit">Submit Accountability</a>
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
        upid: '',
        reason: ''
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
    accountabilitySubmit () {
      this.axios.post('accountabilities/', this.data).then(
        response => {
          openNotification({
            message: 'Successfully added accountability. Refresh the page to view updated list of accountabilities.',
            type: 'success',
            duration: 4000
          })
          this.$children[0].deactive()
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
