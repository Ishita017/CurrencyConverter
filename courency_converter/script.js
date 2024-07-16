const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    select.append(newOption);

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    }
    if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  //   console.log(element.value);
  let countryCode = countryList[currCode];
  //   console.log(countryCode);
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amt = amount.value;
  //   console.log(amt);
  if (amt === "" || amt < 1) {
    amt = 1;
    amount.value = "1";
    // console.log(amt);
  }

  const URL = `https://v6.exchangerate-api.com/v6/e4befdb8734b2e4328b9bda1/latest/${fromCurr.value}`;
  //   console.log(URL);
  let response = await fetch(URL);
  //   console.log(response);
  //converting api response into json format
  let data = await response.json();
  //   console.log(data);
  let rate = data.conversion_rates[toCurr.value];
  //   console.log(rate);
  let finalAmount = amt * rate;
  //   console.log(finalAmount);
  msg.innerText = `${amt} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});
