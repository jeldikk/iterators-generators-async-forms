## Self explaining notes about iterables, generators and their async forms

### Iterables or Iterators:

**What are Iterables ..?**

Iterables in general sense mean some instance on which we can iterate/loop over its values and performs something on these values.

In the context of Javascript or Nodejs Iterators are something which we can iterate using `for...of..` looping pattern.

An javascript object in order to be an iterable, it must have `Symbol.iterator` method defined that returns an object with next() as one of its methods.

```
const someObj = {
    someVar1: someVal1,
    someVar2: someVal2,

    [Symbol.iterator](){
        return {
            next(){
                ...
            }
        }
    }
}
```

The returned value of `next()` method should be of the form `{done, value}`, having `done: false` will indicate iterating loop that there are still values we can get. And when the values are exhausted or want to stop iteration just return `done` property with `false` value.

In order to use the defined iterable using for..of.. loop pattern, `Symbol.iterator` method will be called on using loop pattern.
```
for(let value of someObj){
    //someOperationOnValue();
}
```

Application of Iterators: Generally Iterators are simple looping patterns over a set of values that are called when every asked for. 
Lets assume we have a datafile with a set of values and we want to iterate over data values of the file. Generally what we would do is, we load all the data values into memory and process on that data. But using Iterators we can make IO read lazily i.e., when ever needed. But there is another form of iterable which we can use for network request or delaying tasks( fetching data or something). They are called asynchronous iterables.


