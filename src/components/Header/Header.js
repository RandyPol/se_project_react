import React from 'react'
import './Header.css'
import logo from '../../images/Logo.svg'
import avatar from '../../images/avatar.avif'
import ToggleSwitch from './ToggleSwitch/ToggleSwitch'
// Import the context value
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext'

const Header = ({ handleFormToggleOpen }) => {
  const { weatherData } = React.useContext(CurrentTemperatureUnitContext)

  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="header page__headerchild">
      <img className="header__logo" src={logo} alt="WTWR Logo" />
      <p className="header__location">{`${currentDate}, ${weatherData.name}`}</p>

      <ToggleSwitch />

      <button className="header__button-add" onClick={handleFormToggleOpen}>
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Michael Jordan</p>
        <img
          src={avatar}
          className="header__profile-avatar"
          alt="Profile avatar"
        />
      </div>
    </header>
  )
}

export default Header
