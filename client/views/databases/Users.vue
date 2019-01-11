<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Residents Database <font v-if="gridData !== null">({{ gridData.length }} users)</font><font v-else>(Loading...)</font></h4>
          <button v-if="$auth.user().profile.role == 1 || $auth.user().profile.role == 2" class="button is-primary" @click="addResident()"><i class="fa fa-plus" aria-hidden="true"></i>&nbsp;Add Resident Profile</button>
          <button v-if="$auth.user().profile.role == 1 || $auth.user().profile.role == 2" class="button is-primary" @click="addBatchResident()"><i class="fa fa-plus" aria-hidden="true"></i>&nbsp;Batch Add Profile</button>
          <button v-if="$auth.user().profile.role == 1 || $auth.user().profile.role == 2" class="button is-danger" @click="clearDB()"><i class="fa fa-times" aria-hidden="true"></i>&nbsp;Clear Database</button>
          <hr>
          <form id="search">
              <p class="control">
                <input class="input" type="text" v-model="searchQuery" placeholder="Search (Student Number/Name/Username)">
              </p>
          </form>
          <data-table v-if="searchQuery && gridData !== null"
            :data="filteredItems"
            :columns="columnNames"
            :columnsData="gridColumns"
            :filter-key="searchQuery"
            mode="userdatabase"
          ></data-table>
          <!--<div id="page-navigation" v-if="!searchQuery">
            <p class="control has-addons">
              <a class="button" @click="movePages(-1)">
                <span class="icon is-small">
                  <i class="fa fa-arrow-left"></i>
                </span>
                <span>Back</span>
              </a>
              <span>&nbsp;&nbsp;{{ startRow / rowsPerPage + 1 }} out of {{ Math.ceil(gridData.length / rowsPerPage) }}&nbsp;&nbsp;</span>
              <a class="button" @click="movePages(1)">
                <span class="icon is-small">
                  <i class="fa fa-arrow-right"></i>
                </span>
                <span>Next</span>
              </a>
            </p>
          </div>-->
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { DataTable } from 'components/layout/'
import Notification from 'vue-bulma-notification'
import CardModal from './BatchUsers'

const CardModalComponent = Vue.extend(CardModal)

const openCardModal = (propsData = {
  visible: true
}) => {
  return new CardModalComponent({
    el: document.createElement('div'),
    propsData
  })
}

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
  created () {
    this.axios.get('residents/').then(
      response => {
        var test = response.data
        // logs (test)
        for (var i = 0; i < test.length; i++) {
          try {
            test[i].name = test[i].first_name + ' ' + test[i].last_name
            if (test[i].name === 'null null') {
              test[i].name = 'Unregistered User'
            }
          } catch (TypeError) {
            test[i].name = 'Unregistered User'
          }
          if (!test[i].username) {
            test[i].username = 'N/A'
          }
        }
        this.gridData = test
        this.$forceUpdate()
        // this.gridData = response.data
      }
    )
  },
  components: {
    DataTable,
    Notification
  },
  computed: {
    filteredItems: function () {
      return this.gridData.slice(this.startRow, this.startRow + this.rowsPerPage)
    }
  },
  methods: {
    movePages: function (amount) {
      var newStartRow = this.startRow + (amount * this.rowsPerPage)
      if (newStartRow >= 0 && newStartRow < this.gridData.length) {
        this.startRow = newStartRow
      }
    },
    addResident: function () {
      this.$router.push('/user/add/profile')
    },
    addRA: function () {

    },
    addBatchResident: function () {
      let cardModal = (this.cardModal = openCardModal({
        title: 'Add Batch Resident',
        content: 'Under construction'
      }))
      cardModal.$children[0].active()
    },
    clearDB: function () {
      if (this.clearDBConfirmed === true) {
        this.clearDBConfirmed = false
        this.axios.get('residents/cleardb/').then(
          response => {
            openNotification({
              message: 'Successfully cleared database.',
              type: 'success',
              duration: 4000
            })
            console.log(response)
            window.location.href = 'https://e.updkalay.com/'
          }
        ).catch(
          error => {
            openNotification({
              message: error.response.data[0],
              type: 'danger',
              duration: 4000
            })
          }
        )
      } else {
        this.clearDBConfirmed = true
        openNotification({
          message: 'Press the button one more time to clear database!',
          type: 'warning',
          duration: 4000
        })
      }
    }
  },
  data () {
    return {
      searchQuery: '',
      columnNames: ['Student Number', 'Name', 'Username', 'In/Out', 'Actions'],
      gridColumns: ['upid', 'name', 'username', 'inorout'],
      startRow: 0,
      rowsPerPage: 600,
      gridData: null,
      clearDBConfirmed: false
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
