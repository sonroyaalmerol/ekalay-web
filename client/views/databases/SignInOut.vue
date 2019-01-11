<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Sign-In/Sign-Out Database <font v-if="gridData !== null">({{ gridData.length }} entries for today)</font><font v-else>(Loading...)</font></h4>
          <button v-if="$auth.user().profile.role == 1 || $auth.user().profile.role == 2" class="button is-primary" @click="downloadCSV()"><i class="fa fa-download" aria-hidden="true"></i>&nbsp;<font>Export CSV</font></button>
          <hr>
          <form id="search">
              <p class="control">
                <input class="input" type="text" v-model="searchQuery" placeholder="Search (Student Number/Name)">
              </p>
          </form>
          <data-table v-if="searchQuery && gridData !== null"
            :data="filteredItems"
            :columns="columnNames"
            :columnsData="gridColumns"
            :filter-key="searchQuery"
            mode="inoutdatabase"
          ></data-table>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { DataTable } from 'components/layout/'
import moment from 'moment'
// import Papa from 'papaparse'

export default {
  created () {
    this.axios.get('inoutentries/').then(
      response => {
        var test = response.data
        for (var i = 0; i < test.length; i++) {
          test[i].timestamp = moment(test[i].timestamp).format('h:mm a') + ', ' + moment(test[i].timestamp).format('MMMM D, YYYY')
          try {
            if (test[i].resident) {
              test[i].name = test[i].resident.first_name + ' ' + test[i].resident.last_name
            } else if (test[i].ra) {
              test[i].name = test[i].ra.first_name + ' ' + test[i].ra.last_name
            } else if (test[i].staff) {
              test[i].name = test[i].staff.first_name + ' ' + test[i].staff.last_name
            } else {
              test[i].name = 'Unregistered User'
            }
            if (test[i].name === 'null null') {
              test[i].name = 'Unregistered User'
            }
          } catch (TypeError) {
            test[i].name = 'Unregistered User'
          }
          try {
            test[i].upid = test[i].resident.upid
          } catch (TypeError) {
            test[i].upid = 'N/A'
          }
          this.exportData[i] = {}
          this.exportData[i].upid = test[i].upid
          this.exportData[i].krhid = test[i].krhid
          this.exportData[i].name = test[i].name
          if (test[i].resident) {
            this.exportData[i].corridor = test[i].resident.corridor
          } else {
            this.exportData[i].corridor = 'N/A'
          }
          if (test[i].status) {
            this.exportData[i].status = 'IN'
          } else {
            this.exportData[i].status = 'OUT'
          }
          this.exportData[i].timestamp = moment(test[i].timestamp).format('h:mm a') + ' ' + moment(test[i].timestamp).format('MMMM D YYYY')
        }
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
    downloadCSV: function () {
      window.location.href = 'https://e.updkalay.com/api/v1/inoutentries/csvall'
      /* this.exportPressed = true
      this.axios.get('inoutentries/all/').then(
        response => {
          var test = response.data
          for (var i = 0; i < test.length; i++) {
            this.exportData[i] = {}
            if (test[i].resident) {
              this.exportData[i].upid = test[i].resident.upid
            } else {
              this.exportData[i].upid = 'N/A'
            }
            this.exportData[i].krhid = test[i].krhid
            try {
              if (test[i].resident) {
                this.exportData[i].name = test[i].resident.first_name + ' ' + test[i].resident.last_name
              } else if (test[i].ra) {
                this.exportData[i].name = test[i].ra.first_name + ' ' + test[i].ra.last_name
              } else if (test[i].staff) {
                this.exportData[i].name = test[i].staff.first_name + ' ' + test[i].staff.last_name
              } else {
                this.exportData[i].name = 'Unregistered User'
              }
              if (test[i].name === 'null null') {
                this.exportData[i].name = 'Unregistered User'
              }
            } catch (TypeError) {
              this.exportData[i].name = 'Unregistered User'
            }
            if (test[i].resident) {
              this.exportData[i].corridor = test[i].resident.corridor
            } else {
              this.exportData[i].corridor = 'N/A'
            }
            if (test[i].status) {
              this.exportData[i].status = 'IN'
            } else {
              this.exportData[i].status = 'OUT'
            }
            this.exportData[i].timestamp = moment(test[i].timestamp).format('h:mm a') + ' ' + moment(test[i].timestamp).format('MMMM D YYYY')
          }
          var filename, link, csv, csvData

          filename = 'ekalay-inout-' + Date.now() + '.csv'

          eslint-env browser
          csv = Papa.unparse(this.exportData)
          csvData = new Blob([csv], { type: 'text/csv' })
          var csvUrl = URL.createObjectURL(csvData)

          link = document.createElement('a')
          link.setAttribute('href', csvUrl)
          link.setAttribute('download', filename)
          link.click()
          this.exportPressed = false
        }
      ) */
    }
  },
  data () {
    return {
      searchQuery: '',
      columnNames: ['UPID', 'Name', 'Date/Time', 'In/Out'],
      gridColumns: ['upid', 'name', 'timestamp', 'status'],
      startRow: 0,
      rowsPerPage: 100000,
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
