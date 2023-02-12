import React from 'react'
import avatar from '../../../images/avatar.avif'
import './SideBar.css'

const SideBar = () => {
  return (
    <div className="sidebar profile__sidebar">
      <img
        src={avatar}
        className="sidebar__profile-avatar"
        alt="Profile avatar"
      />
      <p className="sidebar__username">Michael Jordan</p>
    </div>
  )
}

export default SideBar
