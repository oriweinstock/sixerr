import Avatar from '@material-ui/core/Avatar';
import StarRateIcon from '@material-ui/icons/StarRate';
import {
    IconFlagUS,
}
    from 'material-ui-flags';

export function ShortReviewPreview({reviews, idx }) {
    if(!reviews[idx].by) return <div></div>
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
                        <h6>{reviews[idx].by.fullname}</h6>
                        <IconFlagUS className="country-icon" />
                        <span className="country-name">united states</span>
                        <StarRateIcon className="star" />
                        <span>{reviews[idx].rating}</span>
                    </div>
                    <p className="cut-text text-with-dots ">{reviews[idx].txt}</p>
                </div>
            </div>
        </>
    )
}