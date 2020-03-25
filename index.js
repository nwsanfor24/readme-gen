const inquirer = require("inquirer");
const fs = require("fs");
const api = require("./api.js");

//Questions

const questions = [
    {
        type: "input",
        name: "username",
        message: "Please enter your Github username:"
    },
    {
        type: "input",
        name: "title",
        message: "What is the title of your projecT?"
    },
    {
        type: "input",
        name: "description",
        message: "Please write a description of your project"
    },
    {
        type: "input",
        name: "installation",
        message: "Please list the installation instructions for your project"
    },
    {
        type: "input",
        name: "usage",
        message: "What is the usage for this project?"
    },
    {
        type: "input",
        name: "license",
        message: "What is the project licensed under?"
    },
    {
        type: "input",
        name: "contribution",
        message: "Any contributions to this project?"
    },
    {
        type: "input",
        name: "tests",
        message: "What are the tests for this project?"
    }
];

function toFile(fileName, data) {
    fs.writeFile(fileName, data, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("README.md generated!");
    });
}

function askQuestions() {
    inquirer
    .prompt(questions)
    .then(function(answers) {
        api.getUser(`${answers.username}`).then(function(response) {

            let content = 
            `
            # ${answers.title}

            # ${answers.description}

            ## Table of Contents
            1) Installation Instructions (#Installation-Instructions)
            2) [Usage] (#Usage)
            3) [License] (#License)
            4) [Contributors] (#Contributors)
            5) [Tests] (#Tests)
            
            ## Installation Instructions
            ${answers.installation}

            ## Usage
            ${answers.usage}

            ## License
            ${answers.license}

            ## Contributors
            ${answers.contribution}

            ## Tests
            ${answers.test}

            GitHub Profile: https://github.com/${answers.username}
            Email: ${response.data.email}
            `;

            toFile("newREADME.md", content);
        });
    });
}

askQuestions();