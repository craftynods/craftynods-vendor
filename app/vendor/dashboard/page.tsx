import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { slEye } from "react-icons/sl";
import { HiCurrencyRupee } from  "react-icons/hi";

import Link from "next/link";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import {
    calculateTotalOrders,
    getDashboardData,
  } from "@/lib/database/actions/vendor/dashboard/dashboard.actions";
import DashboardCard from "@/components/vendor/dashboard/dashboardCard";

  const VendorDashboardPage = async() => {
    const data = await getDashboardData().catch((err)=>console.log(err));
    const allOrdersData = await calculateTotalOrders().catch(err=>console.log(err));

    return (<div className="container">
         <div className="my-[20px]">
            <DashboardCard data={data} />
         </div>  
         <div className="titleStyle">Orders</div>
      <div className="flex justify-evenly items-center my-[20px]">
        <div className="h-[100px] gap-[10px] border-2 border-gray-400 p-[10px] w-[200px] shadow-2xl flex items-center justify-center rounded-3xl">
          <HiCurrencyRupee size={100} /> ₹ {allOrdersData?.totalSales} Total
          Sales
        </div>
        <div className="h-[100px] gap-[10px] border-2 border-gray-400 p-[10px] w-[200px] shadow-2xl flex items-center justify-center rounded-3xl">
          <HiCurrencyRupee size={100} /> ₹ {allOrdersData?.lastMonthSales} Last
          Month Sales
        </div>{" "}
        <div className="h-[100px] gap-[10px] border-2 border-gray-400 p-[10px] w-[200px] shadow-2xl flex items-center justify-center rounded-3xl">
          <HiCurrencyRupee size={100} /> ₹ {allOrdersData?.growthPercentage}{" "}
          Growth Percentage
        </div>
      </div>
    </div>)
  }
 export default VendorDashboardPage;