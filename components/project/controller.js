const projectModel = require("./model");

const listAllProject = async(request,response) => {
    let projectData = await projectModel.GetProject();
    if(!projectData.length){
        await projectModel.InitializeProject();
        projectData = projectModel.GetProject();
    }
    console.log(projectData);
    response.render("projects/list",{project : projectData});
};


const GetProjectAPI = async(request,response) => {
    let projectList = await projectModel.GetProject();
    response.json(projectList);
}


const showAddForm = async(request,response) => {
    response.render("projects/add");
}; 


const AddNewProject = async(request,response) =>{
    let result = await projectModel.AddProject(
        request.body.name,
        request.body.summary,
        request.body.technology,
        request.body.status,
        request.body.timespan
    );

    console.log(result);
    response.redirect("../list"); 
};



const DeleteProjectById = async(request,response) =>{
    let id = request.query.projId;
    await projectModel.DeleteProject(id);
    console.log(id);
    response.redirect("../list");
};



module.exports = {
    listAllProject,
    showAddForm,
    AddNewProject,
    DeleteProjectById,
    GetProjectAPI
}