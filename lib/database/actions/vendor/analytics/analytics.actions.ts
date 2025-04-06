"use server"
import Order from "@/lib/database/models/order.model";
import { generateLast12MonthsData } from "./analytics.generator";
import Product from "@/lib/database/models/product.model";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/database/connect";
import mongoose from "mongoose";
const jwt =  required("jsonwebtoken");


//get Order Analytics for Vendor
export const getOrderAnalytics = async() => {
    try {
        const orders = await generateLast12MonthsData(Order, "order");
        return { orders };
    } catch(error:any){
        console.log(error);
    }
}


//get Product Analytics for Vendor
export const getProductAnalytics = async() => {
    try {
        const products = await generateLast12MonthsData(Product, "product");
        return { products };
    } catch(error:any){
        console.log(error);
    }
}

//get product size analytics for vendor
export const sizeAnalytics = async () => {
    try {
        await connectToDatabase();
        const nextCookies = cookies();
        const vendor_token = (await nextCookies).get("vendor_token");
        const decode = jwt.verify(vendor_token?.value, process.env.JWT_SECRET);
        const { ObjectId } = mongoose.Types;
        const vendorObjectId = new ObjectId(decode.id);

        const products = await  Product.find({"vendor._id": vendorObjectId});
        if(!products) {
            return {
                message: "Vendor Id is invalid!",
            }
        }

        const individualSizeAnalytics = products.reduce((acc, product)=>{
          product.subProduct.forEach((subProduct: any)=>{
            subProduct.sizes.forEach((size:any)=>{
                if(acc[size.size]) {
                    acc[size.size] += size.sold; 
                } else {
                    acc[size.size]= size.sold;
                }
            });
          });
          return acc;      
        });
        const sizeData = Object.keys(individualSizeAnalytics).map((size)=>({
            name: size,
            value: individualSizeAnalytics[size]
        }))
        return JSON.parse(JSON.stringify(sizeData));
    } catch(error: any){
        console.log(error);
    }
}
