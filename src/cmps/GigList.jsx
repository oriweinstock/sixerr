import { GigPreview } from "./GigPreview"

export function GigList({ gigs }) {

    return (
        <section className="gig-list">
            <h1>Recently added &amp; more</h1>
            <ul className="clean-list">
                {gigs.map(gig => <GigPreview key={gig._id} gig={gig}></GigPreview>)}
            </ul>
        </section>
    )
}