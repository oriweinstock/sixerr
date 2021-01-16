import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import StarRateIcon from '@material-ui/icons/StarRate';

import {
    IconFlagTR,
    IconFlagDE,
    IconFlagUS,
    IconFlagIS,

} from 'material-ui-flags';


export function ReviewPreview({ review, user }) {
    const currTime = new Date()
    const { createdAt } = review
    const TimeAgo = (currTime - createdAt)
    // console.log("ReviewPreview , TimeAgo", TimeAgo)
    // function getStars() {
    //     if (!review.stars || !review.stars.length) return
    //     let stars = []
    //     for (var i = 0; i < review.stars; i++) {
    //         stars.push(<StarRateIcon className="seller-star" ></StarRateIcon>)
    //     }
    // }
    // return stars
    console.log('review', review);
    if (!review) return <div>Loading</div>
    return (
        <>
            <section className="review-card flex">
                <div>
                    <div className="avatar-container">
                        <Avatar src={review.by.imgUrl} />
                    </div>
                </div>
                <div className="review-info">
                    <h5>{review.by.fullname}</h5>
                    <div className="country">
                        {/* <IconButton className="country-icon"><IconFlagUS />United States</IconButton> */}
                        <IconFlagUS />
                        <span>united states</span>
                        <StarRateIcon className="star" />
                        <span className="rating">{review.rating}</span>
                    </div>
                    {/* todo : add country and flags */}
                    <p>{review.txt},  {review.txt}</p>
                    <p className="published-at">Published 20 Days Ago</p>
                    <div className="icons flex">
                        <ThumbUpAltIcon className="helpful" />
                        <span>Helpful</span>
                        <ThumbDownIcon className="thumb-down" />
                        <span>Thumb Down</span>
                    </div>
                </div>
            </section>
            {/* <p className="review-published-date">Published 2 Days Ago</p> */}
        </>
    )
}

// return (
//     <>
//         <section className="review-card flex">
//             <div className="avatar-container">
//                 <Avatar src={review.by.imgUrl} />
//             </div>
//             <div className="review-info">
//                 <h4>{review.by.fullname}</h4>
//                 {/* todo : add country and flags */}
//                 <p>{review.txt}</p>
//             </div>
//                 <p>Published 20 Days Ago</p>
//         </section>
//         {/* <p className="review-published-date">Published 2 Days Ago</p> */}
//     </>
// )