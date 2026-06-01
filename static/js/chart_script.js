new Chart(document.getElementById('tempChart'), {
    type: 'line',
    data: {
        labels: hourlyTimes,
        datasets: [{
            label: 'Temperature (°C)',
            data: hourlyTemps,
            tension: 0.3,
            pointRadius: 5,
            pointHoverRadius: 8
        }]
    },
    options: {
        plugins: {
        legend: {
            labels: {
                color: 'white',
                font: {
                    size: 14
                }
            }
        }
    },
        responsive: true,
        scales: {
            y: {
                ticks: {
                    color: 'white',
                    font: {
                        size: 12
                    }
                },
                title: {
                    display: true,
                    text: 'Temperature °C',
                    color: 'white',
                    font: {
                        size: 14
                    },
                }
            },
            x: {
                ticks: {
                    color: 'white',
                    font: {
                        size: 12
                    }
                },
                title: {
                    display: true,
                    text: 'Time',
                    color: 'white',
                    font: {
                        size: 14
                    }
                }
            }
        }
    }
});