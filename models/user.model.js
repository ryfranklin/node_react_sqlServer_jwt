const res = require('express/lib/response')
const req = require('request')
const { poolPromise } = require('../config/database')

const login = async ( req, res ) => {
    const { email, password } = req.body;
  
    try {
      const pool = await poolPromise;

      const loginUserQuery = `EXEC sp_LoginUser @Email = '${email}', @Password = '${password}', @UserID = NULL OUTPUT`;
      const result = await pool.query(loginUserQuery);
  
      if (result.recordset[0].Result === 1) {
        const userID = result.output.parameters.UserID;
  
        // Create JWT token
        const token = jwt.sign(
          { userID: userID, email: email },
          "secretkeyappearshere",
          { expiresIn: "1h" }
        );
  
        res.status(200).json({
          success: true,
          data: {
            userID: userID,
            email: email,
            token: token,
            role: role,
          },
        });
      } else {
        const error = new Error("Wrong details please check at once");
        return next(error);
      }
    } catch (err) {
      console.log(err);
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
  };


const register = async ( req, res ) => {
  try {
    const { username, password } = req.body;

    // check if the username already exists in the database
    const checkUsernameQuery = `SELECT * FROM Users WHERE username = @Username`
    const existingUser = await db.query(checkUsernameQuery, { Username: username });

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert the user into the database
    const registerUserQuery = `INSERT INTO Users (username, password) VALUES (@Username, @Password)`;
    await db.query(registerUserQuery, { Username: username, Password: hashedPassword });

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' })
  }
};


module.exports = {
    login
    ,register
  }