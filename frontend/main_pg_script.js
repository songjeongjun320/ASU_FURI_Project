const rowsPerPage = 30;
let currentPage = 1;

async function fetchContainers() {
    try {
        const response = await fetch('http://localhost:3000/api/containers');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching containers:', error);
        return [];
    }
}

async function displayPage(page) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    const containerData = await fetchContainers();
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = containerData.slice(start, end);

    for (let item of paginatedItems) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="#" onclick="redirectToDetails('${item.number}')" class="container-link">${item.number}</a></td>
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

async function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        await displayPage(currentPage);
    }
}

async function nextPage() {
    const containerData = await fetchContainers();
    if ((currentPage * rowsPerPage) < containerData.length) {
        currentPage++;
        await displayPage(currentPage);
    }
}

function redirectToDetails(containerNumber) {
    // Redirect to container details page
    window.open(`container_details_pg.html?containerNumber=${containerNumber}`, '_blank');
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

// Initial page load
displayPage(currentPage);
