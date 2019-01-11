import lazyLoading from './lazyLoading'

export default {
  name: 'Billing',
  meta: {
    icon: 'fa-money',
    expanded: false,
    hidden: true
  },

  children: [
    {
      auth: true,
      roles: [1, 2],
      name: 'Add SOO Entry',
      path: '/billing/soo/add',
      meta: {
        label: 'Add SOO Entry',
        link: 'billing/AddSOO.vue'
      },
      component: lazyLoading('billing/AddSOO')
    },
    {
      auth: true,
      roles: [1, 2],
      name: 'View SOO Entries',
      path: '/billing/soo/view',
      meta: {
        label: 'View SOO Entries',
        link: 'billing/ViewSOO.vue'
      },
      component: lazyLoading('billing/ViewSOO')
    }
  ]
}
