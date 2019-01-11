<template>
  <div>
    <div v-if="$auth.user().profile.role == 1 || $auth.user().profile.role == 2" class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">{{ total_on }}</p>
          <p v-if="$auth.user().profile.role == 1 || $auth.user().profile.role == 2" class="subtitle">Total overnight permits to be processed</p>
          <p v-else class="subtitle">Total overnight permits filed</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">{{ total_ln }}</p>
          <p v-if="$auth.user().profile.role == 1 || $auth.user().profile.role == 2" class="subtitle">Total late night permits to be processed</p>
          <p v-else class="subtitle">Total late night permits filed</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">{{ total_em }}</p>
          <p v-if="$auth.user().profile.role == 1 || $auth.user().profile.role == 2" class="subtitle">Total early morning permits to be processed</p>
          <p v-else class="subtitle">Total early morning permits filed</p>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-vertical is-12">
        <div class="tile">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">Overnight Permits</p>
              <p class="subtitle">Most recent permits</p>
              <div class="content">
                <ul v-if="$auth.user().profile.role == 1 || $auth.user().profile.role == 2">
                  <li v-for="permit in overn"><i v-if="permit.approved_dm" class="fa fa-check" aria-hidden="true"></i><i v-else-if="!permit.approved_dm && permit.approved_dm !== null" class="fa fa-times" aria-hidden="true"></i><i v-else class="fa fa-minus" aria-hidden="true"></i>&emsp;
                    [{{ permit.upid }}] {{ permit.location }} | {{ permit.reason }}
                  </li>
                </ul>
                <ul v-else>
                  <li v-for="permit in overn"><i v-if="permit.approved_dm" class="fa fa-check" aria-hidden="true"></i><i v-else-if="!permit.approved_dm && permit.approved_dm !== null" class="fa fa-times" aria-hidden="true"></i><i v-else class="fa fa-minus" aria-hidden="true"></i>&emsp;
                    <font v-if="permit.approved_dm" color="green">{{ permit.location }} | {{ permit.reason }}</font>
                    <font v-else-if="!permit.approved_dm && permit.approved_dm !== null" color="red">{{ permit.location }} | {{ permit.reason }}</font>
                    <font v-else>{{ permit.location }} | {{ permit.reason }}</font>
                  </li>
                </ul>
              </div>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">Late Night Permits</p>
              <p class="subtitle">Most recent permits</p>
              <div class="content">
                  <ul v-if="$auth.user().profile.role == 1 || $auth.user().profile.role == 2">
                    <li v-for="permit in laten"><i v-if="permit.approved_dm" class="fa fa-check" aria-hidden="true"></i><i v-else-if="!permit.approved_dm && permit.approved_dm !== null" class="fa fa-times" aria-hidden="true"></i><i v-else class="fa fa-minus" aria-hidden="true"></i>&emsp;
                      [{{ permit.upid }}] {{ permit.location }} | {{ permit.reason }}
                    </li>
                  </ul>
                  <ul v-else>
                    <li v-for="permit in laten"><i v-if="permit.approved_dm" class="fa fa-check" aria-hidden="true"></i><i v-else-if="!permit.approved_dm && permit.approved_dm !== null" class="fa fa-times" aria-hidden="true"></i><i v-else class="fa fa-minus" aria-hidden="true"></i>&emsp;
                      <font v-if="permit.approved_dm" color="green">{{ permit.location }} | {{ permit.reason }}</font>
                      <font v-else-if="!permit.approved_dm && permit.approved_dm !== null" color="red">{{ permit.location }} | {{ permit.reason }}</font>
                      <font v-else>{{ permit.location }} | {{ permit.reason }}</font>
                    </li>
                  </ul>
              </div>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">Early Morning Permits</p>
              <p class="subtitle">Most recent permits</p>
              <div class="content">
                  <ul v-if="$auth.user().profile.role == 1 || $auth.user().profile.role == 2">
                    <li v-for="permit in earlym"><i v-if="permit.approved_dm" class="fa fa-check" aria-hidden="true"></i><i v-else-if="!permit.approved_dm && permit.approved_dm !== null" class="fa fa-times" aria-hidden="true"></i><i v-else class="fa fa-minus" aria-hidden="true"></i>&emsp;
                      [{{ permit.upid }}] {{ permit.location }} | {{ permit.reason }}
                    </li>
                  </ul>
                  <ul v-else>
                    <li v-for="permit in earlym"><i v-if="permit.approved_dm" class="fa fa-check" aria-hidden="true"></i><i v-else-if="!permit.approved_dm && permit.approved_dm !== null" class="fa fa-times" aria-hidden="true"></i><i v-else class="fa fa-minus" aria-hidden="true"></i>&emsp;
                      <font v-if="permit.approved_dm" color="green">{{ permit.location }} | {{ permit.reason }}</font>
                      <font v-else-if="!permit.approved_dm && permit.approved_dm !== null" color="red">{{ permit.location }} | {{ permit.reason }}</font>
                      <font v-else>{{ permit.location }} | {{ permit.reason }}</font>
                    </li>
                  </ul>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!($auth.user().profile.role == 1 || $auth.user().profile.role == 2)" class="tile is-ancestor">
      <div class="tile is-vertical is-12">
        <div class="tile">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">Accountabilities</p>
              <p class="subtitle">To be settled at the RA Office</p>
              <div class="content">
                <ul>
                  <li v-if="!returnedkey"><font color="red">Key Borrowed (Return ASAP)</font></li>
                  <li v-for="record in accountabilities"><font v-if="record.cleared" color="green">{{ record.reason }} [Cleared on: {{ record.clearedon }} | by: {{ record.clearedby }}]</font><font v-else color="red">{{ record.reason }}</font></li>
                </ul>
              </div>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">Violations</p>
              <p class="subtitle">Most recent recorded violations</p>
              <div class="content">
                <ul>
                  <li v-for="record in violations"><font v-if="record.ismajor" color="red">{{ record.details | record.timestamp }}</font><font v-else color="orange">{{ record.details | record.timestamp }}</font></li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'vue-bulma-chartjs'

export default {
  components: {
    Chart
  },

  created () {
    this.axios.get('permits/').then(
      response => {
        var test = response.data
        for (var i = 0; i < test.length; i++) {
          if (test[i].permit_type === 0) {
            if (this.overn.length < 5) {
              this.overn.push(test[i])
            }
            this.total_on++
          } else if (test[i].permit_type === 1) {
            if (this.laten.length < 5) {
              this.laten.push(test[i])
            }
            this.total_ln++
          } else if (test[i].permit_type === 2) {
            if (this.earlym.length < 5) {
              this.earlym.push(test[i])
            }
            this.total_em++
          }
        }
        // logs (test)
      }
    )
    this.axios.get('violations/').then(
      response => {
        this.violations = response.data
        // logs (test)
      }
    )
    this.axios.get('accountabilities/').then(
      response => {
        this.accountabilities = response.data
      }
    )
    if (this.$auth.user().profile.role === 0) {
      this.axios.get('residents/' + this.$auth.user().profile.upid).then(
        response => {
          this.returnedkey = response.data.returnedkey
        }
      )
    }
  },

  data () {
    return {
      overn: [],
      laten: [],
      earlym: [],
      total_on: 0,
      total_em: 0,
      total_ln: 0,
      accountabilities: [],
      violations: [],
      returnedkey: true
    }
  },

  computed: {
    chartData () {
      return {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          data: [0, 1, 0],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ]
        }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
li {padding: 0; list-style-type: none;}
</style>
