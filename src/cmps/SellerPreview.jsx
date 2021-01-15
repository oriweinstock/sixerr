import Avatar from '@material-ui/core/Avatar';

export function SellerPreview({ seller }) {
    console.log("SellerPreview , seller", seller)
    return (
        <section className="about-seller-container flex column">
            <h2>About The Seller</h2>
            <div className="flex">
                <div className="seller-img-container">
                    <img src={seller.imgUrl} />
                    {/* <Avatar src={`${seller.imgUrl}`} /> */}
                </div>
                <div className="flex column">
                    <p>{seller.fullname}</p>
                    <p>Creator of AR filters</p>
                    <p>Rate *****</p>
                    <button>Contact Me</button>
                </div>
            </div>
            <div className="flex column">
                {/* <div className="flex space-between">
                    <p>From</p>
                    <p>Member since</p>
                </div> */}
            </div>
        </section>
    )
}
