import React from 'react'
import { NavLink } from 'react-router-dom'

// 封裝NavLink
export function MyNavLink(props) {
  function computed({ isActive }) {
    // 可依狀況變更NavLink樣式(className)
    return isActive ? 'list-group-item change' : 'list-group-item'
  }

  return <NavLink className={computed} {...props} />
}