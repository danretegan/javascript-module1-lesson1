const containerEl = document.querySelector("#container");

const colors = [
  {
    label: "Red",
    color: "#ff0000",
    isPrimary: true,
  },
  {
    label: "Green",
    color: "#00ff00",
    isPrimary: true,
  },
  {
    label: "Yellow",
    color: "#fff00f",
    isPrimary: false,
  },
];
colors.forEach((element) => {
  const buttonEl = document.createElement("button");
  containerEl.append(buttonEl);
  buttonEl.textContent = element.label;
  buttonEl.classList.add("primary-button", element.label);
  console.dir(buttonEl);
});
