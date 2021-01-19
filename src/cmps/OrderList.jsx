import { OrderPreview } from "./OrderPreview"

export function OrderList({ orders, onOrderStatusChanged }) {

    return (
        <section className="gig-list">
            <ul className="previews-wrap clean-list">
                {orders.map(order => <OrderPreview key={order._id} order={order} onOrderStatusChanged={onOrderStatusChanged}/>)}
            </ul>
        </section>
    )
}