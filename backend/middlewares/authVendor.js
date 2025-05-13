import jwt from 'jsonwebtoken';

const authVendor = (req, res, next) => {
    try {
        // Access the token from the headers
        const vToken = req.headers['vtoken']; // Use 'vtoken' or 'VToken' based on your client-side implementation
        console.log("Received token from headers:", vToken);
        
        if (!vToken) throw new Error("Token not found");

        // Verify the token
        const token_decode = jwt.verify(vToken, process.env.JWT_SECRET_KEY);
        
        // Optionally, you can attach the decoded token to the request object
        req.user = token_decode; // This allows you to access user info in the next middleware or route handler

        next();
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

export { authVendor };
