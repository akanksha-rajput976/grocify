'use client'
import axios from 'axios';
import React, {  useEffect, useState } from 'react'

import { IOrder } from '@/models/order.model';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AdminOrderCard from '@/components/AdminOrderCard';


function ManageOrders() {
  const[orders,setOrders]=useState<IOrder[]>([])
  const router=useRouter()
    useEffect(()=>{
      const getOrders= async()=>{
        try{
          const result = await axios.get('/api/admin/get-orders');
                setOrders(Array.isArray(result.data.orders) ? result.data.orders : [])
    }
        catch(error){
          console.log("fetch orders error:", error);
        }
      }
      getOrders();
    }, []);
  return (
    <div className='min-h-screen bg-gray-50 w-full'>
       <div className='fixed top-0 left-0 w-full backdrop-blur-lg
             bg-white/70 shadow-sm border-b z-50'>
              <div className='p-2 bg-gray-100 rounded-full hover:bg-gray-200 active:scale-95 transition'>
                <button className='p-2 bg-gray-100 rounded-full hover:bg-gray-200 active:scale-95 transition'
                onClick={()=>router.push("/")}
                >
                  <ArrowLeft size={24} className='text-green-700'/>
                </button>
                <h1 className='text-xl font-bold text-gray-800'>Manage Orders</h1>

              </div>
            </div>
            <div className='max-w-6xl mx-auto px-4 pt-24 pb-16 space-y-8'>
              <div className='space-y-6'>
             {orders?.map((order,index)=>(
              <AdminOrderCard key={index} order={order}/>
              ))}
            </div>

            </div>
          
    </div>
  )
}

export default ManageOrders