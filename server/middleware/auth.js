import { clerkClient } from "@clerk/express";
// this function will protect our admin routes so anyone will not be able to access like add show api only admin can call it
// export const protectAdmin = async (req,res,next)=>{
//   try {
//     const {userId}= req.auth();
//     const user = await clerkClient.users.getUser(userId);
//     if(user.privateMetadata.role!=='admin'){
//       return res.json({success:false,message:"not authorized"});
//     }
    
//     next();
    
//   } catch (error) {
//     return res.json({success:false,message:"not authorized"})
//   }
// }

export const protectAdmin = async (req, res, next) => {
  try {
    const { userId } = req.auth();

    console.log("userId:", userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const user = await clerkClient.users.getUser(userId);

    if (user.privateMetadata.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};