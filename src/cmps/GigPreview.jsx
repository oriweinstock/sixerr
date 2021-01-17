import { Link } from 'react-router-dom'
import Favorite from '@material-ui/icons/Favorite';
import StarIcon from '@material-ui/icons/Star';

export function GigPreview({ gig, onUserViewGig }) {
    return (
        <li onClick={() => { onUserViewGig(gig._id) }} className="preview-item mrg-bottom">
            <div className="preview-inner">
                <Link to={`/gig/${gig._id}`}>
                    <div className="preview-top">
                        <img src={gig.imgUrls[0]} alt="" />
                    </div>
                    <div className="preview-center">
                        <h2>{gig.title}</h2>
                        <div className="gig-rating flex align-center">
                            <StarIcon />
                            <span>{_getRandomRating()}</span>
                        </div>
                        <Link to="/profile">
                            <div className="gig-owner">
                                <p>{gig.owner.fullname}</p>
                                <p>Level 3 seller</p>
                            </div>
                        </Link>
                    </div>
                </Link>
                <div className="preview-bottom flex space-between">
                    <Favorite className={`heart pointer ${_getRandomLike()}`} />
                    <h3>Starting at <span>{gig.packages[0].price}$</span></h3>
                </div>
            </div>
        </li >
    )
}

function _getRandomRating() {
    return Math.round(Math.random() * 30 + 20) /10
}

function _getRandomLike() {
    return (Math.random()  > 0.75) ? 'liked' : ''
}