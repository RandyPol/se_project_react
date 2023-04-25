import { useState } from 'react'

const useModalStates = () => {
  const [isModalFormOpen, setIsModalFormOpen] = useState(false)
  const [isItemModalOpen, setIsItemModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false)
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false)
  const [isProfileEditFormOpen, setIsProfileEditFormOpen] = useState(false)

  // This is the function to toggle open and close the form modal
  const handleFormToggleOpen = () => {
    setIsModalFormOpen((prevs) => !prevs)
  }

  // Handle the toggle for the RegisterModal
  const handleRegisterModalToggleOpen = () => {
    setIsRegisterFormOpen((prevs) => !prevs)
  }

  // Handle the toggle for the LoginModal
  const handleLoginModalToggleOpen = (status = true) => {
    if (status) setIsLoginFormOpen((prevs) => !prevs)
  }

  // Handle the toggle for the DeleteModal
  const handleDeleteModalToggleOpen = () => {
    setIsDeleteModalOpen((prevs) => !prevs)
  }
  // Handle the toggle for the ProfileEditModal
  const handleProfileEditModalToggleOpen = () => {
    setIsProfileEditFormOpen((prevs) => !prevs)
  }

  const ItemModalToggleOpen = () => {
    setIsItemModalOpen((prevs) => !prevs)
  }

  return {
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
  }
}

export default useModalStates
