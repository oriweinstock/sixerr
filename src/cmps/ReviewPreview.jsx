import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import StarRateIcon from '@material-ui/icons/StarRate';
// var FontAwesome = require('react-fontawesome')


import {
    IconFlagTR,
    IconFlagDE,
    IconFlagUS,
    IconFlagIS,

} from 'material-ui-flags';


export function ReviewPreview({ review, user }) {
    if (!review || !review.by) return <div></div>
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
                    <p>{review.txt}</p>
                    <p className="published-at">Published 20 Days Ago</p>
                    <div className="icons flex">
                        {/* <ThumbUpAltIcon className="helpful" /> */}
                        <i class="far fa-thumbs-up"></i>

                        <span>Helpful</span>
                        {/* <ThumbDownIcon className="thumb-down" /> */}
                        <i class="far fa-thumbs-down"></i>
                        <span>Thumb Down</span>
                    </div>
                </div>
            </section>
            {/* <p className="review-published-date">Published 2 Days Ago</p> */}
        </>
    )
}
