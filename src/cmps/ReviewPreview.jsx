import React from 'react'
// import Avatar from '@material-ui/core/Avatar';

export function ReviewPreview({ review, user }) {
    return (
        <>
            <section className="review-card flex">
                <div className="avatar-container">
                    {/* <Avatar src={review.by.imgUrl} /> */}
                </div>
                <div className="review-info">
                    <h4>{review.by.fullname}</h4>
                    {/* todo : add country and flags */}
                    <p>{review.txt}</p>
                </div>
                {/* <p>Published{review.createdAt} Days Ago</p> */}
            </section>
            {/* <p className="review-published-date">Published 2 Days Ago</p> */}
        </>
    )
}
