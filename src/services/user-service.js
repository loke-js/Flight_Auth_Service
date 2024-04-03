const UserRepository =require('../repository/user-repository');
const jwt=require('jsonwebtoken');
const {JWT_KEY}=require('../config/serverConfig');
const bcrypt=require('bcrypt');
class UserService{
    
    constructor(){
        this.userRepository=new UserRepository();

    }

    async create(data){
        try{
            const user=await this.userRepository.create(data);
            return user;
        }catch(error){
            console.log("something went wrong in the service layer");
            throw error;
        }
    }

    async signIn(email,plainPassword){
        try{
            const user = await this.userRepository.getByEmail(email);
            const passwordMatch=this.checkPassword(plainPassword,user.password);
            if(!passwordMatch){
                console.log("Password doesn't match");
                throw {error: 'Incorrect password'};
            }
            const newJWT = this.createToken({email:user.email,id:user.id});
            return newJWT;
        }catch(error){
            console.log("something went wrong in the sign in process");
            throw error;
        }
    }
    
    async isAuthenticated(token){
        try{
            const response=this.verifyToken(token);
            if(!response){
                throw {error:'Invalid Token'};
            }
            const user = this.userRepository.getById(response.id);
            if(!user){
                throw {error:'User not found'};
            }
            return user.id; 
        }catch(error){
            console.log("something went wrong in the auth process");
            throw error;
        }
    }

     createToken(user) {
        try{
            const result =jwt.sign(user,JWT_KEY);
            return result;   
        }catch(error){
            console.log("something went wrong in token creation");
            throw error;
        }
     }
     verifyToken(token) {
        try{
            const response =jwt.verify(token,JWT_KEY);
            return response;
        }catch(error){
            console.log("something went wrong in the token validation");
            throw error;
        }
     }

     checkPassword(userInputPlainPassword,encryptedPassword){
         try{
           return bcrypt.compareSync(userInputPlainPassword,encryptedPassword); 
         }catch(error){
            console.log("something went wrong in password comparison");
            throw error;
         }
     }
}

module.exports=UserService;