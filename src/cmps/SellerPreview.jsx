import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';



export function SellerPreview({ seller }) {
    console.log("SellerPreview , seller", seller)
    return (
        <>
            <section className="about-seller-container flex column">
                <h2>About The Seller</h2>
                <div className="flex">
                    <div className="seller-img-container">
                        <img src={seller.imgUrl} />
                        {/* <Avatar src={`${seller.imgUrl}`} /> */}
                    </div>
                    <div className="flex column">
                        <span>{seller.fullname}</span>
                        <span>Creator of AR filters</span>
                        <div className="stars-container flex justify-center align center">
                            {/*todo: add real stars from data later */}
                            <Rating name="disabled" value={5} disabled />
                            <span>5.0 (40 reviews)</span>
                        </div>
                        <button>Contact Me</button>
                    </div>
                </div>
            </section>
            <section className="seller-stats flex column">
                <div className="user-stats flex">
                    <div className="flex column">
                        <span>From</span>
                        <span className="bold">United States</span>
                        <span>Avg. response time</span>
                        <span className="bold">3 hours</span>
                    </div>
                    <div className="flex column">
                        <span >Member since</span>
                        <span className="bold">Aug 2020</span>
                        <span>Last deilivery</span>
                        <span className="bold">About 12 hours</span>
                    </div>
                </div>
                <div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, nihil. Temporibus quidem aperiam voluptates aliquid nostrum, ratione laboriosam commodi culpa eligendi? Autem cum corporis quia asperiores deleniti maiores consequuntur expedita?</p>
                </div>
            </section>
        </>
    )
}
