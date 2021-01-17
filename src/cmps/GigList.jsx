import { GigPreview } from "./GigPreview"

export function GigList({ gigs, onUserViewGig, onFavoriteToggle, user }) {

    return (
        <section className="gig-list">
            <ul className="previews-wrap clean-list">
                {gigs.map(gig => <GigPreview key={gig._id} gig={gig} onUserViewGig={onUserViewGig} onFavoriteToggle={onFavoriteToggle} user={user}></GigPreview>)}
            </ul>
        </section>
    )
}