const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const chalk = require('chalk')
const ConnectDB = require('./config/db')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
ConnectDB();

// Models
const User = require('./models/User')

// Middlewares
const verifyToken = require('./middlewares/verifyToken')
const checkRole = require('./middlewares/checkRole');



app.use(express.json())
const port = process.env.PORT || 8080
const JWT_SECRET = process.env.JWT_SECRET || 'MyJwtSecret'

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Register route
app.post('/api/register', async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt)

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
            });
        }

        const register = await User.create({
            username,
            email,
            password: hashedPassword
        })
        res.status(201).json(register);
        console.log(chalk.green("User is Created Successfully 🟢 !!!"))

    } catch (error) {
        console.error(chalk.red('🔴 Registration error:', error));
        res.status(500).json({
            message: 'Server error',
            error
        });

    }
})

// Login
app.post('/api/login', async (req, res) => {


    const {
        username,
        password
    } = req.body



    try {


        const MAX_ATTEMPTS = 5;
        const LOCK_TIME = 10 * 60 * 1000; // 10 minutes

        const now = Date.now();

        const user = await User.findOne({
            username
        })

        if (user.lockUntil && user.lockUntil > now) {
            return res.status(403).json({
                message: "Account is temporarily locked. Try again later."
            });
        }




        if (!user) {
            res.status(400).json("Invalid username or password")
            console.log(chalk.red("Invalid username or password"))
        }
        

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            res.status(400).json("Mismatch email or password")
            console.log(chalk.red("Mismatch email or password"))

            user.failedLoginAttempts += 1;

            if (user.failedLoginAttempts >= MAX_ATTEMPTS) {
                user.lockUntil = new Date(now + LOCK_TIME);
            }

            await user.save();
            return res.status(400).json({
                message: "Invalid credentials"
            });

        }




        const token = jwt.sign({
            userId: user._id,
            role: user.role
        }, JWT_SECRET, {
            expiresIn: '2d'
        })

        res.status(200).json({
            message: "User Successfully Loged In",
            token: token
        })


        // ✅ Password correct: reset lock
        user.failedLoginAttempts = 0;
        user.lockUntil = undefined;
        await user.save();



    } catch (error) {
        console.error(error)
    }
})


// User Profile 
app.get('/api/profile/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({
            error: 'Server error'
        });
    }
})





// Delete User
app.delete('/api/users/:id',verifyToken, checkRole('admin'), async (req, res) => {
    try {
        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid user ID format'
            });
        }
        const DeletedUsers = await User.findByIdAndDelete(id)
        if (!DeletedUsers) {
            res.status(404).json("User Not Found 🔴")
            console.log(chalk.green("User Not Found 🔴"))
        } else {
            res.status(200).json("User Delete Successfully")
            console.log(chalk.green("User Delete Successfully 🟢"))

        }

    } catch (error) {
        console.error(error)
    }
})



app.listen(port, () => {
    console.log(chalk.blue.underline(`Server is running on port ${port}`))
})