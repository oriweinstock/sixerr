import StarRateIcon from '@material-ui/icons/StarRate';


export function ReviewStats({ htmlStars }) {
    //calculate real stats later!!
    return (
        <>
            <div className="review-stats-header flex">
                <h2>7,738 Reviews</h2>
                {htmlStars.map((star) => {
                    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15"><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path></svg>
                })}
                <span>{htmlStars.length}</span>
            </div>
            <section className="review-stats-container " >
                <div className="left-side-stats">
                    <div className="progressses-ctonainer">
                        <span>5 stars</span>
                        <div className="progress-bar-container">
                            <div className="fit-progressbar-background" style={{ backgroundColor: 'orange', width: `${90}%` }} >
                            </div>
                        </div>
                        <p>(500)</p>
                    </div>
                    <div className="progressses-ctonainer">
                        <span>4 stars</span>
                        <div className="progress-bar-container">
                            <div className="fit-progressbar-background" style={{ backgroundColor: 'orange', width: `${100}%` }} >
                            </div>
                        </div>
                        <p>(400)</p>
                    </div>
                    <div className="progressses-ctonainer">
                        <span>3 stars</span>
                        <div className="progress-bar-container">
                            <div className="fit-progressbar-background" style={{ backgroundColor: 'orange', width: `${95}%` }} >
                            </div>
                        </div>
                        <p>(300)</p>
                    </div>
                    <div className="progressses-ctonainer">
                        <span>2 stars</span>
                        <div className="progress-bar-container">
                            <div className="fit-progressbar-background" style={{ backgroundColor: 'orange', width: `${90}%` }} >
                            </div>
                        </div>
                        <p>(200)</p>
                    </div>
                    <div className="progressses-ctonainer">
                        <span>1 stars</span>
                        <div className="progress-bar-container">
                            <div className="fit-progressbar-background" style={{ backgroundColor: 'orange', width: `${96}%` }} >
                            </div>
                        </div>
                        <p>(100)</p>
                    </div>
                </div>
                {/* <div className="x"> */}
                <div className="right-side-stats">
                    <div>
                        <h6>Rating Breakdown</h6>
                    </div>
                    <div className="overview-content">
                        <span>Seller communication level</span>
                    </div>
                    <div className="overview-content">
                        <span>Recommend to a friend</span>
                    </div  >
                    <div className=" overview-content flex space-between">
                        <span>Service as described</span>
                    </div>
                </div>
                <div className="stars flex column">
                    <div>
                        <span>5</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15"><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path></svg>
                    </div>
                    <div>
                        <span>4</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15"><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path></svg>
                    </div>
                    <div >
                        <span >3</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15"><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path></svg>
                    </div>
                </div>
                {/* </div> */}
            </section>

        </>
    )
}