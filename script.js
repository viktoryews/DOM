const tableElem = document.querySelector(".table");
const localKey = "tableData";
const elemEl = document.querySelector('.elem');
elemEl.animate([{opacity:0},{opacity:1}],{duration:700,iterations:Infinity})

document.addEventListener("DOMContentLoaded", function () {
  let tableData = [
    {
      id: 1,
      name: "Йога",
      time: "10:00 - 11:00",
      maxParticipants: 15,
      currentParticipants: 8,
    },
    {
      id: 2,
      name: "Пилатес",
      time: "11:30 - 12:30",
      maxParticipants: 10,
      currentParticipants: 5,
    },
    {
      id: 3,
      name: "Кроссфит",
      time: "13:00 - 14:00",
      maxParticipants: 20,
      currentParticipants: 15,
    },
    {
      id: 4,
      name: "Танцы",
      time: "14:30 - 15:30",
      maxParticipants: 12,
      currentParticipants: 10,
    },
    {
      id: 5,
      name: "Бокс",
      time: "16:00 - 17:00",
      maxParticipants: 8,
      currentParticipants: 6,
    },
  ];

  if (!localStorage.getItem(localKey)) {
    localStorage.setItem(localStorageKey, JSON.stringify(tableData));
  };

  function createTable() {
    tableElem.innerHTML = "";
    tableElem.innerHTML = `
        <td>Название занятия</td>
        <td>Время проведения занятия</td>
        <td>Максимальное количество участников</td>
        <td>Количество участников</td>
    `;

    tableData.forEach((item) => {
      const rowElem = document.createElement("tr");
      rowElem.innerHTML = `
        <td>${item.name}</td>
        <td>${item.time}</td>
        <td>${item.maxParticipants}</td>
        <td>${item.currentParticipants}</td>
        <td>
        <button data-id="${item.id}" class="signUpButton">Записаться</button>
        <button data-id="${item.id}" class="cancelButton">Отменить</button>
        </td>
    `;

      const signUpButtonElem = rowElem.querySelector(".signUpButton");
      const cancelButton = rowElem.querySelector(".cancelButton");

      if (
        item.currentParticipants >= item.maxParticipants ||
        JoinСlass(item.id)) {
        signUpButtonElem.disabled = true;
      } else {
        cancelButton.disabled = true;
      }
      tableElem.appendChild(rowElem);
    });
  }

  function JoinСlass(id) {
    const userTable = JSON.parse(localStorage.getItem("userTable")) || [];
    return userTable.includes(id);
  }

  tableElem.addEventListener("click", function ({ target }) {
    if (target.classList.contains("signUpButton")) {
      const id = parseInt(target.getAttribute("data-id"));
      const selectedItem = tableData.find((item) => item.id === id);
      if (selectedItem.currentParticipants < selectedItem.maxParticipants) {
        selectedItem.currentParticipants++;
        const userTable = JSON.parse(localStorage.getItem("userTable")) || [];
        userTable.push(id);
        localStorage.setItem("userTable", JSON.stringify(userTable));
        localStorage.setItem("tableData", JSON.stringify(tableData));
        createTable();
      }
    }
  });

  tableElem.addEventListener("click", function ({ target }) {
    if (target.classList.contains("cancelButton")) {
      const id = parseInt(target.getAttribute("data-id"));
      const selectItem = tableData.find((item) => item.id === id);
      if (JoinСlass(id)) {
        selectItem.currentParticipants--;
        const userTable = JSON.parse(localStorage.getItem("userTable")) || [];
        const index = userTable.indexOf(id);
        if (index !== -1) {
          userTable.splice(index, 1);
        }
        localStorage.setItem("userTable", JSON.stringify(userTable));
        localStorage.setItem("tableData", JSON.stringify(tableData));
        createTable();
      }
    }
  });

  createTable();
});
