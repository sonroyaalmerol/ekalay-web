<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Violations Records <font v-if="gridData !== null">({{ gridData.length }} entries)</font><font v-else>(Loading...)</font></h4>
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
            mode="violationdatabase"
          ></data-table>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { DataTable } from 'components/layout/'
import moment from 'moment'

export default {
  created () {
    this.axios.get('violations/' + this.$auth.user().profile.upid + '/upid/').then(
      response => {
        var test = response.data
        // logs (test)
        for (var i = 0; i < test.length; i++) {
          test[i].timestamp = moment(test[i].timestamp).format('h:mm a') + ', ' + moment(test[i].timestamp).format('MMMM D, YYYY')
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
  },
  data () {
    return {
      searchQuery: '',
      columnNames: ['Date/Time', 'Details'],
      gridColumns: ['timestamp', 'details'],
      startRow: 0,
      rowsPerPage: 100000,
      gridData: null
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
