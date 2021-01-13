import { Link } from 'react-router-dom'

export function GigList({ gigs }) {

    if (!gigs || gigs.length === 0) return <div>Loading gigs...</div>
    return (
        <div>
            <div className="flex space-around align-center mrg-top mrg-bottom">
                <GigFilter />
                <Link to="/gigs/add">
                    <Button variant="contained" color="primary">
                        Add Gig
                </Button>
                </Link>
            </div>
            <ul className="gig-list clean-list flex">
                {gigs.map(gig => <GigPreview key={gig._id} gig={gig}></GigPreview>)}
            </ul>
        </div>
    )
}