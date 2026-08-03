// ========================================
// CODE QUESTION 1
// ========================================

const hamburger1 = {
    name: "Cheese Burger",
    weight: 250
};

const secondBurger1 = hamburger1;

secondBurger1.name = "Double Cheese Burger";
secondBurger1.weight = 500;

console.log(hamburger1.name); // "Double Cheese Burger"
console.log(secondBurger1.name); // "Double Cheese Burger"

/*
RISPOSTA:

hamburger1 e secondBurger1 contengono lo stesso riferimento
allo stesso oggetto in memoria.

Modificando secondBurger1, viene quindi modificato anche hamburger1.

Oggetti creati in memoria: 1
*/


// ========================================
// CODE QUESTION 2
// ========================================

const hamburger2 = {
    name: "Cheese Burger",
    weight: 250,
    ingredients: ["Cheese", "Meat", "Bread", "Tomato"]
};

const secondBurger2 = { ...hamburger2 };

secondBurger2.ingredients[0] = "Salad";

console.log(hamburger2.ingredients[0]); // "Salad"
console.log(secondBurger2.ingredients[0]); // "Salad"

/*
RISPOSTA:

Lo spread operator crea una copia superficiale, cioè una shallow copy.

hamburger2 e secondBurger2 sono due oggetti diversi, ma la proprietà
ingredients continua a puntare allo stesso array.

Oggetti/reference type creati in memoria:

1. hamburger2
2. array ingredients
3. secondBurger2

Totale: 3
*/


// ========================================
// CODE QUESTION 3
// ========================================

const hamburger3 = {
    name: "Cheese Burger",
    weight: 250,
    maker: {
        name: "Anonymous Chef",
        restaurant: {
            name: "Hyur's Burgers",
            address: "Main Street, 123",
            isOpen: true
        },
        age: 29
    }
};

const secondBurger3 = structuredClone(hamburger3);
const thirdBurger3 = structuredClone(hamburger3);

/*
Nell'oggetto originale sono presenti:

1. hamburger3
2. maker
3. restaurant

Ogni structuredClone crea una copia profonda dei tre oggetti.

Copia secondBurger3:
4. secondBurger3
5. secondBurger3.maker
6. secondBurger3.maker.restaurant

Copia thirdBurger3:
7. thirdBurger3
8. thirdBurger3.maker
9. thirdBurger3.maker.restaurant

Totale oggetti creati in memoria: 9
*/


// ========================================
// CODE QUESTION 4
// ========================================

const chef4 = {
    name: "Chef Hyur",
    age: 29,

    makeBurger: (num = 1) => {
        console.log(`Ecco ${num} hamburger per te!`);
    }
};

const restaurant4 = {
    name: "Hyur's Burgers",

    address: {
        street: "Main Street",
        number: 123
    },

    openingDate: new Date(2025, 3, 11),
    isOpen: false
};

/*
CLONAZIONE DI chef4

Il metodo più adatto è lo spread operator:

const clonedChef = { ...chef4 };

Perché chef4 non contiene oggetti annidati, ma contiene una funzione.

structuredClone non può clonare le funzioni e genererebbe un errore.
Con lo spread viene copiato il riferimento alla funzione, che va bene
perché una funzione normalmente non viene modificata internamente.
*/

const clonedChef4 = { ...chef4 };


/*
CLONAZIONE DI restaurant4

Il metodo più adatto è structuredClone:

const clonedRestaurant = structuredClone(restaurant4);

Perché restaurant4 contiene:

- un oggetto annidato, address;
- un oggetto Date.

structuredClone crea una copia profonda e mantiene correttamente
il tipo Date.
*/

const clonedRestaurant4 = structuredClone(restaurant4);


// ========================================
// CODE QUESTION 5 - BONUS
// ========================================

const hamburger5 = {
    name: "Cheese Burger",
    weight: 250,

    maker: {
        name: "Anonymous Chef",

        restaurant: {
            name: "Hyur's Burgers",
            address: "Main Street, 123",
            isOpen: true
        },

        age: 29
    }
};

const newRestaurant5 = {
    ...hamburger5.maker.restaurant
};

newRestaurant5.name = "Hyur's II";
newRestaurant5.address = "Second Street, 12";

const secondBurger5 = {
    ...hamburger5
};

secondBurger5.maker.restaurant = newRestaurant5;
secondBurger5.maker.name = "Chef Hyur";

console.log(hamburger5.maker.name); // "Chef Hyur"
console.log(secondBurger5.maker.name); // "Chef Hyur"

console.log(hamburger5.maker.restaurant.name); // "Hyur's II"
console.log(secondBurger5.maker.restaurant.name); // "Hyur's II"

/*
PERCHÉ?

Lo spread usato per secondBurger5 copia solamente il primo livello.

hamburger5 e secondBurger5 sono oggetti differenti, ma condividono
lo stesso oggetto maker.

Quindi:

secondBurger5.maker.name = "Chef Hyur";

modifica lo stesso maker usato anche da hamburger5.

Successivamente:

secondBurger5.maker.restaurant = newRestaurant5;

sostituisce la proprietà restaurant dentro il maker condiviso.
Anche hamburger5 vede quindi il nuovo ristorante.

OGGETTI CREATI:

1. hamburger5
2. hamburger5.maker
3. hamburger5.maker.restaurant
4. newRestaurant5
5. secondBurger5

Totale: 5 oggetti
*/


// ========================================
// CODE QUESTION 6 - BONUS
// ========================================

const chef6 = {
    name: "Chef Hyur",
    age: 29,

    makeBurger: (num = 1) => {
        console.log(`Ecco ${num} hamburger per te!`);
    },

    restaurant: {
        name: "Hyur's Burgers",

        welcomeClient: () => {
            console.log("Benvenuto!");
        },

        address: {
            street: "Main Street",
            number: 123,

            showAddress: () => {
                console.log("Main Street 123");
            }
        },

        isOpen: true
    }
};

/*
Non esiste, tra i metodi standard più semplici, una soluzione perfetta
per fare direttamente una deep copy di questo oggetto.

structuredClone non può essere usato perché l'oggetto contiene funzioni.

Lo spread operator non basta perché crea solo una shallow copy:
gli oggetti restaurant e address resterebbero condivisi.

La soluzione migliore è una funzione ricorsiva personalizzata che:

- copi ogni oggetto annidato;
- copi gli array;
- mantenga le funzioni;
- gestisca eventualmente oggetti speciali come Date.
*/


// ========================================
// SNACK BONUS
// Deep copy ricorsiva con metodi
// ========================================

function deepCopy(value) {
    // Restituisce direttamente valori primitivi e funzioni.
    if (
        value === null ||
        typeof value !== "object"
    ) {
        return value;
    }

    // Copia correttamente gli oggetti Date.
    if (value instanceof Date) {
        return new Date(value.getTime());
    }

    // Copia ricorsivamente gli array.
    if (Array.isArray(value)) {
        return value.map(element => deepCopy(element));
    }

    // Crea un nuovo oggetto.
    const copiedObject = {};

    // Copia ricorsivamente ogni proprietà.
    for (const key in value) {
        if (Object.hasOwn(value, key)) {
            copiedObject[key] = deepCopy(value[key]);
        }
    }

    return copiedObject;
}

const clonedChef6 = deepCopy(chef6);


// Verifica che gli oggetti siano differenti.
console.log(clonedChef6 === chef6); // false

console.log(
    clonedChef6.restaurant === chef6.restaurant
); // false

console.log(
    clonedChef6.restaurant.address === chef6.restaurant.address
); // false


// Verifica che i metodi funzionino.
clonedChef6.makeBurger(2);
clonedChef6.restaurant.welcomeClient();
clonedChef6.restaurant.address.showAddress();


// Modifica della copia.
clonedChef6.restaurant.name = "New Burger Restaurant";

console.log(chef6.restaurant.name);
// "Hyur's Burgers"

console.log(clonedChef6.restaurant.name);
// "New Burger Restaurant"