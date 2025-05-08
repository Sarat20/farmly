import jwt from 'jsonwebtoken'
const authuser=(req,res,next)=>{
    try {
        const {token}=req.headers;
        if(!token)throw new Error("token not found")
        const token_decode=jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.body.userId=token_decode.id;
        next();
        
    } catch (error) {
         
        res.statu(401).json({success:true,message:error.message });
    }
}
export {authuser}