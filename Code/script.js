
function create_json(){
    //if (localStorage.getItem("data") == null){

        json_data= {"game_id": '', "course_name": '', "date": get_date(), "hcp_index": 0, "course_rating": '', "slope_rating": '', "games": [ {"gameid": ''}, {"holes": [ {"hole_id": 1, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 2, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 3, "par": 0, "hcp": 0, "hits":0},
        {"hole_id": 4, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 5, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 6, "par": 0, "hcp": 0, "hits":0},
        {"hole_id": 7, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 8, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 9, "par": 0, "hcp": 0, "hits":0},
        {"hole_id": 10, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 11, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 12, "par": 0, "hcp": 0, "hits":0},
        {"hole_id": 13, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 14, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 15, "par": 0, "hcp": 0, "hits":0},
        {"hole_id": 16, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 17, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 18, "par": 0, "hcp": 0, "hits":0}]}]}
        localStorage.setItem("data", JSON.stringify(json_data))
    //}
    //else {
    //    let data = localStorage.getItem("data")
    //     json_data = JSON.parse(data)
    //}
}

function get_date(){
    let today = new Date();
    let day = (today.getDate().toString().padStart(2, '0'))
    let month = ((today.getMonth() + 1).toString().padStart(2, '0'))
    let year = today.getFullYear()
    let date = `${day}/${month}/${year}`
    return date
}


function generateFields() {
    let container = document.getElementById("container2");
    let inputs = container.querySelectorAll("input[type=text]");
    inputs.forEach(input => input.remove());
    container.style.display = "block"

    for (let i = 1; i <= 18; i++) {
        let div = document.createElement("div");
        div.className = "input-group";

        let input1 = document.createElement("input");
        input1.type = "text";
        input1.placeholder = `par - Loch ${i}`;
        input1.id = `par${i}`
        //input1.defaultValue = 0

        let input2 = document.createElement("input");
        input2.type = "text";
        input2.placeholder = `hcp - Loch ${i}`;
        input2.id = `hcp${i}`
        //input2.defaultValue = 0

        let input3 = document.createElement("input");
        input3.type = "text";
        input3.placeholder = `hits - Loch ${i}`;
        input3.id = `hits${i}`
        //input3.defaultValue = 0

        div.appendChild(input1);
        div.appendChild(input2);
        div.appendChild(input3);

        container.appendChild(div);
    }
}
function close_con(button){
    let container = button.parentElement;
    container.style.display= 'none'
}
function save_inputs(){
    let json_data = JSON.parse(localStorage.getItem("data"));
    for (let i = 1; i <= 18; i++) {
        let par = document.getElementById(`par${i}`).value || 0;
        let hcp = document.getElementById(`hcp${i}`).value || 0;
        let hits = document.getElementById(`hits${i}`).value || 0;

        // Setze die Werte im JSON-Objekt
        json_data.games.holes[i - 1].par = par ? parseInt(par) : 0;
        json_data.games.holes[i - 1].hcp = hcp ? parseInt(hcp) : 0;
        json_data.games.holes[i - 1].hits = hits ? parseInt(hits) : 0;
    }
    console.log(JSON.stringify(json_data));
    localStorage.setItem("holedata", JSON.stringify(json_data))
}

function new_course(){
    let container = document.getElementById("container");
    container.style.display = "block"
    
}