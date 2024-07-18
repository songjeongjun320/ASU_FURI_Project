// Sample data for demonstration
const containerData = {
  containerNumber: "123456",
  time: "08:00 AM",
  inOut: "In",
  containerSize: "20ft",
  driverName: "John Doe",
  truckNumber: "ABC123",
  chassisNumber: "CH12345",
  pictures: [
    "https://via.placeholder.com/300?text=Truck+Angle+1",
    "https://via.placeholder.com/300?text=Truck+Angle+2",
    "https://via.placeholder.com/300?text=Truck+Angle+3",
  ],
};


// Function to display container details
function displayContainerDetails(data) {
  const containerInfo = document.querySelector(".container-info");
  const containerInfoHTML = `
        <h2>Container Number: ${data.number}</h2>
        <p><strong>Time:</strong> ${data.time}</p>
        <p><strong>In/Out:</strong> ${data.inOut}</p>
        <p><strong>Container Size:</strong> ${data.size}</p>
        <p><strong>Driver's Name:</strong> ${data.driver}</p>
        <p><strong>Truck Number:</strong> ${data.truckNumber}</p>
        <p><strong>Chassis Number:</strong> ${data.chassisNumber}</p>
        <div class="picture-boxes">
            <!-- Picture boxes will be dynamically added here -->
        </div>
    `;
  containerInfo.innerHTML = containerInfoHTML;

  const pictureBoxes = document.querySelector(".picture-boxes");
  containerData.pictures.forEach((picture) => {
    const img = document.createElement("img");
    img.src = picture;
    img.alt = "Truck Angle";
    pictureBoxes.appendChild(img);
  });
}

function goBack() {
  window.history.back();
}

document.addEventListener("DOMContentLoaded", function () {
  // displayContainerDetails();
  const containerNumber = new URLSearchParams(window.location.search).get('containerNumber');
  const containerData = JSON.parse(localStorage.getItem('selectedContainer'));

    if (containerData && containerData.number === containerNumber) {
        displayContainerDetails(containerData);
    } else {
        console.log('No data found for container number:', containerNumber);
    }

    // Clear the selected container data from storage after using it
    localStorage.removeItem('selectedContainer');
});
