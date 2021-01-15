import { GigPreview } from "./GigPreview"

export function GigList({ gigs, onUserViewGig }) {

    return (
        <section className="gig-list">
            <ul className="previews-wrap clean-list">
                {gigs.map(gig => <GigPreview key={gig._id} gig={gig} onUserViewGig={onUserViewGig}></GigPreview>)}
            </ul>
        </section>
    )
}