import axios from 'axios'

export default function setup () {
    axios.interceptors.request.use(config => {
        const userStorage = JSON.parse(localStorage.getItem('user'))
        config.headers.token = userStorage ? userStorage.token : null
    return config
  }, err => {
    return Promise.reject(err)
  })

  axios.interceptors.response.use(response => {
    return response
  }, error => {
    if (error && error.response) {
        if ([401, 403].includes(error.response.status)) {
            localStorage.removeItem('user')
            window.location.href = '/'
        }
    }

    throw error
  })
}
