const bookings = require('../models/booking');
const userModel = require('../models/users')



getApprovalRequestList = async(req,res)=>{
    if(req.data.user.role === "admin"){
    try {
        const doctorsList = await userModel.find({ role: 'doctor', approval: 1 });
        res.status(200).json({ status : 200,doctorsList: doctorsList });
    } catch (error) {
        res.status(404).json(error);
    }
}
else{
    res.status(400).json({ status: 401 });
}
}

approveDoctor = async(req,res)=>{
    if(req.data.user.role == "admin"){
    try{
        const {id} = req.body
        const updateData ={
            approval:2
        }
         await userModel.findByIdAndUpdate(id,updateData,{new:true })
        res.status(200).json({status:200})
    
    }catch(error){
        res.status(500).json({status:500})
    
    }
    }else{ 
        res.status(400).json({status:401})
    

    }
}

getDoctorDetails=async(req,res)=>{
    if(req.data.user.role == "admin"){
        try{
            console.log(req.query.id)
            const id = req.query.id
            const updateData ={
                approval:2
            }
            const userDetails =await userModel.findById({_id:id})
            res.status(200).json(userDetails)
        
        }catch(error){
            console.log(error)
            res.status(500).json({status:500})
        
        }
        }
        else{
            res.status(400).json({status:401})
        }
}

getTotalPatientByDoctor = async (req,res) =>{
    try{


const details=  await bookings.aggregate([
{
$group: {
  _id: '$doctor_id', 
  uniquePatients: { $addToSet: '$patient_id' },
//  count: { $sum: 1 } 
}
},
{
$project: {
  _id: 1, 
  uniquePatientCount: { $size: '$uniquePatients' }, 
  //count: 1
}
},
{
$lookup: {
  from: 'users',
  localField: '_id',
  foreignField: '_id',
  as: 'doctorDetails'
}
},
// {
// $unwind: "$doctorDetails" // To deconstruct the array from the lookup
// }
])


    res.status(200).json(details)
    }catch(error){
        console.log(error)
        res.status(500).json({status:500}) 
    }

}

getTotalPAtientByDate = async (req,res)=>{
    try{
        const date = await bookings.aggregate([{ $group: { _id: null, maxDate: { $max: "$bookingDate" } } }])
        console.log(date)
        const maxDate = date[0].maxDate
        maxDate.setHours(0, 0, 0, 0)
        console.log(maxDate)
        maxDate.setDate(maxDate.getDate() -9);
        console.log(maxDate)

        const details=  await bookings.aggregate([
            {
              $match: {
                bookingDate: {
                  $gte: new Date(maxDate)
                }
              }
            },
            {
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$bookingDate" }
                },
                totalPatients: { $sum: 1 }
              }
            },
            {
              $sort: { _id: 1 }
            }
          ]);
          console.log(details.length)
          const transformedResult = details.reduce((acc, current) => {
            acc[current._id] = { totalPatients: current.totalPatients };
            return acc;
          }, {});

          res.status(200).json(transformedResult)
        }catch(error){
            console.log(error)
            res.status(500).json({status:500}) 
        }
}

module.exports = {
    getApprovalRequestList,
    approveDoctor,
    getTotalPatientByDoctor,
    getDoctorDetails,
    getTotalPAtientByDate
}