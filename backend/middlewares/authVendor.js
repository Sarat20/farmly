import jwt from 'jsonwebtoken';

const authVendor = (req, res, next) => {
    try {
       
        const vToken = req.headers['vtoken']; 
        console.log("Received token from headers:", vToken);
        
        if (!vToken) throw new Error("Token not found");
        const token_decode = jwt.verify(vToken, process.env.JWT_SECRET_KEY);

        req.user = token_decode; 

        next();
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

export { authVendor };
