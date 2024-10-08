const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

// As a databse we will use a json file found in database/users.json
// The file contains an array of user objects
const users = require('../../database/users.json');
const inactiveUsers = require('../../database/inactiveUsers.json');

const registerUser = async (req, res) => {
    const { username, password, email, displayName} = req.body;

    // Validate request data
    if (!username || !password || !email || !displayName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate password complexity
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'The password complexity requirements are not met. The password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.' });
    }

    // Check in users.json if the user already exists
    const existingUser = users.find(user => user.username === username || user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }  

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find the maximum ID in the users array using a for loop
    let users_maxId = 0;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id > users_maxId) {
            users_maxId = users[i].id;
        }
    }

    // Find the maximum ID in the inactiveUsers array using the for loop
    let inactiveUsers_maxId = 0;
    for (let i = 0; i < inactiveUsers.length; i++) {
        if (inactiveUsers[i].id > inactiveUsers_maxId) {
            inactiveUsers_maxId = inactiveUsers[i].id;
        }
    }

    // Find the maximum value between users_maxId and inactiveUsers_maxId
    const maxId = Math.max(users_maxId, inactiveUsers_maxId) + 1;
    
    // Create a new user object
    const newUser = {
        id: maxId,
        username,
        email,
        password: hashedPassword,
        displayName,
        timestamp: new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' }), // Convert timestamp to Romanian timezone
    };
  
    // Add the new user to the users array
    users.push(newUser);

    // Write the updated users array to the users.json file
    fs.writeFile(path.join(__dirname, '../../database/users.json'), JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: 'An error occurred while writing to the database' });
        }
    });
 
    // Respond with success and the id of the newly created user
    res.status(201).json({ message: 'User created successfully', id: maxId });

};

const loginUser = (req, res) => {
    const { username, password } = req.body;

    // Validate request data
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if the user exists
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare the password
    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
            return res.status(500).json({ message: 'An error occurred while comparing passwords' });
        }

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Redirect to the dashboard upon successful login
        res.redirect('/dashboard');
    });
};

module.exports = { registerUser, loginUser };