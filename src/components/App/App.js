import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import ItemModal from '../ItemModal/ItemModal'
import Profile from '../Profile/Profile'
import AddItemModal from '../AddItemModal/AddItemModal'
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal'
import RegisterModal from '../RegisterModal/RegisterModal'
import LoginModal from '../LoginModal/LoginModal'
import EditProfileModal from '../EditProfileModal/EditProfileModal'
import CircularProgress from '@mui/material/CircularProgress'
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import ProtectedRoute from '../ProtectedRoute'

// Hooks and utils imports
import useAuth from '../../hooks/useAuth'
import useWeather from '../../hooks/useWeather'
import useClothingItems from '../../hooks/useClothingItems'
import useModalStates from '../../hooks/useModalStates'
import useActions from '../../hooks/useActions'

function App() {
  const { loggedIn, checkingAuth, currentUser, setCurrentUser, setLoggedIn } =
    useAuth()
  const { weatherData } = useWeather()
  const { clothingItems, setClothingItems } = useClothingItems()
  const {
    isModalFormOpen,
    isItemModalOpen,
    isDeleteModalOpen,
    isRegisterFormOpen,
    isLoginFormOpen,
    isProfileEditFormOpen,
    handleFormToggleOpen,
    handleRegisterModalToggleOpen,
    handleLoginModalToggleOpen,
    handleDeleteModalToggleOpen,
    handleProfileEditModalToggleOpen,
    ItemModalToggleOpen,
  } = useModalStates()
  const {
    isTempFahrenheit,
    cardItem,
    setCardItem,
    handleLogin,
    handleTempUnitToggle,
    handleAddItemSubmit,
    handleCardDelete,
    handleRegister,
    isLoading,
    handleProfileEdit,
    handleCardLike,
    handleLogout,
  } = useActions(
    clothingItems,
    setCurrentUser,
    setLoggedIn,
    setClothingItems,
    handleFormToggleOpen,
    handleDeleteModalToggleOpen,
    handleRegisterModalToggleOpen,
    handleLoginModalToggleOpen,
    handleProfileEditModalToggleOpen
  )

  // Handle the toggle for the ItemModal With Card Info
  const handleItemModalToggleOpen = (cardInfo) => {
    setCardItem(cardInfo)
    ItemModalToggleOpen()
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        isLoading,
        handleLogout,
        handleProfileEditModalToggleOpen,
      }}
    >
      <div className="page">
        <div className="page__container">
          <CurrentTemperatureUnitContext.Provider
            value={{
              isModalFormOpen,
              isItemModalOpen,
              isDeleteModalOpen,
              weatherData,
              clothingItems,
              isTempFahrenheit,
              handleTempUnitToggle,
              handleFormToggleOpen,
              handleItemModalToggleOpen,
              handleRegisterModalToggleOpen,
              handleLoginModalToggleOpen,
              loggedIn,
              handleCardLike,
            }}
          >
            <Header />

            {checkingAuth ? (
              <CircularProgress />
            ) : (
              <Switch>
                <Route exact path="/">
                  <Main />
                </Route>
                <ProtectedRoute
                  path="/profile"
                  component={Profile}
                  loggedIn={loggedIn}
                />
              </Switch>
            )}

            <Footer />
            {isModalFormOpen && (
              <AddItemModal
                isModalFormOpen={isModalFormOpen}
                onAddItem={handleAddItemSubmit}
                handleFormToggleOpen={handleFormToggleOpen}
              />
            )}
            {isItemModalOpen && (
              <ItemModal
                handleItemModalToggleOpen={handleItemModalToggleOpen}
                name={'image'}
                cardItem={cardItem}
                handleDeleteModalToggleOpen={handleDeleteModalToggleOpen}
              />
            )}
            {isRegisterFormOpen && (
              <RegisterModal
                isRegisterFormOpen={isRegisterFormOpen}
                handleRegisterModalToggleOpen={handleRegisterModalToggleOpen}
                handleLoginModalToggleOpen={handleLoginModalToggleOpen}
                handleRegister={handleRegister}
              />
            )}
            {isLoginFormOpen && (
              <LoginModal
                isLoginFormOpen={isLoginFormOpen}
                handleLoginModalToggleOpen={handleLoginModalToggleOpen}
                handleRegisterModalToggleOpen={handleRegisterModalToggleOpen}
                handleLogin={handleLogin}
              />
            )}
            {isProfileEditFormOpen && (
              <EditProfileModal
                isProfileEditFormOpen={isProfileEditFormOpen}
                handleProfileEditModalToggleOpen={
                  handleProfileEditModalToggleOpen
                }
                handleProfileEdit={handleProfileEdit}
              />
            )}

            {isDeleteModalOpen && (
              <DeleteConfirmationModal
                isLoading={isLoading}
                isDeleteModalOpen={isDeleteModalOpen}
                name={'deleteConfirmation'}
                cardItem={cardItem}
                handleCardDelete={handleCardDelete}
                handleDeleteModalToggleOpen={handleDeleteModalToggleOpen}
              />
            )}
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
