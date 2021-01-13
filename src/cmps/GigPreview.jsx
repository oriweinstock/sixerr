import { Link } from 'react-router-dom'

export function GigPreview({ gig }) {
    const inStockText = (gig.inStock) ? 'Purchase now' : 'None Left!'
    return (
        <li className="gig-card mrg-end mrg-bottom shadow rounded">
            <Link to={`/gigs/${gig._id}`}>
                <h2>{gig.name}</h2>
            </Link>
            <div className="flex space-around">
                <h3>{gig.type}</h3>
                <h3>{gig.price}</h3>
            </div>
            <h4>{inStockText}</h4>
            <span>{`${gig.itemsSold} purchases this month`}</span>   
        </li>
    )
}