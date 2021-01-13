import { Link } from 'react-router-dom'

export function GigPreview({ gig }) {
    return (
        <li className="gig-card mrg-end mrg-bottom shadow rounded">
            <Link to={`/gig/${gig._id}`}>
                <h2>{gig.title}</h2>
            </Link>
            <h3>{gig.price}</h3>
        </li>
    )
}