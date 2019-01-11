import lazyLoading from './lazyLoading'

export default {
  name: 'In/Out Records',
  meta: {
    icon: 'fa-book',
    expanded: false
  },

  children: [
    {
      auth: true,
      roles: [0],
      name: 'Records',
      path: '/inout',
      meta: {
        label: 'Records',
        link: 'inout/InOutRecord.vue'
      },
      component: lazyLoading('inout/InOutRecord')
    },
    {
      auth: true,
      roles: [1, 2],
      name: 'Records',
      path: '/databases/signinout',
      meta: {
        label: 'Records',
        link: 'databases/SignInOut.vue'
      },
      component: lazyLoading('databases/SignInOut')
    }
  ]
}
