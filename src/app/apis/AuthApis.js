import axios from 'axios'
import { accessToken, getHeaders, logOut, refreshToken } from '../config/helper'
import apiurl from './apiurl'

export const SignUpAPi = async data => {
  return await axios({
    url: apiurl.signUpUrl,
    method: 'POST',
    data
  })
    .then(response => {
      if (response.data.status == 1) {
        return response.data
      }
    })
    .catch(err => {
      return err.response.data
    })
}
export const SignInAPi = async data => {
  return await axios({
    url: apiurl.signinUrl,
    method: 'POST',
    data
  })
    .then(response => {
      if (response.data.status == 1) {
        return response.data
      }
    })
    .catch(err => {
      return err.response.data
    })
}
export const getUserInfo = async () => {
  return await axios({
    url: apiurl.userurl,
    method: 'GET',
    headers: getHeaders()
  })
    .then(response => {
      if (response.data.status == 1) {
        return response.data
      }
    })
    .catch(async err => {
      if (err.response.status == 401) {
        return await resetToken(async () => {
          return await getUserInfo()
        })
      }
      return err.response.data
    })
}
export const resetToken = async (callBack = async () => {}) => {
  return await axios({
    url: apiurl.reset_token,
    method: 'post',
    headers: getHeaders(),
    data: {
      refreshToken: refreshToken.get()
    }
  })
    .then(async res => {
      accessToken.set(res.data.data.accessToken)
      refreshToken.set(res.data.data.refreshToken)

      return await callBack()
    })
    .catch(err => {
      if (err.response.status === 401) {
        logOut()
        window.location.reload()
      }
      return err.response.data
    })
}
