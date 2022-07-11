//first iteration

//nextTick ; []
//microtask :[setInterval,setTimeout,]
//task queue :[]

//second
//nextTick ; []
//microtask :[setTimeout,]
//task queue :[]

//third
//nextTick ; []
//microtask :[promise]
//task queue :[]

//fourth

//nextTick ; []
//microtask :[]
//task queue :[]

//fifth

//nextTick ; []
//microtask :[setTimeout]
//task queue :[]

//James
//Richard
//John
//Robert
//James
//Michael

const intervalId = setInterval(() => {
  console.log("James"); //1
}, 10);

setTimeout(() => {
  const promise = new Promise((resolve) => {
    //creating promise it is a sync
    console.log("Richard"); //2 -sync code
    resolve("Robert");
  });

  promise.then((value) => {
    //4promise added to  microtask but before this interval does one itteration with James
    console.log(value); //5 on fourth step goes this sync line

    setTimeout(() => {
      console.log("Michael");

      clearInterval(intervalId);
    }, 10);
  });

  console.log("John"); // 3 sync code
}, 10);
