import Avatar from '@material-ui/core/Avatar';
import StarRateIcon from '@material-ui/icons/StarRate';
import {
    IconFlagUS,
}
    from 'material-ui-flags';

export function ShortReviewPreview({reviews, idx }) {
    if(!reviews) return <div>Loading...</div>
    return (
        <>
            <div className="short-content flex">
                <div>
                    <div className="avatar-container">
                        <Avatar src={reviews[idx].by.imgUrl} />
                    </div>
                </div>
                <div>
                    <div className="content flex">
                        <h5>{reviews[idx].by.fullname}</h5>
                        <IconFlagUS className="country-icon" />
                        <span>united states</span>
                        <StarRateIcon className="star" />
                        <span>{reviews[idx].rating}</span>
                    </div>
                    <p className="cut-text text-with-dots ">{reviews[idx].txt}</p>
                </div>
            </div>
        </>
    )
}