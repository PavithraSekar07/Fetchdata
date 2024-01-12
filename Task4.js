async function fetchUserData(selectedUserId) {
    try {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        const selectedUser = data.users.find(user => user.id == selectedUserId);
        return selectedUser;
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
        return null; // Return null in case of an error
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const dropdown = document.getElementById('user-dropdown');
        const tableBody = document.getElementById('user-details');

        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();

        data.users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.text = user.firstName;
            dropdown.appendChild(option);
        });

        dropdown.addEventListener('change', async function () {
            const selectedUserId = dropdown.value;
            tableBody.innerHTML = '';

            const selectedUser = await fetchUserData(selectedUserId);

            if (selectedUser) {
                const row = tableBody.insertRow();
                row.innerHTML = `<td>${selectedUser.id}</td><td>${selectedUser.firstName}</td><td>${selectedUser.lastName}</td><td>${selectedUser.birthDate}</td><td>${selectedUser.email}</td><td>${selectedUser.address ? selectedUser.address.postalCode : 'N/A'}</td>`;
            }
        });
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});
