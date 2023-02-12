import React, { useContext } from 'react'
import CurrentTemperatureUnitContext from '../../../contexts/CurrentTemperatureUnitContext'
import './ToggleSwitch.css'

const ToggleSwitch = () => {
  const { isTempFahrenheit, handleTempUnitToggle } = useContext(
    CurrentTemperatureUnitContext
  )

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch-checkbox"
        checked={isTempFahrenheit}
        onChange={handleTempUnitToggle}
      />
      {/* The container for both switch labels */}
      <div className="toggle-switch-labels">
        <div className="toggle-switch-label toggle-switch-label-f">F</div>
        <div className="toggle-switch-label toggle-switch-label-c">C</div>
      </div>
    </label>
  )
}

export default ToggleSwitch
