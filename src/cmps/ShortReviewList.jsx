

import { ShortReviewPreview } from './ShortReviewPreview'
export function ShortReviewList({ gig, reviews }) {
    if (!gig) return <div>loading</div>
    return (
        <div className="short-review flex">
            {reviews.map((review, idx) => <ShortReviewPreview key={`${review.id}`} reviews={reviews} idx={idx} />)}
        </div>
    )
}
