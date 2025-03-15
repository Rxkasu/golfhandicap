createCourseSelect();
generateGameFields();
generateCourseInputFields();

// Generates 18x3 input-fields for 18 holes with par, hcp and hits
function generateGameFields() {
    let container = document.getElementById("game-fields");
    let inputs = container.querySelectorAll("input[type=text]");
    inputs.forEach(input => input.remove());

    // Überschrift für die Felder
    let title = document.createElement("h5");
    title.innerText = "Kurs-Daten eingeben:";
    title.className = "mt-3";
    container.appendChild(title);

    let div = document.createElement("div");
    div.className = "row g-2 mb-2";
    div.style.display = 'flex';
    div.style.flexWrap = 'wrap';
    div.style.width = '100%';

    const holesPerTable = 9;
    const totalHoles = 18 / holesPerTable;

    for (let tableIndex = 0; tableIndex < totalHoles; tableIndex++) {
        let tableWrapper = document.createElement("div");
        tableWrapper.className = "col-md-6 mb-4";

        let table = document.createElement("table");
        table.className = "table text-center shadow-sm";

        let thead = document.createElement("thead");
        thead.className = "table-light";
        let headerRow = document.createElement("tr");
        ["Loch", "HCP", "Par", "Schläge"].forEach(text => {
            let th = document.createElement("th");
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        let tbody = document.createElement("tbody");
        for (let i = 1; i <= holesPerTable; i++) {
            let holeNumber = i + tableIndex * holesPerTable;
            let row = document.createElement("tr");

            let tdHole = document.createElement("td");
            tdHole.textContent = ""+holeNumber;
            tdHole.style.fontWeight = "bold";
            tdHole.style.fontSize = "1.2rem";
            row.appendChild(tdHole);

            let tdHcp = document.createElement("td");
            let inputHcp = document.createElement("input");
            inputHcp.type = "number";
            inputHcp.className = "form-control text-center border-secondary";
            inputHcp.placeholder = "HCP";
            inputHcp.disabled = true;
            inputHcp.id = `hcp${holeNumber}`;
            tdHcp.appendChild(inputHcp);
            row.appendChild(tdHcp);

            let tdPar = document.createElement("td");
            let inputPar = document.createElement("input");
            inputPar.type = "number";
            inputPar.className = "form-control text-center border-secondary";
            inputPar.placeholder = "Par";
            inputPar.disabled = true;
            inputPar.id = `par${holeNumber}`;
            tdPar.appendChild(inputPar);
            row.appendChild(tdPar);

            let tdHits = document.createElement("td");
            let inputHits = document.createElement("input");
            inputHits.type = "number";
            inputHits.className = "form-control text-center border-secondary";
            inputHits.placeholder = "Schläge";
            inputHits.id = `hits${holeNumber}`;
            tdHits.appendChild(inputHits);
            row.appendChild(tdHits);

            tbody.appendChild(row);
        }

        table.appendChild(tbody);
        tableWrapper.appendChild(table);
        div.appendChild(tableWrapper);

    }
    container.appendChild(div);
}

function generateCourseInputFields() {
    let container = document.getElementById("course-input-hole-fields");
    let inputs = container.querySelectorAll("input[type=text]");
    inputs.forEach(input => input.remove());

    // Überschrift für die Felder
    let title = document.createElement("h5");
    title.innerText = "Kurs-Daten eingeben:";
    title.className = "mt-3";
    container.appendChild(title);

    let div = document.createElement("div");
    div.className = "row g-2 mb-2";
    div.style.display = 'flex';
    div.style.flexWrap = 'wrap';
    div.style.width = '100%';

    const holesPerTable = 9;
    const totalHoles = 18 / holesPerTable;

    for (let tableIndex = 0; tableIndex < totalHoles; tableIndex++) {
        let tableWrapper = document.createElement("div");
        tableWrapper.className = "col-md-6 mb-4";

        let table = document.createElement("table");
        table.className = "table text-center shadow-sm";

        let thead = document.createElement("thead");
        thead.className = "table-light";
        let headerRow = document.createElement("tr");
        ["Loch", "HCP", "Par"].forEach(text => {
            let th = document.createElement("th");
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        let tbody = document.createElement("tbody");
        for (let i = 1; i <= holesPerTable; i++) {
            let holeNumber = i + tableIndex * holesPerTable;
            let row = document.createElement("tr");

            let tdHole = document.createElement("td");
            tdHole.textContent = ""+holeNumber;
            tdHole.style.fontWeight = "bold";
            tdHole.style.fontSize = "1.2rem";
            row.appendChild(tdHole);

            let tdHcp = document.createElement("td");
            let inputHcp = document.createElement("input");
            inputHcp.type = "number";
            inputHcp.className = "form-control text-center border-secondary";
            inputHcp.placeholder = "HCP";
            inputHcp.id = `chcp${holeNumber}`;
            tdHcp.appendChild(inputHcp);
            row.appendChild(tdHcp);

            let tdPar = document.createElement("td");
            let inputPar = document.createElement("input");
            inputPar.type = "number";
            inputPar.className = "form-control text-center border-secondary";
            inputPar.placeholder = "Par";
            inputPar.id = `cpar${holeNumber}`;
            tdPar.appendChild(inputPar);
            row.appendChild(tdPar);

            tbody.appendChild(row);
        }

        table.appendChild(tbody);
        tableWrapper.appendChild(table);
        div.appendChild(tableWrapper);

    }
    container.appendChild(div);

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
    dropdown.onchange = load_course_holes;
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
    document.getElementById("stats").classList.add("hidden");
    document.getElementById("secretary").classList.add("hidden");
    document.getElementById("gameLeader").classList.add("hidden");
    document.getElementById("game-tab").classList.remove("active");
    document.getElementById("course-tab").classList.remove("active");
    document.getElementById("stats-tab").classList.remove("active");
    document.getElementById("secretary-tab").classList.remove("active");
    document.getElementById("gameLeader-tab").classList.remove("active");

    if (type === "game") {
        document.getElementById("game").classList.remove("hidden");
        document.getElementById("game-tab").classList.add("active");
    } else if (type === "course") {
        document.getElementById("course").classList.remove("hidden");
        document.getElementById("course-tab").classList.add("active");
    } else if (type === "stats") {
        document.getElementById("stats").classList.remove("hidden");
        document.getElementById("stats-tab").classList.add("active");
    } else if (type === "secretary") {
        document.getElementById("secretary").classList.remove("hidden");
        document.getElementById("secretary-tab").classList.add("active");
    } else {
        document.getElementById("gameLeader").classList.remove("hidden");
        document.getElementById("gameLeader-tab").classList.add("active");
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