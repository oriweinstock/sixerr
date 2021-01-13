import { Link } from 'react-router-dom'

export function GigPreview({ gig }) {
    return (
        <li className="gig-preview mrg-end mrg-bottom">
            <Link to={`/gig/${gig._id}`}>
                <img src={gig.imgUrls[0]} alt="" />
            </Link>

            <div className="flex column space-between">
                <h2>{gig.title}</h2>
                <h3>Starting at <span>{gig.packages[0].price}$</span></h3>
            </div>
        </li>
    )
}