import React from 'react'
import './ListItemCard.css'

const ItemCard = (props) => {
  return (
    <li>
      <div className="card">
        <h3 className="card__title">{props.item.name}</h3>
        <img
          className="card__image"
          src={props.item.link}
          alt={props.item.name}
        />
      </div>
    </li>
  )
}

export default ItemCard
