const mongoose = require("mongoose");
const database = "Registered_Complaints"

const DB = `mongodb+srv://rrajofficial5:IxUE8MjYNtjqdspS@cluster0.ogrmntj.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`


//Handling get, insert and update of student complaint data

//Failed Attempt trying to implement a counter based auto incrementing id

// Define schema for the counter collection
const counterSchema = new mongoose.Schema({
    ComplaintId: Number,
    ServerId: Number
});

// Create model for the counter collection
const CounterModel = mongoose.model("Counter", counterSchema);

// Function to get and increment counter
async function generateNewComplaintId() {
    try {
        let counter = await CounterModel.findOneAndUpdate({ ServerId: 1 }, { $inc: { ComplaintId: 1 } }, { new: true });
        console.log("New Complaint ID generated: ", counter.ComplaintId);
        return counter.ComplaintId;
    } catch (err) {
        console.error("Error generating new complaint ID:", err);
        throw err; // Rethrow the error for handling at a higher level
    }
}

const complaintSchema = new mongoose.Schema({
    Complaint_Id: {
        type: Number,
        // unique: true
    },
    Complaint_logged_On: String,
    Student_IdNo: String,
    username: String,
    fullname: String,
    Category: String,
    sub_category: String,
    sub_sub_category: String,
    User_department: String,
    location: String,
    location_no: String,
    Mobile_no: String,
    available_day: String,
    description: String,
    status: String,
    Forwarded_To_Incharge: String,
    Remarks: String
});

// Define a pre-save hook to generate and increment the Complaint_Id
// complaintSchema.pre("save", async function (next) {
//     try {
//         if (!this.Complaint_Id) {
//             this.Complaint_Id = await getNextSequenceValue("complaintId");
//         }
//         next();
//     } catch (err) {
//         next(err);
//     }
// });

const ComplaintsModel = mongoose.model("StudentComplaints", complaintSchema);

// <---------------------------------------------------Admin Data Changes----------------------------------------------------------> //

async function getAllStudentComplaints() {
    try {
        const complaints = await ComplaintsModel.find({}).sort({ Complaint_Id: -1 });
        console.log("Fetched all complaints data from database successfully");
        return complaints;
    } catch (err) {
        console.error("Error: Could not get complaints from database", err);
        return null;
    }
}

async function updateStudentComplaints(newData) {
    const complaintId = newData.id;
    try {
        if (newData.status) {
            // If newData has status property, update status
            await ComplaintsModel.updateOne({ Complaint_Id: complaintId }, { status: newData.status });
            console.log("Complaint status updated successfully for complaint id: ", complaintId);
        }

        if (newData.attendant) {
            // If newData has attendant property, update attendant
            await ComplaintsModel.updateOne({ Complaint_Id: complaintId }, { Forwarded_To_Incharge: newData.attendant });
            console.log("Complaint attendant updated successfully for complaint id: ", complaintId);
        }
    } catch (err) {
        console.error("Error: Could not update Data", err);
        console.log("Name: ", newData.fullname);
        console.log("UserName: ", newData.username);
    }
}
// <---------------------------------------------------Student Data Changes----------------------------------------------------------> //

async function getStudentComplaints(userName) {
    try {
        const complaints = await ComplaintsModel.find({ username: userName }).sort({ Complaint_Id: -1 });;
        console.log("Fetched student complaints data from database successfully")
        console.log("UserName: ", userName);
        return complaints;
    } catch (err) {
        console.error("Error: Could not get complaints from database", err);
        console.log("UserName: ", userName);
        return null;
    }
}

async function insertStudentComplaints(complaintsData) {
    const newID = await generateNewComplaintId();
    complaintsData.Complaint_Id = newID;
    try {
        await ComplaintsModel.insertMany(complaintsData);
        console.log("Complaint data inserted successfully");
        console.log("Name: ", complaintsData.fullname);
        console.log("UserName: ", complaintsData.username);
    } catch (err) {
        console.error("Error: Could not insert Data\n");
        console.log("Name: ", complaintsData.fullname);
        console.log("UserName: ", complaintsData.username, err);
    }
}

// <---------------------------------------------------Technician Data Changes----------------------------------------------------------> //

async function getStudentComplaintsForAttendant(attendantName) {
    try {
        const complaints = await ComplaintsModel.find({
            Forwarded_To_Incharge: attendantName,
            status: "Pending" // Add filter for status field
        }).sort({ Complaint_Id: -1 });;
        console.log("Fetched student complaints data from database successfully for attendant:", attendantName);
        return complaints;
    } catch (err) {
        console.error("Error: Could not get complaints from database", err);
        console.log("Attendant: ", attendantName);
        return null;
    }
}

async function updateStudentComplaintsRemark(newData) {
    const complaintId = newData.id;
    const newRemark = newData.remark
    try {
        await ComplaintsModel.updateOne({ Complaint_Id: complaintId }, { Remarks: newRemark });
        console.log("Complaint remark updated successfully for complaint id: ", complaintId);

    } catch (err) {
        console.error("Error: Could not update remark", err);
        console.log("Name: ", newData.fullname);
        console.log("UserName: ", newData.username);
    }
}

// async function updateStudentComplaints(complaintId, newData) {
//     try {
//         await ComplaintsModel.updateOne({ Complaint_Id: complaintId }, newData);
//         console.log("Complaint data updated successfully");
//         console.log("Name: ",complaintsData.fullname);
//         console.log("UserName: ",complaintsData.username);
//     } catch (err) {
//         console.error("Error: Could not update Data", err);
//         console.log("Name: ",complaintsData.fullname);
//         console.log("UserName: ",complaintsData.username);
//     }
// }

// Handling inserting and updating student complaint image data

const complaintImageSchema = new mongoose.Schema({
    Complaint_Id: String,
    FileName: String,
    FileType: String,
    File_Extension: String,
    FileSize: Number,
    Image_Data: Buffer,
    Upload_Sequence_Number: Number,
    Uploaded_On: String
});

const ComplaintImageModel = mongoose.model("ComplaintImages", complaintImageSchema);

async function insertStudentComplaintImages(complaintImageData) {
    try {
        await ComplaintImageModel.insertMany(complaintImageData);
        console.log("Complaint image data inserted successfully");
    } catch (err) {
        console.error("Error: Could not insert image Data", err);
    }
}

async function updateStudentComplaintImages(complaintId, newData) {
    try {
        await ComplaintImageModel.updateOne({ Complaint_Id: complaintId }, newData);
        console.log("Complaint image data updated successfully");
    } catch (err) {
        console.error("Error: Could not update image Data", err);
    }
}

module.exports = {
    getStudentComplaintsForAttendant, updateStudentComplaints, getAllStudentComplaints,
    insertStudentComplaintImages, updateStudentComplaintImages, insertStudentComplaints, updateStudentComplaints,
    getStudentComplaints, updateStudentComplaintsRemark, generateNewComplaintId
};
