const User = require('../Model/User_Model')
const Contact = require('../Model/Contact_Model')
const Service = require('../Model/Service_Model')
const mongoose = require("mongoose")



const GetAllUser = async (req, res) => {
    try {
        const users = await User.find().
            select({
                password: 0,
            });
        console.log(users)
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" })
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error)
    }
}
const GetAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        console.log(contacts)
        if (!contacts || contacts === 0) {
            return res.status(404).json({ message: "No contact found" })
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
}

const DeleteContacts = async(req,res)=>{
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log("Contact Not found")
            return res.status(404).json({message:"Contact Not found"}); // Return null if the ID is not valid
        }
        await Contact.findByIdAndDelete(id);
        console.log("Delete contact "+id)
        return res.status(200).json({message:"Contact deleted"})
        
    } catch (error) {
        res.status(404).json({message:"Error while deleting contact"})
        next(error)
    }
}

const DeleteUser = async(req, res) => {
    try {

        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log("User Not found")
            return res.status(404).json({message:"User Not found"}); // Return null if the ID is not valid
        }
        await User.findByIdAndDelete(id);
        console.log("Delete user "+id)
        return res.status(200).json({message:"User deleted"})
    } catch (error) {
        console.error("Error:", error);
        next(error)
    }
};

const GetUserById = async(req,res)=>{
    try {

        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log("User Not found")
            return res.status(404).json({message:"User Not found"}); // Return null if the ID is not valid
        }
        const result = await User.findById(id).
        select({
            password: 0,
        });;
        console.log("User is:- "+result)
        return res.status(200).json({result})
    } catch (error) {
        console.error("Error:", error);
        next(error)
    }
}

const UpdateuserById=async(req,res)=>{
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log("User Not found")
            return res.status(404).json({message:"User Not found"}); // Return null if the ID is not valid
        }

        const updatedUserData = req.body;
        const updatedUser = await User.updateOne({
            $set: updatedUserData
        });
        return res.status(200).json(updatedUser)

    } catch (error) {
        console.error("Error:", error);
        next(error)
    }
}

const AddService = async(req,res)=>{
    try {
        const {service,description,price,provider} = req.body;
        const serviceAddded = await Service.create({service,description,price,provider});
        console.log(serviceAddded)
        return res.status(200).json({message:"service Added",serviceAddded})
        
    } catch (error) {
        next(error)
    }
} 




module.exports = { GetAllUser, GetAllContacts,DeleteContacts, DeleteUser, GetUserById, UpdateuserById,AddService };