import lazyLoading from './lazyLoading'

export default {
  name: 'Permits',
  meta: {
    icon: 'fa-edit',
    expanded: false
  },

  children: [
    {
      auth: true,
      roles: [0],
      name: 'Apply Permits',
      path: '/permits/apply',
      meta: {
        label: 'Apply Permits',
        link: 'permits/ApplyPermits.vue'
      },
      component: lazyLoading('permits/ApplyPermits')
    },
    {
      auth: true,
      roles: [1],
      name: 'Apply Permits (Residents)',
      path: '/permits/apply',
      meta: {
        label: 'Apply Permits (Residents)',
        link: 'permits/ApplyPermits.vue'
      },
      component: lazyLoading('permits/ApplyPermits')
    },
    {
      auth: true,
      roles: [1, 2],
      name: 'Approve Permits',
      path: '/permits/approve',
      meta: {
        label: 'Approve Permits',
        link: 'permits/ApprovePermits.vue'
      },
      component: lazyLoading('permits/ApprovePermits')
    },
    {
      auth: true,
      roles: [0],
      name: 'View Permits',
      path: '/permits/view',
      meta: {
        label: 'View Permits',
        link: 'permits/ViewPermits.vue'
      },
      component: lazyLoading('permits/ViewPermits')
    },
    {
      auth: true,
      roles: [1, 2],
      name: 'Approved Permits',
      path: '/permits/view/approved',
      meta: {
        label: 'Approved Permits',
        link: 'permits/ApprovedPermits.vue'
      },
      component: lazyLoading('permits/ApprovedPermits')
    }
  ]
}
