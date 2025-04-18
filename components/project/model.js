const mongoose = require("mongoose");

const db = require("../../db");

const ProjectSchema = new mongoose.Schema(
    {
        name: String,
        summary: String,
        technology: String,
        status: String,
        timespan: String
    }
);

const Project = mongoose.model("Project", ProjectSchema);

async function InitializeProject(){
    const projectData = [
        {
            name: "Mensorama",
            summary: "Mensorama is an E-commerce website for men's grooming product.",
            technology: "Python, boostrap, Django, sql",
            status: "Completed",
            timespan: "December 2022 - April 2023"
        },
        {
            name: "Zip n' Go",
            summary: "Zip n' Go is a travel app that provides last-minute planners with a personalized packing list based on destination, duration, and travel dates.",
            technology: "HTML,CSS,JavaScript",
            status: "Completed",
            timespan: "November 2024 - December 2024"
        },
        {
            name: "MuseAndMasterpiece",
            summary: "Muse and Masterpiece is a platform where artists can showcase their work, explore other creations, and connect with the art community.",
            technology: "ASP.NET Core,C#,Entity Framework,SQL Server",
            status: "In Progress",
            timespan: "January 2025 - Present"
        }
    ];
    await Project.insertMany(projectData);
}


async function GetProject(){
    await db.connect();
    return await Project.find({});
}


async function AddProject(name,summary,technology,status,timespan){
    await db.connect();
    let newProject = new Project({
        name: name,
        summary: summary,
        technology: technology,
        status: status,
        timespan: timespan
    });

    return await newProject.save();
}

async function DeleteProject(id){
    await db.connect();
    let result = await Project.deleteOne({_id : id});
    console.log(result);
}

module.exports = {
    InitializeProject,
    GetProject,
    AddProject,
    DeleteProject
}
