"use client";
import {FormEvent,useState} from "react";
import StoreChrome from "../components/StoreChrome";
import {useCart} from "../cart-store";
import {formatPrice} from "../catalog";

export default function Checkout(){
 const {items,total,setItems}=useCart(); const [done,setDone]=useState(false); const [orderId,setOrderId]=useState("");
 function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();if(!items.length)return;setOrderId(`FER-${Math.floor(Math.random()*900000+100000)}`);setDone(true);setItems([])}
 return <StoreChrome><main className="checkout"><section><p className="eyebrow dark"><span/> Protected demo checkout</p><h1>{done?"ORDER RESERVED.":"CHECKOUT."}</h1>{done?<div className="success"><b>{orderId}</b><p>Your demo order has been recorded on this device. No payment was taken and nothing will be shipped.</p><a href="/shop">Continue shopping →</a></div>:<form onSubmit={submit}><h2>Contact</h2><label>Email<input type="email" required autoComplete="email"/></label><h2>Delivery</h2><div className="form-grid"><label>Full name<input required autoComplete="name" minLength={2}/></label><label>Phone<input required autoComplete="tel" inputMode="tel"/></label><label className="wide">Address<input required autoComplete="street-address"/></label><label>City<input required autoComplete="address-level2"/></label><label>Postal code<input required autoComplete="postal-code"/></label></div><h2>Payment</h2><div className="payment-demo"><b>DEMO MODE</b><p>A production launch will use hosted payment fields. Card data is deliberately not requested or stored here.</p></div><button className="add-main" type="submit">PLACE DEMO ORDER — {formatPrice(total+(total>=15000?0:750))}</button></form>}</section><aside className="checkout-lines">{items.map(x=><div key={x.slug+x.option}><img src={x.image} alt=""/><span>{x.name}<small>{x.option} × {x.qty}</small></span><b>{formatPrice(x.price*x.qty)}</b></div>)}</aside></main></StoreChrome>
}
