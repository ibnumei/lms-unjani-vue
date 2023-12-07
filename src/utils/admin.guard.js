const _ = require('lodash');
export default (to, from, next) => {
  const user = localStorage.getItem('user');
  const type = _.get(JSON.parse(user), 'type');

  console.log(user, type)

  if (type === 'ADMIN') {
    next()
  } else {
    localStorage.removeItem('user');
    next('/user/login')
  }
}