import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import logo from '../../images/Logo.svg'
import ToggleSwitch from './ToggleSwitch/ToggleSwitch'
// Import the context value
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext'
import CurrentUserContext from '../../contexts/CurrentUserContext'

const Header = () => {
  const {
    weatherData,
    handleFormToggleOpen,
    handleRegisterModalToggleOpen,
    handleLoginModalToggleOpen,
    loggedIn,
  } = React.useContext(CurrentTemperatureUnitContext)

  // Get the current user from the context
  const currentUser = React.useContext(CurrentUserContext)

  // Get user initials
  const getUserInitial = () => {
    const name = currentUser.name
    if (name) return name.charAt(0).toUpperCase()
  }

  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="header page__headerchild">
      <Link to="/">
        {' '}
        <img className="header__logo" src={logo} alt="WTWR Logo" />
      </Link>
      <p className="header__location">{`${currentDate}, ${weatherData.name}`}</p>

      <ToggleSwitch />

      {loggedIn ? (
        <>
          <button className="header__button-add" onClick={handleFormToggleOpen}>
            + Add clothes
          </button>
          <Link to="/profile" className="header__profile-link">
            <div className="header__user-container">
              <p className="header__username">{currentUser.name}</p>
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  className="header__profile-avatar"
                  alt="Profile avatar"
                />
              ) : (
                <div className="header__profile-avatar header__profile-avatar--initials">
                  {getUserInitial()}
                </div>
              )}
            </div>
          </Link>
        </>
      ) : (
        <>
          <button
            className="header__button-SignUp"
            onClick={handleRegisterModalToggleOpen}
          >
            Sign Up
          </button>
          <button
            className="header__button-LogIn"
            onClick={handleLoginModalToggleOpen}
          >
            Log In
          </button>
        </>
      )}
    </header>
  )
}

export default Header
