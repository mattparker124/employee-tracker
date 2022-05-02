const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
const inquirer = require('inquirer');
const axios = require('axios');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

const mainMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'selectedTask',
            message: 'What would you like to do? (Press Ctrl+C to quit at any time)',
            choices: ['View departments', 'View roles', 'View employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee']
        }
    ]).then(taskData => {
        if (taskData.selectedTask === 'View departments') {
            return['http://localhost:3001/api/departments', 'GET'];
        } else if (taskData.selectedTask === 'View roles') {
            return['http://localhost:3001/api/roles', 'GET'];
        } else if (taskData.selectedTask === 'View employees') {
            return['http://localhost:3001/api/employees', 'GET'];
        } else if (taskData.selectedTask === 'Add a department') {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'depName',
                    message: 'Enter a department name',
                    validate: nameInput => {
                        if (nameInput) {
                            return true;
                        }
                        else {
                            console.log('Please enter a department name');
                            return false;
                        }
                    },
                }
            ])
        } else if (taskData.selectedTask === 'Add a role') {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'roleName',
                    message: 'Enter a role name',
                    validate: nameInput => {
                        if (nameInput) {
                            return true;
                        }
                        else {
                            console.log('Please enter a role name');
                            return false;
                        }
                    },
                },
                {
                    type: 'number',
                    name: 'salary',
                    message: 'Enter a salary',
                    validate: salaryInput => {
                        if (salaryInput) {
                            return true;
                        }
                        else {
                            console.log('Please enter a salary');
                            return false;
                        }
                    },
                },
                {
                    type: 'number',
                    name: 'roleDep',
                    message: 'Please enter the Department ID this role will be under',
                    validate: depInput => {
                        if (depInput) {
                            return true;
                        }
                        else {
                            console.log('Please enter a department ID');
                            return false;
                        }
                    },
                }
            ])
        } else if (taskData.selectedTask === 'Add an employee') {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter a first name',
                    validate: nameInput => {
                        if (nameInput) {
                            return true;
                        }
                        else {
                            console.log('Please enter a first name');
                            return false;
                        }
                    },
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Enter a last name',
                    validate: name2Input => {
                        if (name2Input) {
                            return true;
                        }
                        else {
                            console.log('Please enter a last name');
                            return false;
                        }
                    },
                },
                {
                    type: 'number',
                    name: 'roleId',
                    message: 'Enter a role ID for the employee',
                    validate: roleInput => {
                        if (roleInput) {
                            return true;
                        }
                        else {
                            console.log('Please enter a first name');
                            return false;
                        }
                    },
                },
                {
                    type: 'number',
                    name: 'managerId',
                    message: 'Enter a manager ID for the employee',
                    validate: managerInput => {
                        if (managerInput) {
                            return true;
                        }
                        else {
                            console.log('Please enter a first name');
                            return false;
                        }
                    },
                }
            ])
        } else if (taskData.selectedTask === 'Update an employee') {
            return inquirer.prompt([
                {
                    type: 'number',
                    name: 'employeeId',
                    message: 'Please enter the employee ID you would like to edit',
                    validate: employeeInput => {
                        if (employeeInput) {
                            return true;
                        }
                        else {
                            console.log('Please enter an ID');
                            return false;
                        }
                    },
                },
                {
                    type: 'number',
                    name: 'updateRole',
                    message: 'Please enter the role ID you would like to change to',
                    validate: roleInput => {
                        if (roleInput) {
                            return true;
                        }
                        else {
                            console.log('Please enter an ID');
                            return false;
                        }
                    },
                }
            ]);
        }
    }).then(taskInfo => {
        if (taskInfo[1] === 'GET') {
            return taskInfo;
        } else if (taskInfo.depName) {
            return [`http://localhost:3001/api/department`, 'POST', taskInfo.depName];
        } else if (taskInfo.roleName) {
            return [`http://localhost:3001/api/role`, 'POST', taskInfo.roleName, taskInfo.salary, taskInfo.roleDep];
        } else if (taskInfo.firstName) {
            return [`http://localhost:3001/api/employee`, 'POST', taskInfo.firstName, taskInfo.lastName, taskInfo.roleId, taskInfo.managerId];
        } else if (taskInfo.updateRole) {
            return [`http://localhost:3001/api/employee/${taskInfo.employeeId}`, 'PUT', taskInfo.updateRole];
        }
    }).then(taskReturn => {
        if (taskReturn[1] === 'GET') {
            return axios.get(taskReturn[0]);
        } else if (taskReturn[1] === 'POST' && taskReturn[0] === `http://localhost:3001/api/department`) {
            return axios.post(taskReturn[0], {
                name: taskReturn[2],
            });
        } else if (taskReturn[1] === 'POST' && taskReturn[0] === `http://localhost:3001/api/role`) {
            return axios.post(taskReturn[0], {
                title: taskReturn[2],
                salary: taskReturn[3],
                department_id: taskReturn[4]
            });
        } else if (taskReturn[1] === 'POST' && taskReturn[0] === `http://localhost:3001/api/employee`) {
            return axios.post(taskReturn[0], {
                first_name: taskReturn[2],
                last_name: taskReturn[3],
                role_id: taskReturn[4],
                manager_id: taskReturn[5]
            });
        } else {
            return axios.put(taskReturn[0], {
                role_id: taskReturn[2],
            });
        }
    }).then(taskResponse => {
        console.table(taskResponse.data.data);
        mainMenu();
    }).catch(error => {
        console.error(error);
    })
}

mainMenu();