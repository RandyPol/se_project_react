import React from 'react'
import './SideBar.css'
import CurrentUserContext from '../../../contexts/CurrentUserContext'

const SideBar = () => {
  // Get the current user from the context
  const currentUser = React.useContext(CurrentUserContext)
  // Get user initials
  const getUserInitial = () => {
    const name = currentUser.name
    if (name) return name.charAt(0).toUpperCase()
  }
  return (
    <div className="sidebar profile__sidebar">
      {currentUser.avatar ? (
        <img
          src={currentUser.avatar}
          className="sidebar__profile-avatar"
          alt="Profile avatar"
        />
      ) : (
        <div className="sidebar__profile-avatar sidebar__profile-initials">
          {getUserInitial()}
        </div>
      )}
      <p className="sidebar__username">{currentUser.name}</p>
    </div>
  )
}

export default SideBar
