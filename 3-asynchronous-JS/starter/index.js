const fs = require("fs");
// const { resolve } = require("path");
const superagent = require("superagent");
// const { reject } = require("superagent/lib/request-base");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find the file 🙄");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("I could not find the file 🙄");
      resolve("success");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Pro =  superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro =  superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro =  superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map(el => el.body.message);
    console.log(imgs);

    await writeFilePro("dog-img.txt", imgs.join('\n'));
    console.log("Random document saved file");
    return "Dog picture downloaded successfully"; // Add this line to return a value
  } catch (err) {
    console.log(err);
  }
  console.log("2: Ready");
};


// const getDogPic = async () => {
//   try {
//     const data = await readFilePro(`${__dirname}/dog.txt`);
//     console.log(`Breed: ${data}`);

//     const res = await superagent.get(
//       `https://dog.ceo/api/breed/${data}/images/random`
//     );
//     console.log(res.body.message);

//     await writeFilePro("dog-img.txt", res.body.message);
//     console.log("Random document saved file");
//     return "Dog picture downloaded successfully"; // Add this line to return a value
//   } catch (err) {
//     console.log(err);
//   }
//   console.log("2: Ready");
// };

(async () => {
  try {
    console.log("1: will get dog pic");
    const x = await getDogPic();
    console.log(x);
    console.log("3:Done getting dog pic");
  } catch (err) {
    console.log("ERROR 💥");
  }
})();

// console.log('1: will get dog pic')
// getDogPic().then( x => {
//     console.log(x);
//     console.log('3:Done getting dog pic')

// })

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePro("dog-img.txt", res.body.message);
//   })

//   .then(() => {
//     console.log("Random Image of Dog saved in the file.");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);

//     fs.writeFile("dog-img.txt", res.body.message, (err) => {
//       if (err) return console.log(err.message);
//       console.log("Random document saved file");
//     });
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);
// superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
// .end((err, res) => {
//     console.log(res.body.message)

//     fs.writeFile('dog-img.txt', res.body.message, err => {
//         console.log('Random document saved file')
//     })
// })

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//         if (err) return console.log(err.message);

//         console.log("Random document saved file");
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });
