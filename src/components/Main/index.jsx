import React from 'react'
import Input from '../Input'
import Dashboard from '../Dashboard'
import List from '../List'

import './index.scss'

export default function Main() {
    return (
        <div className='container'>
            <h1 className='main-title text-light'>待辦清單</h1>
            <Input />
            <Dashboard />
            <List />
        </div>
    )
}
