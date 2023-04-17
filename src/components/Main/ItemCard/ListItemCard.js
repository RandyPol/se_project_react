import React from 'react'
import { ReactComponent as HeartIcon } from '../../../images/heart.svg'
import CurrentUserContext from '../../../contexts/CurrentUserContext'

import './ListItemCard.css'

const ItemCard = ({ item, handleItemModalToggleOpen, onCardLike }) => {
  const { currentUser } = React.useContext(CurrentUserContext)

  const isLiked = item.likes.some((like) => like === currentUser._id)

  // Create handleLikeClick function
  const handleLikeClick = () => {
    onCardLike(item._id, isLiked)
  }

  return (
    <li className="card">
      <div className="card__title-container">
        <h3 className="card__title">{item.name}</h3>

        {currentUser._id && (
          <HeartIcon
            className={isLiked ? 'card__heart' : ''}
            onClick={handleLikeClick}
          />
        )}
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
