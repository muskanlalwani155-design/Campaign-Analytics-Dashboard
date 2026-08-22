let barGraph = document.getElementById("myChart");
let ctx = barGraph.getContext('2d');

let myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Google", "Instagram", "Telegram", "Google Ads"],
        datasets: [{
            label: "conversions",
            data: [400, 950, 740, 540],
            backgroundColor: ['#EC4899', '#8B5CF6', '#06B6D4', '#F59E0B']
        }] 
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});


let pieChart = document.getElementById("doughnutChart");
let doughnutCtx = pieChart.getContext("2d");

let doughnutChart = new Chart(doughnutCtx, {
    type: "doughnut",
    data: {
        labels: ["Google", "Instagram", "Telegram", "Google Ads"],
        datasets: [{
            label: "conversions",
            data: [300, 400, 400, 500],
            backgroundColor: ["#EC4899", "#8B5CF6", "#06B6D4", "#F59E0B"]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});


let timeFilterData = {
    "7days": {
        barData: [300, 200, 500, 900],
        doughnutData: [250, 350, 450, 400],
        impression: 350000,
        clicks: 35000,
        conversion: 1750
    },
    "30days": {
        barData: [500, 700, 400, 200],
        doughnutData: [400, 300, 500, 300],
        impression: 120000,
        clicks: 14400,
        conversion: 1200
    },
    "month": {
        barData: [800, 200, 300, 400],
        doughnutData: [500, 200, 250, 450],
        impression: 150000,
        clicks: 22500,
        conversion: 2250
    }
};

let attributionData = {
    "lastTouch": {
        barData: [400, 350, 345, 560],
        doughnutData: [300, 400, 400, 500],
        impression: 180000,
        clicks: 18000,
        conversion: 1400
    },
    "firstTouch": {
        barData: [460, 560, 340, 450],
        doughnutData: [450, 350, 250, 350],
        impression: 220000,
        clicks: 26000,
        conversion: 1650
    },
    "linear": {
        barData: [370, 345, 260, 780],
        doughnutData: [320, 420, 360, 300],
        impression: 195000,
        clicks: 21000,
        conversion: 1500
    }
};


let dataDropdown = document.getElementById("timeFilter");
let attributionDropdown = document.getElementById("attributionFilter");

let impressionValue = document.getElementById("impressionValue");
let clickValue = document.getElementById("clickValue");
let conversionValue = document.getElementById("conversionValue");

let impressionBar = document.getElementById("impressionBar");
let clickBar = document.getElementById("clickBar");
let conversionBar = document.getElementById("conversionBar");


function updateAllComponents(data) {
    
    myChart.data.datasets[0].data = data.barData;
    myChart.update();

    
    doughnutChart.data.datasets[0].data = data.doughnutData;
    doughnutChart.update();

    
    let clickPercent = ((data.clicks / data.impression) * 100).toFixed(1);
    let conversionPercent = ((data.conversion / data.impression) * 100).toFixed(2);

    impressionValue.innerText = `${data.impression.toLocaleString()} (100%)`;
    clickValue.innerText = `${data.clicks.toLocaleString()} (${clickPercent}%)`;
    conversionValue.innerText = `${data.conversion.toLocaleString()} (${conversionPercent}%)`;

    impressionBar.style.width = "100%";
    clickBar.style.width = `${Math.min(clickPercent, 100)}%`;
    conversionBar.style.width = `${Math.min(conversionPercent * 15, 100)}%`;
}


dataDropdown.addEventListener("change", (e) => {
    let selectedValue = e.target.value;
    if (selectedValue && timeFilterData[selectedValue]) {
        updateAllComponents(timeFilterData[selectedValue]);
    }
});

attributionDropdown.addEventListener("change", (e) => {
    let valueSelected = e.target.value;
    if (valueSelected && attributionData[valueSelected]) {
        updateAllComponents(attributionData[valueSelected]);
    }
});


let themeBtn = document.getElementById("themeToggleBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeBtn.innerText = "☀️ Light Mode";
    } else {
        themeBtn.innerText = "🌙 Dark Mode";
    }
});


let hamburgerBtn = document.getElementById("hamburgerBtn");
let container = document.querySelector(".container");

hamburgerBtn.addEventListener("click", () => {
    container.classList.toggle("collapsed");
});