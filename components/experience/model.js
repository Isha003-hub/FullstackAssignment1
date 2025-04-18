const mongoose = require("mongoose");


// bringing db.js file (because of the connection string to the database)
const db = require("../../db");


// craeting the schema on how our document will look in a json object
const ExperienceSchema = new mongoose.Schema(
    {
        title: String,
        company: String,
        location: String,
        startYear: Number,
        endYear: Number,
        description: String

    }
);


// creating model so that it creates Experiences collection in database in mongodb atlas on the basis of ExperienceSchema
const Experience = mongoose.model("Experience", ExperienceSchema);


// forming a function InitializeExperience which will create the collection with these initial data/enteries when the collection doesn't have any data/entry
async function InitializeExperience(){
    const experienceData = [
        {
            title: "Web Developer",
            company: "Indus Infrastructure",
            location: "Ahmedabad, india",
            startYear: 2023,
            endYear: 2024,
            description: "Web developer worked with different programming lagnaguges including Front-end and Back-end."

        },
        {
            title: "Customer Services",
            company: "Prmosie Academy",
            location: "Ahmedabad, India",
            startYear: 2024,
            endYear: 2024,
            description: "Provided excellent customer service with admin work and scheduling time table and operating all the office works."

        }
    ];

    await Experience.insertMany(experienceData);

}


// forming function getExperience to get all the experience data
async function getallExperience(){
    await db.connect();
    return await Experience.find({});
}


// forming an addExperience function to add experience data
async function addExperience(title,company,location,startYear,endYear,description){
    await db.connect();
    let newExperience = new Experience({
        title: title,
        company: company,
        location: location,
        startYear: startYear,
        endYear: endYear,
        description: description
    });

    let result = await newExperience.save();
    console.log(result);
}


// forming a deleteExperience function to delete experience by id
async function DeleteExperience(id){
    await db.connect();
    let result = await Experience.deleteOne({_id : id});
    console.log(result);
}


// export all the functions to access them outside
module.exports = {
    InitializeExperience,
    getallExperience,
    addExperience,
    DeleteExperience
}