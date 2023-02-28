const inquirer= require('inquirer');
const fs= require('fs');

const generateMarkdown= require('./utils/generateMarkdown')

// Created array to prompt questions for user

const userQuestions =[
    {
        type:'input',
        name:'title',
        message: 'Please enter your Project title. *',
        validate: titleInput => {
            if (titleInput) {
                return true;
            }
            else {
                console.log('Please enter Project title...*');
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please enter description of your Project. *',
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('Please enter description of your Project. *');
                return false;
            }
        }
    },
    {
        type: 'checkbox',
        name: 'contents',
        message: 'Choose Sections you would like to include in your README?',
        choices: [
            {
                name: 'Installation',
                checked: false
            },
            {
                name: 'Usage',
                checked: true
            },
            {
                name: 'License',
                checked: true
            },
            {
                name: 'Contributing',
                checked: false
            },
            {
                name: 'Tests',
                checked: false
            },
            {
                name: 'Questions',
                checked: true
            },
        ]
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Please list any required packages for installation of your application.',
        when: ({ contents }) => {
            if (contents.indexOf('Installation') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: installInput => {
            if (installInput) {
                return true;
            } else {
                console.log('Please enter installation instructions!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please provide information for using your application. (Required)',
        when: ({contents}) => {
            if (contents.indexOf('Usage') > -1){
                return true;
            } else {
                return false;
            }
            },
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Please provide information for using your application!');
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please provide license information.',
        choices: ['MIT', 'GNU', 'Apache 2.0', 'ISC'],
        default: 0,
        when: ({ contents }) => {
            if (contents.indexOf('License') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: licenseInput => {
            if (licenseInput) {
                return true;
            } else {
                console.log('Please provide license information!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Please enter your guidelines for contributing.',
        when: ({ contents }) => {
            if (contents.indexOf('Contributing') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: contributingInput => {
            if (contributingInput) {
                return true;
            } else {
                console.log('Please enter guidelines for contributing!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Please enter test information for your application.',
        when: ({ contents }) => {
            if (contents.indexOf('Tests') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: testsInput => {
            if (testsInput) {
                return true;
            } else {
                console.log('What packages are required to run tests for your application?');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'questions',
        message: 'Please provide an email address for others to reach you with questions.',
        when: ({ contents }) => {
            if (contents.indexOf('Questions') > -1) {
                return true;
            } else { 
                return false;
            }
        },
        validate: questionsInput => {
            if (questionsInput) {
                return true;
            } else {
                console.log('Please provide an email address!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'questions',
        message: 'Please enter your GitHub username. *',
        when: ({ contents }) => {
            if (contents.indexOf('Questions') > -1) {
                return true;
            } else { 
                return false;
            }
        },
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter your GitHub username!');
                return false;
            }
        }
    },
];

// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(`./content/${fileName}`, data, err => {
        if (err) {
            throw err
        };
        console.log('README created!')
    });
};
// function to initialize program
function init() {
    return inquirer.prompt(userQuestions);
};
// function call to initialize program
init()
    .then(answers => generateMarkdown(answers))
    .then(generatedReadme => writeToFile('README.md', generatedReadme))
    .catch(err => {
        console.log(err);
    });