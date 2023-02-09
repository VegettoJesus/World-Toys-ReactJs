import React, { createContext } from 'react';
import { useState } from 'react';

const Notification = ({type,message}) => {
    const NotificationStyle = {
      position: 'absolute',
      top: 100,
      right:50,
      backgroundColor: type==='success'?'#D1E7DD':'#F8D7DA',
      color: type === 'success' ? '#0F5132':'#84205C',
      padding: '10px 20px 10px 20px'
    }
    if(!message){
      return null
    }
    return (
      <>
        <div className='rounded' style={NotificationStyle}>
          {message}
        </div>
      </>
    )
  }

export const NotificationContext = createContext()

export const NotificationProvider = ({children}) => {
        const [message,setMessage] = useState('')
        const [type,setType] = useState('success')
        
        const setNotification = (type,message,time) => {
            setMessage(message)
            setType(type)
            setTimeout(() => {
            setMessage('')
            },time*1000)
        }
    return(
        <NotificationContext.Provider value={setNotification}>
            <Notification type={type} message={message} />
            {children}
        </NotificationContext.Provider>
    )
}