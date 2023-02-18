const dotenv=require('dotenv');
//config 
dotenv.config({path:"backend/config/config.env"});

const catchAsyncErrors=require("../middleware/catchAsyncError");

const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment=catchAsyncErrors(async(req,res,next)=>{
    
    // console.log(req.body.amount);

    const myPayment=await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"inr",
        metadata:{
            company:"Yum Market",
        },
    });

    //console.log(myPayment);
    res.status(200).json({
        success:true,
        client_secret:myPayment.client_secret
    });
});


exports.sendStripeApiKey=catchAsyncErrors(async(req,res,next)=>{
    res.status(200).json({
         stripeApiKey:process.env.STRIPE_API_KEY 
    });
    
    console.logi(process.env.STRIPE_API_KEY)
});