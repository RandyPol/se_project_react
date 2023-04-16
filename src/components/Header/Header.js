import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import logo from '../../images/Logo.svg'
import avatar from '../../images/avatar.avif'
import ToggleSwitch from './ToggleSwitch/ToggleSwitch'
// Import the context value
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext'

const Header = () => {
  const {
    weatherData,
    handleFormToggleOpen,
    handleRegisterModalToggleOpen,
    loggedIn,
  } = React.useContext(CurrentTemperatureUnitContext)

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
              <p className="header__username">Michael Jordan</p>
              <img
                src={avatar}
                className="header__profile-avatar"
                alt="Profile avatar"
              />
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
            onClick={handleFormToggleOpen}
          >
            Log In
          </button>
        </>
      )}
    </header>
  )
}

export default Header
