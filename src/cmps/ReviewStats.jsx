import StarRateIcon from '@material-ui/icons/StarRate';


export function ReviewStats() {

    return (
        <section >
            <div className="flex space-between">
                <div className="flex">
                    <h2>29 Reviews</h2>
                    <StarRateIcon/>
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
                        <StarRateIcon/>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </section>
    )
}