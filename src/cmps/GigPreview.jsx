import { Link } from 'react-router-dom'
import Favorite from '@material-ui/icons/Favorite';

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
                        <Link to="/profile">
                            <div className="gig-owner">
                                <p>{gig.owner.fullname}</p>
                                <p>Level 3 seller</p>
                            </div>
                        </Link>
                    </div>
                </Link>
                <div className="preview-bottom flex space-between">
                    <Favorite className="heart pointer"/>
                    <h3>Starting at <span>{gig.packages[0].price}$</span></h3>
                </div>
            </div>
        </li >
    )
}