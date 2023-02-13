import cx from 'classnames'
import React from 'react'
import './ListItemCard.css'

const ItemCard = ({ className, item, weather, handleItemModalToggleOpen }) => {
  const cardInfo = { ...item, weather }
  return (
    <li className={cx(className, "card")}>
        <h3 className="card__title">{item.name}</h3>
        <img
          onClick={() => handleItemModalToggleOpen(cardInfo)}
          className="card__image"
          src={item.link}
          alt={item.name}
        />
    </li>
  )
}

export default ItemCard
