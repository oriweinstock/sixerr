import { Link } from 'react-router-dom'

export function GigPreview({ gig }) {
    return (
        <li className="gig-preview mrg-bottom">
            <Link to={`/gig/${gig._id}`}>
                <img src={gig.imgUrls[0]} alt="" />
            </Link>

            <div className="flex column space-between">
                <h2>{gig.title}</h2>
                <div className="gig-preview-bottom">
                    <h3>Starting at <span>{gig.packages[0].price}$</span></h3>
                </div>
            </div>
        </li>
    )
}