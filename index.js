const fs = require("fs");
const axious = require("axios");
const inquirer = require("inquirer");

let userBio;
let userImg;
let userEmail;
let readMe;


function askUserName() {
    return new Promise((resolve, reject) => {
        inquirer
            .prompt([
                {
                    type: `input`,
                    message: `\n-------------------------------------------------\nWhat is your GitHub user name?\n-------------------------------------------------\n`,
                    name: `githubUser`,
                }
            ]).then(({ githubUser }) => {
                return resolve(githubUser);
            });
    });
};

function getUserInfo(userName) {

    return axious.get(`https://api.github.com/users/${userName}`)
        .then(function (response) {
            console.log(`\nUser "${userName}" has been found!\n`);
            userBio = response.data.bio;
            userImg = response.data.avatar_url;
            userEmail = response.data.email;
        }).catch(function (error) {
            console.log(`\nUser "${userName}" not found. Please try again.\n`);
            process.exit(1);
        });

};

function getProjectInfo() {
    return new Promise((resolve, reject) => {

        inquirer
            .prompt([
                {
                    type: `input`,
                    message: `\n-------------------------------------------------\nProject Title:\n-------------------------------------------------\n`,
                    name: `projectTitle`
                },
                {
                    type: `input`,
                    message: `\n-------------------------------------------------\nProject Description (2-3 sentences):\n-------------------------------------------------\n`,
                    name: `projectDescription`
                },
                {
                    type: `input`,
                    message: `\n-------------------------------------------------\nHow is this project installed?\n-------------------------------------------------\n`,
                    name: `projectInstall`
                },
                {
                    type: `input`,
                    message: `\n-------------------------------------------------\nHow is this project used?\n-------------------------------------------------\n`,
                    name: `projectUsage`
                },
                {
                    type: `list`,
                    name: `projectLicense`,
                    message: `\n-------------------------------------------------\nWhat is the License on your project?\n-------------------------------------------------\n`,
                    choices: [`None`, `Apache License 2.0`, `GNU General Public License v3.0`, `MIT License`, `BSD 2-Clause "Simplified" License`, `BSD 3-Clause "New" or "Revised" License`, `Creative Commons Zero v1.0 Universal`, `Eclipse Public License 2.0`, `GNU Affero General Public License v3.0`, `GNU General Public License v2.0`, `GNU Lesser General Public License v2.1`, `GNU Lesser General Public License v3.0`, `Mozilla Public License 2.0`, `The Unlicense`]

                },
                // {
                //     type: `input`,
                //     name: `projectTesting`,
                //     message: `Any testing you did that you woud like included in your readme.md?`
                // },
                {
                    type: `input`,
                    name: `additionalCollab`,
                    message: `\n-------------------------------------------------\nAny other collaborators on your project?\n-------------------------------------------------\n`
                }
            ]).then((answers) => {
                let answersBadge = answers.projectLicense.replace(/ /gi, `%20`);
                return resolve(
                readMe = 
`# ${answers.projectTitle}
    
${answers.projectDescription}
    
## Table of Contents
    
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Questions](#questions)     
## Installation
${answers.projectInstall}
## Usage
${answers.projectUsage}
## License
[![${answers.projectLicense}](https://img.shields.io/badge/License-${answersBadge}-green)]()
## Contributing
${answers.additionalCollab}
## Questions
${userBio}
${userEmail}
![Developer Photograph](${userImg})
    `
            )}).catch(() => {
                console.log(`\nSomething went wrong... please try again.\n`);
                process.exit(1);
            })
    });
};

function generateReadme() {
    fs.writeFile("README.md", readMe, function (err) {

        if (err) {
            return console.log(err);
        }

        console.log(`\nYour readme.md file is now ready!\n`);

    });
}

askUserName().then(getUserInfo).then(getProjectInfo).then(generateReadme);

// const inquirer = require("inquirer");
// const fs = require("fs");
// const api = require("./api.js");

// function userName() {
//     return new Promise((resolve, reject) => {
//         inquirer
//             .prompt([
//                 {
//                     type: 'input',
//                     message: 'Please enter your GitHub username',
//                     name: 'githubUser',
//                 }
//             ]).then(({ githubUser }) => {
//                 return resolve(githubUser);
//             });
//     });
// };

// //Questions

// function questions() {
//     return new Promise((resolve, reject) => {
//         inquirer
//             .prompt([
//                 {
//                     type: "input",
//                     name: "title",
//                     message: "What is the title of your projecT?"
//                 },
//                 {
//                     type: "input",
//                     name: "description",
//                     message: "Please write a description of your project"
//                 },
//                 {
//                     type: "input",
//                     name: "installation",
//                     message: "Please list the installation instructions for your project"
//                 },
//                 {
//                     type: "input",
//                     name: "usage",
//                     message: "What is the usage for this project?"
//                 },
//                 {
//                     type: "input",
//                     name: "license",
//                     message: "What is the project licensed under?"
//                 },
//                 {
//                     type: "input",
//                     name: "contribution",
//                     message: "Any contributions to this project?"
//                 },
//                 {
//                     type: "input",
//                     name: "tests",
//                     message: "What are the tests for this project?"
//                 }
//             ]);
//     }).then((answers) => {
//         return resolve(answers);
//     }).catch(() => {
//         console.log('Something went wrong, please try again');
//         process.exit(1);
//     });
// }

// function toFile(fileName, data) {
//     fs.writeFile(fileName, data, function(err) {
//         if (err) {
//             console.log(err);
//         }
//         console.log("README.md generated!");
//     });
// }

// function askQuestions() {
//         api.getUser(`${answers.githubUser}`).then(function(response) {

//             let content = 
//             `
//             # ${answers.title}

//             # ${answers.description}

//             ## Table of Contents
//             1) Installation Instructions (#Installation-Instructions)
//             2) [Usage] (#Usage)
//             3) [License] (#License)
//             4) [Contributors] (#Contributors)
//             5) [Tests] (#Tests)
            
//             ## Installation Instructions
//             ${answers.installation}

//             ## Usage
//             ${answers.usage}

//             ## License
//             ${answers.license}

//             ## Contributors
//             ${answers.contribution}

//             ## Tests
//             ${answers.test}

//             GitHub Profile: https://github.com/${answers.username}
//             Email: ${response.data.email}
//             `;

//             toFile("newREADME.md", content);
//         });
// }

// userName().then(questions).then(askQuestions).then(toFile);