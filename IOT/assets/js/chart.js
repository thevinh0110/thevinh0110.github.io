
var data = {
    labels: [0],
    datasets: [{
      label: 'Temperature',
      data: [0],
      borderWidth: 1.5,
      lineTension:0.5,
      borderColor: 'hsl(250, 100%, 75%)',
      backgroundColor: 'hsl(265, 100%, 75%)',
    }]  
}

Chart.defaults.font.size = 16;
Chart.defaults.color = 'hsl(219, 18%, 65%)';
var config = {
    type: 'line',
    data :data,
    options: {
      scales: {
        x:{
          title: {
            font:{
              weight:600,
              size:20
            },
              display: true,
              text: 'Time',
              color:'hsl(250, 66%, 75%)'
          },
          grid: {
            color: 'hsl(291.29deg 23.02% 37.76% / 50%)  ',
            borderColor: 'grey',
            tickColor: 'hsl(265, 100%, 75%)'
          }
      },
        y:{
          maxRotation: 90,
          title: {
            transform:{
              rotate:'10deg'
            },
            font:{
              weight:600,
              size:20
            },
            display: true,
            text: '℃',
            color:'hsl(250, 66%, 75%)'
        },
        grid: {
          color: 'hsl(291.29deg 23.02% 37.76% / 50%)  ',
          borderColor: 'grey',
          tickColor: 'hsl(265, 100%, 75%)'
        },
          beginAtZero: true
        }
      },
        responsive: true
      }
}
var mychart = new Chart(
    document.getElementById('myChart'),
    config
)
window.setInterval(callback,2000)

function callback() {
  if(data.labels.length > 30) {
    data.labels.splice(1,1)
    data.datasets[0].data.splice(1,1)
  }
  var now = new Date()
    now = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()
    var value = Math.floor(Math.random() * 40)
    data.labels.push(now)
    data.datasets[0].data.push(value)
    console.log(data.labels.length)
    mychart.update()
}
