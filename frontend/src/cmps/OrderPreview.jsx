export function OrderPreview({ order, onOrderStatusChanged }) {

    const isSeller = !!onOrderStatusChanged

    return (
        <li className="order-item flex">
            <div className="order-inner">
                <div className="order-img">
                    <img src={order.gig.imgUrl} alt="" />
                </div>
                <div className="order-info">
                    <h4>{order.gig.title}</h4>
                    <p>By: <span>{order.gig.sellerFullname}</span></p>
                    <p className="status">Status: <span>{order.status}</span></p>
                </div>
                {(onOrderStatusChanged && order.status !== 'completed') && <button onClick={() => { onOrderStatusChanged(order) }}>{order.status === 'pending' ? 'APPROVE' : 'COMPLETED'}</button>}
            </div>
        </li >
    )
}
