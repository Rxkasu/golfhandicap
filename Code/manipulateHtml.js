createCourseSelect();
generateGameFields();

// Generates 18x3 input-fields for 18 holes with par, hcp and hits
function generateGameFields() {
    let container = document.getElementById("game-fields");
    let inputs = container.querySelectorAll("input[type=text]");
    inputs.forEach(input => input.remove());
    container.style.display = "block"

    // Überschrift für die Felder
    let title = document.createElement("h5");
    title.innerText = "Loch-Daten eingeben:";
    title.className = "mt-3";
    container.appendChild(title);

    // Generating fields
    for (let i = 1; i <= 18; i++) {
        let div = document.createElement("div");
        div.className = "row g-2 mb-2";

        let col1 = document.createElement("div");
        col1.className = "col-md-4";
        let input1 = document.createElement("input");                   // First collumn Par
        input1.type = "text";
        input1.className = "form-control";
        input1.placeholder = `par - Loch ${i}`;
        input1.id = `par${i}`
        col1.appendChild(input1);

        let col2 = document.createElement("div");
        col2.className = "col-md-4";
        let input2 = document.createElement("input");                   // Second collumn Handycap
        input2.type = "text";
        input2.className = "form-control";
        input2.placeholder = `hcp - Loch ${i}`;
        input2.id = `hcp${i}`
        col2.appendChild(input2);

        let col3 = document.createElement("div");
        col3.className = "col-md-4";
        let input3 = document.createElement("input");                   // Third collumn needed hits
        input3.type = "text";
        input3.className = "form-control";
        input3.placeholder = `hits - Loch ${i}`;
        input3.id = `hits${i}`
        col3.appendChild(input3);

        div.appendChild(col1);
        div.appendChild(col2);
        div.appendChild(col3);

        container.appendChild(div);
    }
}

// Closes the window of a button
function close_con(button){
    let container = button.parentElement;
    container.style.display= 'none'
}

function createCourseSelect() {
    const dropdown = document.getElementById("courseSelect");

    dropdown.innerHTML = '<option value="" disabled selected hidden>Bitte wähle einen Kurs</option>';

    let savedCourses = JSON.parse(localStorage.getItem("courses")) || ["No course"];
    savedCourses.forEach(course => {
        const option = document.createElement("option");
        option.value = course.course_name;
        option.textContent = course.course_name;
        dropdown.appendChild(option);
    });
}

function switchAuthTabs(type) {
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("register-form").classList.add("hidden");
    document.getElementById("login-tab").classList.remove("active");
    document.getElementById("register-tab").classList.remove("active");

    if (type === "login") {
        document.getElementById("login-form").classList.remove("hidden");
        document.getElementById("login-tab").classList.add("active");
    } else {
        document.getElementById("register-form").classList.remove("hidden");
        document.getElementById("register-tab").classList.add("active");
    }
}

function showAuthModal() {
    document.getElementById("auth-backdrop").classList.remove("hidden");
}

function hideAuthModal() {
    document.getElementById("auth-backdrop").classList.add("hidden");
}

function switchContentTabs(type) {
    document.getElementById("game").classList.add("hidden");
    document.getElementById("course").classList.add("hidden");
    document.getElementById("game-tab").classList.remove("active");
    document.getElementById("course-tab").classList.remove("active");

    if (type === "game") {
        document.getElementById("game").classList.remove("hidden");
        document.getElementById("game-tab").classList.add("active");
    } else {
        document.getElementById("course").classList.remove("hidden");
        document.getElementById("course-tab").classList.add("active");
    }
}

function showContentModal() {
    document.getElementById("content").classList.remove("hidden");
}

function hideContentModal() {
    document.getElementById("content").classList.add("hidden");
}

function setUserInfo(email, role) {
    let userInfo = document.getElementById("user-info");
    userInfo.innerText = `${email} (${role})`;
}

function clearUserInfo() {
    document.getElementById("user-info").innerText = "";
}

function notificationAlert(message) {
    let notification = document.getElementById("notification");
    notification.innerText = message;
    notification.style.display = "block";
    setTimeout(() => notification.style.display = "none", 3000); // Nach 3 Sek. ausblenden
}