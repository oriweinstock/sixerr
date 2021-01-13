import { GigPreview } from "./GigPreview"

export function GigList({ gigs }) {

    if (!gigs || gigs.length === 0) return <div>Loading gigs...</div>
    return (
        <div>
            <div className="flex space-around align-center mrg-top mrg-bottom">
                {/* <GigFilter /> */}
            </div>
            <ul className="gig-list clean-list flex">
                {gigs.map(gig => <GigPreview key={gig._id} gig={gig}></GigPreview>)}
            </ul>
        </div>
    )
}