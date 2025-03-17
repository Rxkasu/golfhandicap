function generateHandicapChart() {
    const ctx = document.getElementById('handicapChart').getContext('2d');
    const json_data = JSON.parse(localStorage.getItem("data"));
    const user = json_data.find(user => user.email === current_user_data.email);
    const games = user.games;

    const labels = ["Start", ...games.map(game => game.date)];
    const oldHandicaps = [...games.map(game => game.ega), user.current_ega];
    const newHandicaps = [...games.map(game => game.whc), user.current_whc];
    console.log(labels);
    console.log(oldHandicaps);
    console.log(newHandicaps);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'EGA (Alte Methode)',
                    data: oldHandicaps,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: false,
                },
                {
                    label: 'WHC (Neue Methode)',
                    data: newHandicaps,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: false,
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Datum'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Handicap'
                    }
                }
            }
        }
    });
}