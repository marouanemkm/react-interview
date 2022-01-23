import { useState } from 'react'
import '../css/Card.css'

const Card = ({item, index, handleDelete}) => {

    const [action, setAction] = useState(true)

    let nbLikes = (100 * item.likes / (item.likes + item.dislikes))
    let nbDislikes = (100 * item.dislikes / (item.dislikes + item.likes))

    const toggleLike = (type) => {
        setAction(!action)
        if (type === 'like') item.likes += 1
        else if (type ==='dislike') item.dislikes += 1
    }

    return (
        <div className='card'>

            <h2 className='item-title'>{item.title}</h2>
            <p className='item-category'>{item.category}</p>

            <div className='jauge'>
                <div className='likes-jauge' style={{width: `${nbLikes}%`}}></div>
                <div className='dislikes-jauge' style={{width: `${nbDislikes}%`}}></div>
            </div>

            <div className='actions'>
                <input type='button' value="👍" className='item-likes' onClick={() => toggleLike('like')} />
                <input type='button' value="👎" className='item-likes' onClick={() => toggleLike('dislike')} />
            </div>
            <button className='del-btn' onClick={() => handleDelete(index)}>Supprimer la fiche de film</button>

        </div>
    )
}

export default Card