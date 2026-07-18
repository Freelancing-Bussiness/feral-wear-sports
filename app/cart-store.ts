"use client";
import { useEffect, useState } from "react";
export type CartItem = { slug:string; name:string; price:number; image:string; option:string; qty:number };
const KEY="feral-cart-v1";
export function readCart():CartItem[]{ try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch{return[]} }
export function writeCart(items:CartItem[]){ localStorage.setItem(KEY,JSON.stringify(items)); window.dispatchEvent(new Event("feral-cart")); }
export function addCart(item:CartItem){ const cart=readCart(); const hit=cart.find(x=>x.slug===item.slug&&x.option===item.option); if(hit) hit.qty+=item.qty; else cart.push(item); writeCart(cart); }
export function useCart(){ const [items,setItems]=useState<CartItem[]>([]); useEffect(()=>{const sync=()=>setItems(readCart());sync();window.addEventListener("feral-cart",sync);window.addEventListener("storage",sync);return()=>{window.removeEventListener("feral-cart",sync);window.removeEventListener("storage",sync)}},[]); return {items,setItems:(next:CartItem[])=>{writeCart(next);setItems(next)},count:items.reduce((n,x)=>n+x.qty,0),total:items.reduce((n,x)=>n+x.qty*x.price,0)} }
