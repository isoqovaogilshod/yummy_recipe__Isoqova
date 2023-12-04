let input = document.getElementById("input");
let searchBtn = document.getElementById("searchBtn");
let time = document.getElementById("time");
let scrollPart = document.getElementById("scrollPart");
let bgImg = document.getElementById("bgImg");
let plus = document.getElementById("plus");
let minus = document.getElementById("minus");
let bookmark1 = document.getElementById("bookmark1");
let bookmark2 = document.getElementById("bookmark2");
let num = document.getElementById("num");
let ingredientPart = document.getElementById("ingredientPart");
let loading = document.getElementById("loading");
let loadingBig = document.getElementById("loadingBig");
let dropbtn = document.getElementById("dropbtn");
let myDropdown = document.getElementById("myDropdown");
let body = document.getElementById("body");
let text = document.getElementById("text");
let Xmark = document.getElementById("Xmark");

const API_KEY = "65312780-e35d-4bd7-a1a4-f351c2b15112";
function getData() {
  let meal = input.value;
  const baseUrl = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${meal}&key=${API_KEY}`;
  fetch(baseUrl)
    .then((res) => res.json())
    .then((r) => {
      getDataNew(r.data);
      showUi(r);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  input.value = "";
  loading.style.display = "block";
}
let set = 1;

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getData();
  }
});

function showUi(data) {
  console.log(data);

  if (set != 1) scrollPart.innerHTML = "";
  set++;
  for (let i = 0; i < data.data.recipes.length; i++) {
    loading.style.display = "none";
    loadingBig.style.display = "none";
    scrollPart.innerHTML += `
    <div onclick="getMealData(this)" id='${
      data.data.recipes[i].id
    }' class="flex gap-9 pl-9  items-center    py-5 hover:bg-[#F9F5F3]  hover:translate-y-2  hover:scale-100 duration-300 "  >
    <div class='w-[60px] h-[60px] rounded-full  bg-[url(${
      data.data.recipes[i].image_url
    })] object-fit bg-cover bg-center bg-no-repeat ' id='tooltip'>
    <span class="tooltiptext">${data.data.recipes[i].title}</span>
    </div>
    <div class="">
    <h2 class="uppercase text-base text-blue-600">${
      data.data.recipes[i].title.substring(0, 15) + "..."
    }</h2>
    <p class="uppercase text-xs font-semibold text-gray-600">
    ${data.data.recipes[i].publisher}
    </p>
    </div>
    </div>
        `;
  }
}

function getMealData(e) {
  // console.log(e.id);
  getDataNew(e.id);
}
////////////// style///////
bookmark1.addEventListener("click", () => {
  bookmark2.style.display = "inline-block";
  bookmark1.style.display = "none";
});

bookmark2.addEventListener("click", () => {
  bookmark2.style.display = "none";
  bookmark1.style.display = "inline-block";
});

let count = 0;
plus.addEventListener("click", () => {
  num.innerHTML = `${(count = count + 1)}`;
});
minus.addEventListener("click", () => {
  if (count > 0) {
    num.innerHTML = `${(count = count - 1)}`;
  } else {
    num.innerHTML = 0;
  }
});

dropbtn.addEventListener("click", () => {
  myDropdown.style.display = "inline-block";
  myDropdown.style.display = "flex";
  myDropdown.style.zIndex = "1";
  body.style.filter = "blur(4px)";
  console.log("here");
});

myDropdown.addEventListener("click", () => {
  myDropdown.style.display = "none";
  body.style.filter = "none";
});
window.onclick = function (event) {
  if (!event.target.matches("#dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

/////////////////////////////
function getDataNew(data) {
  const Url = `https://forkify-api.herokuapp.com/api/v2/recipes/${data}?key=${API_KEY}`;
  loadingBig.style.display = "none";
  fetch(Url)
    .then((res) => res.json())
    .then((r) => {
      loadingBig.style.display = "block";
      bgImg.innerHTML = `
        <div class="bg-[url(${r.data.recipe.image_url})] object-cover h-80 bg-cover bg-center bg-no-repeat"></div>
        <div class="flex justify-center -rotate-6 -translate-y-14 -skew-x-12">
          <span class="flex flex-wrap bg-gradient-to-br from-blue-600 to-pink-400 text-4xl uppercase text-white font-semibold max-w-xl px-5 py-4 font-sans">
            ${r.data.recipe.title}
          </span>
        </div>`;

      time.innerHTML = `${r.data.recipe.cooking_time}`;
      text.innerHTML = `<p
     class="text-center max-w-full mt-5 w-[550px] text-zinc-400"
   >
     This recipe was carefully designed and tested by
     <span class="text-slate-400 font-bold">
     ${r.data.recipe.publisher}
     </span>
     Please check out directions at their website.
   </p>`;

      let ingredientsHTML = "";
      for (let i = 0; i < r.data.recipe.ingredients.length; i++) {
        ingredientsHTML += `
        <div id="product" class="flex  items-center gap-2">
        <i class="text-blue-600 fas fa-check"></i>
            <p>${r.data.recipe.ingredients[i].quantity}  ${r.data.recipe.ingredients[i].unit}   ${r.data.recipe.ingredients[i].description}</p>
            </div>`;
      }
      ingredientPart.innerHTML = ingredientsHTML;

      console.log(r.data);
    });
}
getDataNew(data.recipe.title[0]);

function myFunction() {
  
  document.getElementById("myDropdown").classList.toggle("show");
}
