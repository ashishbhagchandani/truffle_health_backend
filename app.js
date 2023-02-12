var express = require("express");
var app = express();
app.use(express.json());
let medicalBills = [];

app.get("/items", function (req, res) {
  if (medicalBills.length) {
    res.json(medicalBills);
  } else {
    res.json({ message: "No Medical bills to display." });
  }
});

app.post("/items", function (req, res) {
  res.header("Content-Type", "application/json");
  const {
    patientName,
    patientAddress,
    hospitalName,
    dateOfService,
    billAmount,
  } = req.body;
  let missingProperties = [];
  if (!patientName) {
    missingProperties.push("Patient Name");
  }
  if (!patientAddress) {
    missingProperties.push("Patient Address");
  }
  if (!hospitalName) {
    missingProperties.push("Hospital Name");
  }
  if (!dateOfService) {
    missingProperties.push("Date Of Service");
  }
  if (!billAmount) {
    missingProperties.push("Bill Amount");
  }
  if (missingProperties.length > 0) {
    return res.status(400).json({
      error: `Invalid request. Please provide: ${missingProperties.join(", ")}`,
    });
  }
  medicalBills.push({
    patientName,
    patientAddress,
    hospitalName,
    dateOfService,
    billAmount,
  });
  res.json({ message: "Medical bill added successfully" });
});

app.listen(3000, function () {
  console.log("Medical bill service on port 3000!");
});
