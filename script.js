let API_KEY = 'nebq5c6OHSvWgasLlGqeHzDNuSkRezb7PSscnQmD';
let BASE_URL = 'https://cors-anywhere.herokuapp.com/https://developer.nps.gov/api/v1';

let state = '';

$(function ready(){
  submit ();
})

function submit () {
  $('form').submit(function (e) {
    event.preventDefault(); 

    let capture = $('#maxResults').val();
  
    let userMax = capture;
    const userState = $('#state').val();

    console.log ('Max Results is ' + capture);
    console.log ('State(s) is/are ' + userState);

      return getParksInfo(userMax, userState)
      .then(function (data) {
        console.log('hello', data);
        displayResults(data, capture);
      });
  });   
}

function route(path){
  return fetch (BASE_URL + path, {
    headers: {
      'X-Api-Key': API_KEY
    }
  })
}

function getParksInfo (userMax, userState) {

  state = userState;
  return route(`/parks?stateCode=${userState}&limit=${userMax}`)
  .then (response => response.json())
  .then (response => {
     return response.data;
  });
}



function displayResults (parks, userMax) {
  console.log(parks[0])
  let parksHTML = parks.map(displayPark);
  console.log(parksHTML)
  $('#results').append(`<h2 class= 'resultTitle' target="_blank">Showing ${userMax} Results for ${state}</h2><ol>${parksHTML}</ol>`); 
}

function displayPark(park){
  return `<li><p><b>Park Full Name:</b></p> ${park.fullName}<br><br><p><b>  Description:</b></p> ${park.description}<br><br><p><b>URL:</p></b> <a href=" ${park.url}">Visit Park Website Here</a></li><br><br>`;
}

