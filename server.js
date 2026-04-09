const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root@16022006',
  database: 'eventdb'
});

db.connect(err => {
  if (err) {
    console.log("DB ERROR:", err);
  } else {
    console.log("MySQL Connected");
  }
});

// ADD STUDENT
app.post('/student', (req, res) => {
  console.log("DATA RECEIVED:", req.body);

  const { Student_ID, Name, Email, Phone, Department, Year } = req.body;

  db.query(
    "INSERT INTO student (Student_ID, Name, Email, Phone, Department, Year) VALUES (?, ?, ?, ?, ?, ?)",
    [Student_ID, Name, Email, Phone, Department, Year],
    (err, result) => {
      if (err) {
        console.log("SQL ERROR:", err);
        return res.send(err);
      }
      res.send("Added Successfully");
    }
  );
});

// VIEW
app.get('/student', (req, res) => {
  db.query("SELECT * FROM student", (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});

// DELETE
app.delete('/student/:id', (req, res) => {
  db.query("DELETE FROM student WHERE Student_ID=?",
    [req.params.id],
    () => res.send("Deleted"));
});

// UPDATE
app.put('/student/:id', (req, res) => {
  const { Name, Email, Phone, Department, Year } = req.body;

  db.query(
    "UPDATE student SET Name=?, Email=?, Phone=?, Department=?, Year=? WHERE Student_ID=?",
    [Name, Email, Phone, Department, Year, req.params.id],
    () => res.send("Updated")
  );
});


// ================= FACULTY =================

// ADD
app.post('/faculty', (req, res) => {
  const { Faculty_ID, Name, Email, Phone, Department } = req.body;

  db.query(
    "INSERT INTO faculty (Faculty_ID, Name, Email, Phone, Department) VALUES (?, ?, ?, ?, ?)",
    [Faculty_ID, Name, Email, Phone, Department],
    (err) => {
      if (err) return res.send(err);
      res.send("Faculty Added");
    }
  );
});

// VIEW
app.get('/faculty', (req, res) => {
  db.query("SELECT * FROM faculty", (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});

// DELETE
app.delete('/faculty/:id', (req, res) => {

  console.log("DELETE CALLED:", req.params.id); // DEBUG

  db.query(
    "DELETE FROM faculty WHERE Faculty_ID = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      res.send("Deleted Successfully");
    }
  );
});

// UPDATE
app.put('/faculty/:id', (req, res) => {
  const { Name, Email, Phone, Department } = req.body;

  db.query(
    "UPDATE faculty SET Name=?, Email=?, Phone=?, Department=? WHERE Faculty_ID=?",
    [Name, Email, Phone, Department, req.params.id],
    () => res.send("Updated")
  );
});

// ================= CLUB =================

// ADD
app.post('/club', (req, res) => {
  const { Club_ID, Club_Name, Club_Type, Created_Date, Faculty_ID } = req.body;

  db.query(
    "INSERT INTO club (Club_ID, Club_Name, Club_Type, Created_Date, Faculty_ID) VALUES (?, ?, ?, ?, ?)",
    [Club_ID, Club_Name, Club_Type, Created_Date, Faculty_ID],
    (err) => {
      if (err) {
        console.log(err);
        return res.send("Error: " + err.sqlMessage);
      }
      res.send("Club Added Successfully");
    }
  );
});

// VIEW
app.get('/club', (req, res) => {
  db.query("SELECT * FROM club", (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});

// DELETE (WITH FK MESSAGE)
app.delete('/club/:id', (req, res) => {

  db.query(
    "DELETE FROM club WHERE Club_ID=?",
    [req.params.id],
    (err) => {
      if (err) {
        console.log(err);
        return res.send("Cannot delete: Linked data exists");
      }
      res.send("Club Deleted");
    }
  );
});

// UPDATE
app.put('/club/:id', (req, res) => {
  const { Club_Name, Club_Type, Created_Date, Faculty_ID } = req.body;

  db.query(
    "UPDATE club SET Club_Name=?, Club_Type=?, Created_Date=?, Faculty_ID=? WHERE Club_ID=?",
    [Club_Name, Club_Type, Created_Date, Faculty_ID, req.params.id],
    (err) => {
      if (err) return res.send("Update Error");
      res.send("Updated Successfully");
    }
  );
});

// ================= EVENT =================

// ADD
app.post('/event', (req, res) => {
  const { Event_ID, Title, Event_Type, Event_Date, Start_Time, End_Time, Fee, Status, Club_ID } = req.body;

  db.query(
    "INSERT INTO event (Event_ID, Title, Event_Type, Event_Date, Start_Time, End_Time, Fee, Status, Club_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [Event_ID, Title, Event_Type, Event_Date, Start_Time, End_Time, Fee, Status, Club_ID],
    (err) => {
      if (err) {
        console.log(err);
        return res.send("Error: " + err.sqlMessage);
      }
      res.send("Event Added Successfully");
    }
  );
});

// VIEW
app.get('/event', (req, res) => {
  db.query("SELECT * FROM event", (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});

// DELETE
app.delete('/event/:id', (req, res) => {
  db.query(
    "DELETE FROM event WHERE Event_ID=?",
    [req.params.id],
    (err) => {
      if (err) return res.send("Cannot delete: Event is linked");
      res.send("Event Deleted");
    }
  );
});

// UPDATE
app.put('/event/:id', (req, res) => {
  const { Title, Event_Type, Event_Date, Start_Time, End_Time, Fee, Status, Club_ID } = req.body;

  db.query(
    "UPDATE event SET Title=?, Event_Type=?, Event_Date=?, Start_Time=?, End_Time=?, Fee=?, Status=?, Club_ID=? WHERE Event_ID=?",
    [Title, Event_Type, Event_Date, Start_Time, End_Time, Fee, Status, Club_ID, req.params.id],
    (err) => {
      if (err) return res.send("Update Error");
      res.send("Updated Successfully");
    }
  );
});

// ================= VENUE =================

// ADD
app.post('/venue', (req, res) => {
  const { Venue_ID, Venue_Name, Location, Capacity } = req.body;

  db.query(
    "INSERT INTO venue VALUES (?, ?, ?, ?)",
    [Venue_ID, Venue_Name, Location, Capacity],
    (err) => {
      if (err) return res.send("Error: " + err.sqlMessage);
      res.send("Venue Added");
    }
  );
});

// VIEW
app.get('/venue', (req, res) => {
  db.query("SELECT * FROM venue", (err, result) => {
    res.send(result);
  });
});

// DELETE
app.delete('/venue/:id', (req, res) => {
  db.query("DELETE FROM venue WHERE Venue_ID=?", [req.params.id],
    () => res.send("Deleted"));
});

// UPDATE
app.put('/venue/:id', (req, res) => {
  const { Venue_Name, Location, Capacity } = req.body;

  db.query(
    "UPDATE venue SET Venue_Name=?, Location=?, Capacity=? WHERE Venue_ID=?",
    [Venue_Name, Location, Capacity, req.params.id],
    () => res.send("Updated")
  );
});

// ================= EVENT SCHEDULE =================

// ADD
app.post('/schedule', (req, res) => {
  const { Schedule_ID, Event_ID, Venue_ID, Schedule_Date, Start_Time, End_Time } = req.body;

  db.query(
    "INSERT INTO event_schedule VALUES (?, ?, ?, ?, ?, ?)",
    [Schedule_ID, Event_ID, Venue_ID, Schedule_Date, Start_Time, End_Time],
    (err) => {
      if (err) return res.send("Error: " + err.sqlMessage);
      res.send("Scheduled Successfully");
    }
  );
});

// VIEW
app.get('/schedule', (req, res) => {
  db.query("SELECT * FROM event_schedule", (err, result) => {
    res.send(result);
  });
});

// DELETE
app.delete('/schedule/:id', (req, res) => {
  db.query("DELETE FROM event_schedule WHERE Schedule_ID=?",
    [req.params.id],
    () => res.send("Deleted"));
});

// UPDATE
app.put('/schedule/:id', (req, res) => {
  const { Event_ID, Venue_ID, Schedule_Date, Start_Time, End_Time } = req.body;

  db.query(
    "UPDATE event_schedule SET Event_ID=?, Venue_ID=?, Schedule_Date=?, Start_Time=?, End_Time=? WHERE Schedule_ID=?",
    [Event_ID, Venue_ID, Schedule_Date, Start_Time, End_Time, req.params.id],
    () => res.send("Updated")
  );
});

// ================= REGISTRATION =================

app.post('/registration', (req, res) => {
  const { Reg_ID, Student_ID, Event_ID, Reg_Date, Reg_Status } = req.body;

  db.query(
    "INSERT INTO registration VALUES (?, ?, ?, ?, ?)",
    [Reg_ID, Student_ID, Event_ID, Reg_Date, Reg_Status],
    (err) => {
      if (err) return res.send("Error: " + err.sqlMessage);
      res.send("Registered Successfully");
    }
  );
});

app.get('/registration', (req, res) => {
  db.query("SELECT * FROM registration", (err, result) => {
    res.send(result);
  });
});

app.delete('/registration/:id', (req, res) => {
  db.query("DELETE FROM registration WHERE Reg_ID=?", [req.params.id],
    () => res.send("Deleted"));
});

app.put('/registration/:id', (req, res) => {
  const { Student_ID, Event_ID, Reg_Date, Reg_Status } = req.body;

  db.query(
    "UPDATE registration SET Student_ID=?, Event_ID=?, Reg_Date=?, Reg_Status=? WHERE Reg_ID=?",
    [Student_ID, Event_ID, Reg_Date, Reg_Status, req.params.id],
    () => res.send("Updated")
  );
});

// ================= PAYMENT =================

app.post('/payment', (req, res) => {
  const { Payment_ID, Reg_ID, Amount, Payment_Mode, Payment_Date, Payment_Status } = req.body;

  db.query(
    "INSERT INTO payment VALUES (?, ?, ?, ?, ?, ?)",
    [Payment_ID, Reg_ID, Amount, Payment_Mode, Payment_Date, Payment_Status],
    (err) => {
      if (err) return res.send("Error: " + err.sqlMessage);
      res.send("Payment Done");
    }
  );
});

app.get('/payment', (req, res) => {
  db.query("SELECT * FROM payment", (err, result) => {
    res.send(result);
  });
});

app.delete('/payment/:id', (req, res) => {
  db.query("DELETE FROM payment WHERE Payment_ID=?", [req.params.id],
    () => res.send("Deleted"));
});

app.put('/payment/:id', (req, res) => {
  const { Reg_ID, Amount, Payment_Mode, Payment_Date, Payment_Status } = req.body;

  db.query(
    "UPDATE payment SET Reg_ID=?, Amount=?, Payment_Mode=?, Payment_Date=?, Payment_Status=? WHERE Payment_ID=?",
    [Reg_ID, Amount, Payment_Mode, Payment_Date, Payment_Status, req.params.id],
    () => res.send("Updated")
  );
});

// ================= ATTENDANCE =================

app.post('/attendance', (req, res) => {
  const { Attendance_ID, Reg_ID, Attendance_Status } = req.body;

  db.query(
    "INSERT INTO attendance VALUES (?, ?, ?)",
    [Attendance_ID, Reg_ID, Attendance_Status],
    (err) => {
      if (err) return res.send("Error: " + err.sqlMessage);
      res.send("Attendance Marked");
    }
  );
});

app.get('/attendance', (req, res) => {
  db.query("SELECT * FROM attendance", (err, result) => {
    res.send(result);
  });
});

app.delete('/attendance/:id', (req, res) => {
  db.query("DELETE FROM attendance WHERE Attendance_ID=?", [req.params.id],
    () => res.send("Deleted"));
});

app.put('/attendance/:id', (req, res) => {
  const { Reg_ID, Attendance_Status } = req.body;

  db.query(
    "UPDATE attendance SET Reg_ID=?, Attendance_Status=? WHERE Attendance_ID=?",
    [Reg_ID, Attendance_Status, req.params.id],
    () => res.send("Updated")
  );
});

// ================= CERTIFICATE =================

app.post('/certificate', (req, res) => {
  const { Certificate_ID, Reg_ID, Issue_Date, Certificate_Status } = req.body;

  db.query(
    "INSERT INTO certificate VALUES (?, ?, ?, ?)",
    [Certificate_ID, Reg_ID, Issue_Date, Certificate_Status],
    (err) => {
      if (err) return res.send("Error: " + err.sqlMessage);
      res.send("Certificate Issued");
    }
  );
});

app.get('/certificate', (req, res) => {
  db.query("SELECT * FROM certificate", (err, result) => {
    res.send(result);
  });
});

app.delete('/certificate/:id', (req, res) => {
  db.query("DELETE FROM certificate WHERE Certificate_ID=?", [req.params.id],
    () => res.send("Deleted"));
});

app.put('/certificate/:id', (req, res) => {
  const { Reg_ID, Issue_Date, Certificate_Status } = req.body;

  db.query(
    "UPDATE certificate SET Reg_ID=?, Issue_Date=?, Certificate_Status=? WHERE Certificate_ID=?",
    [Reg_ID, Issue_Date, Certificate_Status, req.params.id],
    () => res.send("Updated")
  );
});

app.listen(3000, () => console.log("Server running on port 3000"));