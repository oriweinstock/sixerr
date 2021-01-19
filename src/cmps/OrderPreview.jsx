export function OrderPreview({ order, onOrderStatusChanged}) {
    
    return (
        <li className="preview-item mrg-bottom">
            <div className="preview-inner">
                <div className="preview-img">
                    <img src={order.gig.imgUrl} alt="" />
                </div>
                <div className="preview-title">
                    <h2>{order.gig.title}</h2>
                </div>
                <div className="gig-owner">
                    <p>by {order.gig.sellerFullname}</p>
                </div>
                <div className="status">
                    <p>{order.status}</p>
                </div>
                {(onOrderStatusChanged && order.status !== 'completed')&& <button onClick={() => {onOrderStatusChanged(order)}}>{order.status === 'pending' ? 'APPROVE': 'COMPLETED'}</button>}
            </div>
        </li >
    )
}
