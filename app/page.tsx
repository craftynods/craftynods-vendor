"use client"
import Navbar from '@/components/navbar';
import { getVendorCookiesandFetchVendor } from '@/lib/database/actions/vendor/vendor.actions';
import React, { useEffect, useState } from 'react'

const HomePage = () => {
  const [vendor, setVendor] = useState<any>(null);
  useEffect(() => {
    try {
      const fetchVendorDetails = async () => {
        try {
          await getVendorCookiesandFetchVendor().then((res)=>{
            if(res?.success) {
              setVendor(res?.vendor);``
            }

          }) 
        } catch (error: any) {
          console.log(error);
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  }, [])
  return (
    <div>
       <Navbar/>
      {!vendor && !vendor?.verified && (
      <div className='flex item-center justify-center bg-red-100'>
      <p><b>Note:</b> You are not yet verified by an admin, so you don't hae access to the dashboard!!!</p>
      </div>
    )}
    </div>
  )
}

export default HomePage;