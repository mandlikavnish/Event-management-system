const url = "http://localhost:3000";

// --- GLOBAL HELPER: Generates Professional Tables for ALL Entities ---
function buildTable(containerId, headers, data, rowRenderer) {
    let html = `<table class="table table-hover align-middle mb-0">
                  <thead class="table-light"><tr>`;
    headers.forEach(h => html += `<th>${h}</th>`);
    html += `<th class="text-end">Actions</th></tr></thead><tbody>`;
    
    if(data.length === 0) {
        html += `<tr><td colspan="${headers.length + 1}" class="text-center text-muted py-4">No records found. Click 'Add' to create one.</td></tr>`;
    } else {
        data.forEach(item => {
            html += `<tr>${rowRenderer(item)}</tr>`;
        });
    }
    html += `</tbody></table>`;
    document.getElementById(containerId).innerHTML = html;
}

// ================= 1. STUDENT =================
function addStudent() {
    fetch(url + "/student", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Student_ID: sid.value, Name: sname.value, Email: semail.value, Phone: sphone.value, Department: sdept.value, Year: syear.value })
    }).then(res => res.text()).then(msg => { alert(msg); getStudent(); });
}

function getStudent() {
    fetch(url + "/student").then(res => res.json()).then(data => {
        buildTable('output', ['ID', 'Name', 'Email', 'Phone', 'Dept', 'Year'], data, s => `
            <td class="fw-bold text-primary">#${s.Student_ID}</td>
            <td>${s.Name}</td><td>${s.Email}</td><td>${s.Phone}</td>
            <td><span class="badge bg-secondary">${s.Department}</span></td><td>${s.Year}</td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-dark me-1" onclick='editStudent(${JSON.stringify(s)})'><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-danger" onclick="deleteStudent(${s.Student_ID})"><i class="fas fa-trash"></i></button>
            </td>
        `);
    });
}

function deleteStudent(id) {
    if(confirm("Delete this student?")) { fetch(url + "/student/" + id, { method: "DELETE" }).then(() => getStudent()); }
}

function editStudent(s) {
    sid.value = s.Student_ID; sname.value = s.Name; semail.value = s.Email; sphone.value = s.Phone; sdept.value = s.Department; syear.value = s.Year;
}

function updateStudent() {
    fetch(url + "/student/" + sid.value, { method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Name: sname.value, Email: semail.value, Phone: sphone.value, Department: sdept.value, Year: syear.value })
    }).then(res => res.text()).then(msg => { alert(msg); getStudent(); });
}

// ================= 2. FACULTY =================
function addFaculty() {
    fetch(url + "/faculty", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Faculty_ID: fid.value, Name: fname.value, Email: femail.value, Phone: fphone.value, Department: fdept.value })
    }).then(res => res.text()).then(msg => { alert(msg); getFaculty(); });
}

function getFaculty() {
    fetch(url + "/faculty").then(res => res.json()).then(data => {
        buildTable('facultyOutput', ['ID', 'Name', 'Email', 'Phone', 'Dept'], data, f => `
            <td class="fw-bold text-primary">#${f.Faculty_ID}</td>
            <td>${f.Name}</td><td>${f.Email}</td><td>${f.Phone}</td><td>${f.Department}</td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-dark me-1" onclick='editFaculty(${JSON.stringify(f)})'><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-danger" onclick="deleteFaculty(${f.Faculty_ID})"><i class="fas fa-trash"></i></button>
            </td>
        `);
    });
}

function deleteFaculty(id) {
    if(confirm("Delete this faculty?")) { fetch(url + "/faculty/" + id, { method: "DELETE" }).then(() => getFaculty()); }
}

function editFaculty(f) {
    fid.value = f.Faculty_ID; fname.value = f.Name; femail.value = f.Email; fphone.value = f.Phone; fdept.value = f.Department;
}

function updateFaculty() {
    fetch(url + "/faculty/" + fid.value, { method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Name: fname.value, Email: femail.value, Phone: fphone.value, Department: fdept.value })
    }).then(res => res.text()).then(msg => { alert(msg); getFaculty(); });
}

// ================= 3. CLUB =================
function addClub() {
    fetch(url + "/club", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Club_ID: cid.value, Club_Name: cname.value, Club_Type: ctype.value, Created_Date: cdate.value, Faculty_ID: cfid.value })
    }).then(res => res.text()).then(msg => { alert(msg); getClub(); });
}

function getClub() {
    fetch(url + "/club").then(res => res.json()).then(data => {
        buildTable('clubOutput', ['ID', 'Name', 'Type', 'Date', 'Faculty ID'], data, c => `
            <td class="fw-bold">#${c.Club_ID}</td><td class="text-success fw-bold">${c.Club_Name}</td>
            <td>${c.Club_Type}</td><td>${c.Created_Date ? c.Created_Date.substring(0,10) : ''}</td><td>${c.Faculty_ID}</td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-dark me-1" onclick='editClub(${JSON.stringify(c)})'><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-danger" onclick="deleteClub(${c.Club_ID})"><i class="fas fa-trash"></i></button>
            </td>
        `);
    });
}

function deleteClub(id) {
    if(confirm("Delete this club?")) { fetch(url + "/club/" + id, { method: "DELETE" }).then(() => getClub()); }
}

function editClub(c) {
    cid.value = c.Club_ID; cname.value = c.Club_Name; ctype.value = c.Club_Type; 
    cdate.value = c.Created_Date ? c.Created_Date.substring(0,10) : ''; cfid.value = c.Faculty_ID;
}

function updateClub() {
    fetch(url + "/club/" + cid.value, { method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Club_Name: cname.value, Club_Type: ctype.value, Created_Date: cdate.value, Faculty_ID: cfid.value })
    }).then(res => res.text()).then(msg => { alert(msg); getClub(); });
}

// ================= 4. EVENT =================
function addEvent() {
    fetch(url + "/event", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Event_ID: eid.value, Title: etitle.value, Event_Type: etype.value, Event_Date: edate.value, Start_Time: stime.value, End_Time: etime.value, Fee: efee.value, Status: estatus.value, Club_ID: eclub.value })
    }).then(res => res.text()).then(msg => { alert(msg); getEvent(); });
}

function getEvent() {
    fetch(url + "/event").then(res => res.json()).then(data => {
        buildTable('eventOutput', ['ID', 'Title', 'Type', 'Date', 'Time', 'Fee', 'Status', 'Club ID'], data, e => `
            <td>#${e.Event_ID}</td><td class="fw-bold">${e.Title}</td><td>${e.Event_Type}</td>
            <td>${e.Event_Date ? e.Event_Date.substring(0,10) : ''}</td><td>${e.Start_Time} - ${e.End_Time}</td>
            <td class="text-success fw-bold">$${e.Fee}</td><td><span class="badge bg-info text-dark">${e.Status}</span></td><td>${e.Club_ID}</td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-dark me-1" onclick='editEvent(${JSON.stringify(e)})'><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-danger" onclick="deleteEvent(${e.Event_ID})"><i class="fas fa-trash"></i></button>
            </td>
        `);
    });
}

function deleteEvent(id) {
    if(confirm("Delete this event?")) { fetch(url + "/event/" + id, { method: "DELETE" }).then(() => getEvent()); }
}

function editEvent(e) {
    eid.value = e.Event_ID; etitle.value = e.Title; etype.value = e.Event_Type; 
    edate.value = e.Event_Date ? e.Event_Date.substring(0,10) : ''; 
    stime.value = e.Start_Time; etime.value = e.End_Time; efee.value = e.Fee; estatus.value = e.Status; eclub.value = e.Club_ID;
}

function updateEvent() {
    fetch(url + "/event/" + eid.value, { method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Title: etitle.value, Event_Type: etype.value, Event_Date: edate.value, Start_Time: stime.value, End_Time: etime.value, Fee: efee.value, Status: estatus.value, Club_ID: eclub.value })
    }).then(res => res.text()).then(msg => { alert(msg); getEvent(); });
}

// ================= 5. VENUE =================
function addVenue() {
    fetch(url + "/venue", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Venue_ID: vid.value, Venue_Name: vname.value, Location: vloc.value, Capacity: vcap.value })
    }).then(res => res.text()).then(msg => { alert(msg); getVenue(); });
}

function getVenue() {
    fetch(url + "/venue").then(res => res.json()).then(data => {
        buildTable('venueOutput', ['ID', 'Name', 'Location', 'Capacity'], data, v => `
            <td>#${v.Venue_ID}</td><td class="fw-bold">${v.Venue_Name}</td><td>${v.Location}</td><td>${v.Capacity}</td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-dark me-1" onclick='editVenue(${JSON.stringify(v)})'><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-danger" onclick="deleteVenue(${v.Venue_ID})"><i class="fas fa-trash"></i></button>
            </td>
        `);
    });
}

function deleteVenue(id) {
    if(confirm("Delete this venue?")) { fetch(url + "/venue/" + id, { method: "DELETE" }).then(() => getVenue()); }
}

function editVenue(v) {
    vid.value = v.Venue_ID; vname.value = v.Venue_Name; vloc.value = v.Location; vcap.value = v.Capacity;
}

function updateVenue() {
    fetch(url + "/venue/" + vid.value, { method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Venue_Name: vname.value, Location: vloc.value, Capacity: vcap.value })
    }).then(res => res.text()).then(msg => { alert(msg); getVenue(); });
}

// ================= 6. EVENT SCHEDULE =================
function addSchedule() {
    fetch(url + "/schedule", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Schedule_ID: sid2.value, Event_ID: seid.value, Venue_ID: svid.value, Schedule_Date: sdate.value, Start_Time: sstime.value, End_Time: setime.value })
    }).then(res => res.text()).then(msg => { alert(msg); getSchedule(); });
}

function getSchedule() {
    fetch(url + "/schedule").then(res => res.json()).then(data => {
        buildTable('scheduleOutput', ['Sched ID', 'Event ID', 'Venue ID', 'Date', 'Time'], data, s => `
            <td>#${s.Schedule_ID}</td><td>${s.Event_ID}</td><td>${s.Venue_ID}</td>
            <td>${s.Schedule_Date ? s.Schedule_Date.substring(0,10) : ''}</td><td>${s.Start_Time} - ${s.End_Time}</td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-dark me-1" onclick='editSchedule(${JSON.stringify(s)})'><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-danger" onclick="deleteSchedule(${s.Schedule_ID})"><i class="fas fa-trash"></i></button>
            </td>
        `);
    });
}

function deleteSchedule(id) {
    if(confirm("Delete this schedule?")) { fetch(url + "/schedule/" + id, { method: "DELETE" }).then(() => getSchedule()); }
}

function editSchedule(s) {
    sid2.value = s.Schedule_ID; seid.value = s.Event_ID; svid.value = s.Venue_ID;
    sdate.value = s.Schedule_Date ? s.Schedule_Date.substring(0,10) : ''; 
    sstime.value = s.Start_Time; setime.value = s.End_Time;
}

function updateSchedule() {
    fetch(url + "/schedule/" + sid2.value, { method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Event_ID: seid.value, Venue_ID: svid.value, Schedule_Date: sdate.value, Start_Time: sstime.value, End_Time: setime.value })
    }).then(res => res.text()).then(msg => { alert(msg); getSchedule(); });
}

// ================= 7. REGISTRATION =================
function addRegistration() {
    fetch(url + "/registration", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Reg_ID: rid.value, Student_ID: rstudent.value, Event_ID: revent.value, Reg_Date: rdate.value, Reg_Status: rstatus.value })
    }).then(res => res.text()).then(msg => { alert(msg); getRegistration(); });
}

function getRegistration() {
    fetch(url + "/registration").then(res => res.json()).then(data => {
        buildTable('registrationOutput', ['Reg ID', 'Student ID', 'Event ID', 'Date', 'Status'], data, r => `
            <td>#${r.Reg_ID}</td><td>${r.Student_ID}</td><td>${r.Event_ID}</td>
            <td>${r.Reg_Date ? r.Reg_Date.substring(0,10) : ''}</td><td><span class="badge bg-warning text-dark">${r.Reg_Status}</span></td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-dark me-1" onclick='editRegistration(${JSON.stringify(r)})'><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-danger" onclick="deleteRegistration(${r.Reg_ID})"><i class="fas fa-trash"></i></button>
            </td>
        `);
    });
}

function deleteRegistration(id) {
    if(confirm("Delete this registration?")) { fetch(url + "/registration/" + id, { method: "DELETE" }).then(() => getRegistration()); }
}

function editRegistration(r) {
    rid.value = r.Reg_ID; rstudent.value = r.Student_ID; revent.value = r.Event_ID;
    rdate.value = r.Reg_Date ? r.Reg_Date.substring(0,10) : ''; rstatus.value = r.Reg_Status;
}

function updateRegistration() {
    fetch(url + "/registration/" + rid.value, { method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Student_ID: rstudent.value, Event_ID: revent.value, Reg_Date: rdate.value, Reg_Status: rstatus.value })
    }).then(res => res.text()).then(msg => { alert(msg); getRegistration(); });
}

// ================= 8. PAYMENT =================
function addPayment() {
    fetch(url + "/payment", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Payment_ID: pid.value, Reg_ID: preg.value, Amount: pamount.value, Payment_Mode: pmode.value, Payment_Date: pdate.value, Payment_Status: pstatus.value })
    }).then(res => res.text()).then(msg => { alert(msg); getPayment(); });
}

function getPayment() {
    fetch(url + "/payment").then(res => res.json()).then(data => {
        buildTable('paymentOutput', ['Pay ID', 'Reg ID', 'Amount', 'Mode', 'Date', 'Status'], data, p => `
            <td>#${p.Payment_ID}</td><td>${p.Reg_ID}</td><td class="fw-bold text-success">$${p.Amount}</td>
            <td>${p.Payment_Mode}</td><td>${p.Payment_Date ? p.Payment_Date.substring(0,10) : ''}</td>
            <td><span class="badge bg-success">${p.Payment_Status}</span></td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-dark me-1" onclick='editPayment(${JSON.stringify(p)})'><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-danger" onclick="deletePayment(${p.Payment_ID})"><i class="fas fa-trash"></i></button>
            </td>
        `);
    });
}

function deletePayment(id) {
    if(confirm("Delete this payment?")) { fetch(url + "/payment/" + id, { method: "DELETE" }).then(() => getPayment()); }
}

function editPayment(p) {
    pid.value = p.Payment_ID; preg.value = p.Reg_ID; pamount.value = p.Amount; pmode.value = p.Payment_Mode;
    pdate.value = p.Payment_Date ? p.Payment_Date.substring(0,10) : ''; pstatus.value = p.Payment_Status;
}

function updatePayment() {
    fetch(url + "/payment/" + pid.value, { method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Reg_ID: preg.value, Amount: pamount.value, Payment_Mode: pmode.value, Payment_Date: pdate.value, Payment_Status: pstatus.value })
    }).then(res => res.text()).then(msg => { alert(msg); getPayment(); });
}

// ================= 9. ATTENDANCE =================
function addAttendance() {
    fetch(url + "/attendance", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Attendance_ID: aid.value, Reg_ID: areg.value, Attendance_Status: astatus.value })
    }).then(res => res.text()).then(msg => { alert(msg); getAttendance(); });
}

function getAttendance() {
    fetch(url + "/attendance").then(res => res.json()).then(data => {
        buildTable('attendanceOutput', ['Atten ID', 'Reg ID', 'Status'], data, a => `
            <td>#${a.Attendance_ID}</td><td>${a.Reg_ID}</td>
            <td><span class="badge ${a.Attendance_Status.toLowerCase() === 'present' ? 'bg-success' : 'bg-danger'}">${a.Attendance_Status}</span></td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-dark me-1" onclick='editAttendance(${JSON.stringify(a)})'><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-danger" onclick="deleteAttendance(${a.Attendance_ID})"><i class="fas fa-trash"></i></button>
            </td>
        `);
    });
}

function deleteAttendance(id) {
    if(confirm("Delete this attendance record?")) { fetch(url + "/attendance/" + id, { method: "DELETE" }).then(() => getAttendance()); }
}

function editAttendance(a) {
    aid.value = a.Attendance_ID; areg.value = a.Reg_ID; astatus.value = a.Attendance_Status;
}

function updateAttendance() {
    fetch(url + "/attendance/" + aid.value, { method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Reg_ID: areg.value, Attendance_Status: astatus.value })
    }).then(res => res.text()).then(msg => { alert(msg); getAttendance(); });
}

// ================= 10. CERTIFICATE =================
function addCertificate() {
    fetch(url + "/certificate", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Certificate_ID: cid2.value, Reg_ID: creg.value, Issue_Date: cdate2.value, Certificate_Status: cstatus2.value })
    }).then(res => res.text()).then(msg => { alert(msg); getCertificate(); });
}

function getCertificate() {
    fetch(url + "/certificate").then(res => res.json()).then(data => {
        buildTable('certificateOutput', ['Cert ID', 'Reg ID', 'Issue Date', 'Status'], data, c => `
            <td>#${c.Certificate_ID}</td><td>${c.Reg_ID}</td>
            <td>${c.Issue_Date ? c.Issue_Date.substring(0,10) : ''}</td>
            <td><span class="badge bg-primary">${c.Certificate_Status}</span></td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-dark me-1" onclick='editCertificate(${JSON.stringify(c)})'><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-danger" onclick="deleteCertificate(${c.Certificate_ID})"><i class="fas fa-trash"></i></button>
            </td>
        `);
    });
}

function deleteCertificate(id) {
    if(confirm("Delete this certificate?")) { fetch(url + "/certificate/" + id, { method: "DELETE" }).then(() => getCertificate()); }
}

function editCertificate(c) {
    cid2.value = c.Certificate_ID; creg.value = c.Reg_ID; 
    cdate2.value = c.Issue_Date ? c.Issue_Date.substring(0,10) : ''; 
    cstatus2.value = c.Certificate_Status;
}

function updateCertificate() {
    fetch(url + "/certificate/" + cid2.value, { method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Reg_ID: creg.value, Issue_Date: cdate2.value, Certificate_Status: cstatus2.value })
    }).then(res => res.text()).then(msg => { alert(msg); getCertificate(); });
}