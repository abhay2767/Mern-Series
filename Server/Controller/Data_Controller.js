const Notes = require('../Model/Note_Model')
const Images = require('../Model/Image_Model')
const Documents = require('../Model/Doc_Model')
const mongoose = require("mongoose")
const path = require('path')
const { deleteimagefile } = require('../Helper/DeleteImage')

const Add_notes = async (req, res) => {
    try {
        // console.log(req.body)
        // console.log(req.user)
        const userdata = req.user
        const { title, desc, tag } = req.body;
        const NoteSchema = await new Notes({
            title, desc, tag, user: userdata.id
        })
        await NoteSchema.save();
        res.status(200).json(NoteSchema)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal serer Error" })
    }
}

const Get_notes = async (req, res) => {
    try {
        // console.log("Inside")
        const userdata = req.user
        const notes = await Notes.find({ user: userdata.id }) //Here 'user: req.user.id' cames from 'fetchUser'
        // console.log(notes)
        res.json(notes)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal serer Error" })
    }
}

const Get_noteById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            // console.log("Note Not found")
            return res.status(404).json({ message: "Note Not found" }); // Return null if the ID is not valid
        }
        const result = await Notes.findById(id)
        // console.log("Note is:- "+result)
        return res.status(200).json({ result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal serer Error" })
    }
}

const Update_notes = async (req, res) => {
    try {
        const { title, desc, tag } = req.body
        const userdata = req.user
        const newNote = {};
        if (title) { newNote.title = title };
        if (desc) { newNote.desc = desc };
        if (tag) { newNote.tag = tag };
        let note = await Notes.findById(req.params.id);
        if (!note) { res.status(404).send("Not found") }
        if (note.user.toString() !== userdata.id) { res.status(401).send("UnAuthorized || Not Allowed") }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal serer Error" })
    }
}

const Delete_notes = async (req, res) => {
    try {
        const userdata = req.user
        let note = await Notes.findById(req.params.id)
        if (!note) { res.status(404).send("Not found") }
        if (note.user.toString() !== userdata.id) { res.status(401).send("UnAuthorized || Not Allowed") }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Succesfully deleted" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal serer Error" })
    }
}

const Add_image = async (req, res) => {
    try {
        const image = new Images({
            user: req.user.id,
            name: req.body.name,
            images: req.file.filename
        })
        const imageData = await image.save();
        res.status(200).json({ message: "Image Inserted" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal serer Error" })
    }
}

const Get_image = async (req, res) => {
    try {
        const userdata = req.user
        const imagedata = await Images.find({ user: userdata.id })
        res.status(200).json(imagedata)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal serer Error" })
    }
}

const Delete_Image = async (req, res) => {
    try {
        const userdata = req.user
        let image = await Images.findById(req.params.id)
        if (!image) { res.status(404).send("Not found") }
        if (image.user.toString() !== userdata.id) { res.status(401).send("UnAuthorized || Not Allowed") }
        
        const oldfilepath = path.join(__dirname, '../Public/images/' + image.images)
        // console.log(oldfilepath)
        deleteimagefile(oldfilepath)
        image = await Images.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Succesfully deleted" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal serer Error" })
    }
}

const Add_document = async (req, res) => {
    try {
        const userdata = req.user
        const { doc } = req.body;
        // console.log("Inside")
        const DocSchema = await new Documents({
            user: userdata.id,
            name: req.body.name,
            doc: req.file.filename
        })
        const documentData = await DocSchema.save();
        res.status(200).json({ message: "Document Inserted" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal serer Error h bhai" })
    }
}

const Get_document = async (req, res) => {
    try {
        const userdata = req.user
        const documentdata = await Documents.find({ user: userdata.id })
        res.status(200).json(documentdata)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal serer Error h bhai" })
    }
}

const Delete_document = async (req, res) => {
    try {
        const userdata = req.user
        let document = await Documents.findById(req.params.id)
        if (!document) { res.status(404).send("Not found") }
        if (document.user.toString() !== userdata.id) { res.status(401).send("UnAuthorized || Not Allowed") }
        // console.log(document.doc)
        const oldfilepath = path.join(__dirname, '../Public/images/' + document.doc)
        // console.log(oldfilepath)
        deleteimagefile(oldfilepath)
        document = await Documents.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Succesfully deleted" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal serer Error h bhai" })
    }
}

module.exports = { Add_notes, Get_notes, Get_noteById, Update_notes, Delete_notes, Add_image, Get_image, Delete_Image, Add_document, Get_document, Delete_document }