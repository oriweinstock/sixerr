import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';



export function SellerPreview({ seller }) {
    return (
        <>
            <section id="about-seller" className="about-seller-container flex column">
                <h2>About The Seller</h2>
                <div className="content flex">
                    <div className="seller-img-container">
                        <img src={seller.imgUrl} />
                        {/* <Avatar src={`${seller.imgUrl}`} /> */}
                    </div>
                    <div className="content flex column">
                        <a>{seller.fullname}</a>
                        <span>Creator of AR filters</span>
                        <div className="stars-container flex justify-center align center">
                            {/*todo: add real stars from data later */}
                            {/* <Rating name="disabled" value={5} disabled /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15"><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15"><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15"><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15"><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15"><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path></svg>
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
