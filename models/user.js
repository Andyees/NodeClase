const mongoose=require("mongoose")

const schema=mongoose.Schema

const ScehmaUser=new schema({

    Name:{type:String,required:true},
    LastName:{type:String,required:true},
    Cedula:{type:String,required:true},
    Celular:String

})

module.exports=mongoose.model("users",ScehmaUser)

