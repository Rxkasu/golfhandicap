function course_hdc(){
    let json_data = JSON.parse(localStorage.getItem("data"));
    let slope_rating = ''
    let course_rating = ''
    for (let i = 0; i < json_data.length; i++) {
        if (json_data[i].email === current_user_data.email) {
            slope_rating = json_data[i].slope_rating
            course_rating = json_data[i].course_rating
            break
        }
    }
    let course_hdc = hdc_in * slope_rating/113 +course_rating - par
}

function whci() {
    const games = current_user_data.games;
    const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

    games.slice(-20);
    const scoreDifferentials = getScoreDifferentials(games);

    if (games.length <= 3) {
        return scoreDifferentials[0] - 2;
    } else if (games.length === 4) {
        return scoreDifferentials[0] - 1;
    } else if (games.length === 5) {
        return scoreDifferentials[0];
    } else if (games.length === 6) {
        return mean(scoreDifferentials.slice(0, 2)) - 1;
    } else if (games.length <= 8) {
        return mean(scoreDifferentials.slice(0, 2));
    } else if (games.length <= 11) {
        return mean(scoreDifferentials.slice(0, 3));
    } else if (games.length <= 14) {
        return mean(scoreDifferentials.slice(0, 4));
    } else if (games.length <= 16) {
        return mean(scoreDifferentials.slice(0, 5));
    } else if (games.length <= 18) {
        return mean(scoreDifferentials.slice(0, 6));
    } else if (games.length === 19) {
        return mean(scoreDifferentials.slice(0, 7));
    } else {
        return mean(scoreDifferentials.slice(0, 8));
    }
}

function getScoreDifferentials(games) {
    const scoreDifferentials = [];
    games.forEach((game) => {
        scoreDifferentials.push(scoreDifferential(game));
    });
    return scoreDifferentials.sort((a, b) => a - b);
}

function scoreDifferential(game) {
    //const game = current_user_data.games[gameId];
    const allhits = holes.reduce((acc, hole) => acc + hole.hits, 0);
    return ((allhits - game.course_rating) * 113/game.slope_rating).toFixed(1);
}

function calculate_stableford(){
    let json_data = JSON.parse(localStorage.getItem("data"));
    let course_name = document.getElementById("courseSelect")
    if (course_name == false){
        window.alert("Bitte Kurs auswählen")
        return
    }
    let stable_points = 0
    for (let x = 0; x < json_data.length; x++){
        if (json_data[x].email === current_user_data.email){
            for (let y = 0; y < json_data[x].games.length; y++){
                if (json_data[x].games[y].course_name === course_name){
                    for (let i = 1; i <= 18; i++) {
                        let parInput = document.getElementById(`par${i}`);
                        let hitsInput = document.getElementById(`hits${i}`);
                    
                        if (parInput > 0 && hitsInput > 0) {
                            let stable_add = hitsInput - parInput
                            if (stable_add >= 2){
                                stable_points = stable_points + 0
                            }
                            if (stable_add === 1){
                                stable_points = stable_points + 1
                            }
                            if (stable_add === 0){
                                stable_points = stable_points + 2
                            }
                            if (stable_add === -1){
                                stable_points = stable_points + 3
                            }
                            if (stable_add === -2){
                                stable_points = stable_points + 4
                            }
                            if (stable_add <= -3){
                                stable_points = stable_points + 5
                            }
                        }
                    }
                }
            }
        }
    }
    if (stable_points >= 0){
        return stable_points
    }
}

// Calculates the handicap using stableford points: https://serviceportal.dgv-intranet.de/regularien/vorgabensystem/i539_1.cfm
function calculate_old_hdc(){
    let json_data = JSON.parse(localStorage.getItem("data"));
    let course_name = document.getElementById("courseSelect")
    let handicap = 0
    let stable_points = calculate_stableford()
    for (let x = 0; x < json_data.length; x++){
        if (json_data[x].email === current_user_data.email){                                            // Find data of current user
            for (let y = 0; y < json_data[x].games.length; y++){
                if (json_data[x].games[y].course_name === course_name){
                    handicap = json_data[x].games[y].hcp_index
                    if (handicap <= 4.4){                                                               // Checks the current handicap-class
                        if (stable_points === 36){                                                      // Handicap stays the same
                            json_data[x].games[y].hcp_index = handicap
                            return
                        }
                        else if (stable_points > 36){                                                   // Handicap gets reduced (player performed better than usual)
                            while (stable_points >= 36){
                                stable_points = stable_points - 1
                                handicap = handicap - 0.1
                            }
                            json_data[x].games[y].hcp_index = handicap
                        }
                        else if (stable_points < 35){                                                   // Handicap gets increased (plyer perfomed worse than usual)
                            while (stable_points <= 36){
                                stable_points = stable_points + 1
                                handicap = handicap + 0.1
                            }
                            json_data[x].games[y].hcp_index = handicap
                        }
                    }
                    else if (handicap > 4.4 && handicap <= 11.4){                                       // Handicap class 2
                        if (stable_points === 36){
                            json_data[x].games[y].hcp_index = json_data[x].games[y].hcp_index
                            return
                        }
                        else if (stable_points > 36){
                            while (stable_points >= 36){
                                stable_points = stable_points - 1
                                handicap = handicap - 0.2
                            }
                            json_data[x].games[y].hcp_index = handicap
                        }
                        else if (stable_points < 34){
                            while (stable_points <= 36){
                                stable_points = stable_points + 1
                                handicap = handicap + 0.1
                            }
                            json_data[x].games[y].hcp_index = handicap
                        }
                    }
                    else if (handicap > 11.4 && handicap <= 18.4){                                      // Handicap class 3
                        if (stable_points === 36){
                            json_data[x].games[y].hcp_index = json_data[x].games[y].hcp_index
                            return
                        }
                        else if (stable_points > 36){
                            while (stable_points >= 36){
                                stable_points = stable_points - 1
                                handicap = handicap - 0.3
                            }
                            json_data[x].games[y].hcp_index = handicap
                        }
                        else if (stable_points < 34){
                            while (stable_points <= 36){
                                stable_points = stable_points + 1
                                handicap = handicap + 0.1
                            }
                            json_data[x].games[y].hcp_index = handicap
                        }
                    }
                    else if (handicap > 18.4 && handicap <= 26.4){                                      // Handicap class 4
                        if (stable_points === 36){
                            json_data[x].games[y].hcp_index = json_data[x].games[y].hcp_index
                            return
                        }
                        else if (stable_points > 36){
                            while (stable_points >= 36){
                                stable_points = stable_points - 1
                                handicap = handicap - 0.4
                            }
                            json_data[x].games[y].hcp_index = handicap
                        }
                        else if (stable_points < 34){
                            while (stable_points <= 36){
                                stable_points = stable_points + 1
                                handicap = handicap + 0.1
                            }
                            json_data[x].games[y].hcp_index = handicap
                        }
                    }
                    else if (handicap > 26.4 && handicap <= 36){                                        // Handicap class 5
                        if (stable_points === 36){
                            json_data[x].games[y].hcp_index = json_data[x].games[y].hcp_index
                            return
                        }
                        else if (stable_points > 36){
                            while (stable_points >= 36){
                                stable_points = stable_points - 1
                                handicap = handicap - 0.5
                            }
                            json_data[x].games[y].hcp_index = handicap
                        }
                        else if (stable_points < 34){                                                   // On class 5 and upwards handicap can't increase
                            json_data[x].games[y].hcp_index = handicap
                            return
                        }
                        json_data[x].games[y].hcp_index = handicap
                    }
                    else if (handicap > 36 && handicap <= 54){                                          // Handicap class 6
                        if (stable_points === 36){
                            json_data[x].games[y].hcp_index = handicap
                            return
                        }
                        else if (stable_points > 36){
                            while (stable_points >= 36){
                                stable_points = stable_points - 1
                                handicap = handicap - 1
                            }
                            json_data[x].games[y].hcp_index = handicap
                        }
                        else if (stable_points < 34){
                            json_data[x].games[y].hcp_index = handicap
                            return
                        }
                        json_data[x].games[y].hcp_index = handicap
                    }
                    break
                }
            }
            break
        }
    }
}