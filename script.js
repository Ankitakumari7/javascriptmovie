const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const seatContainer = document.querySelector(".row-container");
const activatebtn = document.querySelector(".activatebtn");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const movies = [
  { title: 'Parasite', genre: 'Thriller' },
  { title: 'Joker', genre: 'Drama' },
  { title: 'Jumanji: Next Level', genre: 'Adventure' },
  { title: 'Dolittle', genre: 'Comedy' }
];


// Another Approach

// seats.forEach(function(seat) {
//   seat.addEventListener("click", function(e) {
//     seat.classList.add("selected");
//     const selectedSeats = document.querySelectorAll(".container .selected");
//     selectedSeathLength = selectedSeats.length;
//     count.textContent = selectedSeathLength;
//     let ticketPrice = +movieSelect.value;
//     total.textContent = ticketPrice * selectedSeathLength;
//   });
// });
// Set the target time for the next show
const targetTime = new Date("2023-05-14T10:00:00").getTime();

// Update the timer every second
setInterval(() => {
  // Get the current time
  const currentTime = new Date().getTime();

  // Calculate the time left until the next show
  const timeLeft = targetTime - currentTime;

  // Calculate the hours, minutes, and seconds left
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // Format the time left as a string
  const timeLeftString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Update the timer div
  document.getElementById("timer").innerText = timeLeftString;
}, 1000);


// localStorage.clear();

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}
activatebtn.addEventListener("click",bookmovie)
function bookmovie(){
    if (localStorage.getItem("selectedSeats") ==='[]'){
	//activatebtn.disabled=true;
	document.querySelector(".messagecls").textContent= "Please select seat"
	
	}
	else {
		//activatebtn.disabled=false;
		document.querySelector(".messagecls").textContent= "Booking Successful";
		location.href="index.html"
		
		}
		
		


}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".container .selected");

  seatsIndex = [...selectedSeats].map(function(seat) {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  let selectedSeatsCount = selectedSeats.length;
  count.textContent = selectedSeatsCount;
  total.textContent = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach(function(seat, index) {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event

movieSelect.addEventListener("change", function(e) {
  ticketPrice = +movieSelect.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Adding selected class to only non-occupied seats on 'click'

seatContainer.addEventListener("click", function(e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// Initial count and total rendering
updateSelectedCount();