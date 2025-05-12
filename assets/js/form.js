const form = document.getElementById("contact-form");
const confirmation = document.getElementById("confirmation");
const timeSpentEl = document.getElementById("time-spent");

let startTime = null;

// Track start time when user focuses
form.addEventListener("focusin", () => {
  if (!startTime) {
    startTime = Date.now();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Calculate time spent
  const timeSpent = Math.floor((Date.now() - startTime) / 1000);
  timeSpentEl.textContent = `You spent ${timeSpent} seconds filling the form.`;

  // Get form values
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  const newUser = {
    name,
    email,
    message,
    timeSpent,
    submittedAt: new Date().toLocaleString()
  };

  // Retrieve existing data or start fresh
  const existingData = JSON.parse(localStorage.getItem("formDataArray")) || [];

  // Check if email already exists
  const emailExists = existingData.some(user => user.email.toLowerCase() === email.toLowerCase());

  if (emailExists) {
    confirmation.textContent = "Error: This email is already taken.";
    confirmation.classList.remove("hidden");
    confirmation.style.color = "red";
  } else {
    // Push new entry
    existingData.push(newUser);

    // Save updated array to localStorage
    localStorage.setItem("formDataArray", JSON.stringify(existingData));

    // Show confirmation
    confirmation.textContent = "✅ Thank you! Your message has been sent successfully.";
    confirmation.classList.remove("hidden");
    confirmation.style.color = "green";

    // Optional delay before redirecting
    setTimeout(() => {
      window.location.href = "sort.html";
    }, 1000);

    form.reset();
    startTime = null;
  }
});
