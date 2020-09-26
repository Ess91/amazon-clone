import React, { useState } from "react";
import "./Orders.css";

function Orders() {
    const [{ basket, user }, dispatch] = useStateValue([]);

    useEffect(() => {
        db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot(sbapshot => (
            setOrders(snapshot.doc.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))

    }, [])

  return (
    <div className="orders">
      <h1>Your Orders</h1>

     {/* <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>*/} 
    </div>
  );
}

export default Orders;
