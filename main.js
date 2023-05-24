const ctx = document.getElementById("myChart").getContext("2d");
let delayed;
//Gradient color fill:
let gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, "rgba(58, 123, 213,1)");
gradient.addColorStop(1, "rgba(0, 210, 255, 0.3)");

const labels = ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"];

const data = {
  labels,
  datasets: [
    {
      data: [150, 280, 250, 300, 400, 350, 500, 450],
      label: "Home Product Sales",
      fill: true,
      backgroundColor: gradient,
      borderColor: 'gray',
      pointBackgroundColor: '#000',
    //   tension: 0.4,    //helps to curve the line
    },
  ],
};

const config = {
  type: "line",
  data: data,
  options: {
    radius: 4,
    hitRadius: 30,
    hoverRadius: 8,
    response: true,
    animation: {
        onComplete: ()=>{
            delayed = true;
        },
        delay: (context)=>{
            let delay = 0;
            if(context.type === "data" && context.mode === "default" && !delayed){
                delay= context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
        }
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return "$" + value + "m";
          },
        },
      },
    },
  },
};

const myChart = new Chart(ctx, config);
