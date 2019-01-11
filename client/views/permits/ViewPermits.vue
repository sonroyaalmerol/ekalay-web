<template>
    <div>
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child box">
            <tabs :only-fade="false">
              <tab-pane label="Late Night" selected>
                <h4 class="title">Late Night Permits</h4>
                <form id="search">
                    <p class="control">
                      <input class="input" type="text" v-model="searchQueryLN" placeholder="Search">
                    </p>
                </form>
                <data-table v-if="lateNight !== null"
                  :data="filteredLN"
                  :columns-data="gridColumns"
                  :columns="columnNames"
                  :filter-key="searchQueryLN"
                  mode="view"
                ></data-table>
                <!--<div id="page-navigation" v-if="!searchQueryLN">
                  <p class="control has-addons">
                    <a class="button" @click="movePagesLN(-1)">
                      <span class="icon is-small">
                        <i class="fa fa-arrow-left"></i>
                      </span>
                      <span>Back</span>
                    </a>
                    <span>&nbsp;&nbsp;{{ startRowLN / rowsPerPage + 1 }} out of {{ Math.ceil(lateNight.length / rowsPerPage) }}&nbsp;&nbsp;</span>
                    <a class="button" @click="movePagesLN(1)">
                      <span class="icon is-small">
                        <i class="fa fa-arrow-right"></i>
                      </span>
                      <span>Next</span>
                    </a>
                  </p>
                </div>-->
              </tab-pane>

              <tab-pane label="Overnight">
                <h4 class="title">Overnight Permits</h4>
                <form id="search">
                    <p class="control">
                      <input class="input" type="text" v-model="searchQueryON" placeholder="Search">
                    </p>
                </form>
                <data-table v-if="overNight !== null"
                  :data="filteredON"
                  :columns-data="gridColumns"
                  :columns="columnNames"
                  :filter-key="searchQueryON"
                  mode="view"
                ></data-table>
                <!--<div id="page-navigation" v-if="!searchQueryON">
                  <p class="control has-addons">
                    <a class="button" @click="movePagesON(-1)">
                      <span class="icon is-small">
                        <i class="fa fa-arrow-left"></i>
                      </span>
                      <span>Back</span>
                    </a>
                    <span>&nbsp;&nbsp;{{ startRowON / rowsPerPage + 1 }} out of {{ Math.ceil(overNight.length / rowsPerPage) }}&nbsp;&nbsp;</span>
                    <a class="button" @click="movePagesON(1)">
                      <span class="icon is-small">
                        <i class="fa fa-arrow-right"></i>
                      </span>
                      <span>Next</span>
                    </a>
                  </p>
                </div>-->
              </tab-pane>

              <tab-pane label="Early Morning">
                <h4 class="title">Early Morning Permits</h4>
                <form id="search">
                    <p class="control">
                      <input class="input" type="text" v-model="searchQueryEM" placeholder="Search">
                    </p>
                </form>
                <data-table v-if="earlyMorning !== null"
                  :data="filteredEM"
                  :columns-data="gridColumns"
                  :columns="columnNames"
                  :filter-key="searchQueryEM"
                  mode="view"
                ></data-table>
                <!--<div id="page-navigation" v-if="!searchQueryEM">
                  <p class="control has-addons">
                    <a class="button" @click="movePagesEM(-1)">
                      <span class="icon is-small">
                        <i class="fa fa-arrow-left"></i>
                      </span>
                      <span>Back</span>
                    </a>
                    <span>&nbsp;&nbsp;{{ startRowEM / rowsPerPage + 1 }} out of {{ Math.ceil(earlyMorning.length / rowsPerPage) }}&nbsp;&nbsp;</span>
                    <a class="button" @click="movePagesEM(1)">
                      <span class="icon is-small">
                        <i class="fa fa-arrow-right"></i>
                      </span>
                      <span>Next</span>
                    </a>
                  </p>
                </div>-->
              </tab-pane>
            </tabs>
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
    this.axios.get('permits/').then(
      response => {
        this.lateNight = []
        this.overNight = []
        this.earlyMorning = []
        var test = response.data
        for (var i = 0; i < test.length; i++) {
          if (test[i].approved_ra === null) {
            test[i].approved_ra = 'Not yet processed.'
          } else if (test[i].approved_ra === true) {
            test[i].approved_ra = 'Approved'
          } else if (test[i].approved_ra === false) {
            test[i].approved_ra = 'Rejected'
          }

          if (test[i].approved_dm === null) {
            test[i].approved_dm = 'Not yet processed.'
          } else if (test[i].approved_dm === true) {
            test[i].approved_dm = 'Approved'
          } else if (test[i].approved_dm === false) {
            test[i].approved_dm = 'Rejected'
          }

          test[i].actions = test[i].id

          if (test[i].permit_type === 0) {
            test[i].data_one = moment(test[i].data_one).format('MMMM D, YYYY') + ' - ' + moment(test[i].data_two).format('MMMM D, YYYY')
            this.overNight.push(test[i])
          } else if (test[i].permit_type === 1) {
            test[i].data_one = moment(test[i].data_two).format('h:mm a') + ', ' + moment(test[i].data_one).format('MMMM D, YYYY')
            this.lateNight.push(test[i])
          } else if (test[i].permit_type === 2) {
            test[i].data_one = moment(test[i].data_two).format('h:mm a') + ', ' + moment(test[i].data_one).format('MMMM D, YYYY')
            this.earlyMorning.push(test[i])
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
  computed: {
    filteredLN: function () {
      return this.lateNight.slice(this.startRowLN, this.startRowLN + this.rowsPerPage)
    },
    filteredON: function () {
      return this.overNight.slice(this.startRowON, this.startRowON + this.rowsPerPage)
    },
    filteredEM: function () {
      return this.earlyMorning.slice(this.startRowEM, this.startRowEM + this.rowsPerPage)
    }
  },
  methods: {
    movePagesLN: function (amount) {
      var newStartRow = this.startRowLN + (amount * this.rowsPerPage)
      if (newStartRow >= 0 && newStartRow < this.lateNight.length) {
        this.startRowLN = newStartRow
      }
    },
    movePagesON: function (amount) {
      var newStartRow = this.startRowON + (amount * this.rowsPerPage)
      if (newStartRow >= 0 && newStartRow < this.overNight.length) {
        this.startRowON = newStartRow
      }
    },
    movePagesEM: function (amount) {
      var newStartRow = this.startRowEM + (amount * this.rowsPerPage)
      if (newStartRow >= 0 && newStartRow < this.earlyMorning.length) {
        this.startRowEM = newStartRow
      }
    }
  },
  data () {
    return {
      lateNight: null,
      earlyMorning: null,
      overNight: null,
      searchQueryLN: '',
      searchQueryON: '',
      searchQueryEM: '',
      columnNames: ['Location', 'Reason', 'Date/Time', 'Status', 'Remarks', 'Actions'],
      gridColumns: ['location', 'reason', 'data_one', 'approved_dm', 'remarks', 'actions'],
      startRowLN: 0,
      startRowON: 0,
      startRowEM: 0,
      rowsPerPage: 9999
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
