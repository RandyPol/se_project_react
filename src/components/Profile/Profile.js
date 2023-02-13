import React from 'react'
import SideBar from './SideBar/SideBar'
import ClothesSection from './ClothesSection/ClothesSection'
import './Profile.css'

const Profile = () => {
  return (
    <div className="profile page__profile">
      <SideBar />
      <ClothesSection />
    </div>
  )
}

export default Profile
