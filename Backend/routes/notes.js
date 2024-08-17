const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

//Route 1:Get all the notes  user detail using :GET "/api/notes/fetchNotes"
router.get("/fetchNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error  has been occured");
  }
});
//Route 2 :adda new notes   POST "/api/notes/addNotes"
router.post(
  "/addNotes",
  fetchUser,
  [
    body("titile", "Enter a valid name").isLength({ min: 3 }),
    body("description", "description must be  min 5 charactes ").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //if any error come then return badrequest
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors) {
        return res.status(402).json({ errors: errors.arrary() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error  has been occured");
    }
  }
);
//Route 3:Update and existing notes  user detail using :PUT "/api/notes/updatenotes"
router.put("/updatenotes/:id", fetchUser, async (req, res) => {
  try{
  //get title description from request body
  const { title, description, tag } = req.body;
  //create a new note object
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
  //find notes for update and update it
  //get id from request /updatenotes/:id(this user enter id)
  //check this id with user id in database
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not found");
  }
  //if id not match with
  if (note.user.toString() != req.user.id) {
    return res.status(404).send("Not Allowed");
  }
  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json({ note });
}catch (error) {
    console.log(error.message)
      res.status(404).send("Internal error has been occured");
  }
});

//Route 4:CHECK ID AND DELETE A NOTES :DELETE "/api/notes/deltenode/:id"

router.delete("/deletenode/:id", fetchUser, async (req, res) => {

  try {
    
  const { title, description, tag } = req.body;
  

   //find notes for update and update it
  //get id from request /updatenotes/:id(this user enter id)
  //check this id with user id in database


  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("not found");
  }
  // ALLOW USER TO DELETE NODEIF OWNS
  if (note.user.toString() != req.user.id) {
    return res.status(404).send("Not allowed");
  }
  note = await Notes.findByIdAndDelete(req.params.id);
  res.json({ Succes:"succesfuly delete this note" ,note:note});
} catch (error) {
  console.log(error.message)
    res.status(404).send("Internal error has been occured");
}
});

  




module.exports = router;
