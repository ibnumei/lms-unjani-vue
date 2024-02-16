import { isAuthGuardActive } from '../constants/config'
import { setCurrentUser, getCurrentUser } from '.'
import jwtDecode from 'vue-jwt-decode'
import user from '../store/modules/user'

export default (to, from, next) => {
  if (to.matched.some(record => record.meta.loginRequired)) {
    if (isAuthGuardActive) {
      const user = getCurrentUser();
      if (user) {
        const roleArrayHierarchic = to.matched.filter(x => x.meta.roles).map(x => x.meta.roles);
        if (roleArrayHierarchic.every(x => x.includes(user.role))) {
          next();
        } else {
          next('/unauthorized')
        }
      } else {
        setCurrentUser(null);
        next('/user/login')
      }
    } else {
      next();
    }
  } else {
    if (localStorage.user) {
      const jwtPayload = jwtDecode.decode(JSON.parse(localStorage.user).token);

      if (jwtPayload.exp < Date.now() / 1000) {
        localStorage.removeItem('user')
        user.state.currentUser = null

        return next('/')
      }
    }
    return next()
  }
}
