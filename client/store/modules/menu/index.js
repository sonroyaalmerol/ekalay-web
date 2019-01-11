import * as types from '../../mutation-types'
import lazyLoading from './lazyLoading'
// import charts from './charts'
// import uifeatures from './uifeatures'
import databases from './databases'
import permits from './permits'
import profile from './profile'
import inout from './inout'
import keys from './keys'

// show: meta.label -> name
// name: component name
// meta.label: display label

const state = {
  items: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      meta: {
        auth: true,
        icon: 'fa-tachometer',
        link: 'dashboard/index.vue'
      },
      component: lazyLoading('dashboard', true)
    },
    profile,
    permits,
    inout,
    databases,
    keys
  ]
}

const mutations = {
  [types.EXPAND_MENU] (state, menuItem) {
    if (menuItem.index > -1) {
      if (state.items[menuItem.index] && state.items[menuItem.index].meta) {
        state.items[menuItem.index].meta.expanded = menuItem.expanded
      }
    } else if (menuItem.item && 'expanded' in menuItem.item.meta) {
      menuItem.item.meta.expanded = menuItem.expanded
    }
  }
}

export default {
  state,
  mutations
}
