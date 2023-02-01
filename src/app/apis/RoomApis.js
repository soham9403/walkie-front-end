import axios from 'axios'
import { accessToken, getHeaders, logOut, refreshToken } from '../config/helper'
import apiurl from './apiurl'
import { resetToken } from './AuthApis'

export const fetchRoomInfoApi = async (data) => {
    return await axios({
      url: apiurl.roomInfo,
      method: 'GET',
      headers: getHeaders(),
      params:data
    })
      .then(response => {
        if (response.data.status === 1) {
          return response.data
        }
      })
      .catch(async err => {
        if (err.response.status === 401) {
          return await resetToken(async () => {
            return await fetchRoomInfoApi()
          })
        }
        return err.response.data
      })
  }