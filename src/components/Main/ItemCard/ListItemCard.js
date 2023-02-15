import cx from 'classnames'
import React from 'react'
import './ListItemCard.css'

const ItemCard = ({ className, item, handleItemModalToggleOpen }) => {
  return (
    <li className={cx(className, 'card')}>
      <h3 className="card__title">{item.name}</h3>
      <img
        onClick={() => handleItemModalToggleOpen(item)}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  )
}

export default ItemCard
