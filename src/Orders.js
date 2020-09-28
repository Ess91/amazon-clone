import React, { useState, useEffect } from 'react';
import { db } from "./firebase";
import './Orders.css'
import { useStateValue } from "./StateProvider";
import Order from './Order'

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
    // This orders state is responsible for storing orders in state
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if(user) {
        // Reach into firebase to get signed in user's collection of orders
        db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot(snapshot => (
            // onSnapshot is the real time value of the database
            setOrders(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
    } else {
        setOrders([])
    }

  }, [user])

    return (
        <div className='orders'>
            <h1>Your Orders</h1>

            <div className='orders__order'>
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders