import lazyLoading from './lazyLoading'

export default {
  name: 'Databases',
  meta: {
    icon: 'fa-table',
    expanded: false,
    hidden: true
  },

  children: [
    {
      auth: true,
      roles: [1, 2],
      name: 'Users Database',
      path: '/databases/users',
      meta: {
        label: 'Users Database',
        link: 'databases/Users.vue'
      },
      component: lazyLoading('databases/Users')
    },
    {
      auth: true,
      roles: [1, 2],
      name: 'Violations',
      path: '/databases/violations',
      meta: {
        label: 'Violations',
        link: 'databases/Violations.vue'
      },
      component: lazyLoading('databases/Violations')
    },
    {
      auth: true,
      roles: [1, 2],
      name: 'RA Database',
      path: '/databases/assistants',
      meta: {
        label: 'RA Database',
        link: 'databases/RAs.vue'
      },
      component: lazyLoading('databases/RAs')
    },
    {
      auth: true,
      roles: [1, 2],
      name: 'Staff Database',
      path: '/databases/staffs',
      meta: {
        label: 'Staff Database',
        link: 'databases/Staffs.vue'
      },
      component: lazyLoading('databases/Staffs')
    },
    {
      auth: true,
      roles: [1, 2],
      name: 'Permits Database',
      path: '/databases/permits',
      meta: {
        label: 'Permits Database',
        link: 'databases/Permits.vue'
      },
      component: lazyLoading('databases/Permits')
    },
    {
      auth: true,
      roles: [1, 2],
      name: 'Accountabilities',
      path: '/databases/accountabilities',
      meta: {
        label: 'Accountabilities',
        link: 'databases/Accountabilities.vue'
      },
      component: lazyLoading('databases/Accountabilities')
    }
  ]
}
