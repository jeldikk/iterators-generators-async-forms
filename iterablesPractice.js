const range = {
  dataArray: [1, 2, 3, 4, 5],

  [Symbol.iterator]() {
    return {
      currentIndex: 0,
      finalIndex: this.dataArray.length,
      data: this.dataArray,

      next() {
        if (this.currentIndex <= this.finalIndex) {
          return {
            done: false,
            value: {
              currentIndex: this.currentIndex,
              currentValue: this.data[this.currentIndex++],
            },
          };
        } else {
          return {
            done: true,
          };
        }
      },
    };
  },
};

const asyncRange = {
  dataArray: [12, 13, 14, 15, 16, 17],

  [Symbol.asyncIterator]() {

    return {
      currentIndex: 0,
      totalCount: this.dataArray.length,
      data: this.dataArray,

      async next() {

        let value = await new Promise((resolve, reject) =>
          setTimeout(() =>
            resolve({
              currentIndex: this.currentIndex,
              currentValue: this.currentIndex++,
            }), 3000)
        );
        
        if(this.currentIndex <= this.totalCount){
            return {
                done: false,
                value
            }
        }
        else{
            return {
                done: true
            }
        }

      },
    };

  },
};

for (let syncVal of range) {
  console.log(syncVal);
}

console.log("The things below are from  asyncRange")

const callAsyncRange = async ()=>{
    for await(let asyncVal of asyncRange){
        console.log(asyncVal)
    }
}

callAsyncRange()
// The above thing can be used as below as a syntactic sugar
// (async ()=>{
//     for await(let asyncVal of asyncRange){
//         console.log(asyncVal)
//     }
// })()
