
import { ReviewPreview } from './ReviewPreview.jsx'

export default function ReviewList({ gig, user }) {
    const reviews = gig.reviews
    return (
        <>
            {/* Todo : add all reviews details above the reviews */}
            <section id="reviews" className="gig-review-list flex column">
                {reviews.map(review => <ReviewPreview key={review.id} review={review} user={user}></ReviewPreview>)}
            </section>
        </>
    )
}
