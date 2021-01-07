## Self explaining notes about iterables, generators and their async forms

### Iterables or Iterators and async:

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

**Application of Iterators:** Generally Iterators are simple looping patterns over a set of values that are called when every asked for. 
Lets assume we have a datafile with a set of values and we want to iterate over data values of the file. Generally what we would do is, we load all the data values into memory and process on that data. But using Iterators we can make IO read lazily i.e., when ever needed. But there is another form of iterable which we can use for network request or delaying tasks( fetching data or something). They are called asynchronous iterables.

**what are asynchronous iterables ..?**

Iterables what we discussed above are synchronous one which mean having any network request will make the execution sequential. We need some asynchronosity while fetching data from internet. so we use asynchronous iterables

Basically an javascript/nodejs object to be asynchronous iterable, it should have a method with symbol `Symbol.asyncIterator` defined as one of its method. This symbol method should return an object having `async next()` as one of its method. So since we added `async` keyword tag before next() we can call network requests using `await`. `next` method should return a promise which will be fulfilled by `value` attribute of `{done, value}` form.

In order to use async iterable we use `for await .. of ..` pattern instead of `for .. of ..` pattern. using so will throw an error saying object is not iterable, because now it is a asyncIterable.

The working skeleton form of async iterable is,
```
const asyncRange = {
    someVar1: someVal1,
    someVar2: someVal2,

    [Symbol.asyncIterator](){
        return {
            ...
            ...
            async next(){
                let val = await new Promise((resolve, reject) => { ... }) // some network request

                ...
            }
        }
    }
}

```

> So under the hood, `for .. of..` pattern will see if the source object is a iterable( i.e., if it is having `Symbol.iterator` defined) and `for await .. of ..` will see if the source object is async iterable(i.e., if it is having `Symbol.asyncIterator` defined).

Look at files iterablesPractice.js for working examples of iterables and async iterables.


### Generators and Async Generators
To be simply Generators are just syntactic sugar for creating iterators, they say. Generators reduce much of the boilerplate code using `yield` keyword. We can pass arguments that can change functionality of iteration.

`yield` keyword provided by language automatically generates the return object as `{done, value}` type


`yield` is a two way channel, we can get data from generator and we can also give data to generator. for example,

We can leverage generators to remove much of the boilerplate code we used in iterablesPractice.js, by defining *[Symbol.iterator] and async *[Symbol.asyncIterator] methods.


### Note:
All this text is inspired from this [tutorial](https://javascript.info/generators-iterators)
