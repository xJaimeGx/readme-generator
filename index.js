const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateMarkdown = require("./utils/generateMarkdown")
const writeFileAsync = util.promisify(fs.writeFile);

function promptUser(){
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the name of the project?",
        },

        {
            type: "input",
            name: "description",
            message: "Give a brief description about your project: "
        },

        {
            type: "input",
            name: "installation",
            message: "How do you install this project?",
        },

        {
            type: "input",
            name: "usage",
            message: "What would someone use this project for?"
        },

        {
            type: "input",
            name: "tests",
            message: "Are there any tests?"
        },

        {
            type: "input",
            name: "contribution",
            message: "Add any contributors: "
        },

        {
            type: "list",
            name: "license",
            message: "Choose your license: ",
            choices: [
                "Apache_2.0",
                "BSD 3",
                "BSD 2",
                "GPL",
                "LGPL",
                "MIT",
                "Mozilla 2.0",
                "Eclipse 2.0"
            ]
        },

        {
            type: "input",
            name: "username",
            message: "Submit your GitHub username: "
        },

        {
            type: "input",
            name: "email",
            message: "Enter your email: "
        }
    ]);
} 
 
async function init() {
    try {

        // Generate responses to the questions
        const content = await promptUser();
        const generateContent = generateMarkdown(content);

        // README.md is written to temp
        await writeFileAsync('./temp/README.md', generateContent);
        console.log('README.md file is done! Check the temp directory.');
    }   catch(err) {
        console.log(err);
    }
}
  
init();