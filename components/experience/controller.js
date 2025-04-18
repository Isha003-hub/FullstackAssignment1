const experienceModel = require("./model");


// creating getallExperience to list all the experiences which is in experience.pug
const listofExperience = async(request,response) => {

    let DataofExperience = await experienceModel.getallExperience();

    if(!DataofExperience.length){
        await experienceModel.InitializeExperience();
        DataofExperience = experienceModel.getallExperience();
    }
    console.log(DataofExperience);
    response.render("experiences/list", {experience : DataofExperience});
};


const getallExperienceAPI = async(request,response) => {
    let experientList = await experienceModel.getallExperience();
    response.json(experientList);
}

// creating showAddForm to show the add form which is in add.pug
// Redirect to the experiences list page after successful submission
const showAddForm = async(request,response) => {
    response.render("experiences/add", );
}


// creating experienceInForm to submit the data inputted in the form
const AddNewExperience = async(request,response) => {

    let result = await experienceModel.addExperience(
        request.body.title,
        request.body.company,
        request.body.location,
        request.body.startYear,
        request.body.endYear,
        request.body.description);
    console.log(result);
    response.redirect("../list");
}


// creating DeleteExperienceById to delete the experience
const DeleteExperienceById = async(request,response) => {
    let id = request.query.expId;
    await experienceModel.DeleteExperience(id);
    console.log(id);
    response.redirect("../list");
}


module.exports = {
    listofExperience,
    showAddForm,
    AddNewExperience,
    DeleteExperienceById,
    getallExperienceAPI
};