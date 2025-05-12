const userList = document.getElementById("userList");
const sortOrder = document.getElementById("sortOrder");

// Load data from localStorage
let users = JSON.parse(localStorage.getItem("formDataArray")) || [];

// Function to render the user list
function renderUsers(data) {
  userList.innerHTML = "";
  data.forEach((user, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${index + 1}. ${user.name}</strong><br/>
      Email: ${user.email}<br/>
      Message: ${user.message}<br/>
      Time Spent: ${user.timeSpent} sec<br/>
      Submitted At: ${user.submittedAt || "N/A"}
    `;
    userList.appendChild(li);
  });
}

// Sort function
function sortAndRender(order = "asc") {
  const sorted = [...users].sort((a, b) => {
    return order === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  renderUsers(sorted);
}

// Initial render in ascending order
sortAndRender("asc");

// Re-sort on select change
sortOrder.addEventListener("change", (e) => {
  sortAndRender(e.target.value);
});
