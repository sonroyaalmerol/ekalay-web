<template>
  <modal>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="content has-text-centered" v-html="content"></div>
      </section>
      <footer class="modal-card-foot">
      </footer>
    </div>
  </modal>
</template>

<script>
import { Modal } from 'vue-bulma-modal'

export default {
  components: {
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
      src: require('assets/logo.svg')
    }
  },

  methods: {
    open (url) {
      window.open(url)
    },

    close () {
      this.$emit('close')
    }
  }
}
</script>
