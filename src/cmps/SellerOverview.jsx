import Avatar from '@material-ui/core/Avatar';



export function SellerOverview({gig , htmlStars}) {
    return (
        <section className="seller-overview flex">
            <Avatar alt="Remy Sharp" src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light" />
            <small>{gig.owner.fullname}</small>
            <span>|</span>
            <div className="seller-stars-container flex">
                {<div>{htmlStars.map((star) => {
                    return star
                })}</div>}
            </div>
            <span>({gig.reviews.length})</span>
            <span>|</span>
            {/* get orders from gig */}
            <span className="order-count">1 Orders in Queue</span>
        </section>
    )
}


// <Avatar alt="Remy Sharp" src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light" />
// <small>{gig.owner.fullname}</small>
// <span>|</span>
// <div className="seller-stars-container flex">
//     {<div>{htmlStars.map((star) => {
//         return star
//     })}</div>}
// </div>
// <span>({gig.reviews.length})</span>
// <span>|</span>
// {/* get orders from gig */}
// <span className="order-count">1 Orders in Queue</span>