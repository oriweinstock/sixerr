import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';

export function SellerOverview({ gig, htmlStars }) {
    return (
        <section className="seller-overview flex">
            <Avatar className="avatar" alt="Remy Sharp" src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light" />
            <div className="flex align-center info">
                <span className="owner-fullname">{gig.owner.fullname}</span>
                <span>Level 2 Seller </span>
                <span className="space">|</span>
            </div>
            <div className="seller-stars-container flex">
                {/* <Rating name="disabled" value={htmlStars.length - 1} disabled /> */}
                {htmlStars.map((star) => {
                    return  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15"><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path></svg>
                })}
                <span>{(htmlStars.length - 1 === -1) ? 0 : htmlStars.length - 1}</span>
            </div>
            <span>({gig.reviews.length})</span>
            <span>|</span>
            {/* get orders from gig */}
            <span className="order-count">1 Orders in Queue</span>
        </section>
    )

}
