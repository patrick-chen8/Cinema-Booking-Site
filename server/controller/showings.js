/**
 *  Defining the CRUD functions that will be called in routes/showings.js
 */
// importing model
const Showing = require("../models/showings");

// export createShowing function
exports.createShowing = async (req, res) => {
    let newShowing = new Showing({
        movie: req.body.movie,
        start: req.body.start,
        end: req.body.end,
        seats: req.body.seats,
        room: req.body.room
    });

    try  {
        await newShowing.save();
    } catch (e) {
        console.log(e);
        return res.json(e);
    }
    return res.json(newShowing)
};

// export editShowing
exports.editShowing = async (req, res) => {
    let showingID = req.body.showingID;
    let updatedShowing = {
        movie: req.body.movie,
        start: req.body.start,
        end: req.body.end,
        seats: req.body.seats,
        room: req.body.room
    }

    try  {
        let showing = Showing.findOneAndUpdate(showingID, updatedShowing);
        return res.json(showing);
    } catch (e) {
        console.log(e);
        return res.json(e);
    }
};

// export deleteShowing function
exports.deleteShowing = async (req, res) => {
    let showingID = req.body.showingID;

    try {
        let showing = await Showing.findOneAndRemove(showingID);
        return res.json({ message: "Showing Deleted" });
    } catch (e) {
        console.log(e);
        return res.json(e);
    }
};