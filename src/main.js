const cont = document.getElementsByClassName("cont");
const modalCont = document.getElementsByClassName("modalCont");

const myRequest = "https://pokeapi.co/api/v2/pokemon/";

const typeRequest = "https://pokeapi.co/api/v2/type/";

const request1 = fetch("https://pokeapi.co/api/v2/pokemon/").then(response => {return response.json()});
const request2 = fetch("https://pokeapi.co/api/v2/type/").then(response => {return response.json()});

for (let i = 1; i < 151; i++) {
  Promise.all([request1, request2])
    .then(([data1, data2]) => {
      const pokeElement = document.createElement("div");
      var name = data1["forms"][0]["name"];
      var png = data1["sprites"]["other"]["official-artwork"]["front_default"];
      var typesString = "";
      for (let _ = 0; _ < data1["types"].length; _++) {
        typesString += data1["types"][_]["type"]["name"] + ",";
      }

//      var weaknessString = weaknessFunc(i)

      const pokemoninnerhtmlname = `
            <label for="my-modal-${i}}" onclick="my_modal_${i}.showModal()" class="pokemon${i} flex flex-col w-auto aspect-square bg-base-100 shadow-xl border-5 border-lgray m-1 hover:bg-stone-900 hover:border-neutral-600 ease-in duration-200">
                <figure class="basis-5/6"><img src=${png} alt='pokemon'/></figure>
                <div class="flex flex-row justify-evenly items-center basis-1/6 border-5 border-transparent border-t-lgray p-3">
                    <h1 class='font-bold'>#${i}</h1> <h2 class="font-bold">${name}</h2> <h1>${typesString.slice(0,-1)}</h1>
                </div>
            </label> 
            `;

      const htmlinDiv = `
            <dialog id="my_modal_${i}" class="modal sm:modal-middle">
              <div class="modal-box">
                <h3 class="font-bold text-lg">${name}</h3>
                <figure class="basis-5/6"><img src=${png} alt='pokemon'/></figure>
                <div class="divider"></div>
                <div>
                    <p>Weight : 69</p>
                    <p>HP : 69</p>
                    <p>Weight : 69</p>
                    <p>attack : 69</p>
                    <p>Defense : 69</p>
                    <p>Speed : 69</p>
                    <p></p>
                </div>
              </div>
              <form method="dialog" class="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>`;

      pokeElement.innerHTML = pokemoninnerhtmlname;
      cont[0].appendChild(pokeElement);
      const modalElement = document.createElement("div");
      modalElement.innerHTML = htmlinDiv;
      modalCont[0].appendChild(modalElement);
    });
}

// const getPokemon = (i) => {
//     fetch(myRequest + i)
//     .then((response) => response.json())
//     .then((data) => {
//         return [data["species"]["name"], data["order"], data["sprites"]["other"]["official-artwork"],]
//     })
// }

// // name, order, png, height, weight, hp, attack, defense, special-attack, special-defense, speed, types(list)

// for (let i=1;i<151;i++){
//     getPokemon(i)
// }

// const pokeStats = (name) => {
//     var pokeNum = name[7]
//     document.getElementById("pokeNameEle").innerText = String(pokeNum)

// }

// //https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1281
