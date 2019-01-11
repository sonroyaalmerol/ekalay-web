<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Staff Database</h4>
          <button v-if="$auth.user().profile.role == 2" class="button is-primary" @click="addStaff()"><i class="fa fa-plus" aria-hidden="true"></i>&nbsp;Add Staff</button>
          <button v-if="$auth.user().profile.role == 1 || $auth.user().profile.role == 2" class="button is-primary" @click="downloadCSV()" :disabled="exportPressed"><i class="fa fa-download" aria-hidden="true"></i>&nbsp;<font v-if="!exportPressed">Export DTR</font><font v-else>Exporting...</font></button>
          <hr>
          <form id="search">
              <p class="control">
                <input class="input" type="text" v-model="searchQuery" placeholder="Search">
              </p>
          </form>
          <data-table v-if="gridData !== null"
            :data="filteredItems"
            :columns="columnNames"
            :columnsData="gridColumns"
            :filter-key="searchQuery"
            mode="staffdatabase"
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
import { DataTable } from 'components/layout/'
import moment from 'moment'
import Papa from 'papaparse'

export default {
  created () {
    this.axios.get('staffs/').then(
      response => {
        var test = response.data
        for (var i = 0; i < test.length; i++) {
          test[i].name = test[i].first_name + ' ' + test[i].last_name
        }
        // logs (test)
        this.gridData = test
        this.$forceUpdate()
        // this.gridData = response.data
      }
    )
  },
  components: {
    DataTable
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
    addStaff: function () {
      this.$router.push('/user/add/staff')
    },
    downloadCSV: function () {
      this.exportPressed = true
      this.axios.get('inoutentries/staff/').then(
        response => {
          var test = response.data
          for (var i = 0; i < test.length; i++) {
            this.exportData[i] = {}
            this.exportData[i].krhid = test[i].krhid
            this.exportData[i].name = test[i].staff.first_name + ' ' + test[i].staff.last_name
            if (test[i].status) {
              this.exportData[i].status = 'IN'
            } else {
              this.exportData[i].status = 'OUT'
            }
            this.exportData[i].time = moment(test[i].timestamp).format('h:mm a')
            this.exportData[i].date = moment(test[i].timestamp).format('L')
          }
          var filename, link, csv, csvData

          filename = 'ekalay-inout-staff-' + Date.now() + '.csv'

          /* eslint-env browser */
          csv = Papa.unparse(this.exportData)
          csvData = new Blob([csv], { type: 'text/csv' })
          var csvUrl = URL.createObjectURL(csvData)

          link = document.createElement('a')
          link.setAttribute('href', csvUrl)
          link.setAttribute('download', filename)
          link.click()
          this.exportPressed = false
        }
      )
    }
  },
  data () {
    return {
      searchQuery: '',
      columnNames: ['KRH ID Number', 'Name', 'Position', 'In/Out', 'Actions'],
      gridColumns: ['krhid', 'name', 'position', 'inorout'],
      startRow: 0,
      rowsPerPage: 99999,
      gridData: null,
      exportData: [],
      exportPressed: false
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
