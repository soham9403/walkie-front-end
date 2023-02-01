
import './App.css'
import { io } from 'socket.io-client'
import { memo, useEffect, useState } from 'react'

import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import SignUpController from './app/controllers/SignUpController'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import apiurl from './app/apis/apiurl'
import DashBoardController from './app/controllers/DashBoardController'
import { useLayoutEffect } from 'react'
import { accessToken } from './app/config/helper'
import {
  signInAction,
  signOutAction
} from './app/store/actions/userReducerAction'
import { getUserInfo } from './app/apis/AuthApis'
import SignInController from './app/controllers/SignInController'

export const socket = io(apiurl.rootUrl)

function App () {
  const { user } = useSelector(state => state)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [socektConnected, setSocketConnected] = useState(false)

  const joinAllRoom = () => {
    if (user.data.rooms.length > 0) {
      socket.emit('join_rooms', {
        rooms: user.data.rooms.map(item => {
          return item._id
        })
      },(response)=>{
        if(response.status===0){
          alert(response.message)
        }
      })
    }
  }
  useEffect(() => {
    if (user.isLoggedIn) {
      if (socket.connected) {
        setSocketConnected(true)
      }
      socket.on('connect', (...args) => {
        setSocketConnected(true)

        socket.emit(
          'user_online',
          JSON.stringify({
            id: user.data._id,
            name: user.data.name,
            usercode: user.data.usercode
          })
        )
      })

      socket.on('disconnect', () => {
        setSocketConnected(false)
      })
      return () => {
        socket.off('connect')
        socket.off('disconnect')
      }
    }
  }, [user.isLoggedIn])

  useEffect(() => {
    if (socektConnected) {
      joinAllRoom()
    }
  }, [socektConnected])
  useLayoutEffect(() => {
    ;(async () => {
      if (accessToken.get()) {
        const response = await getUserInfo()
        if (response.status === 1) {
          dispatch(signInAction(response.data, true))
        } else {
          dispatch(signOutAction())
          navigate('/sign-in', { replace: true })
        }
      } else {
        dispatch(signOutAction())        
      }
      setLoading(false)
    })()
  }, [])

  if (loading) {
    return <h1>Loading...</h1>
  }
  if (!socektConnected && user.isLoggedIn) {
    return <h1>Cant establish connection</h1>
  }
  return (
    <>
      <Routes>
        {!user.isLoggedIn && (
          <>
            <Route path='/sign-in' element={<SignInController />} />
            <Route path='/sign-up' element={<SignUpController />} />
            <Route path='*' element={<Navigate to='/sign-in' replace />} />
          </>
        )}
        {user.isLoggedIn && socektConnected && (
          <>
            <Route path='/dashboard' element={<DashBoardController />} />
            <Route path='*' element={<Navigate to='/dashboard' replace />} />
          </>
        )}
      </Routes>
    </>
  )
}

export default memo(App)
