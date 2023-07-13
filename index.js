// https://kontests.net/api
let cardBody = document.getElementById('cardBody');
let category = ["developer", "computer", "laptop", "programming", "coding"];
let website = ["CodeForces", "CodeChef", "TopCoder", "AtCoder", "HackerRank", "HackerEarth", "LeetCode"];
let websiteAPI = ["codeforces", "code_chef", "top_coder", "at_coder", "hacker_rank", "hacker_earth", "leet_code"];
let imageList = ["cf.png", "cc.png", "topCoder.png", "atCoder.jpg", "hackerRank.png", "hackerEarth.jpg", "leetCode.png"];
let webList = document.getElementById('webList');
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatedDate(oldDate) {
    let Dates = new Date(oldDate);
    let offset = Dates.getTimezoneOffset();
    let utc = new Date(Dates.getTime() - offset);
    let Year = ('' + utc.getFullYear()).substring(2, 4);
    let Month = utc.getMonth();
    let date = utc.getDate();
    let day = days[utc.getDay()];
    let hour = utc.getHours();
    let minutes = utc.getMinutes();
    let seconds = utc.getSeconds();
    if (hour < 10) hour = '0' + hour;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
    if (date < 10) date = '0' + date;
    if (Month < 10) Month = '0' + Month;
    if (Year < 10) Year = '0' + Year;
    return date + "." + Month + "." + Year + " " + day + " " + hour + ":" + minutes + " IST";
}

function sendCategory(index) {
    fetchAPI(websiteAPI[index]);
}
fetchAPI("all");

// fetch api for coding contest
function fetchAPI(webName) {
    fetch(`https://kontests.net/api/v1/${webName}`)
        .then(response => response.json())
        .then(data => {
            let str = "";
            for (key in data) {

                let strs = data[key].site != undefined ? data[key].site : website[websiteAPI.indexOf(webName)];
                let image = "";
                for (let i = 0; i < website.length; i++) {
                    if (strs === website[i]) image = "image/" + imageList[i];
                }

                let time = "";
                if (data[key].duration < 86400) {
                    let hours = Math.floor(data[key].duration / 3600);
                    let minutes = (data[key].duration % 3600) / 60;
                    if (minutes === 0) time = hours + " hrs"
                    else time = hours + " hrs " + minutes + " mins";
                }
                else {
                    time = Math.round(data[key].duration / 86400) + " days";
                }

                str += `<div class="card mb-5">
                        <img src="${image} " class="card-img-top"
                            alt="Image">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <h5 class="card-title">${data[key].name}</h5>
                                <div>
                                    <span class="badge text-bg-success">${strs} </span>
                                    ${data[key].in_24_hours === "No" ? `<span></span>` : `<span class="badge text-bg-danger">Ends in 24 hour</span>`}
                                   
                                </div >
                            </div >
                            <div class="d-grid gap-1">
                                <a class="btn btn-secondary m-2" href="${data[key].url}" target="_blank">Enter Contest</a>
                            </div>
                        </div >
                        <div class="d-flex justify-content-between card-footer text-muted">
                        <div class="timeText ">
                            <b>Start:</b> ${formatedDate(data[key].start_time)}
                        </div>
                        <div class="timeText ">
                            <b>Duration:</b> ${time}
                        </div>
                        <div class="timeText ">
                            <b>End:</b> ${formatedDate(data[key].end_time)}
                        </div>
                    </div>
                  </div > `;
            }
            cardBody.innerHTML = str;
        }).catch(err => console.error(err));
}


// Not of Use
function map(f, a) {
    const result = new Array(a.length);
    for (let i = 0; i < a.length; i++) {
      result[i] = f(a[i]);
    }
    return result;
  }

  function map(f, a) {
    const result = new Array(a.length);
    for (let i = 0; i < a.length; i++) {
      result[i] = f(a[i]);
    }
    return result;
  }
  
  const cube = function (x) {
    return x * x * x;
  };
  
  const numbers = [0, 1, 2, 5, 10];
  console.log(map(cube, numbers)); // [0, 1, 8, 125, 1000]
  