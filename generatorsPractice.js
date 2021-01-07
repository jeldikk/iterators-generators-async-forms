function* generateValues(somearr){
    for(let i=0;i<somearr.length;i++){
        yield somearr[i]
    }
}

let gen1 = generateValues([1,2,3,4,5]);
let gen2 = generateValues(['a',1,'b','d',23.4])

let ret = gen1.next() // will return object of form {done, value}
console.log(ret);

ret = gen1.next() // will return object of form {done, value}
console.log(ret)

for(let val1 of gen1){
    console.log(val1) 
}

for(let val2 of gen2){
    console.log(val2)
}

// yield as a two way system

function* getQuestion(ques, answ){
    let result = yield ques;

    if(result === answ){
        console.log("You provided correct answer")
    }
    else{
        console.log("You provided wrong answer")
    }
}

const getQues = getQuestion('2*3=?',6)

console.log(getQues.next().value)
getQues.next(6)

// end of yeild as a two way system

//Using yield in iterables to mimic the action

const yieldIterable = {
    dataArray: [31,41,51,61,71,81,91],

    *[Symbol.iterator](){
        for(let index=0;index<this.dataArray.length;index++){
            yield {currentIndex: index, currentValue: this.dataArray[index]}
        }
    }
}

for(let val of yieldIterable){
    console.log(val)
}

//******************?



// using asyncIterator as generators and yield to generate values

const asyncYieldIterable = {
    dataArray: [32,42,52,62,72,82,92],

    async *[Symbol.asyncIterator](){

        for(let value=0;value<=this.dataArray;value++){
            let res = await new Promise((resolve) => setTimeout(() => resolve(`This is resolved from asyncYieldIterable ${value}`), 2000));
            yield res
        }
    }
}

console.log("This is with asyncYieldIterable")
(async ()=>{
    for await(let avalue of asyncYieldIterable){
        console.log(avalue)
    }
})()

//***************** */



async function* asyncGenerator(start, end){
    for(let i=start;i<=end;i++){
        let res = await new Promise((resolve) => setTimeout(() => resolve(`this is resolved with asynGenerator ${i}`), 2000));

        yield res;
    }
}


(async ()=>{

    let aGen = asyncGenerator(2,10);

    for await(let val of aGen){
        console.log(val)
    }
})()

// **************************************