import StarRateIcon from '@material-ui/icons/StarRate';


export function ReviewStats() {
    //calculate real stats later!!
    const avg = `${200}px`
    return (
        <section className="review-stats-container" >
            <div className="flex space-between">
                <div className="flex">
                    <h2>29 Reviews</h2>
                    <StarRateIcon />
                </div>
                <div className="flex">
                    <h3>Sort By</h3>
                    <button>Most Relevant</button>
                </div>
            </div>
            <div className="flex">
                <div>
                    <div className="flex">
                        <span>5 Stars</span>
                        <StarRateIcon />
                        <div className="progress-bar-container">
                            <div class="fit-progressbar-background" style={{ backgroundColor: 'orange', width:`${90}%`}} > 
                            <span></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </section>
    )
}