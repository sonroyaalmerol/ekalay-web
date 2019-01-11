
<template>
<div>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <form v-on:submit.prevent="sooSubmit">
          <table class="table">
            <tbody>
              <h4 class="title">General Data</h4>
              <tr>
                <th>Student Number</th>
                <td>
                  <p class="control">
                    <cleave v-model="data.upid" class="input" :options="{ delimiter: '-', blocks: [4, 5], numericOnly: true }"></cleave>
                  </p>
                </td>
              </tr>
              <tr>
                <th>Billing Number</th>
                <td>
                  <p class="control">
                    <input v-model="data.billingnumber" class="input" type="text">
                  </p>
                </td>
              </tr>
              <tr>
                <th>Official Receipt Number</th>
                <td>
                  <p class="control">
                    <input v-model="data.ornumber" class="input" type="text">
                  </p>
                </td>
              </tr>
              <tr>
                <th>Official Receipt Date</th>
                <td>
                  <p class="control">
                    <cleave v-model="data.ordate" placeholder="MM/DD/YYYY" class="input" :options="{ delimiter: '/', blocks: [2, 2, 4], numericOnly: true }"></cleave>
                  </p>
                </td>
              </tr>
            </tbody>
            <tbody>
              <br>
              <h4 class="title">Room Rental</h4>
              <tr>
                <th>Payment Scheme</th>
                <td>
                  <p class="control">
                    <span class="select">
                          <select v-model="data.room_scheme">
                            <option value=""></option>
                            <option value="0">Full</option>
                            <option value="1">Partial</option>
                            <option value="2">Midyear</option>
                            <option value="3">Transient</option>
                          </select>
                        </span>
                  </p>
                </td>
              </tr>
              <tr v-if="data.room_scheme == '1'">
                <th>Installments</th>
                <td>
                  <p class="control">
                    <label class="checkbox">
                          <input v-model="data.room_installment" value="0" type="checkbox">
                          Deposit
                        </label> &nbsp;&nbsp;
                    <label v-if="this.data.room_installment.includes('0')" class="checkbox">
                          <input v-model="data.room_installment_half" value="0" type="checkbox">
                          Half
                        </label>
                  </p>
                  <p class="control">
                    <label class="checkbox">
                          <input v-model="data.room_installment" value="1" type="checkbox">
                          1st Installment
                        </label> &nbsp;&nbsp;
                    <label v-if="this.data.room_installment.includes('1')" class="checkbox">
                          <input v-model="data.room_installment_half" value="1" type="checkbox">
                          Half
                        </label>
                  </p>
                  <p class="control">
                    <label class="checkbox">
                          <input v-model="data.room_installment" value="2" type="checkbox">
                          2nd Installment
                        </label> &nbsp;&nbsp;
                    <label v-if="this.data.room_installment.includes('2')" class="checkbox">
                          <input v-model="data.room_installment_half" value="2" type="checkbox">
                          Half
                        </label>
                  </p>
                  <p class="control">
                    <label class="checkbox">
                          <input v-model="data.room_installment" value="3" type="checkbox">
                          3rd Installment
                        </label> &nbsp;&nbsp;
                    <label v-if="this.data.room_installment.includes('3')" class="checkbox">
                          <input v-model="data.room_installment_half" value="3" type="checkbox">
                          Half
                        </label>
                  </p>
                  <p class="control">
                    <label class="checkbox">
                          <input v-model="data.room_installment" value="4" type="checkbox">
                          4th Installment
                        </label> &nbsp;&nbsp;
                    <label v-if="this.data.room_installment.includes('4')" class="checkbox">
                          <input v-model="data.room_installment_half" value="4" type="checkbox">
                          Half
                        </label>
                  </p>
                </td>
              </tr>
              <tr v-if="data.room_scheme != '3'">
                <th>Surcharge</th>
                <td>
                  <p class="control has-icon">
                    <cleave :options="{ numeral: true }" v-model="data.room_surcharge" class="input" type="text"></cleave>
                    <span class="icon is-small">
                          &#8369;
                        </span>
                  </p>
                </td>
              </tr>
              <tr v-if="data.room_scheme != '3'">
                <th>OA</th>
                <td>
                  <p class="control has-icon">
                    <cleave :options="{ numeral: true }" v-model="data.room_oa" class="input" type="text"></cleave>
                    <span class="icon is-small">
                          &#8369;
                        </span>
                  </p>
                </td>
              </tr>
              <tr v-if="data.room_scheme != '3'">
                <th>UA</th>
                <td>
                  <p class="control has-icon">
                    <cleave :options="{ numeral: true }" v-model="data.room_ua" class="input" type="text"></cleave>
                    <span class="icon is-small">
                          &#8369;
                        </span>
                  </p>
                </td>
              </tr>
              <tr v-if="data.room_scheme == '3'">
                <th>Number of days</th>
                <td>
                  <p class="control">
                    <cleave :options="{ numericOnly: true }" v-model="data.transient_days" class="input" type="text"></cleave>
                  </p>
                </td>
              </tr>
              <tr v-if="data.room_scheme == '3'">
                <th>Transient cost per day</th>
                <td>
                  <p class="control has-icon">
                    <cleave :options="{ numeral: true }" v-model="data.transient_cost" class="input" type="text"></cleave>
                    <span class="icon is-small">
                          &#8369;
                        </span>
                  </p>
                </td>
              </tr>
              <tr>
                <th>Amount paid</th>
                <td>
                  <p class="control has-icon">
                    <cleave :options="{ numeral: true }" v-model="data.room_amount" class="input" type="text"></cleave>
                    <span class="icon is-small">
                          &#8369;
                        </span>
                  </p>
                </td>
              </tr>
            </tbody>
            <tbody v-if="data.room_scheme != '3'">
              <br>
              <h4 class="title">Board</h4>
              <tr>
                <th>Payment Scheme</th>
                <td>
                  <p class="control">
                    <span class="select">
                          <select v-model="data.board_scheme">
                            <option value=""></option>
                            <option value="0">Full</option>
                            <option value="1">Partial</option>
                            <option value="2">Midyear</option>
                          </select>
                        </span>
                  </p>
                </td>
              </tr>
              <tr>
                <th>Board Type</th>
                <td>
                  <p class="control">
                    <span class="select">
                          <select v-model="data.board_type">
                            <option value="0">Cafeteria</option>
                            <option value="1">Single Fee</option>
                          </select>
                        </span>
                  </p>
                </td>
              </tr>
              <tr v-if="data.board_scheme == '1'">
                <th>Installments</th>
                <td>
                  <p class="control">
                    <label class="checkbox">
                          <input v-model="data.board_installment" value="0" type="checkbox">
                          Deposit
                        </label> &nbsp;&nbsp;
                    <label v-if="this.data.board_installment.includes('0')" class="checkbox">
                          <input v-model="data.board_installment_half" value="0" type="checkbox">
                          Half
                        </label>
                  </p>
                  <p class="control">
                    <label class="checkbox">
                          <input v-model="data.board_installment" value="1" type="checkbox">
                          1st Installment
                        </label> &nbsp;&nbsp;
                    <label v-if="this.data.board_installment.includes('1')" class="checkbox">
                          <input v-model="data.board_installment_half" value="1" type="checkbox">
                          Half
                        </label>
                  </p>
                  <p class="control">
                    <label class="checkbox">
                          <input v-model="data.board_installment" value="2" type="checkbox">
                          2nd Installment
                        </label> &nbsp;&nbsp;
                    <label v-if="this.data.board_installment.includes('2')" class="checkbox">
                          <input v-model="data.board_installment_half" value="2" type="checkbox">
                          Half
                        </label>
                  </p>
                  <p class="control">
                    <label class="checkbox">
                          <input v-model="data.board_installment" value="3" type="checkbox">
                          3rd Installment
                        </label> &nbsp;&nbsp;
                    <label v-if="this.data.board_installment.includes('3')" class="checkbox">
                          <input v-model="data.board_installment_half" value="3" type="checkbox">
                          Half
                        </label>
                  </p>
                  <p class="control">
                    <label class="checkbox">
                          <input v-model="data.board_installment" value="4" type="checkbox">
                          4th Installment
                        </label> &nbsp;&nbsp;
                    <label v-if="this.data.board_installment.includes('4')" class="checkbox">
                          <input v-model="data.board_installment_half" value="4" type="checkbox">
                          Half
                        </label>
                  </p>
                </td>
              </tr>
              <tr v-if="data.board_type == '1'">
                <th>Board cost per month</th>
                <td>
                  <p class="control has-icon">
                    <cleave :options="{ numeral: true }" v-model="data.board_monthly" class="input" type="text"></cleave>
                    <span class="icon is-small">
                          &#8369;
                        </span>
                  </p>
                </td>
              </tr>
              <tr v-if="data.board_type == '1'">
                <th>Surcharge</th>
                <td>
                  <p class="control has-icon">
                    <cleave :options="{ numeral: true }" v-model="data.board_surcharge" class="input" type="text"></cleave>
                    <span class="icon is-small">
                          &#8369;
                        </span>
                  </p>
                </td>
              </tr>
              <tr v-if="data.board_type == '1'">
                <th>OA</th>
                <td>
                  <p class="control has-icon">
                    <cleave :options="{ numeral: true }" v-model="data.board_oa" class="input" type="text"></cleave>
                    <span class="icon is-small">
                          &#8369;
                        </span>
                  </p>
                </td>
              </tr>
              <tr v-if="data.board_type == '1'">
                <th>UA</th>
                <td>
                  <p class="control has-icon">
                    <cleave :options="{ numeral: true }" v-model="data.board_ua" class="input" type="text"></cleave>
                    <span class="icon is-small">
                          &#8369;
                        </span>
                  </p>
                </td>
              </tr>
              <tr v-if="data.board_type == '1'">
                <th>Amount paid</th>
                <td>
                  <p class="control has-icon">
                    <cleave :options="{ numeral: true }" v-model="data.board_amount" class="input" type="text"></cleave>
                    <span class="icon is-small">
                          &#8369;
                        </span>
                  </p>
                </td>
              </tr>
            </tbody>
            <tbody v-if="data.room_scheme != '3'">
              <br>
              <h4 class="title">Electricity</h4>
              <tr>
                <th>Payment Scheme</th>
                <td>
                  <p class="control">
                    <span class="select">
                          <select v-model="data.electricity_scheme">
                            <option value=""></option>
                            <option value="0">Full</option>
                            <option value="1">Partial</option>
                            <option value="2">Midyear</option>
                          </select>
                        </span>
                  </p>
                </td>
              </tr>
              <tr v-if="data.electricity_scheme == '1'">
                <th>Installments</th>
                <td>
                  <p class="control">
                    <label class="checkbox">
                          <input v-model="data.electricity_installment" value="0" type="checkbox">
                          Deposit
                        </label> &nbsp;&nbsp;
                    <label v-if="this.data.electricity_installment.includes('0')" class="checkbox">
                          <input v-model="data.electricity_installment_half" value="0" type="checkbox">
                          Half
                        </label>
                  </p>
                  <p class="control">
                    <label class="checkbox">
                          <input v-model="data.electricity_installment" value="1" type="checkbox">
                          1st Installment
                        </label> &nbsp;&nbsp;
                    <label v-if="this.data.electricity_installment.includes('1')" class="checkbox">
                          <input v-model="data.electricity_installment_half" value="1" type="checkbox">
                          Half
                        </label>
                  </p>
                  <p class="control">
                    <label class="checkbox">
                          <input v-model="data.electricity_installment" value="2" type="checkbox">
                          2nd Installment
                        </label> &nbsp;&nbsp;
                    <label v-if="this.data.electricity_installment.includes('2')" class="checkbox">
                          <input v-model="data.electricity_installment_half" value="2" type="checkbox">
                          Half
                        </label>
                  </p>
                  <p class="control">
                    <label class="checkbox">
                          <input v-model="data.electricity_installment" value="3" type="checkbox">
                          3rd Installment
                        </label> &nbsp;&nbsp;
                    <label v-if="this.data.electricity_installment.includes('3')" class="checkbox">
                          <input v-model="data.electricity_installment_half" value="3" type="checkbox">
                          Half
                        </label>
                  </p>
                  <p class="control">
                    <label class="checkbox">
                          <input v-model="data.electricity_installment" value="4" type="checkbox">
                          4th Installment
                        </label> &nbsp;&nbsp;
                    <label v-if="this.data.electricity_installment.includes('4')" class="checkbox">
                          <input v-model="data.electricity_installment_half" value="4" type="checkbox">
                          Half
                        </label>
                  </p>
                </td>
              </tr>
              <tr>
                <th>Fan 12" (Quantity)</th>
                <td>
                  <p class="control">
                    <cleave :options="{ numericOnly: true }" v-model="data.electricity_fan12" class="input" type="text"></cleave>
                  </p>
                </td>
              </tr>
              <tr>
                <th>Fan 14" (Quantity)</th>
                <td>
                  <p class="control">
                    <cleave :options="{ numericOnly: true }" v-model="data.electricity_fan14" class="input" type="text"></cleave>
                  </p>
                </td>
              </tr>
              <tr>
                <th>Fan 16" (Quantity)</th>
                <td>
                  <p class="control">
                    <cleave :options="{ numericOnly: true }" v-model="data.electricity_fan16" class="input" type="text"></cleave>
                  </p>
                </td>
              </tr>
              <tr>
                <th>Laptop (Quantity)</th>
                <td>
                  <p class="control">
                    <cleave :options="{ numericOnly: true }" v-model="data.electricity_laptop" class="input" type="text"></cleave>
                  </p>
                </td>
              </tr>
              <tr>
                <th>Cellphone (Quantity)</th>
                <td>
                  <p class="control">
                    <cleave :options="{ numericOnly: true }" v-model="data.electricity_cellphone" class="input" type="text"></cleave>
                  </p>
                </td>
              </tr>
              <tr>
                <th>Printer (Quantity)</th>
                <td>
                  <p class="control">
                    <cleave :options="{ numericOnly: true }" v-model="data.electricity_printer" class="input" type="text"></cleave>
                  </p>
                </td>
              </tr>
              <tr>
                <th>iPad (Quantity)</th>
                <td>
                  <p class="control">
                    <cleave :options="{ numericOnly: true }" v-model="data.electricity_ipad" class="input" type="text"></cleave>
                  </p>
                </td>
              </tr>
              <tr>
                <th>Radio (Quantity)</th>
                <td>
                  <p class="control">
                    <cleave :options="{ numericOnly: true }" v-model="data.electricity_radio" class="input" type="text"></cleave>
                  </p>
                </td>
              </tr>
              <tr>
                <th>Camera (Quantity)</th>
                <td>
                  <p class="control">
                    <cleave :options="{ numericOnly: true }" v-model="data.electricity_camera" class="input" type="text"></cleave>
                  </p>
                </td>
              </tr>
              <tr>
                <th>Nebulizer (Quantity)</th>
                <td>
                  <p class="control">
                    <cleave :options="{ numericOnly: true }" v-model="data.electricity_nebulizer" class="input" type="text"></cleave>
                  </p>
                </td>
              </tr>
              <tr>
                <th>iPod (Quantity)</th>
                <td>
                  <p class="control">
                    <cleave :options="{ numericOnly: true }" v-model="data.electricity_ipod" class="input" type="text"></cleave>
                  </p>
                </td>
              </tr>
              <tr>
                <th>MP3 (Quantity)</th>
                <td>
                  <p class="control">
                    <cleave :options="{ numericOnly: true }" v-model="data.electricity_mp3" class="input"></cleave>
                  </p>
                </td>
              </tr>
              <tr>
                <th>OA</th>
                <td>
                  <p class="control has-icon">
                    <cleave :options="{ numeral: true }" v-model="data.electricity_oa" class="input" type="text"></cleave>
                    <span class="icon is-small">
                          &#8369;
                        </span>
                  </p>
                </td>
              </tr>
              <tr>
                <th>UA</th>
                <td>
                  <p class="control has-icon">
                    <cleave :options="{ numeral: true }" v-model="data.electricity_ua" class="input" type="text"></cleave>
                    <span class="icon is-small">
                          &#8369;
                        </span>
                  </p>
                </td>
              </tr>
              <tr>
                <th>Amount paid</th>
                <td>
                  <p class="control has-icon">
                    <cleave :options="{ numeral: true }" v-model="data.electricity_amount" class="input" type="text"></cleave>
                    <span class="icon is-small">
                          &#8369;
                        </span>
                  </p>
                </td>
              </tr>
            </tbody>
            <tbody>
              <br>
              <h4 class="title">Others</h4>
              <tr>
                <th>Remarks</th>
                <td>
                  <p class="control">
                    <input v-model="data.remarks" class="input" type="text">
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <p class="control">
            <center><button type="submit" class="button is-primary">Add SOO Entry</button></center>
          </p>
        </form>
      </article>
    </div>
  </div>
</div>
</template>

<script>
import Cleave from 'vue-cleave'
import 'cleave.js/dist/addons/cleave-phone.cn'
import Vue from 'vue'
import Notification from 'vue-bulma-notification'
import Datepicker from 'vue-bulma-datepicker'
import moment from 'moment'
import VbSwitch from 'vue-bulma-switch'

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

let fromNumeral = function (string) {
  if (string != null) {
    return Number(string.replace(/,/g, ''))
  } else {
    return 0
  }
}

export default {
  components: {
    Cleave,
    Notification,
    Datepicker,
    VbSwitch
  },
  data: function () {
    return {
      data: {
        room_scheme: '',
        board_scheme: '',
        board_type: '',
        electricity_scheme: '',
        room_installment: [],
        board_installment: [],
        electricity_installment: [],
        room_installment_half: [],
        board_installment_half: [],
        electricity_installment_half: []
      }
    }
  },
  methods: {
    sooSubmit: function () {
      let toSubmit = {}
      // logs (this.data)
      toSubmit.upid = this.data.upid
      toSubmit.ornumber = this.data.ornumber
      toSubmit.billingnumber = this.data.billingnumber
      toSubmit.ordate = moment(this.data.ordate, 'MM/DD/YYYY').format('YYYY-MM-DD')
      toSubmit.lodging_cost = 0
      toSubmit.board_cost = 0
      toSubmit.electricity_cost = 0
      /* ****** Lodging ******* */
      if (this.data.room_scheme !== '3') {
        if (this.data.room_scheme === '0') {
          toSubmit.lodging_deposit = true
          toSubmit.lodging_month1 = true
          toSubmit.lodging_month2 = true
          toSubmit.lodging_month3 = true
          toSubmit.lodging_month4 = true
          toSubmit.lodging_cost += 2500
        } else if (this.data.room_scheme === '1') {
          toSubmit.lodging_deposit = this.data.room_installment.includes('0')
          if (toSubmit.lodging_deposit) {
            if (this.data.room_installment_half.includes('0')) {
              toSubmit.lodging_cost += 250
              toSubmit.lodging_deposit_half = true
              toSubmit.lodging_deposit = false
            } else {
              toSubmit.lodging_cost += 500
            }
          }
          toSubmit.lodging_month1 = this.data.room_installment.includes('1')
          if (toSubmit.lodging_month1) {
            if (this.data.room_installment_half.includes('1')) {
              toSubmit.lodging_cost += 250
              toSubmit.lodging_month1_half = true
              toSubmit.lodging_month1 = false
            } else {
              toSubmit.lodging_cost += 500
            }
          }
          toSubmit.lodging_month2 = this.data.room_installment.includes('2')
          if (toSubmit.lodging_month2) {
            if (this.data.room_installment_half.includes('2')) {
              toSubmit.lodging_cost += 250
              toSubmit.lodging_month2_half = true
              toSubmit.lodging_month2 = false
            } else {
              toSubmit.lodging_cost += 500
            }
          }
          toSubmit.lodging_month3 = this.data.room_installment.includes('3')
          if (toSubmit.lodging_month3) {
            if (this.data.room_installment_half.includes('3')) {
              toSubmit.lodging_cost += 250
              toSubmit.lodging_month3_half = true
              toSubmit.lodging_month3 = false
            } else {
              toSubmit.lodging_cost += 500
            }
          }
          toSubmit.lodging_month4 = this.data.room_installment.includes('4')
          if (toSubmit.lodging_month4) {
            if (this.data.room_installment_half.includes('4')) {
              toSubmit.lodging_cost += 250
              toSubmit.lodging_month4_half = true
              toSubmit.lodging_month4 = false
            } else {
              toSubmit.lodging_cost += 500
            }
          }
        } else if (this.data.room_scheme === '2') {
          toSubmit.lodging_month0 = true
          toSubmit.lodging_cost += 1000
        }
        toSubmit.lodging_surcharge = fromNumeral(this.data.room_surcharge)
        toSubmit.lodging_underassessed = fromNumeral(this.data.room_ua)
        toSubmit.lodging_overassessed = fromNumeral(this.data.room_oa)
        toSubmit.lodging_amount = fromNumeral(this.data.room_amount)
        toSubmit.lodging_cost = toSubmit.lodging_cost - toSubmit.lodging_overassessed + toSubmit.lodging_underassessed
        toSubmit.lodging_discrepancy = toSubmit.lodging_cost - toSubmit.lodging_amount
        /* ****** Board ******* */
        if (this.data.board_scheme === '0') {
          toSubmit.board_deposit = true
          toSubmit.board_month1 = true
          toSubmit.board_month2 = true
          toSubmit.board_month3 = true
          toSubmit.board_month4 = true
        } else if (this.data.board_scheme === '1') {
          toSubmit.board_deposit = this.data.board_installment.includes('0')
          toSubmit.board_month1 = this.data.board_installment.includes('1')
          toSubmit.board_month2 = this.data.board_installment.includes('2')
          toSubmit.board_month3 = this.data.board_installment.includes('3')
          toSubmit.board_month4 = this.data.board_installment.includes('4')
        } else if (this.data.board_scheme === '2') {
          toSubmit.board_month0 = true
        }
        if (this.data.board_type === '1') {
          if (toSubmit.board_deposit) {
            if (this.data.board_installment_half.includes('0')) {
              toSubmit.board_cost += (fromNumeral(this.data.board_monthly) / 2)
              toSubmit.board_deposit_half = true
              toSubmit.board_deposit = false
            } else {
              toSubmit.board_cost += fromNumeral(this.data.board_monthly)
            }
          }
          if (toSubmit.board_month1) {
            if (this.data.board_installment_half.includes('1')) {
              toSubmit.board_cost += (fromNumeral(this.data.board_monthly) / 2)
              toSubmit.board_month1_half = true
              toSubmit.board_month1 = false
            } else {
              toSubmit.board_cost += fromNumeral(this.data.board_monthly)
            }
          }
          if (toSubmit.board_month2) {
            if (this.data.board_installment_half.includes('2')) {
              toSubmit.board_cost += (fromNumeral(this.data.board_monthly) / 2)
              toSubmit.board_month2_half = true
              toSubmit.board_month2 = false
            } else {
              toSubmit.board_cost += fromNumeral(this.data.board_monthly)
            }
          }
          if (toSubmit.board_month3) {
            if (this.data.board_installment_half.includes('3')) {
              toSubmit.board_cost += (fromNumeral(this.data.board_monthly) / 2)
              toSubmit.board_month3_half = true
              toSubmit.board_month3 = false
            } else {
              toSubmit.board_cost += fromNumeral(this.data.board_monthly)
            }
          }
          if (toSubmit.board_month4) {
            if (this.data.board_installment_half.includes('4')) {
              toSubmit.board_cost += (fromNumeral(this.data.board_monthly) / 2)
              toSubmit.board_month4_half = true
              toSubmit.board_month4 = false
            } else {
              toSubmit.board_cost += fromNumeral(this.data.board_monthly)
            }
          }
          toSubmit.board_surcharge = fromNumeral(this.data.board_surcharge)
          toSubmit.board_underassessed = fromNumeral(this.data.board_ua)
          toSubmit.board_overassessed = fromNumeral(this.data.board_oa)
          toSubmit.board_amount = fromNumeral(this.data.board_amount)
          toSubmit.board_cost = toSubmit.board_cost - toSubmit.board_overassessed + toSubmit.board_underassessed
          toSubmit.board_discrepancy = toSubmit.board_cost - toSubmit.board_amount
        } else if (this.data.board_type === '0') {
          toSubmit.board_cost = 0
        }
        /* ****** Electricity ******* */
        if (this.data.electricity_scheme === '0') {
          toSubmit.electricity_deposit = true
          toSubmit.electricity_month1 = true
          toSubmit.electricity_month2 = true
          toSubmit.electricity_month3 = true
          toSubmit.electricity_month4 = true
        } else if (this.data.electricity_scheme === '1') {
          toSubmit.electricity_deposit = this.data.electricity_installment.includes('0')
          toSubmit.electricity_month1 = this.data.electricity_installment.includes('1')
          toSubmit.electricity_month2 = this.data.electricity_installment.includes('2')
          toSubmit.electricity_month3 = this.data.electricity_installment.includes('3')
          toSubmit.electricity_month4 = this.data.electricity_installment.includes('4')
        } else if (this.data.electricity_scheme === '2') {
          toSubmit.electricity_month0 = true
        }
        toSubmit.electricity_fan12 = fromNumeral(this.data.electricity_fan12)
        toSubmit.electricity_fan14 = fromNumeral(this.data.electricity_fan14)
        toSubmit.electricity_fan16 = fromNumeral(this.data.electricity_fan16)
        toSubmit.electricity_laptop = fromNumeral(this.data.electricity_laptop)
        toSubmit.electricity_printer = fromNumeral(this.data.electricity_printer)
        toSubmit.electricity_ipad = fromNumeral(this.data.electricity_ipad)
        toSubmit.electricity_radio = fromNumeral(this.data.electricity_radio)
        toSubmit.electricity_camera = fromNumeral(this.data.electricity_camera)
        toSubmit.electricity_nebulizer = fromNumeral(this.data.electricity_nebulizer)
        toSubmit.electricity_ipod = fromNumeral(this.data.electricity_ipod)
        toSubmit.electricity_mp3 = fromNumeral(this.data.electricity_mp3)
        toSubmit.electricity_cellphone = fromNumeral(this.data.electricity_cellphone)
        this.data.electricity_monthly = (
          (fromNumeral(this.data.electricity_fan12) * 120) +
          (fromNumeral(this.data.electricity_fan14) * 145) +
          (fromNumeral(this.data.electricity_fan16) * 190) +
          (fromNumeral(this.data.electricity_laptop) * 80) +
          (fromNumeral(this.data.electricity_printer) * 80) +
          (fromNumeral(this.data.electricity_ipad) * 80) +
          (fromNumeral(this.data.electricity_radio) * 20) +
          (fromNumeral(this.data.electricity_camera) * 20) +
          (fromNumeral(this.data.electricity_nebulizer) * 20) +
          (fromNumeral(this.data.electricity_ipod) * 20) +
          (fromNumeral(this.data.electricity_mp3) * 20) +
          (fromNumeral(this.data.electricity_cellphone) * 12)
        )
        if (toSubmit.electricity_deposit) {
          if (this.data.electricity_installment_half.includes('0')) {
            toSubmit.electricity_cost += (this.data.electricity_monthly / 2)
            toSubmit.electricity_deposit_half = true
            toSubmit.electricity_deposit = false
          } else {
            toSubmit.electricity_cost += this.data.electricity_monthly
          }
        }
        if (toSubmit.electricity_month1) {
          if (this.data.electricity_installment_half.includes('1')) {
            toSubmit.electricity_cost += (this.data.electricity_monthly / 2)
            toSubmit.electricity_month1_half = true
            toSubmit.electricity_month1 = false
          } else {
            toSubmit.electricity_cost += this.data.electricity_monthly
          }
        }
        if (toSubmit.electricity_month2) {
          if (this.data.electricity_installment_half.includes('2')) {
            toSubmit.electricity_cost += (this.data.electricity_monthly / 2)
            toSubmit.electricity_month2_half = true
            toSubmit.electricity_month2 = false
          } else {
            toSubmit.electricity_cost += this.data.electricity_monthly
          }
        }
        if (toSubmit.electricity_month3) {
          if (this.data.electricity_installment_half.includes('3')) {
            toSubmit.electricity_cost += (this.data.electricity_monthly / 2)
            toSubmit.electricity_month3_half = true
            toSubmit.electricity_month3 = false
          } else {
            toSubmit.electricity_cost += this.data.electricity_monthly
          }
        }
        if (toSubmit.electricity_month4) {
          if (this.data.electricity_installment_half.includes('4')) {
            toSubmit.electricity_cost += (this.data.electricity_monthly / 2)
            toSubmit.electricity_month4_half = true
            toSubmit.electricity_month4 = false
          } else {
            toSubmit.electricity_cost += this.data.electricity_monthly
          }
        }
        toSubmit.electricity_underassessed = fromNumeral(this.data.electricity_ua)
        toSubmit.electricity_overassessed = fromNumeral(this.data.electricity_oa)
        toSubmit.electricity_amount = fromNumeral(this.data.electricity_amount)
        toSubmit.electricity_cost = toSubmit.electricity_cost - toSubmit.electricity_overassessed + toSubmit.electricity_underassessed
        toSubmit.electricity_discrepancy = toSubmit.electricity_cost - toSubmit.electricity_amount
      } else {
        toSubmit.lodging_transient = fromNumeral(this.data.transient_cost)
        toSubmit.lodging_cost = toSubmit.lodging_transient * fromNumeral(this.data.transient_days)
        toSubmit.lodging_amount = fromNumeral(this.data.room_amount)
        toSubmit.lodging_discrepancy = toSubmit.lodging_cost - toSubmit.lodging_amount
      }
      toSubmit.recorded_by = this.$auth.user().id
      this.axios.post('payments/', toSubmit).then(
        response => {
          openNotification({
            message: 'Successfully added SOO.',
            type: 'success',
            duration: 4000
          })
          this.data = {}
          toSubmit = {}
          this.$router.push('/billing/soo/add')
        }
      ).catch(
        error => {
          if (error) {
            openNotification({
              message: 'All general data fields are required.',
              type: 'danger',
              duration: 4000
            })
            // logs (error)
          }
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
    min-height: 0.01%;
    overflow-x: auto;
}
</style>
