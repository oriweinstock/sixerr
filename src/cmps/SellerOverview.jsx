import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';

export function SellerOverview({ gig, htmlStars }) {
    return (
        <section className="seller-overview flex">
            <Avatar alt="Remy Sharp" src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light" />
            <small>{gig.owner.fullname}</small>
            <span>|</span>
            <div className="seller-stars-container flex">
                <Rating name="disabled" value={htmlStars.length - 1} disabled />
                <span>{(htmlStars.length - 1===-1)?0 :htmlStars.length - 1 }</span>
            </div>
            <span>({gig.reviews.length})</span>
            <span>|</span>
            {/* get orders from gig */}
            <span className="order-count">1 Orders in Queue</span>
        </section>
    )
}
