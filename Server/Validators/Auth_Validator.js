const { z } = require("zod");

//Creating an boject schema
const signupSchema = z.object({
    name: z.string({required_error:"Name is required"}).trim().min(3,{message: "Name must have 3 characters"}). max(20,{message:"Name must not have more than 20 characters"}),
    email: z.string({required_error:"Email is required"}).trim().email({message:"Invalid email address"}).min(13,{message:"Email must have 10 characters"}).max(50,{message:"Email must not have more than 50 characters"}),
    mobile: z.string({required_error:"Phone is required"}).trim().min(10,{message:"Phone must have 10 Digit"}),
    password: z.string({required_error:"Password is required"}).trim().min(8,{message:"Password must have 8 characters"}).max(16,{message:"Password must not have more than 16 characters"}),
})

const updateAccountSchema = z.object({
    name: z.string({required_error:"Name is required"}).trim().min(3,{message: "Name must have 3 characters"}). max(20,{message:"Name must not have more than 20 characters"}),
    mobile: z.string({required_error:"Phone is required"}).trim().min(10,{message:"Phone must have 10 Digit"}),
})

const loginSchema = z.object({
    email: z.string({required_error:"Email is required"}).trim().email({message:"Invalid email address"}).min(13,{message:"Email must have 10 characters"}).max(50,{message:"Email must not have more than 50 characters"}),
    password: z.string({required_error:"Password is required"}).trim().min(8,{message:"Password must have 8 characters"}).max(16,{message:"Password must not have more than 16 characters"}),
})

const emailSchema = z.object({
    email: z.string({required_error:"Email is required"}).trim().email({message:"Invalid email address"}).min(13,{message:"Email must have 10 characters"}).max(50,{message:"Email must not have more than 50 characters"}),
})

const validateOtp = z.object({
    user_id: z.string({required_error:"user_id is required"}),
    otp: z.string({required_error:"otp is required"})
})

const contactSchema = z.object({
    name: z.string({required_error:"Name is required"}).trim().min(3,{message: "Name must have 3 characters"}). max(20,{message:"Name must not have more than 20 characters"}),
    email: z.string({required_error:"Email is required"}).trim().email({message:"Invalid email address"}).min(13,{message:"Email must have 10 characters"}).max(50,{message:"Email must not have more than 50 characters"}),    
    message: z.string({required_error:"Message is required"}).trim().min(3,{message: "Message must have 3 characters"}). max(20,{message:"Message must not have more than 20 characters"}),
})

const serviceSchema = z.object({
    // images: z.string({required_error:"Please upload image first"}),    
    service: z.string({required_error:"Service is required"}).trim().min(3,{message: "Service must have 5 characters"}). max(20,{message:"Service must not have more than 15 characters"}),
    description: z.string({required_error:"Description is required"}).trim().min(10,{message:"description must have 10 characters"}).max(50,{message:"Description must not have more than 50 characters"}),
    price: z.string({required_error:"Price is required"}).trim().min(3,{message:"Price must have 3 Digit value"}),    
    provider: z.string({required_error:"Provider is required"}).trim().min(3,{message:"Provider must have 3 characters name"}).max(50,{message:"Provider must not have more than 15 characters name"}),
})


const note_Upload_Schema = z.object({    
    title: z.string({required_error:"Title is required"}).trim().min(5,{message: "Title must have 5 characters"}). max(20,{message:"Title must not have more than 15 characters"}),
    desc: z.string({required_error:"Description is required"}).trim().min(10,{message:"description must have 10 characters"}).max(50,{message:"Description must not have more than 50 characters"}),
    tag: z.string({required_error:"Tag is required"}).trim().min(3,{message:"Tag must have 3 characters name"}).max(50,{message:"Tag must not have more than 10 characters name"}),
})

const image_Upload_Schema = z.object({
    // images: z.string({required_error:"Please upload image first"}),    
    name: z.string({required_error:"Name is required"}).trim().min(5,{message: "Name must have 5 characters"}). max(20,{message:"Name must not have more than 15 characters"}),
})

const doc_Upload_Schema = z.object({
    // doc: z.string({required_error:"Please upload document first"}),    
    name: z.string({required_error:"Name is required"}).trim().min(5,{message: "Name must have 5 characters"}). max(20,{message:"Name must not have more than 15 characters"}),
})



module.exports = {signupSchema,updateAccountSchema,loginSchema,emailSchema,validateOtp,contactSchema,serviceSchema,note_Upload_Schema,image_Upload_Schema,doc_Upload_Schema};