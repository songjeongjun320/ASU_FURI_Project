const containerData = [
  { number: '123456', date: '2023-01-01', time: '08:00 AM', inOut: 'In', size: '20ft', driver: 'Driver A' },
  { number: '789012', date: '2023-01-02', time: '09:15 AM', inOut: 'Out', size: '40ft', driver: 'Driver B' },
  { number: '345678', date: '2023-01-03', time: '10:30 AM', inOut: 'In', size: '20ft', driver: 'Driver C' },
  { number: '901234', date: '2023-01-04', time: '11:45 AM', inOut: 'Out', size: '40ft', driver: 'Driver D' },
  { number: '567890', date: '2023-01-05', time: '01:00 PM', inOut: 'In', size: '20ft', driver: 'Driver E' },
  { number: '234567', date: '2023-01-06', time: '02:15 PM', inOut: 'Out', size: '40ft', driver: 'Driver F' },
  { number: '678901', date: '2023-01-07', time: '03:30 PM', inOut: 'In', size: '20ft', driver: 'Driver G' },
  { number: '123789', date: '2023-01-08', time: '04:45 PM', inOut: 'Out', size: '40ft', driver: 'Driver H' },
  { number: '456123', date: '2023-01-09', time: '06:00 PM', inOut: 'In', size: '20ft', driver: 'Driver I' },
  { number: '789456', date: '2023-01-10', time: '07:15 PM', inOut: 'Out', size: '40ft', driver: 'Driver J' },
  { number: '147258', date: '2023-01-11', time: '08:30 PM', inOut: 'In', size: '20ft', driver: 'Driver K' },
  { number: '369852', date: '2023-01-12', time: '09:45 PM', inOut: 'Out', size: '40ft', driver: 'Driver L' },
  { number: '258963', date: '2023-01-13', time: '11:00 PM', inOut: 'In', size: '20ft', driver: 'Driver M' },
  { number: '852741', date: '2023-01-14', time: '12:15 AM', inOut: 'Out', size: '40ft', driver: 'Driver N' },
  { number: '159357', date: '2023-01-15', time: '01:30 AM', inOut: 'In', size: '20ft', driver: 'Driver O' },
  { number: '951357', date: '2023-01-16', time: '02:45 AM', inOut: 'Out', size: '40ft', driver: 'Driver P' },
  { number: '753159', date: '2023-01-17', time: '04:00 AM', inOut: 'In', size: '20ft', driver: 'Driver Q' },
  { number: '456789', date: '2023-01-18', time: '05:15 AM', inOut: 'Out', size: '40ft', driver: 'Driver R' },
  { number: '654987', date: '2023-01-19', time: '06:30 AM', inOut: 'In', size: '20ft', driver: 'Driver S' },
  { number: '321654', date: '2023-01-20', time: '07:45 AM', inOut: 'Out', size: '40ft', driver: 'Driver T' },
  { number: '987123', date: '2023-01-21', time: '09:00 AM', inOut: 'In', size: '20ft', driver: 'Driver U' },
  { number: '741852', date: '2023-01-22', time: '10:15 AM', inOut: 'Out', size: '40ft', driver: 'Driver V' },
  { number: '369147', date: '2023-01-23', time: '11:30 AM', inOut: 'In', size: '20ft', driver: 'Driver W' },
  { number: '852963', date: '2023-01-24', time: '12:45 PM', inOut: 'Out', size: '40ft', driver: 'Driver X' },
  { number: '147369', date: '2023-01-25', time: '02:00 PM', inOut: 'In', size: '20ft', driver: 'Driver Y' },
  { number: '963852', date: '2023-01-26', time: '03:15 PM', inOut: 'Out', size: '40ft', driver: 'Driver Z' },
  { number: '789123', date: '2023-01-27', time: '04:30 PM', inOut: 'In', size: '20ft', driver: 'Driver AA' },
  { number: '123654', date: '2023-01-28', time: '05:45 PM', inOut: 'Out', size: '40ft', driver: 'Driver BB' },
  { number: '646566', date: '2023-01-29', time: '07:00 PM', inOut: 'In', size: '20ft', driver: 'Driver CC' },
  { number: '676869', date: '2023-01-30', time: '08:15 PM', inOut: 'Out', size: '40ft', driver: 'Driver DD' },
  { number: '123456', date: '2023-01-01', time: '08:00 AM', inOut: 'In', size: '20ft', driver: 'Driver A' },
  { number: '789012', date: '2023-01-02', time: '09:15 AM', inOut: 'Out', size: '40ft', driver: 'Driver B' },
  { number: '345678', date: '2023-01-03', time: '10:30 AM', inOut: 'In', size: '20ft', driver: 'Driver C' },
  { number: '901234', date: '2023-01-04', time: '11:45 AM', inOut: 'Out', size: '40ft', driver: 'Driver D' },
  { number: '567890', date: '2023-01-05', time: '01:00 PM', inOut: 'In', size: '20ft', driver: 'Driver E' },
  { number: '234567', date: '2023-01-06', time: '02:15 PM', inOut: 'Out', size: '40ft', driver: 'Driver F' },
  { number: '678901', date: '2023-01-07', time: '03:30 PM', inOut: 'In', size: '20ft', driver: 'Driver G' },
  { number: '123789', date: '2023-01-08', time: '04:45 PM', inOut: 'Out', size: '40ft', driver: 'Driver H' },
  { number: '456123', date: '2023-01-09', time: '06:00 PM', inOut: 'In', size: '20ft', driver: 'Driver I' },
  { number: '789456', date: '2023-01-10', time: '07:15 PM', inOut: 'Out', size: '40ft', driver: 'Driver J' },
  { number: '147258', date: '2023-01-11', time: '08:30 PM', inOut: 'In', size: '20ft', driver: 'Driver K' },
  { number: '369852', date: '2023-01-12', time: '09:45 PM', inOut: 'Out', size: '40ft', driver: 'Driver L' },
  { number: '258963', date: '2023-01-13', time: '11:00 PM', inOut: 'In', size: '20ft', driver: 'Driver M' },
  { number: '852741', date: '2023-01-14', time: '12:15 AM', inOut: 'Out', size: '40ft', driver: 'Driver N' },
  { number: '159357', date: '2023-01-15', time: '01:30 AM', inOut: 'In', size: '20ft', driver: 'Driver O' },
  { number: '951357', date: '2023-01-16', time: '02:45 AM', inOut: 'Out', size: '40ft', driver: 'Driver P' },
  { number: '753159', date: '2023-01-17', time: '04:00 AM', inOut: 'In', size: '20ft', driver: 'Driver Q' },
  { number: '456789', date: '2023-01-18', time: '05:15 AM', inOut: 'Out', size: '40ft', driver: 'Driver R' },
  { number: '654987', date: '2023-01-19', time: '06:30 AM', inOut: 'In', size: '20ft', driver: 'Driver S' },
  { number: '321654', date: '2023-01-20', time: '07:45 AM', inOut: 'Out', size: '40ft', driver: 'Driver T' },
  { number: '987123', date: '2023-01-21', time: '09:00 AM', inOut: 'In', size: '20ft', driver: 'Driver U' },
  { number: '741852', date: '2023-01-22', time: '10:15 AM', inOut: 'Out', size: '40ft', driver: 'Driver V' },
  { number: '369147', date: '2023-01-23', time: '11:30 AM', inOut: 'In', size: '20ft', driver: 'Driver W' },
  { number: '852963', date: '2023-01-24', time: '12:45 PM', inOut: 'Out', size: '40ft', driver: 'Driver X' },
  { number: '147369', date: '2023-01-25', time: '02:00 PM', inOut: 'In', size: '20ft', driver: 'Driver Y' },
  { number: '963852', date: '2023-01-26', time: '03:15 PM', inOut: 'Out', size: '40ft', driver: 'Driver Z' },
  { number: '789123', date: '2023-01-27', time: '04:30 PM', inOut: 'In', size: '20ft', driver: 'Driver AA' },
  { number: '123654', date: '2023-01-28', time: '05:45 PM', inOut: 'Out', size: '40ft', driver: 'Driver BB' },
  { number: '646566', date: '2023-01-29', time: '07:00 PM', inOut: 'In', size: '20ft', driver: 'Driver CC' },
  { number: '676869', date: '2023-01-30', time: '08:15 PM', inOut: 'Out', size: '40ft', driver: 'Driver DD' }
];
const rowsPerPage = 30;
let currentPage = 1;

function displayPage(page) {
  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = '';

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedItems = containerData.slice(start, end);

  for (let item of paginatedItems) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.number}</td>
      <td>${item.date}</td>
      <td>${item.time}</td>
      <td>${item.inOut}</td>
      <td>${item.size}</td>
      <td>${item.driver}</td>
      <td><div class="picture-box"></div></td>
    `;
    tableBody.appendChild(row);
  }

  document.getElementById('prevBtn').disabled = page === 1;
  document.getElementById('nextBtn').disabled = end >= containerData.length;
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayPage(currentPage);
  }
}

function nextPage() {
  if ((currentPage * rowsPerPage) < containerData.length) {
    currentPage++;
    displayPage(currentPage);
  }
}

function searchContainer() {
  const input = document.getElementById('searchInput');
  const filter = input.value.toUpperCase();
  const table = document.querySelector('.container-info');
  const tr = table.getElementsByTagName('tr');

  for (let i = 1; i < tr.length; i++) {
    const td = tr[i].getElementsByTagName('td')[0];
    if (td) {
      const txtValue = td.textContent || td.innerText;
      tr[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? '' : 'none';
    }
  }
}

displayPage(currentPage);