import lazyLoading from './lazyLoading'

export default {
  name: 'Profile',
  meta: {
    icon: 'fa-user',
    expanded: false
  },

  children: [
    {
      auth: true,
      roles: [],
      name: 'Student Profile',
      path: '/user/profile/:own',
      meta: {
        label: 'Student Profile',
        link: 'user/StudentProfile.vue'
      },
      component: lazyLoading('user/StudentProfile')
    },
    {
      auth: true,
      roles: [0],
      name: 'Student Profile',
      path: '/user/profile',
      meta: {
        label: 'Student Profile',
        link: 'user/StudentProfile.vue'
      },
      component: lazyLoading('user/StudentProfile')
    },
    {
      auth: true,
      roles: [0],
      name: 'Violations',
      path: '/violations',
      meta: {
        label: 'Violations',
        link: 'inout/Violations.vue'
      },
      component: lazyLoading('inout/Violations')
    },
    {
      auth: true,
      roles: [],
      name: 'Parents Instructions Sheet',
      path: '/user/pis/:own',
      meta: {
        label: 'PIS',
        link: 'user/PIS.vue'
      },
      component: lazyLoading('user/PIS')
    },
    {
      auth: true,
      roles: [],
      name: 'Add Student Profile',
      path: '/user/add/profile',
      meta: {
        label: 'Add Profile',
        link: 'user/ProfileAdd.vue'
      },
      component: lazyLoading('user/ProfileAdd')
    },
    {
      auth: true,
      roles: [],
      name: 'Add Resident Assistant',
      path: '/user/add/assistant',
      meta: {
        label: 'Add Resident Assistant',
        link: 'user/RAAdd.vue'
      },
      component: lazyLoading('user/RAAdd')
    },
    {
      auth: true,
      roles: [],
      name: 'Add Staff',
      path: '/user/add/staff',
      meta: {
        label: 'Add Staff',
        link: 'user/StaffAdd.vue'
      },
      component: lazyLoading('user/StaffAdd')
    },
    {
      auth: true,
      roles: [],
      name: 'Add Instructions',
      path: '/user/add/instruction/:upid',
      meta: {
        label: 'Add Instruction',
        link: 'user/PISAdd.vue'
      },
      component: lazyLoading('user/PISAdd')
    },
    {
      auth: true,
      roles: [],
      name: 'Edit RA',
      path: '/user/edit/assistant/:upid',
      meta: {
        label: 'Edit RA',
        link: 'user/RAEdit.vue'
      },
      component: lazyLoading('user/RAEdit')
    },
    {
      auth: true,
      roles: [],
      name: 'Edit Staff',
      path: '/user/edit/staff/:krhid',
      meta: {
        label: 'Edit Staff',
        link: 'user/StaffEdit.vue'
      },
      component: lazyLoading('user/StaffEdit')
    }
  ]
}
