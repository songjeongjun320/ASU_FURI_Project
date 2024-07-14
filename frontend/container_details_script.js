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
function displayContainerDetails() {
  const containerInfo = document.querySelector(".container-info");
  const containerInfoHTML = `
        <h2>Container Number: ${containerData.containerNumber}</h2>
        <p><strong>Time:</strong> ${containerData.time}</p>
        <p><strong>In/Out:</strong> ${containerData.inOut}</p>
        <p><strong>Container Size:</strong> ${containerData.containerSize}</p>
        <p><strong>Driver's Name:</strong> ${containerData.driverName}</p>
        <p><strong>Truck Number:</strong> ${containerData.truckNumber}</p>
        <p><strong>Chassis Number:</strong> ${containerData.chassisNumber}</p>
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
  displayContainerDetails();
});
