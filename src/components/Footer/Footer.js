import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__paragraphs">Developed by RandyPol</p>
      <p className="footer__paragraphs">{new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer
