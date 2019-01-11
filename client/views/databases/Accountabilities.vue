<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Accountabilities <font v-if="gridData !== null">({{ gridData.length }} entries)</font><font v-else>(Loading...)</font></h4>
          <button v-if="$auth.user().profile.role == 1 || $auth.user().profile.role == 2" class="button is-primary" @click="addAccountability()"><i class="fa fa-plus" aria-hidden="true"></i>&nbsp;Add Accountability</button>
          <hr>
          <form id="search">
              <p class="control">
                <input class="input" type="text" v-model="searchQuery" placeholder="Enter student number">
              </p>
          </form>
          <data-table v-if="searchQuery && gridData !== null"
            :data="filteredItems"
            :columns="columnNames"
            :columnsData="gridColumns"
            :filter-key="searchQuery"
            mode="accountabilities"
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
import CardModal from './AddAccountability'

const CardModalComponent = Vue.extend(CardModal)

const openCardModal = (propsData = {
  visible: true
}) => {
  return new CardModalComponent({
    el: document.createElement('div'),
    propsData
  })
}

export default {
  created () {
    this.axios.get('accountabilities/').then(
      response => {
        this.gridData = response.data
        this.$forceUpdate()
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
    addAccountability: function () {
      let cardModal = (this.cardModal = openCardModal({
        title: 'Add Accountability',
        content: 'Under construction'
      }))
      cardModal.$children[0].active()
    }
  },
  data () {
    return {
      searchQuery: '',
      columnNames: ['Student Number', 'Reason', 'Cleared', 'Cleared on', 'Cleared by', 'Actions'],
      gridColumns: ['upid', 'reason', 'cleared', 'clearedon', 'clearedby'],
      startRow: 0,
      rowsPerPage: 600,
      gridData: null,
      showModal: true,
      cardModal: null
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
