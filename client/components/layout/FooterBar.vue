<template>
  <footer class="footer" :style="[hiddenSidebarStyle]">
    <div class="container">
      <div class="content has-text-centered">
        <p class="social">
          <a href="https://facebook.com/kalayaanadmin">
            <span class="icon">
              <i class="fa fa-facebook"></i>
            </span>
          </a>
        </p>
        <p><span class="icon"><i class="fa fa-code"></i></span> with <span class="icon"><i class="fa fa-heart"></i></span>.</p>
        <p>© 2017 eKalay | Kalayaan Residence Hall</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {

  data () {
    return this.$store.state.pkg
  },
  computed: {
    hiddenSidebarStyle () {
      return !this.$auth.check() ? { 'margin-left': 0 } : null
    }
  }

}
</script>

<style lang="scss">
@import '~bulma/sass/utilities/mixins';

.footer {
  margin-left: 180px;

  @include mobile() {
    margin-left: 0;
  }

  .social a {
    border-bottom: none !important;
  }

  .fa.fa-heart {
    color: red;
  }
}
</style>
