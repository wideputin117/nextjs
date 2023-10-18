// define schema for users to create and sign in 
// import dependencies
import { Schema,model,models } from "mongoose";

const userSchema = new Schema({
    email:{
        type:String,
        unique:[true,'username already exist'],  // if the first one fails it runs the second argment in the arr
        required: [true,'Email is required'], // if the first one fails it runs the second argment in the arr
    },
    username:{
        type:String,
      required:[true,'Username is required'],
      match:[/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
  image:{
    type:String,

  }
})

// to create models in nextjs  || models.user checks if the user exists already in the datbase
const User = models.User || model('user',userSchema);
export default User;