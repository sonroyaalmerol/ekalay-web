import lazyLoading from './lazyLoading'

export default {
  name: 'Key Borrowing',
  meta: {
    icon: 'fa-key',
    expanded: false
  },

  children: [
    {
      auth: true,
      roles: [1, 2],
      name: 'Database',
      path: '/keys/database',
      meta: {
        label: 'Database',
        link: 'keys/Database.vue'
      },
      component: lazyLoading('keys/Database')
    }
  ]
}
