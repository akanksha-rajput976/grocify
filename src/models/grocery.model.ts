import mongoose from "mongoose";

interface IGrocery{
    _id?:mongoose.Types.ObjectId,
    name:string,
    category:string,
    price:string,
    unit:string,
    image:string,
    createdAt?:Date,
    updatedAt?:Date
}
const grocerySchema=new mongoose.Schema<IGrocery>({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum:[
            "fruits & vegetables",
            "Dairy & Eggs",
            "Rice, Atta & Grains",
            "Frozen Foods",
            "Meat & Seafood",
            "Personal Care",
            "Household Supplies",
            "Bakery",
            "Beverages & Drinks",
            "Snacks & Biscuits",   
        ],
        required:true
    },
    price:{
        type:String,
        required:true
    },
        unit:{
            type:String,
            required:true,
            enum:[
                "kg",
                "g",
                "litre",
                "ml",
                "packet",
                "piece"
                
            ]
        },
    image:{
        type:String,
        required:true
    }
  },{
        timestamps:true
    })
    const Grocery=mongoose.models.Grocery || mongoose.model<IGrocery>("Grocery",grocerySchema);

    export default Grocery;

