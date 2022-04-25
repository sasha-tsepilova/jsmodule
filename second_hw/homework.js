/* DONT CHANGE THIS CODE - START */
function wait(ms = 1000) { return new Promise(resolve => setTimeout(resolve, ms)) }

class Dish {
    constructor(cookingTime) {
        this.cookingTime = cookingTime;
    }

    async cook() {
        const actualCookingTime = this.cookingTime * (1 + Math.random()) * 100;
        await wait(actualCookingTime);
        console.log("Coocked "+ actualCookingTime);
        return this;
    }
}
/* DONT CHANGE THIS CODE - END */

/*
    YOUR CODE HERE
*/

class Ingridient{
    constructor(name_, quantity_){
        this.name = name_;
        this.quantity = quantity_;
    }
}

class Kitchen{
    constructor(){
        this.ingridients = new Map();
        this.dishes = [];
    }
    addToFridge(ingridients){
        for(let ingridient of ingridients){
            this.ingridients.set(ingridient.name, ingridient.quantity);
        }
    }
    order(dish){
        for(let ingridient of dish.ingridients){
            let number = this.ingridients.get(ingridient.name);
            if (number === undefined || number === 0){
                throw Error(" Not enough ingridients in fridge");
            }
        }

        for(let ingridient of dish.ingridients){
            this.ingridients.set(ingridient.name, this.ingridients.get(ingridient.name) - ingridient.quantity);
        }

        this.dishes.push(dish);
    
    }

    async cookAllOrders(){
        for(let dish of this.dishes){
            await dish.cook();
        }
        let allDishes = this.dishes;
        this.dishes = [];
        return allDishes;
    }

    async cookFastestOrder(){
        let minTime = this.dishes[0].cookingTime;
        let minIndex = 0;
        for(let i = 0; i < this.dishes.length; i++){
            let dish = this.dishes[i];
            if(dish.cookingTime < minTime){
                minTime = dish.cookingTime;
                minIndex = i;
            }
        }
        let neededDish = this.dishes[minIndex];
        await neededDish.cook();
        this.dishes.splice(minIndex,1);
        return neededDish
    }
}

class Bolognese extends Dish{
    constructor(){
        super(15);
        this.ingridients = [new Ingridient('spaghetti', 1), new Ingridient('meat', 1), new Ingridient('tomato', 1)];
    }
}

class MashedPotatoes extends Dish{
    constructor(){
        super(10);
        this.ingridients = [new Ingridient('potato',1)];
    }
}


class Steak extends Dish{
    constructor(){
        super(20);
        this.ingridients = [new Ingridient('meat', 1)];

    }
}

class SteakAndFries extends Dish{
    constructor(){
        super(25);
        this.ingridients = [new Ingridient('potato', 1), new Ingridient('meat', 1)];
    }
}

async function test() {
    const kitchen = new Kitchen();
    kitchen.addToFridge([
        new Ingridient('potato', 1),
        new Ingridient('spaghetti', 1),
        new Ingridient('meat', 3),
        new Ingridient('tomato', 2)
    ])

    kitchen.order(new Bolognese()); // Bolognese extends Dish (cookingTime = 10)
    kitchen.order(new MashedPotatoes()); // MashedPotatoes extends Dish (cookingTime = 8)
    kitchen.order(new Steak()); // Steak extends Dish (cookingTime = 7)

    // Feel free to experiment with various dishes and ingridients

    let fastest = await kitchen.cookFastestOrder(); // Returns fastest dish to make
    let all = await kitchen.cookAllOrders(); // Returns two dishes in array

    for(let ingridient of fastest.ingridients){
        console.log(ingridient.name);
    }

    for(let dish of all){
        for(let ingridient of dish.ingridients){
            console.log(ingridient.name);
        }
    }

    kitchen.order(new SteakAndFries()); // Throws Error: Not enough ingridients in fridge
}

test();
