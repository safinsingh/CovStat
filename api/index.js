$.getJSON("https://covidtracking.com/api/us/daily", function (data) {
    var lineChart = document.getElementById("lineChart").getContext("2d");

    var datesLine = [];
    var pos = [];
    var hosp = [];
    var deaths = [];

    var cutoff = new Date("March 09 2020");

    var i;
    for (i = 0; i < data.length; i++) {
        var dateString = data[i].date.toString();
        var year = dateString.substring(0, 4);
        var month = dateString.substring(4, 6);
        var day = dateString.substring(6, 8);

        var myDate = new Date(year, month - 1, day);

        if (myDate >= cutoff) {
            datesLine.push(myDate.toDateString());
            pos.push(data[i].positiveIncrease);
            if (data[i].hospitalizedIncrease >= 0) {
                hosp.push(data[i].hospitalizedIncrease);
            }
            deaths.push(data[i].deathIncrease);
        }
    }

    var chart = new Chart(lineChart, {
        // The type of chart we want to create
        type: "line",

        // The data for our dataset
        data: {
            labels: datesLine,
            datasets: [
                {
                    label: "Deaths",
                    backgroundColor: ["rgba(255, 205, 86, 1)"],
                    borderColor: ["rgba(255, 205, 86, 1)"],
                    data: deaths,
                },
                {
                    label: "Hospitalized",
                    backgroundColor: ["rgba(54, 162, 235, 1)"],
                    borderColor: ["rgba(54, 162, 235, 1)"],
                    data: hosp,
                },
                {
                    label: "Tested Positive",
                    backgroundColor: ["rgba(255, 99, 132, 1)"],
                    borderColor: ["rgba(255, 99, 132, 1)"],
                    data: pos,
                },
            ],
        },

        // Configuration options go here
        options: {
            scales: {
                xAxes: [
                    {
                        type: "time",
                        time: {
                            unit: "month",
                        },
                    },
                ],
            },
            elements: {
                point: {
                    radius: 0,
                },
            },
        },
    });
});

$.getJSON("https://covidtracking.com/api/us", function (data2) {
    var doughnutChart = document
        .getElementById("doughnutChart")
        .getContext("2d");

    console.log(data2[0].deathIncrease);

    var chart = new Chart(doughnutChart, {
        // The type of chart we want to create
        type: "doughnut",

        // The data for our dataset
        data: {
            labels: ["Tested Negative Today", "Tested Positive Today"],
            datasets: [
                {
                    data: [
                        data2[0].negativeIncrease,
                        data2[0].positiveIncrease,
                    ],
                    backgroundColor: [
                        "rgb(255, 99, 132)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 205, 86)",
                    ],
                },
            ],
        },

        // Configuration options go here
        options: {},
    });

    var radarUS = document.getElementById("radarUS").getContext("2d");

    var chart = new Chart(radarUS, {
        // The type of chart we want to create
        type: "bar",

        // The data for our dataset
        data: {
            datasets: [
                {
                    label: "Hospitalized Currently",
                    data: [data2[0].hospitalizedCurrently],
                    backgroundColor: ["rgb(255, 99, 132)"],
                },
                {
                    label: "Total in ICU",
                    data: [data2[0].inIcuCumulative],
                    backgroundColor: ["rgb(255, 205, 86)"],
                },
                {
                    label: "Total on ventilator",
                    data: [data2[0].onVentilatorCurrently],
                    backgroundColor: ["rgb(54, 162, 235)"],
                },
            ],
        },

        // Configuration options go here
        options: {},
    });
});

// CALIFORNIA

$.getJSON("https://covidtracking.com/api/states/daily", function (data) {
    var caLC = document.getElementById("caLC").getContext("2d");

    var datesLine = [];
    var pos = [];
    var deaths = [];

    var cutoff = new Date("March 09 2020");

    var i;
    for (i = 0; i < data.length / 56; i++) {
        var dateString = data[56 * i + 5].date.toString();
        var year = dateString.substring(0, 4);
        var month = dateString.substring(4, 6);
        var day = dateString.substring(6, 8);

        var myDate = new Date(year, month - 1, day);

        if (myDate >= cutoff) {
            datesLine.push(myDate.toDateString());
            pos.push(data[56 * i + 5].positiveIncrease);
            deaths.push(data[56 * i + 5].deathIncrease);
        }
    }

    var chart = new Chart(caLC, {
        // The type of chart we want to create
        type: "line",

        // The data for our dataset
        data: {
            labels: datesLine,
            datasets: [
                // {
                //     label: "Hospitalized",
                //     backgroundColor: ["rgba(54, 162, 235, 1)"],
                //     borderColor: ["rgba(54, 162, 235, 1)"],
                //     data: hosp,
                // },
                {
                    label: "Deaths",
                    backgroundColor: ["rgba(255, 205, 86, 1)"],
                    borderColor: ["rgba(255, 205, 86, 1)"],
                    data: deaths,
                },

                {
                    label: "Tested Positive",
                    backgroundColor: ["rgba(255, 99, 132, 1)"],
                    borderColor: ["rgba(255, 99, 132, 1)"],
                    data: pos,
                },
            ],
        },

        // Configuration options go here
        options: {
            scales: {
                xAxes: [
                    {
                        type: "time",
                        time: {
                            unit: "month",
                        },
                    },
                ],
            },
            elements: {
                point: {
                    radius: 0,
                },
            },
        },
    });
});

$.getJSON("https://covidtracking.com/api/states", function (data2) {
    var doughnutChart = document.getElementById("caDC").getContext("2d");

    document.getElementById("grade").innerHTML = "A";

    switch (document.getElementById("grade").innerHTML) {
        case "A+":
            document.getElementById("grade").classList.add("text-success");
            break;
        case "A":
            document.getElementById("grade").classList.add("text-success");
            break;
        case "A-":
            document.getElementById("grade").classList.add("text-success");
            break;
        case "B+":
            document.getElementById("grade").classList.add("text-success");
            break;
        case "B":
            document.getElementById("grade").classList.add("text-warning");
            break;
        case "B-":
            document.getElementById("grade").classList.add("text-warning");
            break;
        case "C+":
            document.getElementById("grade").classList.add("text-warning");
            break;
        case "C":
            document.getElementById("grade").classList.add("text-warning");
            break;
        default:
            document.getElementById("grade").classList.add("text-danger");
            break;
    }

    console.log(data2[5].deathIncrease);

    var chart = new Chart(doughnutChart, {
        // The type of chart we want to create
        type: "doughnut",

        // The data for our dataset
        data: {
            labels: ["Tested Negative Today", "Tested Positive Today"],
            datasets: [
                {
                    data: [
                        data2[5].negativeIncrease,
                        data2[5].positiveIncrease,
                    ],
                    backgroundColor: [
                        "rgb(255, 99, 132)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 205, 86)",
                    ],
                },
            ],
        },

        // Configuration options go here
        options: {},
    });

    var radarCA = document.getElementById("radarCA").getContext("2d");

    var chart = new Chart(radarCA, {
        // The type of chart we want to create
        type: "bar",

        // The data for our dataset
        data: {
            datasets: [
                {
                    label: "Hospitalized Currently",
                    data: [data2[5].hospitalizedCurrently],
                    backgroundColor: ["rgb(255, 99, 132)"],
                },
                {
                    label: "Total in ICU",
                    data: [data2[5].inIcuCurrently],
                    backgroundColor: ["rgb(255, 205, 86)"],
                },
            ],
        },

        // Configuration options go here
        options: {},
    });
});
