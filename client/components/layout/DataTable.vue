<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="key in columns"
          @click="sortBy(key)"
          :class="{ active: sortKey == key }">
          {{ key | capitalize }}
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in filteredData">
        <td v-if="mode == 'approve'" style="width: 100px;overflow: hidden;text-overflow: ellipsis;">
            <button class="button is-success" @click="approvePermit(entry.id)"><i class="fa fa-check" aria-hidden="true"></i></button>
            <button class="button is-danger" @click="rejectPermit(entry.id)"><i class="fa fa-times" aria-hidden="true"></i></button>
        </td>
        <td v-for="key in localColumnsData" v-if="key != 'actions' && key != 'permit_type' && key != 'pis' && key != 'status' && key != 'inorout' && key != 'photo'" v-html="entry[key]"></td>
        <td v-else-if="key == 'photo'"><img :src="entry[key]"></img>
        <td v-else-if="key == 'inorout' && entry[key] === true"><b><font color="green">IN</font></b></td>
        <td v-else-if="key == 'inorout' && entry[key] === false"><b><font color="red">OUT</font></b></td>
        <td v-else-if="key == 'inorout' && entry[key] === null"><b><font color=""></font></b></td>
        <td v-else-if="key == 'status' && mode == 'inoutdatabase' && entry[key] === true"><b><font color="green">IN</font></b></td>
        <td v-else-if="key == 'status' && mode == 'inoutdatabase' && entry[key] === false"><b><font color="red">OUT</font></b></td>
        <td v-else-if="key == 'permit_type' && mode == 'viewapproved'">{{ entry[key] }}</td>
        <td v-else-if="mode == 'view'"><button class="button is-primary" @click="deletePermit(entry.id)">Delete</button></td>
        <td v-if="mode == 'viewapproved'">
            __________
        </td>
        <td v-if="mode == 'approve' && entry.pis && $auth.user().profile.role == 1">
            <collapse>
              <collapse-item title="View Instructions">
                <ul v-if="entry.permit_type == 1 && entry.pis">
                    <li v-if="entry.pis.lns === true">School: <i class="fa fa-check" aria-hidden="true"></i></li>
                    <li v-else-if="entry.pis.lns === false">School: <i class="fa fa-times" aria-hidden="true"></i></li>
                    <li v-else>School: <i class="fa fa-times" aria-hidden="true"></i></li>
                    <li v-if="entry.pis.lnns === true">Non-school: <i class="fa fa-check" aria-hidden="true"></i></li>
                    <li v-else-if="entry.pis.lnns === false">Non-school: <i class="fa fa-times" aria-hidden="true"></i></li>
                    <li v-else>Non-school: <i class="fa fa-times" aria-hidden="true"></i></li>
                    <li v-if="entry.pis.remarks">Remarks: {{ entry.pis.remarks }}</li>
                </ul>
                <ul v-if="entry.permit_type == 0 && entry.pis">
                    <li v-if="entry.pis.ghwe === true">Go home on weekends: <i class="fa fa-check" aria-hidden="true"></i></li>
                    <li v-else-if="entry.pis.ghwe === false">Go home on weekends: <i class="fa fa-times" aria-hidden="true"></i></li>
                    <li v-else>Go home on weekends: <i class="fa fa-times" aria-hidden="true"></i></li>
                    <li v-if="entry.pis.ghwd === true">Go home on weekdays: <i class="fa fa-check" aria-hidden="true"></i></li>
                    <li v-else-if="entry.pis.ghwd === false">Go home on weekdays: <i class="fa fa-times" aria-hidden="true"></i></li>
                    <li v-else>Go home on weekdays: <i class="fa fa-times" aria-hidden="true"></i></li>
                    <li v-if="entry.pis.wewr === true">Weekend with relatives: <i class="fa fa-check" aria-hidden="true"></i></li>
                    <li v-else-if="entry.pis.wewr === false">Weekend with relatives: <i class="fa fa-times" aria-hidden="true"></i></li>
                    <li v-else>Weekend with relatives: <i class="fa fa-times" aria-hidden="true"></i></li>
                    <li v-if="entry.pis.overn === true">Overnight with friends: <i class="fa fa-check" aria-hidden="true"></i></li>
                    <li v-else-if="entry.pis.overn === false">Overnight with friends: <i class="fa fa-times" aria-hidden="true"></i></li>
                    <li v-else>Overnight with friends: <i class="fa fa-times" aria-hidden="true"></i></li>
                    <li v-if="entry.pis.remarks">Remarks: {{ entry.pis.remarks }}</li>
                </ul>
                <ul v-if="entry.permit_type == 2 && entry.pis">
                    <li v-if="entry.pis.ems === true">School: <i class="fa fa-check" aria-hidden="true"></i></li>
                    <li v-else-if="entry.pis.ems === false">School: <i class="fa fa-times" aria-hidden="true"></i></li>
                    <li v-else>School: <i class="fa fa-times" aria-hidden="true"></i></li>
                    <li v-if="entry.pis.emns === true">Non-school: <i class="fa fa-check" aria-hidden="true"></i></li>
                    <li v-else-if="entry.pis.emns === false">Non-school: <i class="fa fa-times" aria-hidden="true"></i></li>
                    <li v-else>Non-school: <i class="fa fa-times" aria-hidden="true"></i></li>
                    <li v-if="entry.pis.remarks">Remarks: {{ entry.pis.remarks }}</li>
                </ul>
              </collapse-item>
            </collapse>
        </td>
        <td v-else-if="mode == 'approve' && !entry.pis && $auth.user().profile.role == 1">
            No PIS
        </td>
        <td v-else-if="mode == 'approve'">
            RA: {{ entry.raprocessed }}
        </td>
        <td v-if="mode == 'userdatabase'">
            <button v-if="!entry.parentsinstructionsheet" class="button is-primary" @click="addPIS(entry.upid)"><i class="fa fa-plus" aria-hidden="true"></i>&nbsp;Add PIS</button>
            <button class="button is-primary" @click="viewProfile(entry.upid)"><i class="fa fa-eye" aria-hidden="true"></i>&nbsp;View Profile</button>
            <button v-if="entry.parentsinstructionsheet" class="button is-primary" @click="viewPIS(entry.upid)"><i class="fa fa-eye" aria-hidden="true"></i>&nbsp;View PIS</button>
            <button v-if="entry.username != 'N/A'" class="button is-danger" @click="forgotPassword(entry.username)"><i class="fa fa-unlock-alt" aria-hidden="true"></i>&nbsp;Reset Password</button>
            <button class="button is-danger" @click="deleteProfile(entry.upid, entry.username)"><i class="fa fa-eye" aria-hidden="true"></i>&nbsp;Checkout</button>
        </td>
        <td v-if="mode == 'keydatabase'">
            <button v-if="!entry.returned" class="button is-primary" @click="actionKey(entry.upid)"><i class="fa fa-key" aria-hidden="true"></i>&nbsp;Return Key</button>
            <button v-else class="button is-danger" @click="actionKey(entry.upid)"><i class="fa fa-key" aria-hidden="true"></i>&nbsp;Borrow Key</button>
        </td>
        <td v-if="mode == 'keydatabase'">
            <font v-if="!entry.returned">{{ entry.timestamp | humanifyTimestamp }}</font>
        </td>
        <td v-if="mode == 'radatabase'">
            <button :disabled="entry.upid == '9876-12345'" class="button is-danger" @click="editRA(entry.upid)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp;Edit RA</button>
            <button v-if="entry.username" class="button is-danger" @click="forgotPassword(entry.username)"><i class="fa fa-unlock-alt" aria-hidden="true"></i>&nbsp;Reset Password</button>
            <button :disabled="$auth.user().profile.role != 2" class="button is-danger" @click="deleteRA(entry.upid, entry.username)"><i class="fa fa-eye" aria-hidden="true"></i>&nbsp;Checkout</button>
        </td>
        <td v-if="mode == 'staffdatabase'">
            <button class="button is-danger" @click="editStaff(entry.krhid)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp;Edit Staff</button>
            <button :disabled="$auth.user().profile.role != 2" class="button is-danger" @click="deleteStaff(entry.krhid)"><i class="fa fa-eye" aria-hidden="true"></i>&nbsp;Delete</button>
        </td>
        <td v-if="mode == 'viewsoo'">
            <button class="button is-primary" @click="openSOO(entry.id)"><i class="fa fa-eye" aria-hidden="true"></i>&nbsp;View Details</button>
            <button class="button is-danger" @click="deleteSOO(entry.id)"><i class="fa fa-eye" aria-hidden="true"></i>&nbsp;Delete</button>
        </td>
        <td v-if="mode == 'accountabilities'">
            <button class="button is-primary" @click="clearAccountability(entry.id)"><i class="fa fa-eye" aria-hidden="true"></i>&nbsp;Clear</button>
            <button class="button is-danger" @click="deleteAccountability(entry.id)"><i class="fa fa-eye" aria-hidden="true"></i>&nbsp;Delete</button>
        </td>
        <td v-if="mode == 'violationsdatabase'">
            <button class="button is-danger" @click="deleteViolation(entry.id)"><i class="fa fa-eye" aria-hidden="true"></i>&nbsp;Delete</button>
        </td>
      </tr>
      <tr v-if="!(filteredData && filteredData.length)">
        <td :colspan="this.columns.length"><center><h2 class="subtitle">No data retrieved.</h2></center></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Vue from 'vue'
import Notification from 'vue-bulma-notification'
import { Collapse, Item as CollapseItem } from 'vue-bulma-collapse'
import CardModal from './CardModal'
import moment from 'moment'

const CardModalComponent = Vue.extend(CardModal)

const openCardModal = (propsData = {
  visible: true
}) => {
  return new CardModalComponent({
    el: document.createElement('div'),
    propsData
  })
}

const NotificationComponent = Vue.extend(Notification)

const openNotification = (propsData = {
  title: '',
  message: '',
  type: '',
  direction: '',
  duration: 2000,
  container: '.notifications'
}) => {
  return new NotificationComponent({
    el: document.createElement('div'),
    propsData
  })
}

export default {
  components: {
    Notification,
    Collapse,
    CollapseItem,
    CardModal
  },
  props: {
    data: Array,
    columnsData: Array,
    columns: Array,
    filterKey: String,
    mode: String
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      localData: this.data,
      localColumnsData: this.columnsData,
      sortKey: '',
      sortOrders: sortOrders,
      deletePermitConfirmed: null,
      deleteProfileConfirmed: null,
      approvePermitConfirmed: null,
      rejectPermitConfirmed: null,
      forgotPasswordConfirmed: null,
      deleteSOOConfirmed: null,
      clearAccountabilityConfirmed: null,
      deleteAccountabilityConfirmed: null,
      deleteViolationConfirmed: null,
      actionKeyConfirmed: null,
      showModal: true,
      cardModal: null
    }
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.localData
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return (str.charAt(0).toUpperCase() + str.slice(1)).replace(/_/g, ' ')
    },
    humanifyBoolean: function (str) {
      if (str === true) {
        return 'Allowed'
      } else if (str === false) {
        return 'Not allowed'
      } else {
        return 'Not allowed'
      }
    },
    humanifyTimestamp: function (str) {
      return moment(str).format('h:mm a') + ', ' + moment(str).format('MMMM D, YYYY')
    }
  },
  methods: {
    openSOO: function (id) {
      let cardModal
      this.axios.get('payments/' + id + '/').then(
        response => {
          response.data.lodging_installments = ''
          response.data.board_installments = ''
          response.data.electricity_installments = ''
          response.data.electricity_appliances = ''
          if (response.data.lodging_transient === 0) {
            if (response.data.lodging_deposit) response.data.lodging_installments += 'Deposit '
            if (response.data.lodging_month1) response.data.lodging_installments += '1st '
            if (response.data.lodging_month2) response.data.lodging_installments += '2nd '
            if (response.data.lodging_month3) response.data.lodging_installments += '3rd '
            if (response.data.lodging_month4) response.data.lodging_installments += '4th '
            if (response.data.lodging_deposit_half) response.data.lodging_installments += 'Deposit(Half) '
            if (response.data.lodging_month1_half) response.data.lodging_installments += '1st(Half) '
            if (response.data.lodging_month2_half) response.data.lodging_installments += '2nd(Half) '
            if (response.data.lodging_month3_half) response.data.lodging_installments += '3rd(Half) '
            if (response.data.lodging_month4_half) response.data.lodging_installments += '4th(Half) '
            if (response.data.board_deposit) response.data.board_installments += 'Deposit '
            if (response.data.board_month1) response.data.board_installments += '1st '
            if (response.data.board_month2) response.data.board_installments += '2nd '
            if (response.data.board_month3) response.data.board_installments += '3rd '
            if (response.data.board_month4) response.data.board_installments += '4th '
            if (response.data.board_deposit_half) response.data.board_installments += 'Deposit(Half) '
            if (response.data.board_month1_half) response.data.board_installments += '1st(Half) '
            if (response.data.board_month2_half) response.data.board_installments += '2nd(Half) '
            if (response.data.board_month3_half) response.data.board_installments += '3rd(Half) '
            if (response.data.board_month4_half) response.data.board_installments += '4th(Half) '
            if (response.data.electricity_deposit) response.data.electricity_installments += 'Deposit '
            if (response.data.electricity_month1) response.data.electricity_installments += '1st '
            if (response.data.electricity_month2) response.data.electricity_installments += '2nd '
            if (response.data.electricity_month3) response.data.electricity_installments += '3rd '
            if (response.data.electricity_month4) response.data.electricity_installments += '4th '
            if (response.data.electricity_deposit_half) response.data.electricity_installments += 'Deposit(Half) '
            if (response.data.electricity_month1_half) response.data.electricity_installments += '1st(Half) '
            if (response.data.electricity_month2_half) response.data.electricity_installments += '2nd(Half) '
            if (response.data.electricity_month3_half) response.data.electricity_installments += '3rd(Half) '
            if (response.data.electricity_month4_half) response.data.electricity_installments += '4th(Half) '
            if (response.data.electricity_laptop) response.data.electricity_appliances += 'Laptop(' + response.data.electricity_laptop + ') '
            if (response.data.electricity_printer) response.data.electricity_appliances += 'Printer(' + response.data.electricity_printer + ') '
            if (response.data.electricity_ipad) response.data.electricity_appliances += 'iPad(' + response.data.electricity_ipad + ') '
            if (response.data.electricity_cellphone) response.data.electricity_appliances += 'Cellphone(' + response.data.electricity_cellphone + ') '
            if (response.data.electricity_fan12) response.data.electricity_appliances += 'Fan 12"(' + response.data.electricity_fan12 + ') '
            if (response.data.electricity_fan14) response.data.electricity_appliances += 'Fan 14"(' + response.data.electricity_fan14 + ') '
            if (response.data.electricity_fan16) response.data.electricity_appliances += 'Fan 16"(' + response.data.electricity_fan16 + ') '
            if (response.data.electricity_radio) response.data.electricity_appliances += 'Radio(' + response.data.electricity_radio + ') '
            if (response.data.electricity_camera) response.data.electricity_appliances += 'Camera(' + response.data.electricity_camera + ') '
            if (response.data.electricity_nebulizer) response.data.electricity_appliances += 'Nebulizer(' + response.data.electricity_nebulizer + ') '
            if (response.data.electricity_ipod) response.data.electricity_appliances += 'iPod(' + response.data.electricity_ipod + ') '
            if (response.data.electricity_mp3) response.data.electricity_appliances += 'MP3 (' + response.data.electricity_mp3 + ') '
            cardModal = (this.cardModal = openCardModal({
              title: 'OR #' + response.data.ornumber,
              content: '<center>' +
                'Name (SN): <b>' + response.data.name + '(' + response.data.upid + ')</b><br />' +
                'OR Date: <b>' + response.data.ordate + '</b><br />' +
                'Billing Number: <b>' + response.data.billingnumber + '</b><br />' +
                '<br /><b>Lodging</b><br />' +
                'Paid Installments: <b>' + response.data.lodging_installments + '</b><br />' +
                'Recorded Surcharge: <b>' + response.data.lodging_surcharge + '</b><br />' +
                'Recorded UA: <b>' + response.data.lodging_underassessed + '</b><br />' +
                'Recorded OA: <b>' + response.data.lodging_overassessed + '</b><br />' +
                'Total cost: <b>' + response.data.lodging_cost + '</b><br />' +
                'Amount paid: <b>' + response.data.lodging_amount + '</b><br />' +
                'Discrepancy: <b>' + response.data.lodging_discrepancy + '</b><br />' +
                '<br /><b>Board</b><br />' +
                'Paid Installments: <b>' + response.data.board_installments + '</b><br />' +
                'Recorded Surcharge: <b>' + response.data.board_surcharge + '</b><br />' +
                'Recorded UA: <b>' + response.data.board_ua + '</b><br />' +
                'Recorded OA: <b>' + response.data.board_oa + '</b><br />' +
                'Total cost: <b>' + response.data.board_cost + '</b><br />' +
                'Amount paid: <b>' + response.data.board_amount + '</b><br />' +
                'Discrepancy: <b>' + response.data.board_discrepancy + '</b><br />' +
                '<br /><b>Electricity</b><br />' +
                'Paid Installments: <b>' + response.data.electricity_installments + '</b><br />' +
                'Appliances: <b>' + response.data.electricity_appliances + '</b><br />' +
                'Recorded UA: <b>' + response.data.electricity_underassessed + '</b><br />' +
                'Recorded OA: <b>' + response.data.electricity_overassessed + '</b><br />' +
                'Total cost: <b>' + response.data.electricity_cost + '</b><br />' +
                'Amount paid: <b>' + response.data.electricity_amount + '</b><br />' +
                'Discrepancy: <b>' + response.data.electricity_discrepancy + '</b><br />' +
                '</center>',
              url: this.$store.state.pkg.homepage
            }))
          } else {
            cardModal = (this.cardModal = openCardModal({
              title: 'OR #' + response.data.ornumber,
              content: '<center>' +
                'Name (SN): <b>' + response.data.name + '(' + response.data.upid + ')</b><br />' +
                'OR Date: <b>' + response.data.ordate + '</b><br />' +
                'Billing Number: <b>' + response.data.billingnumber + '</b><br />' +
                'Paid Installments: <b>Transient</b><br />' +
                'Number of days: <b>' + (response.data.lodging_cost / response.data.lodging_transient) + '</b><br />' +
                'Cost per day: <b>' + response.data.lodging_transient + '</b><br />' +
                'Total cost: <b>' + response.data.lodging_cost + '</b><br />' +
                'Amount paid: <b>' + response.data.lodging_amount + '</b><br />' +
                'Discrepancy: <b>' + response.data.lodging_discrepancy + '</b><br />' +
                '</center>',
              url: this.$store.state.pkg.homepage
            }))
          }
          cardModal.$children[0].active()
        }
      ).catch(
        error => {
          if (error) {
            openNotification({
              message: 'SOO not found!',
              type: 'danger',
              duration: 4000
            })
          }
          // logs (error)
        }
      )
    },
    deleteSOO: function (id) {
      if (this.deleteSOOConfirmed === id) {
        this.deleteSOOConfirmed = null
        this.axios.delete('payments/' + id + '/').then(
          response => {
            openNotification({
              message: 'Successfully deleted SOO entry.',
              type: 'success',
              duration: 4000
            })
            for (var i = 0; i < this.localData.length; i++) {
              // logs (this.localData[i].id)
              // logs (id)
              if (this.localData[i].id === id) {
                this.localData.splice(i, 1)
                break
              }
            }
            this.$forceUpdate()
          }
        ).catch(
          error => {
            openNotification({
              message: error.response.data[0],
              type: 'danger',
              duration: 4000
            })
          }
        )
      } else {
        this.deleteSOOConfirmed = id
        openNotification({
          message: 'Press the button one more time to delete entry!',
          type: 'warning',
          duration: 4000
        })
      }
    },
    clearAccountability: function (id) {
      if (this.clearAccountabilityConfirmed === id) {
        this.clearAccountabilityConfirmed = null
        this.axios.get('accountabilities/' + id + '/clear/').then(
          response => {
            openNotification({
              message: 'Successfully cleared accountability.',
              type: 'success',
              duration: 4000
            })
            for (var i = 0; i < this.localData.length; i++) {
              if (this.localData[i].id === id) {
                this.localData[i].cleared = true
                this.localData[i].clearedon = moment().format()
                this.localData[i].clearedby = this.$auth.user().id
                break
              }
            }
            this.$forceUpdate()
          }
        ).catch(
          error => {
            openNotification({
              message: error.response.data[0],
              type: 'danger',
              duration: 4000
            })
          }
        )
      } else {
        this.clearAccountabilityConfirmed = id
        openNotification({
          message: 'Press the button one more time to clear accountability!',
          type: 'warning',
          duration: 4000
        })
      }
    },
    deleteAccountability: function (id) {
      if (this.deleteAccountabilityConfirmed === id) {
        this.deleteAccountabilityConfirmed = null
        this.axios.delete('accountabilities/' + id + '/').then(
          response => {
            openNotification({
              message: 'Successfully deleted accountability.',
              type: 'success',
              duration: 4000
            })
            for (var i = 0; i < this.localData.length; i++) {
              if (this.localData[i].id === id) {
                this.localData.splice(i, 1)
                break
              }
            }
            this.$forceUpdate()
          }
        ).catch(
          error => {
            openNotification({
              message: error.response.data[0],
              type: 'danger',
              duration: 4000
            })
          }
        )
      } else {
        this.deleteAccountabilityConfirmed = id
        openNotification({
          message: 'Press the button one more time to delete accountability!',
          type: 'warning',
          duration: 4000
        })
      }
    },
    deleteViolation: function (id) {
      if (this.deleteViolationConfirmed === id) {
        this.deleteViolationConfirmed = null
        this.axios.delete('violations/' + id + '/').then(
          response => {
            openNotification({
              message: 'Successfully deleted violation.',
              type: 'success',
              duration: 4000
            })
            for (var i = 0; i < this.localData.length; i++) {
              if (this.localData[i].id === id) {
                this.localData.splice(i, 1)
                break
              }
            }
            this.$forceUpdate()
          }
        ).catch(
          error => {
            openNotification({
              message: error.response.data[0],
              type: 'danger',
              duration: 4000
            })
          }
        )
      } else {
        this.deleteViolationConfirmed = id
        openNotification({
          message: 'Press the button one more time to delete violation!',
          type: 'warning',
          duration: 4000
        })
      }
    },
    addPIS: function (upid) {
      this.$router.push('/user/add/instruction/' + upid)
    },
    editRA: function (upid) {
      this.$router.push('/user/edit/assistant/' + upid)
    },
    editStaff: function (krhid) {
      this.$router.push('/user/edit/staff/' + krhid)
    },
    viewProfile: function (upid) {
      this.$router.push('/user/profile/' + upid)
    },
    viewPIS: function (upid) {
      this.$router.push('/user/pis/' + upid)
    },
    forgotPassword: function (username) {
      if (this.forgotPasswordConfirmed === username) {
        this.forgotPasswordConfirmed = null
        this.axios.delete('auth/users/' + username + '/').then(
          response => {
            openNotification({
              message: 'Successfully deleted user authentication. Please ask resident to register again.',
              type: 'success',
              duration: 4000
            })
            for (var i = 0; i < this.localData.length; i++) {
              if (this.localData[i].username === username) {
                this.localData.name = ''
                this.localData.username = 'N/A'
                break
              }
            }
            this.$forceUpdate()
          }
        ).catch(
          error => {
            openNotification({
              message: error.response.data[0],
              type: 'danger',
              duration: 4000
            })
          }
        )
      } else {
        this.forgotPasswordConfirmed = username
        openNotification({
          message: 'Press the button one more time to reset password!',
          type: 'warning',
          duration: 4000
        })
      }
    },
    deleteProfile: function (upid, username = null) {
      if (this.deleteProfileConfirmed === upid) {
        this.deleteProfileConfirmed = null
        this.axios.delete('residents/' + upid + '/').then(
          response => {
            openNotification({
              message: 'Successfully deleted profile.',
              type: 'success',
              duration: 4000
            })
            for (var i = 0; i < this.localData.length; i++) {
              if (this.localData[i].upid === upid) {
                this.localData.splice(i, 1)
                break
              }
            }
            this.$forceUpdate()
          }
        ).catch(
          error => {
            openNotification({
              message: error.response.data[0],
              type: 'danger',
              duration: 4000
            })
          }
        )
        this.axios.delete('instructions/' + upid + '/').then(
          response => {
            // logs ('Deleted pis: ' + upid)
          }
        )
        if (username !== 'N/A' && username !== null) {
          this.axios.delete('auth/users/' + username + '/').then(
            response => {
              // logs ('Deleted ' + username)
            }
          )
        }
      } else {
        this.deleteProfileConfirmed = upid
        openNotification({
          message: 'Press the button one more time to delete profile!',
          type: 'warning',
          duration: 4000
        })
      }
    },
    deleteRA: function (upid, username = null) {
      if (this.deleteProfileConfirmed === upid) {
        this.deleteProfileConfirmed = null
        this.axios.delete('assistants/' + upid + '/').then(
          response => {
            openNotification({
              message: 'Successfully deleted RA.',
              type: 'success',
              duration: 4000
            })
            for (var i = 0; i < this.localData.length; i++) {
              if (this.localData[i].upid === upid) {
                this.localData.splice(i, 1)
                break
              }
            }
            this.$forceUpdate()
          }
        ).catch(
          error => {
            openNotification({
              message: error.response.data[0],
              type: 'danger',
              duration: 4000
            })
          }
        )
        if (username !== 'N/A' && username !== null) {
          this.axios.delete('auth/users/' + username + '/').then(
            response => {
              // logs ('Deleted ' + username)
            }
          ).catch(
            error => {
              openNotification({
                message: error.response.data[0],
                type: 'danger',
                duration: 4000
              })
            }
          )
        }
      } else {
        this.deleteProfileConfirmed = upid
        openNotification({
          message: 'Press the button one more time to delete RA!',
          type: 'warning',
          duration: 4000
        })
      }
    },
    deleteStaff: function (krhid) {
      if (this.deleteProfileConfirmed === krhid) {
        this.deleteProfileConfirmed = null
        this.axios.delete('staffs/' + krhid + '/').then(
          response => {
            openNotification({
              message: 'Successfully deleted staff.',
              type: 'success',
              duration: 4000
            })
            for (var i = 0; i < this.localData.length; i++) {
              if (this.localData[i].krhid === krhid) {
                this.localData.splice(i, 1)
                break
              }
            }
            this.$forceUpdate()
          }
        ).catch(
          error => {
            openNotification({
              message: error.response.data[0],
              type: 'danger',
              duration: 4000
            })
          }
        )
      } else {
        this.deleteProfileConfirmed = krhid
        openNotification({
          message: 'Press the button one more time to delete staff!',
          type: 'warning',
          duration: 4000
        })
      }
    },
    deletePermit: function (id) {
      if (this.deletePermitConfirmed === id) {
        this.deletePermitConfirmed = null
        this.axios.delete('permits/' + id + '/').then(
          response => {
            openNotification({
              message: 'Successfully deleted permit.',
              type: 'success',
              duration: 4000
            })
            for (var i = 0; i < this.localData.length; i++) {
              // logs (this.localData[i].id)
              // logs (id)
              if (this.localData[i].id === id) {
                this.localData.splice(i, 1)
                break
              }
            }
            this.$forceUpdate()
          }
        ).catch(
          error => {
            openNotification({
              message: error.response.data[0],
              type: 'danger',
              duration: 4000
            })
          }
        )
      } else {
        this.deletePermitConfirmed = id
        openNotification({
          message: 'Press the button one more time to delete permit!',
          type: 'warning',
          duration: 4000
        })
      }
    },
    approvePermit: function (id) {
      if (this.approvePermitConfirmed === id) {
        this.approvePermitConfirmed = null
        this.axios.get('permits/' + id + '/approve/').then(
          response => {
            openNotification({
              message: 'Successfully approved permit.',
              type: 'success',
              duration: 500
            })
            for (var i = 0; i < this.localData.length; i++) {
              // logs (this.localData[i].id)
              // logs (id)
              if (this.localData[i].id === id) {
                this.localData.splice(i, 1)
                break
              }
            }
            this.$forceUpdate()
          }
        ).catch(
          error => {
            openNotification({
              message: error.response.data[0],
              type: 'danger',
              duration: 4000
            })
          }
        )
      } else {
        this.approvePermitConfirmed = id
        openNotification({
          message: 'Press the button one more time to approve permit!',
          type: 'warning',
          duration: 1000
        })
      }
    },
    rejectPermit: function (id) {
      if (this.rejectPermitConfirmed === id) {
        this.rejectPermitConfirmed = null
        this.axios.get('permits/' + id + '/reject/').then(
          response => {
            openNotification({
              message: 'Successfully rejected permit.',
              type: 'success',
              duration: 500
            })
            for (var i = 0; i < this.localData.length; i++) {
              // logs (this.localData[i].id)
              // logs (id)
              if (this.localData[i].id === id) {
                this.localData.splice(i, 1)
                break
              }
            }
            this.$forceUpdate()
          }
        ).catch(
          error => {
            openNotification({
              message: error.response.data[0],
              type: 'danger',
              duration: 4000
            })
          }
        )
      } else {
        this.rejectPermitConfirmed = id
        openNotification({
          message: 'Press the button one more time to reject permit!',
          type: 'warning',
          duration: 1000
        })
      }
    },
    actionKey: function (upid) {
      if (this.actionKeyConfirmed === upid) {
        this.actionKeyConfirmed = null
        var toSubmit = {}
        toSubmit.upid = upid
        toSubmit.timestamp = moment(Date.now()).format()
        this.axios.post('keyborrowentries/', toSubmit).then(
          response => {
            openNotification({
              message: 'Successfully updated key status.',
              type: 'success',
              duration: 4000
            })
            for (var i = 0; i < this.localData.length; i++) {
              if (this.localData[i].upid === upid) {
                this.localData[i].returned = !this.localData[i].returned
                this.localData[i].timestamp = moment(Date.now()).format('h:mm a') + ', ' + moment(Date.now()).format('MMMM D, YYYY')
                break
              }
            }
            this.$forceUpdate()
          }
        ).catch(
          error => {
            openNotification({
              message: error.response.data[0],
              type: 'danger',
              duration: 4000
            })
          }
        )
      } else {
        this.actionKeyConfirmed = upid
        openNotification({
          message: 'Press the button one more time to update key status!',
          type: 'warning',
          duration: 4000
        })
      }
    },
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
}
</script>
