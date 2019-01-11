<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Key Borrowing Database <font v-if="gridData !== null"></font><font v-else>(Loading...)</font></h4><hr>
          <form id="search">
              <p class="control">
                <input class="input" type="text" v-model="searchQuery" placeholder="Search (Room Number/Student Number)">
              </p>
          </form>
          <data-table v-if="searchQuery && gridData !== null"
            :data="filteredItems"
            :columns="columnNames"
            :columnsData="gridColumns"
            :filter-key="searchQuery"
            mode="keydatabase"
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

export default {
  created () {
    this.axios.get('residents/').then(
      response => {
        var test = response.data
        var ret = []
        // logs (test)
        for (var i = 0; i < test.length; i++) {
          ret[i] = {}
          try {
            ret[i].name = test[i].first_name + ' ' + test[i].last_name
            if (ret[i].name === 'null null') {
              ret[i].name = 'Unregistered User'
            }
          } catch (TypeError) {
            ret[i].name = 'Unregistered User'
          }
          ret[i].room = test[i].room
          ret[i].upid = test[i].upid
          ret[i].corridor = test[i].corridor
          ret[i].photo = test[i].image_thumb
          if (test[i].returnedkey.split(',')[0] === 'True') {
            ret[i].returned = true
          } else {
            ret[i].returned = false
          }
          ret[i].timestamp = test[i].returnedkey.split(',')[1]
        }
        this.gridData = ret
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
    addResident: function () {
      this.$router.push('/user/add/profile')
    },
    addRA: function () {

    }
  },
  data () {
    return {
      searchQuery: '',
      columnNames: ['Photo', 'Student Number', 'Name', 'Room', 'Corridor', 'Actions', 'Timestamp'],
      gridColumns: ['photo', 'upid', 'name', 'room', 'corridor'],
      startRow: 0,
      rowsPerPage: 800,
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
