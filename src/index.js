document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("table-body");
    const form = document.getElementById("dog-form");
  
    fetch("http://localhost:3000/dogs")
      .then(response => response.json())
      .then(data => {
        data.forEach(dog => {
          renderDog(dog);
        });
      })
      .catch(error => console.log(error));
  
    function renderDog(dog) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button data-id="${dog.id}">Edit</button></td>
      `;
  
      const editButton = row.querySelector("button");
      editButton.addEventListener("click", () => {
        populateForm(dog);
      });
  
      table.appendChild(row);
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = e.target.dataset.id;
      const name = e.target.name.value;
      const breed = e.target.breed.value;
      const sex = e.target.sex.value;
  
      fetch(`http://localhost:3000/dogs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, breed, sex }),
      })
        .then(response => response.json())
        .then(() => {

          table.innerHTML = "";
          fetch("http://localhost:3000/dogs")
            .then(response => response.json())
            .then(data => {
              data.forEach(dog => {
                renderDog(dog);
              });
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    });
  
    function populateForm(dog) {
      form.dataset.id = dog.id;
      form.name.value = dog.name;
      form.breed.value = dog.breed;
      form.sex.value = dog.sex;
    }
  });