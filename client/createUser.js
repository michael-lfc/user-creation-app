// Handle form submission
// const userForm = document.getElementById("userForm");

// userForm.addEventListener("submit", function (e) {
//   e.preventDefault();
 
//   const formData = new FormData(userForm); // replaces 'this' with the variable
//     const userData = {
//         name: formData.get("name"),
//         email: formData.get("email"),
//         age: parseInt(formData.get("age")),
//     };
//     // Call the createUser function
//     createUser(userData);
// });

const userForm = document.getElementById("userForm");

userForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get the form input values manually using their IDs
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const age = parseInt(document.getElementById("age").value);
  const password = document.getElementById("password").value;

  const userData = {
    name: name,
    email: email,
    age: age,
    password  
  };

  console.log(userData); // You can now send this to an API
  // Call the createUser function
    createUser(userData);
});


// Function to create user via POST request
function createUser(userData) {
  const resultDiv = document.getElementById("result");

  // Show a loading message
  resultDiv.innerHTML = "<p>Creating user...</p>";
  resultDiv.className = "loading";

  // Mock API call (does not create real users)
  fetch("http://localhost:5000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Success:", data);
      const user = data.user; 

      // Show success message
      resultDiv.innerHTML = `
        <h3>User Created Successfully!</h3>
        <p><strong>ID:</strong> ${user._id}</p>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Age:</strong> ${user.age}</p>
      `;
      resultDiv.className = "success";
    })
    .catch((err) => {
      console.error("Error:", err);

      // Show error message
      resultDiv.innerHTML = `
        <h3>Error Creating User</h3>
        <p>Something went wrong: ${err.message}</p>
      `;
      resultDiv.className = "error";
    });
}

