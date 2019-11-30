/*
    Fonctions de test
*/

function demoBingBang() {
    bingBang(1, 100)
}

function demoDog() {
    console.log('Creating dogs')
    let dog = createDog("Milou", "Tintin")
    dog.name // "Toutou"
    dog.owner // "Jojo"
    anonymousDog = createDog() 
    anonymousDog.name // "NoName"
    console.log("Named dog", dog)
    console.log("Anonymous dog", anonymousDog)

    console.log('-----------------------')
    console.log('Playing with dogs')

    playWithDog(dog, 8)
    // "Va chercher Toutou", "Va chercher Toutou" ..8 fois..

    console.log('-----------------------')
    console.log('Customizing dogs')

    dog.customized // undefined
    dog.color // undefined
    console.log("Before", dog)
    customizeDog(dog, "tail", "really long")
    dog.customized = true
    dog.color // "red"
    console.log("After", dog)

    console.log('-----------------------')
    console.log("Testing dog's reactions")

    let happyReaction = () => console.log("Woof woof content")
    let sadReaction = () => console.log("Woof woof triste")
    setDogReactions(dog, happyReaction, sadReaction)
    giveDogFood(dog, "chicken bone")  // Waouf happy
    giveDogFood(dog, "carrot")  // Waouf sad

}

/*
    Correction
*/

function bingBang(x,y) {
    for (let i = x; i <= y; i++) {
        let output = ""
        if (i % 3 == 0)  output += "Bing"
        if (i % 5 == 0)  output += "Bang"
        console.log(i, ": ", output)
    }
}

function createDog(name = "NoName", owner) {
    return {
        name,
        owner
    }
}

function playWithDog(dog, times) {
    console.log(`Va chercher ${dog.name} ! `.repeat(times))
}

function customizeDog(dog, prop, value) {
    dog[prop] = value
    dog.customized = true
}

function setDogReactions(dog, happyReaction, sadReaction) {
    dog.reactions = {
        happy: happyReaction,
        sad: sadReaction
    }
}

function giveDogFood(dog, food) {
    food === 'chicken bone' ? dog.reactions.happy() : dog.reactions.sad()
}