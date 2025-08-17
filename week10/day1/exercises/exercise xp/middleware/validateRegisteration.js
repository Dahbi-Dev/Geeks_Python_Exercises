

export const validateRegistration = (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            error: "Username, email, and password are required",
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            error: "Password must be at least 6 characters long",
        });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            error: "Please enter a valid email address",
        });
    }

    next();
};

