import axios from 'axios'
import moment from 'moment'
import { apiBackend } from '@/constants/config'
// import { store } from '@/store/index'
import _ from 'lodash'

const NOTIFY_TYPE_WARNING = 'warning filled'
const NOTIFY_TYPE_SUCCESS = 'success filled'
const NOTIFY_TYPE_ERROR = 'error filled'

export default {
  collectValidate (refs, progress = false) {
    let messages = []
    refs.forEach(ref => {
      if (ref.validate) {
        messages = messages.concat(ref.validate(progress))
      }
    })
    return messages
  },
  _redBorder (children = [], action = 'remove') {
    if (children.length > 0 && children[0].$children.length > 0) {
      this._redBorder(children[0].$children, action)
    } else if (children[0].$el.classList) {
      if (action === 'add') {
        children[0].$el.classList.add('red-border')
      } else {
        children[0].$el.classList.remove('red-border')
      }
    }
  },
  validateWithLabel (refs, progress = false) {
    const labels = []
    refs.forEach(ref => {
      if (ref.ref && ref.ref.validate) {
        const valid = ref.ref.validate()
        if (progress) {
          labels.push(valid)
        }
        if (!valid && !progress) {
          labels.push(ref.desc)
          this._redBorder(ref.ref.$children, 'add')
        } else {
          this._redBorder(ref.ref.$children, 'remove')
        }
      }
    })

    return labels
  },
  validate (refs) {
    let allValid = true
    for (const idx in refs) {
      if (refs[idx] && refs[idx].validate) {
        const valid = refs[idx].validate()
        allValid = allValid && valid
      }
    }
    return allValid
  },
  inactive (refs, disabled) {
    for (const idx in refs) {
      refs[idx].inactive(disabled)
    }
  },
  clearError (refs) {
    for (const idx in refs) {
      refs[idx].clearError()
    }
  },
  visibel (refs, visibelity) {
    for (const idx in refs) {
      refs[idx].visibel(visibelity)
    }
  },
  slideSuccess (self, title, message) {
    self.$notify(title, message, NOTIFY_TYPE_SUCCESS, { duration: 2000, permanent: false })
  },
  slideWarning (self, title, message) {
    self.$notify(title, message, NOTIFY_TYPE_WARNING, { duration: 3000, permanent: false })
  },
  slideError (self, title, message) {
    self.$notify(title, message, NOTIFY_TYPE_ERROR, { duration: 4000, permanent: false })
  },
  confirmSuccess (self, title, text, confirmText, cancelText) {
    return self.$swal({
      title,
      text,
      type: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmText,
      cancelButtonText: cancelText
    })
  },
  confirmError (self, title, text, confirmText, cancelText) {
    return self.$swal({
      title,
      text,
      type: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmText,
      cancelButtonText: cancelText
    })
  },
  confirmWarning (self, title, text, confirmText, cancelText) {
    return self.$swal({
      title,
      text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmText,
      cancelButtonText: cancelText
    })
  },
  confirmWarningNoOutClick (self, title, text, confirmText, cancelText, allowOutsideClick) {
    return self.$swal({
      title,
      text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      allowOutsideClick
    })
  },
  popupInput (self, title, type, confirmText, cancelText, required, value = null, text = null) {
    return self.$swal({
      title,
      text,
      input: type,
      inputValue: value,
      inputAttributes: {
        id: 'uiTxtSwalInput'
      },
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      inputValidator: (inputValue) => {
        if (!inputValue && required) {
          return title + ' Wajib diisi !'
        }
      }
    })
  },
  popupMultipeMessage (messages, pointer = false) {
    let combineMsg = ''
    messages.forEach(message => {
      combineMsg += `</br>${pointer ? '- ' : ''}${message}`
    })
    return combineMsg
  },
  popupSuccess (self, title, message) {
    return self.$swal(title, message, 'success')
  },
  popupError (self, title, message) {
    return self.$swal(title, message, 'error')
  },
  popupWarning (self, title, message) {
    return self.$swal(title, message, 'warning')
  },
  formatMoney (number, pminimumFractionDigits = 2) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: pminimumFractionDigits,
      maximumFractionDigits: pminimumFractionDigits
    })
    const formatted = formatter.format(number)
    const money = formatted.replace('$', '')
    return (money === '-0.00') ? '0.00' : money
  },
  formatIdrCurrency (number, pminimumFractionDigits = 2) {
    return 'Rp ' + this.formatMoney(number, pminimumFractionDigits)
  },
  formatPercentage (number, pminimumFractionDigits = 2) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: pminimumFractionDigits,
      maximumFractionDigits: pminimumFractionDigits
    })
    const formatted = formatter.format(number)
    return formatted.replace('$', '')
  },
  formatDate (date) {
    if (!date) {
      return date
    }

    return moment(date).format('DD-MMM-YYYY')
  },
  formatDatePattern (date, pattern) {
    if (!date) {
      return date
    }

    return moment(date).format(pattern)
  },
  lostFocus (parent, ref) {
    var pointer = parent
    setTimeout(function () { // tehnik untuk lost focuspar
      pointer.$refs[ref].focus()
    }, 1)
  },
  empty (value) {
    return (value === null || value === undefined || value === '')
  },
  empties (values) {
    let empty = true
    for (const v of values) {
      empty = empty && !this.empty(v)
    }
    return !empty
  },
  async get (url) {
    const result = await axios.get(apiBackend + url)
    return result.data
  },
  async post (url, body) {
    const result = await axios.post(apiBackend + url, body)
    return result.data
  },
  async deleteById (url, host = apiBackend) {
    const result = await axios.delete(host + url)
    return result.data
  },
  async getHost (host, url, options) {
    if (options) {
      const result = await axios.get(host + url, options)
      return result.data
    } else {
      const result = await axios.get(host + url)
      return result.data
    }
  },
  async postHost (host, url, body, options) {
    if (options) {
      const result = await axios.post(host + url, body, options)
      return result.data
    } else {
      const result = await axios.post(host + url, body)
      return result.data
    }
  },
  async upload (url, body, files) {
    const formData = this.arrangeData(body, files)
    const result = await axios.post(apiBackend + url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return result.data
  },
  async uploadStorage (url, body, files) {
    const formData = this.arrangeData(body, files)
    const result = await axios.post(apiAddressMsStorage + url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return result.data
  },
  arrangeData (body, files) {
    const formData = new FormData()
    Object.keys(body).forEach(e => {
      if (e) {
        if (body[e]) {
          formData.append(e, body[e])
          if (files && files.includes(e)) {
            formData.append(e + 'Name', body[e].name)
            formData.append(e + 'Size', body[e].size)
            formData.append(e + 'Type', body[e].type)
            formData.append(e + 'LastModified', body[e].lastModified)
            formData.append(e + 'LastModifiedDate', body[e].lastModifiedDate)
          }
        }
      }
    })
    return formData
  },
  async bulkUpload (url, body, files, tag, host = apiBackend) {
    const formData = new FormData()
    Object.keys(body).forEach(e => {
      if (e) {
        if (body[e] && files && !files.includes(e)) {
          formData.append(e, body[e])
        } else if (body[e] && files && files.includes(e) && (body[e].length > 0)) {
          body[e].forEach(x => {
            formData.append(tag, x)
          })
        }
      }
    })
    const result = await axios.post(host + url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return result.data
  },
  async download (fileId, url = '/download/appFile/', queryparams = '') {
    const res = await axios({
      url: apiAddressMsStorage + url + fileId + queryparams,
      method: 'GET',
      responseType: 'blob'
    })

    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(new Blob([res.data]))

    const headerData = res.headers['content-disposition'].split('=')
    link.setAttribute('download', headerData[1])
    document.body.appendChild(link)

    link.click()
  },
  previewFile (fileId, host = apiBackend, url = '/paging/downloadFile/', config = { responseType: 'blob' }) {
    return axios.get(`${host}${url}${fileId}`, config)
  },
  async downloadHost (host, url, method = 'GET', data = {}) {
    const res = await axios({
      url: host + url,
      method,
      responseType: 'blob',
      data
    })

    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(new Blob([res.data]))

    const headerData = res.headers['content-disposition'].split('=')
    link.setAttribute('download', headerData[1])
    document.body.appendChild(link)

    link.click()
  },
  async forEach (array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  },
  // mengatur posisi pointer untuk e-money
  pointer (event) {
    let value = event.target.value
    const index = value.indexOf('.') // ambil index dari karakter .
    const start = event.target.selectionStart // posisi awal pointer
    if (event.type !== 'click' && start === 0) {
      event.target.setSelectionRange(index, index)
    } else if (Number(value) <= 0.00) { // cek value <= 0.00
      // posisikan pointer dibelakang digit pertama
      event.target.setSelectionRange(1, 1)
    } else if (start > index) {
      // jika posisi awal pointer ketika di klik > dari index '.'
      // maka tempatkan pointer di belakang titik
      event.target.setSelectionRange(index, index)
    }
  },
  keyPressTab (event) {
    // check when user press TAB and then set pointer
    if (event && event.which === 9) {
      // this.pointer(event)
    }
    // end
  },
  // menentukan posisi pointer jika pengguna menekan tombol '.'
  keyPress (event) {
    // cek ascii code dari '.' yaitu 46
    if (event && (event.keyCode === 46 || event.which === 46)) {
      const startPoint = event.target.selectionStart
      const endPoint = event.target.selectionEnd
      // check selection start and end harus sama
      if (startPoint === endPoint) {
        const value = event.target.value
        let index = value.indexOf('.') // ambil index dari karakter '.'
        if (index === startPoint) {
          index += 1 // tambah satu point agar untuk memposisikan pointer 1 digit di belakang '.'
          event.target.setSelectionRange(index, index)
        }
      }
    }
  },
  checkNumberValue (value) {
    // check number value, if equals null or undefined or '' then return null else return Number of value
    if (value === null || value === undefined || value === '') {
      return null
    }
    return Number(value)
  },
  filled (value) {
    if (value === null || value === undefined || value === '') {
      return false
    }
    return true
  },
  pushRouter (router, name = '', params = {}, callback = () => null) {
    router.push({ name, params })
    callback()
  },
  emptyObject (obj) {
    if (obj) { // jika object memiliki nilai / {} / [] / string
      if (Object.entries(obj).length > 0) { // parse ke array dan cek panjang arraynya
        return false // jika > 0 maka object memiliki nilai
      }
      return true // jika 0 maka kosong
    } else {
      return true
    }
  },
  back (self, history = 1) {
    self.$router.go(-history)
  },
  inArray (data, array) {
    return array.includes(data)
  },
//   hasRole (role) {
//     const user = store.getters.currentUser
//     if (user) {
//       return user.role === role
//     } else {
//       return false
//     }
//   },
  /* ----- START ARITHMATIC FUNCTION ----- */
  toNumber (value) {
    if (Object.prototype.toString.call(value) === '[object String]') {
      return Number(value)
    } else {
      return value
    }
  },
  add (...values) {
    let total = 0
    for (const val of values) {
      total += this.toNumber(val)
    }
    return total
  },
  subtract (...values) {
    let total = null
    for (const val of values) {
      if (total === null) {
        total = val
      } else { total -= this.toNumber(val) }
    }
    return total
  },
  multiply (...values) {
    let total = null
    for (const val of values) {
      if (total === null) {
        total = val
      } else { total *= this.toNumber(val) }
    }
    return total
  },
  divide (...values) {
    let total = null
    for (const val of values) {
      if (total === null) {
        total = val
      } else { total /= this.toNumber(val) }
    }
    return total
  },
  exponent (...values) {
    let total = null
    for (const val of values) {
      if (total === null) {
        total = val
      } else { total **= this.toNumber(val) }
    }
    return total
  },
  modulus (...values) {
    let total = null
    for (const val of values) {
      if (total === null) {
        total = val
      } else { total %= this.toNumber(val) }
    }
    return total
  },
  /* -----  MATH LOGIC ----- */
  isGreater (num1, num2) {
    if (!num1 || !num2) {
      return null
    }
    return this.toNumber(num1) > this.toNumber(num2)
  },
  isGreaterEqual (num1, num2) {
    if (!num1 || !num2) {
      return null
    }
    return this.toNumber(num1) >= this.toNumber(num2)
  },
  /* -----  DATE LOGIC ----- */
  addYear (fromDate, year) {
    if (!fromDate || !year) {
      return fromDate
    }
    const yearAdd = this.toNumber(year)
    fromDate.setYear(fromDate.getFullYear() + yearAdd)
    return fromDate
  },
  addMonth (fromDate, month) {
    if (!fromDate || !month) {
      return fromDate
    }
    const monthAdd = this.toNumber(month)
    fromDate.setMonth(fromDate.getMonth() + monthAdd)
    return fromDate
  },
  addDay (fromDate, day) {
    if (!fromDate || !day) {
      return fromDate
    }
    const dayAdd = this.toNumber(day)
    fromDate.setDate(fromDate.getDate() + dayAdd)
    return fromDate
  },
  /* ----- START OBJECT FUNCTION ----- */
  pick (object, func) {
    return func(object)
  },
  /* ----- START LOCAL STORAGE FUNCTION ----- */
  localStorage (value) {
    const key = 'client_page_param'
    if (value) { localStorage[key] = JSON.stringify(value) }
    return JSON.parse(localStorage[key])
  },
//   parsingLookup (group, key) {
//     if (group && key) {
//       const lookup = store.getters.getLookupData(group)
//       return (lookup) ? lookup.find((x) => x['key'] === key).description : null
//     } else { return null }
//   },
  async getMaintenanceComment (entityKey, entityName) {
    try {
      const result = await this.get(`/management/getLatestComment/${entityKey}/${entityName}`)
      if (result.success) {
        return result.message
      } else return ''
    } catch (e) {
      return ''
    }
  },
  linkTo (href = '#') {
    const anchor = document.createElement('a')
    anchor.href = href
    anchor.click()
  },
  formatFileName (fileName) {
    return fileName.replace(/[^a-zA-Z0-9.]+/g, ' ')
  },
  generateCounterLookup (preText = '', max = 20) {
    const options = [{ value: null, text: 'Silahkan pilih...' }]
    for (let index = 0; index <= max; index++) {
      const desc = index === 0 ? preText : `${preText} ${index}`
      options.push({ value: desc, text: desc })
    }
    return options
  },
  isValidDate (dateParam) {
    if (!dateParam) {
      return false
    }
    const date = new Date(dateParam)
    return date instanceof Date && !Number.isNaN(date.getTime())
  },
  daysDifference (firstDate, secondDate) {
    if (!firstDate || !secondDate) {
      return 0
    }
    const hour = 24
    const minutes = 60
    const seconds = 60
    const milliseconds = 1000
    const oneDay = hour * minutes * seconds * milliseconds
    const newFirstDate = new Date(firstDate)
    const newSecondDate = new Date(secondDate)

    return Math.round(Math.abs((newFirstDate - newSecondDate) / oneDay))
  },
  copyValue (object) {
    if (object === undefined) {
      return object
    }
    return JSON.parse(JSON.stringify(object))
  },
  currencyToNumber (value) {
    if (!value) {
      return 0
    }

    value.split(',').join('')
    return Number(value.replace(/[^0-9.]/g, ''))
  },
  validateWithProgress (refs) {
    let progress = 0
    let total = 0
    let labels = []
    refs.forEach(ref => {
      if (ref.ref && ref.ref.validate) {
        const valid = ref.ref.validate()
        if (typeof valid === 'object' && valid.progress && valid.total && valid.labels) {
          progress += valid.progress
          total += valid.total
          labels = [...labels, ...valid.labels]
          return
        }
        if (typeof valid === 'boolean' && valid) {
          progress += 1
        }
        if (!valid) {
          this._redBorder(ref.ref.$children, 'add')
        } else {
          this._redBorder(ref.ref.$children, 'remove')
        }
        labels.push({ valid, desc: ref.desc })
        total += 1
      }
    })

    return { progress, total, labels }
  },
  flattenRefs (indexRef) {
    const collectedRefs = {}
    this._recursiveMap(indexRef, collectedRefs)
    return collectedRefs
  },
  _recursiveMap (indexRef, collectedRefs = {}) {
    Object.keys(indexRef).forEach(ref => {
      if (_.isPlainObject(indexRef[ref].$refs) && Object.keys(indexRef[ref].$refs).length > 0) {
        this._recursiveMap(indexRef[ref].$refs, collectedRefs)
      }
      if (!_.isPlainObject(indexRef[ref].$refs) || Object.keys(indexRef[ref].$refs).length < 1) {
        collectedRefs[ref] = indexRef[ref]
      }
    })
  },
  mathRandom () {
    const winCrypto = window.crypto || window.msCrypto
    const arrCrypto = new Uint32Array(1)
    return winCrypto.getRandomValues(arrCrypto)[0]
  },
  monthDiff (d1, d2) {
    const firstDate = moment(new Date(d1))
    const secondDate = moment(new Date(d2))

    return secondDate.diff(firstDate, 'months')
  },
  getCurrentVersion () {
    return (version.split('-')[0]).replace(/\./g, '')
  },
  async updateAppidVersion (dataId) {
    const newVersion = this.getCurrentVersion()
    try {
      const body = {
        dataId,
        version: newVersion
      }
      await axios.post(`${apiAddressRAC}/appid-version`, body)
    } catch (error) {
      console.error(error)
    }
    return newVersion
  },
  isFreeTextOrDropdown (value, match, disabled) {
    const isFreeText = value && !match && disabled
    const isDropdown = !value || (value && match) || (value && !match && !disabled)
    if (isFreeText) {
      return true
    }
    if (isDropdown) {
      return false
    }
  },
  convertLocalDateFormat (date, format, locale = 'id') {
    return moment(date).locale(locale).format(format)
  },
  getObjectValueCaseInsensitive (object, key) {
    return object[Object.keys(object).find(objectKey => objectKey.toLowerCase() === key.toLowerCase())]
  }
}
