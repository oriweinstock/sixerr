import { GigPreview } from "./GigPreview"

export function GigList({ gigs }) {

    return (
            <ul className="gig-list clean-list flex">
                {gigs.map(gig => <GigPreview key={gig._id} gig={gig}></GigPreview>)}
            </ul>
    )
}