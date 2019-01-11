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
                  mode='approve'
                ></data-table>
                <!-- <div id="page-navigation" v-if="!searchQueryLN">
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
                </div> -->
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
                  mode="approve"
                ></data-table>
                <!-- <div id="page-navigation" v-if="!searchQueryON">
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
                </div> -->
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
                  mode="approve"
                ></data-table>
                <!-- <div id="page-navigation" v-if="!searchQueryEM">
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
                </div> -->
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
  data () {
    return {
      lateNight: null,
      earlyMorning: null,
      overNight: null,
      searchQueryLN: '',
      searchQueryON: '',
      searchQueryEM: '',
      columnNames: ['Verdict', 'Name/UPID', 'Location', 'Reason', 'Date/Time', 'Actions'],
      gridColumns: ['name', 'location', 'reason', 'data_one', 'actions', 'permit_type', 'pis'],
      pis: [],
      userDetails: [],
      test: [],
      startRowLN: 0,
      startRowON: 0,
      startRowEM: 0,
      rowsPerPage: 10000
    }
  },
  created () {
    this.requestData()
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
    },
    requestData: function () {
      this.axios.get('permits/').then(
        response => {
          this.lateNight = []
          this.overNight = []
          this.earlyMorning = []
          this.test = response.data
          for (var y = 0; y < this.test.length; y++) {
            this.test[y].name += ' (' + this.test[y].upid + ')'
            if (this.test[y].permit_type === 0) {
              this.test[y].data_one = moment(this.test[y].data_one).format('MMMM D, YYYY') + ' - ' + moment(this.test[y].data_two, moment.ISO_8601).format('MMMM D, YYYY')
              this.overNight.push(this.test[y])
            } else if (this.test[y].permit_type === 1) {
              this.test[y].data_one = moment(this.test[y].data_two).format('h:mm a') + ', ' + moment(this.test[y].data_one, moment.ISO_8601).format('MMMM D, YYYY')
              this.lateNight.push(this.test[y])
            } else if (this.test[y].permit_type === 2) {
              this.test[y].data_one = moment(this.test[y].data_two).format('h:mm a') + ', ' + moment(this.test[y].data_one, moment.ISO_8601).format('MMMM D, YYYY')
              this.earlyMorning.push(this.test[y])
            }
          }
          this.$forceUpdate()
        }
      )
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
