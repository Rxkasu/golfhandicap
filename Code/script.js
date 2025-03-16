let current_user_data;
let logged_in;

function create_json(){
    //if (localStorage.getItem("data") == null){

        //json_data = {"user_id": '', "sur_name": '', "first_name": '', "games": []}
        //localStorage.setItem("data", JSON.stringify(json_data))
    //}
    //else {
    //    let data = localStorage.getItem("data")
    //     json_data = JSON.parse(data)
    //}
}

// Gets actual Date in Day/Month/Year-format
function get_date(){
    let today = new Date();
    let day = (today.getDate().toString().padStart(2, '0'));
    let month = ((today.getMonth() + 1).toString().padStart(2, '0'));
    let year = today.getFullYear();
    return `${day}/${month}/${year}`;
}

// Logs in user if user exists and password fits username
function login(){
    let json_data = JSON.parse(localStorage.getItem("data")) || null;
    let email = (document.getElementById("loginEmail").value);
    let password = (document.getElementById("loginPass").value);

    if (!email || !email.trim()) return window.alert("Email-Feld ist leer"); // Check for inputs
    if (!password || !password.trim()) return window.alert("Passwort-Feld ist leer");

    if (!json_data) return window.alert("Es wurde noch kein user angelegt");
    let log_user = json_data.find(user => user.email === email) || null;

    if (!log_user) return notificationAlert("user existiert nicht");                     // Check if user exists
    if (log_user.password !== password) return notificationAlert("Passwort ist falsch"); // Check if Password is correct
    logged_in = true;
    current_user_data = log_user;
    hideAuthModal();
    showContentModal();
    setUserInfo(email, current_user_data.role);
}

// logs out users
function logout(){
    if (logged_in === true){                                             // Check if user is logged in
        logged_in = false
        document.getElementById("loginPass").value = "";
        document.getElementById("regisPass").value = "";
        document.getElementById("regisPassCheck").value = "";
        clearUserInfo();
        hideContentModal();
        showAuthModal();
        notificationAlert("Erfolgreich ausgeloggt");
    } else {
        window.alert("Nicht eingeloggt")
    }
}

// Saves a newly registered User
function register(){
    let json_data = JSON.parse(localStorage.getItem("data")) || [];               // Load JSON from local storage of browser
    let email = (document.getElementById("regisEmail").value);
    let role = (document.getElementById("regisRole").value);
    let password = (document.getElementById("regisPass").value);
    let passwordCheck = (document.getElementById("regisPassCheck").value);

    if (!email || !email.trim()) return window.alert("Email-Feld ist leer"); // Check for inputs
    if (!password || !password.trim()) return window.alert("Passwort-Feld ist leer");
    if (!password || !passwordCheck.trim()) return window.alert("Passwort-Wiederholen-Feld ist leer");

    if (json_data.find(user => user.email === email)){             // Check if user already exists
        window.alert("User " + email + " existiert bereits.")
    } else {
        if (password !== passwordCheck) return window.alert("Passwort und Wiederholen-Passwort stimmen nicht überein"); // Check if Password is also the Check (Wiederholen)

        const new_user = {"email": email, "role": role, "password": password, "games": []}
        json_data.push(new_user)                                        // Append new user
        localStorage.setItem("data", JSON.stringify(json_data))         // save JSON with new user
        current_user_data = new_user;
        logged_in = true;
        notificationAlert("Registrierung erfolgreich! Jetzt kannst du dich einloggen.");
        switchAuthTabs("login");
        document.getElementById("loginEmail").value = email;
    }
    showPrintScorecardInputs();
}

// saves data of an 18-hole-game in an array
function save_inputs(){
    const course_name = document.getElementById("courseSelect").value;
    if (!course_name.trim()) {                                            // Check for name
        return window.alert("Bitte Kurs auswählen");
    }

    const savedCourses = JSON.parse(localStorage.getItem("courses"));
    const course = savedCourses.find(obj => obj.course_name === course_name);

    const game_data = {"game_id": '',"course_name": course_name, "date": get_date(), "hcp_index": 0, "course_rating": course.course_rating, "slope_rating": course.slope_rating, "par": '',
            "holes": [
                {"hole_id": 1, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 2, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 3, "par": 0, "hcp": 0, "hits":0},
                {"hole_id": 4, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 5, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 6, "par": 0, "hcp": 0, "hits":0},
                {"hole_id": 7, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 8, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 9, "par": 0, "hcp": 0, "hits":0},
                {"hole_id": 10, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 11, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 12, "par": 0, "hcp": 0, "hits":0},
                {"hole_id": 13, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 14, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 15, "par": 0, "hcp": 0, "hits":0},
                {"hole_id": 16, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 17, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 18, "par": 0, "hcp": 0, "hits":0}
            ]}
    let json_data = JSON.parse(localStorage.getItem("data"));
    for (let i = 1; i <= 18; i++) {
        let par = document.getElementById(`par${i}`).value || null; //duplicated? what if course update feature will get implemented?
        let hcp = document.getElementById(`hcp${i}`).value || null; //duplicated? what if course update feature will get implemented?
        let hits = document.getElementById(`hits${i}`).value || null;
        if (hits == null) return window.alert("Schläge Eingabefeld " + i + " darf nicht leer sein");

        // Set values in JSON-object
        game_data.holes[i - 1].par = par ? parseInt(par) : 0;
        game_data.holes[i - 1].hcp = hcp ? parseInt(hcp) : 0;
        game_data.holes[i - 1].hits = hits ? parseInt(hits) : 0;
    }


    // Add new course to user
    for (let i = 0; i < json_data.length; i++) {
        if (json_data[i].email === current_user_data.email) {
          json_data[i].games.push(game_data);
          localStorage.setItem("data", JSON.stringify(json_data));
          break;
        }
    }
    calculate_par()
}

//calculates total Par of Golf-course
function calculate_par(){
    let json_data = JSON.parse(localStorage.getItem("data"));
    let name = document.getElementById("courseSelect").value;
    let total_par = 0;

    for (let i = 0; i < json_data.length; i++) {
        if (json_data[i].email === current_user_data.email) {

            for (let y = 0; y <= json_data[i].games.length; y++){
                if (json_data[i].games[y].course_name === name) {
                    for (let x = 0; x <= 17; x++) {
                        total_par = total_par + json_data[i].games[y].holes[x].par;
                    }
                    json_data[i].games[y].par = total_par;
                    break;
                }
            }

            break;
        }
    }
    localStorage.setItem("data", JSON.stringify(json_data));
}

// Deletes current 18-hole inputs of course
function delete_holes(){
    let json_data = JSON.parse(localStorage.getItem("data"));
    let name = document.getElementById("courseSelect").value
    for (let x = 0; x < json_data.length; x++){
        if (json_data[x].email === current_user_data.email){
            for (let y = 0; y < json_data[x].games.length; y++){
                if (json_data[x].games[y].course_name === name){
                    json_data[x].games.splice(y, 1)
                    localStorage.setItem("data", JSON.stringify(json_data))
                    break
                }
            }
        }
    }
}

function load_course_holes(){
    let courses = JSON.parse(localStorage.getItem("courses"));
    let name = document.getElementById("courseSelect").value;
    for (let x = 0; x < courses.length; x++){
        if (courses[x].course_name === name){

            for (let i = 1; i <= 18; i++) {
                let parInput = document.getElementById(`par${i}`);
                let hcpInput = document.getElementById(`hcp${i}`);

                if (parInput && hcpInput) {
                    parInput.value = courses[x].holes[i - 1].par;
                    hcpInput.value = courses[x].holes[i - 1].hcp;
                }
            }
            break
        }
    }
}

function load_edit_course_holes(){
    let courses = JSON.parse(localStorage.getItem("courses"));
    let name = document.getElementById("edit_course_select").value;
    for (let x = 0; x < courses.length; x++){
        if (courses[x].course_name === name){

            document.getElementById("course_rating").value = courses[x].course_rating;
            document.getElementById("course_slope").value = courses[x].slope_rating;

            for (let i = 1; i <= 18; i++) {
                let parInput = document.getElementById(`cpar${i}`);
                let hcpInput = document.getElementById(`chcp${i}`);

                if (parInput && hcpInput) {
                    parInput.value = courses[x].holes[i - 1].par;
                    hcpInput.value = courses[x].holes[i - 1].hcp;
                }
            }
            break
        }
    }
}

function load_holes(){
    let json_data = JSON.parse(localStorage.getItem("data"));
    console.log(json_data)
    let name = document.getElementById("courseSelect").value
    for (let x = 0; x < json_data.length; x++){
        if (json_data[x].email === current_user_data.email){
            for (let y = 0; y < json_data[x].games.length; y++){
                if (json_data[x].games[y].course_name === name){
                    for (let i = 1; i <= 18; i++) {
                        let parInput = document.getElementById(`par${i}`);
                        let hcpInput = document.getElementById(`hcp${i}`);
                        let hitsInput = document.getElementById(`hits${i}`);

                        if (parInput && hcpInput && hitsInput) {
                            parInput.value = json_data[x].games[y].holes[i - 1].par;
                            hcpInput.value = json_data[x].games[y].holes[i - 1].hcp;
                            hitsInput.value = json_data[x].games[y].holes[i - 1].hits;
                        }
                    }
                    break
                }
            }
            break
        }

    }
}

// Delets a single course game
function delete_game(){
    let json_data = JSON.parse(localStorage.getItem("data"));
    let remove_game = document.getElementById("course_name").value
    for (let x = 0; x < json_data.length; x++){
        if (json_data[x].email === current_user_data.email) {
            for (let y = 0; y < json_data[x].games.length; y++){
                if (json_data[x].games[y].course_name === remove_game){
                    json_data[x].games.splice(y, 1);
                    break
                }
            }
        }
        
    }
    localStorage.setItem("data", JSON.stringify(json_data))
}
    
// Makes container for a new course visible
function new_course(){
    let container = document.getElementById("course-input-fields");
    container.style.display = "block"
}

function save_course(){
    const course = {
        course_name: document.getElementById("course_name").value,
        course_rating: document.getElementById("course_rating").value,
        slope_rating: document.getElementById("course_slope").value
    };

    const emptyValue = Object.keys(course).find(key => !course[key].trim()) || null;
    if (emptyValue) {
        return window.alert(emptyValue + " darf nicht leer sein");
    }

    const holes = [];
    for (let i = 1; i <= 18; i++) {
        let par = document.getElementById(`cpar${i}`).value || null;
        let hcp = document.getElementById(`chcp${i}`).value || null;
        if (par == null) return window.alert("Par Eingabefeld " + i + " darf nicht leer sein");
        if (hcp == null) return window.alert("HCP Eingabefeld " + i + " darf nicht leer sein");

        holes.push({
            hole_id: i,
            par: parseInt(par) || 0,
            hcp: parseInt(hcp) || 0
        });
    }

    // Check for duplicates
    const seenHcps = new Map();

    for (let hole of holes) {
        let hcp = hole.hcp;

        if (seenHcps.has(hcp)) {
            let firstHoleId = seenHcps.get(hcp);                        // First hole with same hcp
            return window.alert(`Doppelter HCP-Wert gefunden: ${hcp} bei Loch ${firstHoleId} und ${hole.hole_id}`);
        }

        seenHcps.set(hcp, hole.hole_id);                                // Save hcp with hole
    }
    course.holes = holes;

    const savedCourses = JSON.parse(localStorage.getItem("courses")) || [];

    const courseNameDuplicate = savedCourses.find(obj => obj.course_name === course.course_name) || null;
    if (courseNameDuplicate) {
        return window.alert(course.course_name + " ist schon vergeben");
    }

    savedCourses.push(course);

    localStorage.setItem("courses", JSON.stringify(savedCourses));
    notificationAlert("Kurs erfolgreich erstellt");
    createCourseSelect();
    showPrintScorecardInputs();
}

function saveEditCourse() {
    const course = {
        course_name: document.getElementById("edit_course_select").value,
        course_rating: document.getElementById("course_rating").value,
        slope_rating: document.getElementById("course_slope").value
    };

    const emptyValue = Object.keys(course).find(key => !course[key].trim()) || null;
    if (emptyValue) {
        return window.alert(emptyValue + " darf nicht leer sein");
    }

    const holes = [];
    for (let i = 1; i <= 18; i++) {
        let par = document.getElementById(`cpar${i}`).value || null;
        let hcp = document.getElementById(`chcp${i}`).value || null;
        if (par == null) return window.alert("Par Eingabefeld " + i + " darf nicht leer sein");
        if (hcp == null) return window.alert("HCP Eingabefeld " + i + " darf nicht leer sein");

        holes.push({
            hole_id: i,
            par: parseInt(par) || 0,
            hcp: parseInt(hcp) || 0
        });
    }

    // Check for duplicates
    const seenHcps = new Map();

    for (let hole of holes) {
        let hcp = hole.hcp;

        if (seenHcps.has(hcp)) {
            let firstHoleId = seenHcps.get(hcp);                        // First hole with same hcp
            return window.alert(`Doppelter HCP-Wert gefunden: ${hcp} bei Loch ${firstHoleId} und ${hole.hole_id}`);
        }

        seenHcps.set(hcp, hole.hole_id);                                // Save hcp with hole
    }
    course.holes = holes;

    const savedCourses = JSON.parse(localStorage.getItem("courses")) || [];

    const courseNameDuplicate = savedCourses.find(obj => obj.course_name === course.course_name) || null;
    if (courseNameDuplicate) {
        // Wenn der Kursname schon existiert, ersetze die Daten
        const index = savedCourses.findIndex(obj => obj.course_name === course.course_name);
        if (index !== -1) {
            // Ersetze die Kursdaten an diesem Index
            savedCourses[index] = course;
        }
    } else {
        savedCourses.push(course);
    }   
    localStorage.setItem("courses", JSON.stringify(savedCourses));
    notificationAlert("Kurs erfolgreich bearbeitet");
    cancelEditCourse();
    createCourseSelect();
    showPrintScorecardInputs();
}

function sendMail(user){
    let name = user.email.substring(0, current_user_data.email.indexOf("@"));
    let nachricht = "Hallo " + name + ",\ndein Golf-Handicap wurde aktualisiert und ist nun " + user.hcp + ".\nMit freundlichen Grüßen dein Golf-HCC Team";
    let mailtoLink = "mailto: " + user.email
        + "?subject=" + encodeURIComponent("Golf-Handicap aktualisiert - Golf-HCC")
        + "&body=" + encodeURIComponent(nachricht);
    window.open(mailtoLink, "_blank");
}