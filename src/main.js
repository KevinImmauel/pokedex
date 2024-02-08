const cont = document.getElementsByClassName("cont");
const modalCont = document.getElementsByClassName("modalCont");

const colours = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

async function getOtherForms(i){
  const otherFormDiv = document.getElementsByClassName(`otherFormsCont${i}`)
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`)
  const data = await res.json()
  for (let _ = 1; _<data["varieties"].length; _++){
    var otherFormNumber = data["varieties"][_]["pokemon"]["url"].slice(34,-1)
    const res2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${otherFormNumber}`)
    const data2 = await res2.json()
    var otherFormName = data2["name"]
    var otherFormPNG = data2["sprites"]["other"]["official-artwork"]["front_default"]
    var otherForminnerHTML = `
      <div class="flex flex-col w-auto aspect-square bg-base-100 shadow-xl border-5 border-lgray m-1 hover:bg-stone-900 hover:border-neutral-600 ease-in duration-200">
      <figure class="basis-5/6"><img src=${otherFormPNG} alt='pokemon'/></figure>
      <div class="flex flex-row justify-evenly items-center basis-1/6 border-5 border-transparent border-t-lgray p-3">
          <h1 class='font-bold'>#${otherFormNumber}</h1> <h2 class="font-bold">${otherFormName}</h2>
      </div>
      </div>
    `
    const otherFormElement = document.createElement("div");
    otherFormElement.innerHTML = otherForminnerHTML;
    otherFormDiv[0].appendChild(otherFormElement);

  }
}

async function getPokemon(i) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = await res.json();
    var name = data["forms"][0]["name"];
    var png = data["sprites"]["other"]["official-artwork"]["front_default"];
    var typesString = "";
    for (let _ = 0; _ < data["types"].length; _++) {
      typesString += `<button style="background-color: ${colours[data["types"][_]["type"]["name"]]}" class="px-1 rounded mx-1 min-w-12">${data["types"][_]["type"]["name"]}</button>`
    }

    const pokemoninnerhtmlname =  `
            <label for="my-modal-${i}}" onclick="my_modal_${i}.showModal()" class="pokemon${i} flex flex-col w-auto aspect-square bg-base-100 shadow-xl border-5 border-lgray m-1 hover:bg-stone-900 hover:border-neutral-600 ease-in duration-200">
                <figure class="basis-5/6"><img src=${png} alt='pokemon'/></figure>
                <div class="flex flex-row justify-evenly items-center basis-1/6 border-5 border-transparent border-t-lgray p-3">
                    <h1 class='font-bold'>#${i}</h1> <h2 class="font-bold">${name}</h2> <h1>${typesString}</h1>
                </div>
            </label> 
            `;

    const htmlinDiv =  `
    <dialog id="my_modal_${i}" class="modal">
    <div class="modal-box grid grid-cols-2 grid-rows-3 fixed top-0 right-0 h-full max-h-full w-11/12 max-w-5xl">
            <div class="row-span-2">
                <h3 class="font-bold text-lg">${name}</h3>
                <figure class="basis-5/6"><img src=${png} alt='pokemon' /></figure>
            </div>
            <div
                class="p-4 grid grid-cols-2 gap-0 bg-base-100 shadow-xl border-5 border-lgray m-1">
                <div>
                    <p>Weigth: ${parseInt(data["weight"]) / 10} Kg</p>
                    <progress class="progress" value="${parseInt(data["weight"]) / 10}" max="1000"></progress>
                </div>
                <div>
                    <p>Heigth: ${parseInt(data["height"]) / 10} Meters</p>
                    <progress class="progress" value="${parseInt(data["height"]) / 10}" max="20"></progress>
                </div>
                <div>
                    <p>HP: ${data["stats"][0]["base_stat"]}</p>
                    <progress class="progress" value="${data["stats"][0]["base_stat"]}" max="255"></progress>
                </div>
                <div>
                    <p>Attack: ${data["stats"][1]["base_stat"]}</p>
                    <progress class="progress" value="${data["stats"][1]["base_stat"]}" max="190"></progress>
                </div>
                <div>
                    <p>Defense: ${data["stats"][2]["base_stat"]}</p>
                    <progress class="progress" value="${data["stats"][2]["base_stat"]}" max="230"></progress>
                </div>
                <div>
                    <p>Special Attack: ${data["stats"][3]["base_stat"]}</p>
                    <progress class="progress" value="${data["stats"][3]["base_stat"]}" max="194"></progress>
                </div>
                <div>
                    <p>Special Defense: ${data["stats"][4]["base_stat"]}</p>
                    <progress class="progress" value="${data["stats"][4]["base_stat"]}" max="230"></progress>
                </div>
                <div>
                    <p>Speed: ${data["stats"][5]["base_stat"]}</p>
                    <progress class="progress" value="${data["stats"][5]["base_stat"]}" max="200"></progress>
                </div>
            </div>
        <div
            class="bg-base-100 shadow-xl border-5 border-lgray m-1">
            <div class="weaknessEle${i} m-2">
                Weakness:
            </div>
            <div class="strengthEle${i} m-2">
                Best Against:
            </div>
        </div>
        <div
            class="p-2 bg-base-100 shadow-xl border-5 border-lgray m-1">
            <h3 class="text-2xl">Other Forms</h3>
            <div class="otherFormsCont${i} grid grid-cols-2"></div>
        </div>
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>`;

    const pokeElement = document.createElement("div");
    pokeElement.innerHTML = pokemoninnerhtmlname;
    cont[0].appendChild(pokeElement);
    const modalElement = document.createElement("div");
    modalElement.innerHTML = htmlinDiv;
    modalCont[0].appendChild(modalElement);
  } catch (error) {
    console.log(error);
  }
}

async function getWeakness(i) {
  var weaknessList = [];
  var strengthList = [];
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
  const data = await res.json();
  for (let _ = 0; _ < data["types"].length; _++) {
    var res2 = await fetch(data["types"][_]["type"]["url"]);
    const data2 = await res2.json();
    for (
      let z = 0;
      z < data2["damage_relations"]["double_damage_from"].length;
      z++
    ) {
      if (
        weaknessList.includes(
          data2["damage_relations"]["double_damage_from"][z]["name"]
        ) == false
      ) {
        weaknessList.push(
          data2["damage_relations"]["double_damage_from"][z]["name"]
        );
      }
    }

    for (
      let z = 0;
      z < data2["damage_relations"]["double_damage_to"].length;
      z++
    ) {
      if (
        strengthList.includes(
          data2["damage_relations"]["double_damage_to"][z]["name"]
        ) == false
      ) {
        strengthList.push(
          data2["damage_relations"]["double_damage_to"][z]["name"]
        );
      }
    }
  }
  console.log(i,strengthList)
  var weaknessDiv = document.getElementsByClassName(`weaknessEle${i}`);
  var strengthDiv = document.getElementsByClassName(`strengthEle${i}`);
  const weaknessEle = document.createElement(`div.weakness${i}`);
  const strengthEle = document.createElement(`div.strength${i}`);
  var weaknessString = "";
  var strengthString = "";

  for (var y of weaknessList){
    weaknessString += `<button style="background-color: ${colours[y]}" class="px-1 rounded mx-1 min-w-12">${y}</button>`
  }
  for (var z of strengthList){
    strengthString += `<button style="background-color: ${colours[z]}" class="px-1 rounded mx-1 min-w-12">${z}</button>`
  }
  weaknessEle.innerHTML = weaknessString;
  weaknessDiv[0].appendChild(weaknessEle);
  strengthEle.innerHTML = strengthString;
  strengthDiv[0].appendChild(strengthEle);
}

for (let i = 1; i < 1000; i++) {
  getPokemon(i);
  getWeakness(i);
  getOtherForms(i)
}
