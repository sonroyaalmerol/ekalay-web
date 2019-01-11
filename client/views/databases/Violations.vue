<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Violations Database <font v-if="gridData !== null">({{ gridData.length }} entries)</font><font v-else>(Loading...)</font></h4>
          <button v-if="$auth.user().profile.role == 1 || $auth.user().profile.role == 2" class="button is-primary" @click="downloadCSV()"><i class="fa fa-download" aria-hidden="true"></i>&nbsp;Export CSV</button>
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
            mode="violationsdatabase"
          ></data-table>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { DataTable } from 'components/layout/'
import moment from 'moment'

/* function convertArrayOfObjectsToCSV (args) {
  var result, ctr, keys, columnDelimiter, lineDelimiter, data

  data = args.data || null
  if (data == null || !data.length) {
    return null
  }

  columnDelimiter = args.columnDelimiter || ','
  lineDelimiter = args.lineDelimiter || '\n'

  keys = Object.keys(data[0])

  result = ''
  result += keys.join(columnDelimiter)
  result += lineDelimiter

  data.forEach(function (item) {
    ctr = 0
    keys.forEach(function (key) {
      if (ctr > 0) result += columnDelimiter

      result += item[key]
      ctr++
    })
    result += lineDelimiter
  })
  return result
} */

export default {
  created () {
    this.axios.get('violations/').then(
      response => {
        var test = response.data
        // logs (test)
        for (var i = 0; i < test.length; i++) {
          test[i].timestamp = moment(test[i].timestamp).format('h:mm a') + ', ' + moment(test[i].timestamp).format('MMMM D, YYYY')
          test[i].name = test[i].resident.first_name + ' ' + test[i].resident.last_name
          if (test[i].name === 'null null') {
            test[i].name = 'Unregistered User'
          }
          test[i].upid = test[i].resident.upid
          test[i].corridor = test[i].resident.corridor
          this.exportData[i] = {}
          this.exportData[i].upid = test[i].upid
          this.exportData[i].corridor = test[i].corridor
          this.exportData[i].name = test[i].name
          this.exportData[i].details = test[i].details
          this.exportData[i].timestamp = moment(test[i].timestamp).format('h:mm a') + ' ' + moment(test[i].timestamp).format('MMMM D YYYY')
        }
        // console.log(response.data)
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
      /* var data, filename, link
      var csv = convertArrayOfObjectsToCSV({
        data: this.exportData
      })
      if (csv == null) return

      filename = 'ekalay-violations-' + Date.now() + '.csv'

      if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv
      }
      data = encodeURI(csv)

      link = document.createElement('a')
      link.setAttribute('href', data)
      link.setAttribute('download', filename)
      link.click() */
      window.location.href = 'https://e.updkalay.com/api/v1/violations/csvall'
    }
  },
  data () {
    return {
      searchQuery: '',
      columnNames: ['UPID', 'Name', 'Corridor', 'Date/Time', 'Details', 'Actions'],
      gridColumns: ['upid', 'name', 'corridor', 'timestamp', 'details'],
      startRow: 0,
      rowsPerPage: 100000,
      gridData: null,
      exportData: []
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
