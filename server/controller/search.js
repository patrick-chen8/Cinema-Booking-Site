/**
 *  Defining the search function
 */
// importing model
const Movies = require("../models/movies");

// defining search function which will be called in routes/search
exports.search = async (req, res) => {
    
    try {
        console.log(req.body.title, req.body.category, req.body.availability)
        movies = await search(req.body.title, req.body.category, req.body.availability)
        return res.json(movies);
    } catch (e) {
        console.log(e);
        return res.json(e);
    }
};

// building the query based off of user inputs in each search bar
async function search(titleSearch, genreSearch, availabilitySearch) {
    console.log(titleSearch);
    console.log(genreSearch);
    console.log(availabilitySearch);
    const searchList = await Movies.find({});
    if (titleSearch != "") {
        searchList = getTitle(searchList, titleSearch);
    }
    if (genreSearch != "") {
        searchList = getGenre(searchList, genreSearch);
    }
    if (availabilitySearch != "All") {
        searchList = getAvailability(searchList, availabilitySearch);
    }
}

async function getTitle(list, titleSearch) {
    const result = list.find({title: {$regex: titleSearch}});
    
    return result;
}

async function getGenre(list, genre) {
    const result = list.find({category: genre});
    
    return result;
}

async function getAvailability(list, availabilitySearch) {
    const result = list.find({availability: availabilitySearch});
    
    return result;
}

