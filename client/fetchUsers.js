// function fetchUsers() {
//   const userListDiv = document.getElementById("userList");
//   userListDiv.innerHTML = "<p>Loading users...</p>";

//   fetch("http://localhost:5000/users")
//     .then(res => res.json())
//     .then(users => {
//       console.log("Fetched users:", users); 
      
//       userListDiv.innerHTML = "";

//       users.forEach(user => {
//         const userCard = document.createElement("div");
//         userCard.innerHTML = `
//           <p><strong>Name:</strong> ${user.name}</p>
//           <p><strong>Email:</strong> ${user.email}</p>
//           <p><strong>Age:</strong> ${user.age}</p>
//           <button class="delete-btn" data-id="${user._id}">Delete</button>
//           <hr/>
//         `;
//         userListDiv.appendChild(userCard);
//       });
      
//     const deleteButtons = document.querySelectorAll(".delete-btn");
//       deleteButtons.forEach(btn => {
//         btn.addEventListener("click", () => {
//           const userId = btn.getAttribute("data-id");
//           deleteUser(userId);
//         });
//       });   
//     })

//     .catch(error => {
//       userListDiv.innerHTML = `<p style="color:red;">Error loading users</p>`;
//       console.error("Fetch error:", error);
//     });
// }

// // GET user by ID
// const getUserForm = document.getElementById("getUserForm");

// getUserForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const userId = document.getElementById("userIdInput").value;
//   const resultDiv = document.getElementById("singleUserResult");

//   resultDiv.innerHTML = "<p>Fetching user...</p>";

//   fetch(`http://localhost:5000/users/${userId}`)
//     .then(res => {
//       if (!res.ok) throw new Error("User not found");
//       return res.json();
//     })
//     .then(user => {
//       resultDiv.innerHTML = `
//         <p><strong>Name:</strong> ${user.name}</p>
//         <p><strong>Email:</strong> ${user.email}</p>
//         <p><strong>Age:</strong> ${user.age}</p>
//       `;
//     })
//     .catch(err => {
//       resultDiv.innerHTML = `<p style="color:red;">${err.message}</p>`;
//     });
// });

// // Call on page load
// window.addEventListener("DOMContentLoaded", fetchUsers);

function fetchUsers() {
  const userListDiv = document.getElementById("userList");
  userListDiv.innerHTML = "<p>Loading users...</p>";

  fetch("http://localhost:5000/users")
    .then(res => res.json())
    .then(users => {
      console.log("Fetched users:", users);
      userListDiv.innerHTML = "";

      users.forEach(user => {
        const userCard = document.createElement("div");
        userCard.innerHTML = `
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Age:</strong> ${user.age}</p>
          <button class="delete-btn" data-id="${user._id}">Delete</button>
          <hr/>
        `;
        userListDiv.appendChild(userCard);
      });

      // Attach delete event listeners
      const deleteButtons = document.querySelectorAll(".delete-btn");
      deleteButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          const userId = btn.getAttribute("data-id");
          if (confirm("Are you sure you want to delete this user?")) {
            deleteUser(userId);
          }
        });
      });
    })
    .catch(error => {
      userListDiv.innerHTML = `<p style="color:red;">Error loading users</p>`;
      console.error("Fetch error:", error);
    });
}

// DELETE user function
function deleteUser(userId) {
  fetch(`http://localhost:5000/users/${userId}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(data => {
      alert("User deleted successfully");
      fetchUsers(); // Refresh list after deletion
    })
    .catch(err => {
      console.error("Delete error:", err);
    });
}

// GET user by ID
const getUserForm = document.getElementById("getUserForm");

getUserForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userId = document.getElementById("userIdInput").value;
  const resultDiv = document.getElementById("singleUserResult");

  resultDiv.innerHTML = "<p>Fetching user...</p>";

  fetch(`http://localhost:5000/users/${userId}`)
    .then(res => {
      if (!res.ok) throw new Error("User not found");
      return res.json();
    })
    .then(user => {
      resultDiv.innerHTML = `
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Age:</strong> ${user.age}</p>
      `;
    })
    .catch(err => {
      resultDiv.innerHTML = `<p style="color:red;">${err.message}</p>`;
    });
});

const updateForm = document.getElementById("updateUserForm");

updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userId = document.getElementById("updateUserId").value.trim();
  const name = document.getElementById("updateName").value.trim();
  const email = document.getElementById("updateEmail").value.trim();
  const age = parseInt(document.getElementById("updateAge").value);

  const resultDiv = document.getElementById("updateResult");
  resultDiv.innerHTML = "<p>Updating user...</p>";

  fetch(`http://localhost:5000/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, age }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to update user");
      return res.json();
    })
    .then((data) => {
      resultDiv.innerHTML = `
        <p style="color:green;">${data.message}</p>
        <p><strong>Name:</strong> ${data.user.name}</p>
        <p><strong>Email:</strong> ${data.user.email}</p>
        <p><strong>Age:</strong> ${data.user.age}</p>
      `;
      fetchUsers(); // Optional: Refresh list
    })
    .catch((err) => {
      resultDiv.innerHTML = `<p style="color:red;">${err.message}</p>`;
    });
});


// Call on page load
window.addEventListener("DOMContentLoaded", fetchUsers);
