
var data = {
    labels: [0],
    datasets: [{
      label: 'Temperature   ',
      data: [0],
      borderWidth: 1.5,
      lineTension:0.5,
      borderColor: 'hsl(250, 100%, 75%)',
      backgroundColor: 'hsl(265, 100%, 75%) ',
      color: '#666'
    }],
    options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
}

Chart.defaults.font.size = 16;
var config = {
    type: 'line',
    data :data,
}
var mychart = new Chart(
    document.getElementById('myChart'),
    config
)
window.setInterval(callback,2000)

function callback() {
    var now = new Date()
    now = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()
    var value = Math.floor(Math.random() * 40)
    data.labels.push(now)
    data.datasets[0].data.push(value)

    mychart.update()
}