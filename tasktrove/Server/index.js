const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const UserModel = require("./model/UserData");
const CompanyModal = require("./model/CompanyData");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");


// require database connection
const CompanyDetailsModal = require("./model/CompanyDetails");
const ContactModal = require("./model/Contact_Data");
const Rating = require("./model/ratingSchema");
const Message = require("./model/messageSchema");

// const userRoutes = require("./routes/users");
// const transactionRoutes = require("./routes/transactions");
// const GoalsRoutes=require("./routes/goals")
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());


// "mongodb+srv://rahuljainrj2104:rj210402@clusterrj.gymocwi.mongodb.net/TaskTrove?retryWrites=true&w=majorityv";
const databaseurl ="mongodb+srv://rahuljainrj2104:rj210402@clusterrj.gymocwi.mongodb.net/TaskTrove?retryWrites=true&w=majority";
  
mongoose.connect(databaseurl);
app.listen(3001, () => {
  console.log("Server is running");
});


app.get("/", async (req, res) => {
  const data = await UserModel.find();
  res.send(data);
});

app.post("/register", async (req, res) => {
  const { FirstName, LastName, Email, Password } = req.body;
  console.log(req.body);
  UserModel.findOne({ Email: Email }).then((user) => {
    if (user) {
      return res.json({
        Status: "oldUser",
      });
    } else {
      bcrypt
        .hash(Password, 10)
        .then((hash) => {
          UserModel.create({ FirstName, LastName, Email, Password: hash })
            .then((Users) => res.json(Users))
            .catch((err) => res.json(err));
        })
        .catch((err) => res.json(err));
    }
  });
});

app.post('/contact', async (req, res) => {
  const { Name, Email, Subject, Description } = req.body;

  try {
    const newContact = await ContactModal.create({
      Name,
      Email,
      Subject,
      Description
    });

    res.json({ message: 'Contact form data saved successfully', contact: newContact });
  } catch (error) {
    console.error('Error saving contact form data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/login", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    let user = await UserModel.findOne({ Email: Email });

    if (!user) {
      user = await CompanyModal.findOne({ Email: Email });
      if (user) {
        bcrypt.compare(Password, user.Password, (err, response) => {
          if (response) {
            return res.json({
              Status: "Success",
              u_type: "company",
              Name: user.FirstName,
              Email: user.Email,
            });
          } else {
            return res.json("The password is incorrect");
          }
        });
      } else {
        return res.json("No such user exists");
      }
    } else {
      bcrypt.compare(Password, user.Password, (err, response) => {
        if (response) {
          return res.json({
            Status: "Success",
            u_type: "user",
            Name: user.FirstName,
            Email: user.Email,
          });
        } else {
          return res.json("The password is incorrect");
        }
      });
    }
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
});

app.post("/register-company", async (req, res) => {
  const { Name, Email, City, Password } = req.body;
  console.log(req.body);
  CompanyModal.findOne({ Email: Email }).then((user) => {
    if (user) {
      return res.json({
        Status: "oldUser",
      });
    } else {
      bcrypt
        .hash(Password, 10)
        .then((hash) => {
          CompanyModal.create({
            Name,
            Email,
            City,
            Password: hash,
          })
            .then((Company) => res.json(Company))
            .catch((err) => res.json(err));
        })
        .catch((err) => res.json(err));
    }
  });
});

app.get("/register-company/:company_email", async (req, res) => {
  try {
    const {company_email}=req.params;
    const companies = await CompanyModal.find({ Email: company_email });
    return res.json(companies);
  } catch (err) {
    return res.json(err);
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

// POST route to save book data to MongoDB
app.post("/company-home", upload.single("ProfilePicture"), async (req, res) => {
  const { B_Name, Email, Service, Service_Type, State, City, Address, C_Link, O_Time, C_Time, E_Year } =
    req.body;
  console.log("here is the post request data :", req.body);

  try {
    const newCompany = new CompanyDetailsModal({
      B_Name,
      Email,
      Service,
      Service_Type,
      State,
      City,
      Address,
      C_Link,
      O_Time,
      C_Time,
      E_Year,
      ProfilePicture: req.file ? req.file.path : "",
    });

    const savedCompany = await newCompany.save();
    res.json(savedCompany);
  } catch (error) {
    console.error("Error saving profile data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/get-companies/:service_type", async (req, res) => {
  try {
    const {service_type}=req.params;
    const companies = await CompanyDetailsModal.find({ Service: service_type });
    return res.json(companies);
  } catch (err) {
    return res.json(err);
  }
});

app.get("/get-companies/", async (req, res) => {
  try {
    const {service_type}=req.params;
    const companies = await CompanyDetailsModal.find({});
    return res.json(companies);
  } catch (err) {
    return res.json(err);
  }
});

// API endpoint for rating a book
app.post("/api/rate-book", (req, res) => {
  const { email, rating } = req.body;

  if (!email || !rating) {
    return res.status(400).json({ error: "Invalid request" });
  }

  // Create a new rating document and save it to the MongoDB collection
  const newRating = new Rating({ email, rating });

  newRating
    .save()
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// API endpoint to get the average rating for a book
app.get("/api/get-average-rating", (req, res) => {
  const email = req.query.email;

  Rating.aggregate([
    { $match: { email: email } },
    {
      $group: {
        _id: "$email",
        averageRating: { $avg: "$rating" },
      },
    },
  ])
    .then((result) => {
      if (result.length > 0) {
        res.json({ averageRating: result[0].averageRating });
      } else {
        res.json({ averageRating: 0 }); // No ratings yet, return 0
      }
    })
    .catch((error) => {
      console.error("Error fetching average rating:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// API endpoint to handle message submissions
app.post("/api/send-message", async (req, res) => {
  const { companyEmail, user, message } = req.body;

  try {
    // Check if a message already exists for the given user and company
    const existingMessage = await Message.findOne({ companyEmail, user });

    if (existingMessage) {
      // If a message exists, append the new message
      existingMessage.message += `\n${message}`;
      await existingMessage.save();
    } else {
      // If no message exists, create a new record
      const newMessage = new Message({ companyEmail, user, message });
      await newMessage.save();
    }

    res.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Error saving message" });
  }
});

// API endpoint to get all messages for the currently logged-in company
app.get('/api/get-company-messages', async (req, res) => {
  const companyEmail = req.query.companyEmail; // Assuming you pass the company email as a query parameter

  try {
    const companyMessages = await Message.find({ companyEmail });
    res.json({ success: true, messages: companyMessages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error fetching messages' });
  }
});