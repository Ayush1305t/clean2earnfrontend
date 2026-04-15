const preRegistrationModel=require("../models/preRegistrationSchema");
const createPreRegister=async (req,res)=>{

    try {
        const {first_name, last_name, email, phoneNo, reason} = req.body; 

        if (!first_name || !last_name || !email || !reason){
            return res.status(400).json({
                status: "Failed",
                message: "kuch fields khali hn... dhang s data bhej"
            })
        }

        // Save in the model
        const newUser = new preRegistrationModel({
            first_name, last_name, email, phoneNo, reason
        })

        await newUser.save();

        res.status(201).json({
            status: "Success",
            message: "You  have successfully register for our Beta programe.We will reach out soon."
        })

    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            message: `Some error occured: ${error}`
        })
    }
}

module.exports = createPreRegister;