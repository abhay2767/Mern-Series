const { z } = require("zod");

//Creating an boject schema
const signupSchema = z.object({
    name: z.string({required_error:"Name is required"}).trim().min(3,{message: "Name must have 3 characters"}). max(20,{message:"Name must not have more than 20 characters"}),

    email: z.string({required_error:"Email is required"}).trim().email({message:"Invalid email address"}).min(13,{message:"Email must have 10 characters"}).max(50,{message:"Email must not have more than 50 characters"}),

    mobile: z.string({required_error:"Phone is required"}).trim().min(10,{message:"Phone must have 10 Digit"}),

    password: z.string({required_error:"Password is required"}).trim().min(8,{message:"Password must have 8 characters"}).max(16,{message:"Password must not have more than 16 characters"}),
})

const loginSchema = z.object({

    email: z.string({required_error:"Email is required"}).trim().email({message:"Invalid email address"}).min(13,{message:"Email must have 10 characters"}).max(50,{message:"Email must not have more than 50 characters"}),

    password: z.string({required_error:"Password is required"}).trim().min(8,{message:"Password must have 8 characters"}).max(16,{message:"Password must not have more than 16 characters"}),
})

const emailSchema = z.object({

    email: z.string({required_error:"Email is required"}).trim().email({message:"Invalid email address"}).min(13,{message:"Email must have 10 characters"}).max(50,{message:"Email must not have more than 50 characters"}),

})

module.exports = {signupSchema,loginSchema,emailSchema};