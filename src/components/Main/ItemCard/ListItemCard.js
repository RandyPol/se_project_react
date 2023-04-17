import cx from 'classnames'
import React from 'react'
import { ReactComponent as HeartIcon } from '../../../images/heart.svg'

import './ListItemCard.css'

const ItemCard = ({ className, item, handleItemModalToggleOpen }) => {
  return (
    <li className={cx(className, 'card')}>
      <div className="card__title-container">
        <h3 className="card__title">{item.name}</h3>
        <HeartIcon className="card__heart" />
      </div>

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
