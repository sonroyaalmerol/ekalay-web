<template>
    <div>
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child box">
            <h4 class="title">Approved Permits ({{ today }})</h4>
            <button v-if="gridData !== null" class="button is-primary" @click="printPermits()">Print Permits</button>
            <hr>
            <form id="search">
                <p class="control">
                  <input class="input" type="text" v-model="searchQuery" placeholder="Search">
                </p>
            </form>
            <div id="toPrint">
                <data-table v-if="gridData !== null"
                  :data="gridData"
                  :columns-data="gridColumns"
                  :columns="columnNames"
                  :filter-key="searchQuery"
                  mode="viewapproved"
                ></data-table>
            </div>
          </article>
        </div>
      </div>
    </div>
</template>

<script>
import { DataTable } from 'components/layout/'
import { Tabs, TabPane } from 'vue-bulma-tabs'
import moment from 'moment'

export default {
  created () {
    this.axios.get('permits/get_print/').then(
      response => {
        var test = response.data
        for (var i = 0; i < test.length; i++) {
          test[i].actions = test[i].id
          if (test[i].permit_type === 0) {
            test[i].data_one = moment(test[i].data_one).format('MMMM D, YYYY') + ' - ' + moment(test[i].data_two).format('MMMM D, YYYY')
            test[i].permit_type = 'Overnight'
          } else if (test[i].permit_type === 1) {
            test[i].data_one = moment(test[i].data_two).format('h:mm a') + ', ' + moment(test[i].data_one).format('MMMM D, YYYY')
            test[i].permit_type = 'Late Night'
          } else if (test[i].permit_type === 2) {
            test[i].data_one = moment(test[i].data_two).format('h:mm a') + ', ' + moment(test[i].data_one).format('MMMM D, YYYY')
            test[i].permit_type = 'Early Morning'
          }
        }
        // logs (test)
        this.gridData = test
        this.$forceUpdate()
        // this.gridData = response.data
      }
    )
  },
  components: {
    DataTable,
    Tabs,
    TabPane
  },
  methods: {
    printPermits: function () {
      this.searchQuery = ''
      var mywindow = window.open('', 'PRINT', 'height=400,width=600')
      mywindow.document.write('<html><head><title>' + document.title + '</title>')
      // mywindow.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">')
      mywindow.document.write('</head><body>')
      mywindow.document.write(document.getElementById('toPrint').innerHTML)
      mywindow.document.write('</body></html>')
      mywindow.document.close()
      mywindow.focus()
      mywindow.print()
      mywindow.close()
    }
  },
  computed: {
    today: function () {
      return moment().format('MMMM D, YYYY')
    }
  },
  data () {
    return {
      searchQuery: '',
      gridData: null,
      columnNames: ['Student Number', 'Name', 'Type', 'Date/Time', 'Signature'],
      gridColumns: ['upid', 'name', 'permit_type', 'data_one']
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
