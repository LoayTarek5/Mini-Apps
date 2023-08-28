const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Iam The Good Promise");
  }, 3000);
});


// async function readData() {
//   console.log("Before Promise");
//   try {
//     console.log(await myPromise);
//   }
//   catch(rej) {
//     console.log(Error(rej));
//   }
//   finally {
//     console.log("After Promise");
//   }
  
// }
// readData();
// ""

async function fetchData() {
  console.log("Before fetch");
  try {
    let data = await fetch("https://api.github.com/users/elzerowebschool/repos");
    console.log(await data.json());
  }
  catch(rej) {
    console.log(Error(rej));
  }
  finally {
    console.log("After fetch");
  }
  
}
fetchData();