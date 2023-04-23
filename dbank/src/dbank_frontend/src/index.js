import { dbank_backend } from "../../declarations/dbank_backend";

window.addEventListener("load", async function () {
  update();
});

document
  .querySelector("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    // console.log("Submited")

    const button = event.target.querySelector("#submit-btn");

    const inputAmount = parseFloat(
      document.getElementById("input-amount").value
    );
    const withdrawAmount = parseFloat(
      document.getElementById("withdrawal-amount").value
    );

    button.setAttribute("disabled", true);

    if (document.getElementById("input-amount").value.length != 0) {
      await dbank_backend.topUP(inputAmount);
    }

    if (document.getElementById("withdrawal-amount").value.length != 0) {
      await dbank_backend.withdraw(withdrawAmount);
    }

    await dbank_backend.compound();

    update();

    document.querySelector("#input-amount").value = "";
    document.querySelector("#withdrawal-amount").value = "";
    button.removeAttribute("disabled");
  });

async function update() {
  const currentAmount = await dbank_backend.checkBalance();
  document.getElementById("value").innerText = currentAmount.toFixed(2);
}
