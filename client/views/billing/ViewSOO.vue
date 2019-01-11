<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Statement of Operations</h4>
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
            mode="viewsoo"
          ></data-table>
          <div id="page-navigation" v-if="!searchQuery">
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
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { DataTable } from 'components/layout/'

export default {
  created () {
    this.axios.get('payments/').then(
      response => {
        var test = response.data
        this.gridData = test
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
    addAssistant: function () {
      this.$router.push('/user/add/assistant')
    }
  },
  data () {
    return {
      searchQuery: '',
      columnNames: ['OR Number', 'OR Date', 'Student Number', 'Name', 'Actions'],
      gridColumns: ['ornumber', 'ordate', 'upid', 'name'],
      startRow: 0,
      rowsPerPage: 10,
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
