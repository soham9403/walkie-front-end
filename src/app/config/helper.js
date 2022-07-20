// import language from '../language/language'
// import constants from './constants'

// export const _lang = (value, lang = 'english') => {
//   return language(value, lang)
// }

// export const userId = {
//   set: val => {
//     localStorage.setItem('wehear_user', val)
//   },
//   get: () => {
//     return localStorage.getItem('wehear_user')
//   },
//   remove: () => {
//     localStorage.removeItem('wehear_user')
//   }
// }

export const accessToken = {
  set: val => {
    localStorage.setItem('wehear_walkie_talkie_access_token', val)
  },
  get: () => {
    return localStorage.getItem('wehear_walkie_talkie_access_token')
  },
  remove: () => {
    localStorage.removeItem('wehear_walkie_talkie_access_token')
  }
}

export const refreshToken = {
  set: val => {
    localStorage.setItem('wehear_walkie_talkie_refresh_token', val)
  },
  get: () => {
    return localStorage.getItem('wehear_walkie_talkie_refresh_token')
  },
  remove: () => {
    localStorage.removeItem('wehear_walkie_talkie_refresh_token')
  }
}

export const getHeaders = () => {
  return {
    Authorization: `Bearer ${accessToken.get()}`
  }
}
export const logOut = () => {
  refreshToken.remove()
  accessToken.remove()
  
}

export const isEmail = val => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val.trim())
}
export const isValidGST = gstinVal => {
  //   var reggst = new RegExp('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]1}[1-9A-Z]{1}Z[0-9A-Z]{1}$');
  //   if (!reggst.test(gstinVal) && gstinVal != "") {
  //     return false;
  //   } else {
  //     return true;
  //   }
  return true
}
export const isAllowedPhone = val => {
  return !isNaN(val) && val.length <= 10
}

export function getKeyByValue (object, value) {
  return Object.keys(object).find(
    key => object[key].toString() === value.toString()
  )
}
export const getObjectBykey = (key = '', value = '', arr = []) => {
  for (let row of arr) {
    if (row[key] && row[key] == value) {
      return row
    }
  }
  return ''
}

export const dateToDDMMYYYY = date => {
  const dateObj = new Date(date)

  return (
    addZeroPrefix(dateObj.getDate()) +
    '-' +
    addZeroPrefix(dateObj.getMonth() + 1) +
    '-' +
    addZeroPrefix(dateObj.getFullYear())
  )
}
export const addZeroPrefix = (val, length = 2) => {
  let strVal = val.toString()
  while (strVal.length < length) {
    strVal = '0' + strVal
  }
  return strVal
}

