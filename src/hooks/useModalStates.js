import { useState } from 'react'

const useModalStates = () => {
  const [isModalFormOpen, setIsModalFormOpen] = useState(false)
  const [isItemModalOpen, setIsItemModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false)
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false)
  const [isProfileEditFormOpen, setIsProfileEditFormOpen] = useState(false)

  return {
    isModalFormOpen,
    isItemModalOpen,
    isDeleteModalOpen,
    isRegisterFormOpen,
    isLoginFormOpen,
    isProfileEditFormOpen,
    setIsModalFormOpen,
    setIsItemModalOpen,
    setIsDeleteModalOpen,
    setIsRegisterFormOpen,
    setIsLoginFormOpen,
    setIsProfileEditFormOpen,
  }
}

export default useModalStates
