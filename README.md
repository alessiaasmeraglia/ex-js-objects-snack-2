# EX - Snack Oggetti

Repository: `ex-js-objects-snack-2`

Esercizi JavaScript dedicati agli oggetti, ai reference type, alle copie superficiali e profonde e alla clonazione di strutture contenenti metodi.

## Obiettivi

Gli esercizi permettono di esercitarsi con:

- oggetti JavaScript;
- reference type;
- spread operator;
- shallow copy;
- deep copy;
- `structuredClone()`;
- oggetti annidati;
- array;
- funzioni come proprietà;
- ricorsione.

---

## Code Question 1

Analizzare il comportamento di due variabili che puntano allo stesso oggetto.

```javascript
const hamburger = {
    name: "Cheese Burger",
    weight: 250
};

const secondBurger = hamburger;

secondBurger.name = "Double Cheese Burger";
secondBurger.weight = 500;
```

Entrambe le variabili fanno riferimento allo stesso oggetto in memoria.

Output:

```text
Double Cheese Burger
Double Cheese Burger
```

Oggetti creati in memoria: `1`.

---

## Code Question 2

Analizzare il comportamento dello spread operator su un oggetto che contiene un array.

```javascript
const secondBurger = { ...hamburger };
```

Lo spread operator crea una copia superficiale dell'oggetto.

L'oggetto principale viene copiato, ma l'array `ingredients` continua a essere condiviso.

Output:

```text
Salad
Salad
```

Reference type creati in memoria:

1. oggetto `hamburger`;
2. array `ingredients`;
3. oggetto `secondBurger`.

Totale: `3`.

---

## Code Question 3

Analizzare il comportamento di `structuredClone()` su un oggetto con più livelli di annidamento.

L'oggetto originale contiene:

- `hamburger`;
- `maker`;
- `restaurant`.

Ogni chiamata a `structuredClone()` crea una copia profonda di tutti e tre gli oggetti.

Con due copie vengono creati in totale `9` oggetti.

---

## Code Question 4

### Clonazione di `chef`

L'oggetto contiene una funzione e non contiene oggetti annidati.

Il metodo più adatto è lo spread operator:

```javascript
const clonedChef = { ...chef };
```

`structuredClone()` non può clonare le funzioni.

### Clonazione di `restaurant`

L'oggetto contiene:

- un oggetto annidato;
- un'istanza di `Date`.

Il metodo più adatto è:

```javascript
const clonedRestaurant = structuredClone(restaurant);
```

Questo metodo crea una copia profonda e mantiene correttamente il tipo `Date`.

---

## Code Question 5 - Bonus

Lo spread operator crea una copia solo del primo livello.

`hamburger` e `secondBurger` sono due oggetti diversi, ma condividono ancora l'oggetto `maker`.

Output:

```text
Chef Hyur
Chef Hyur
Hyur's II
Hyur's II
```

Oggetti creati in memoria:

1. `hamburger`;
2. `maker`;
3. `restaurant`;
4. `newRestaurant`;
5. `secondBurger`.

Totale: `5`.

---

## Code Question 6 - Bonus

L'oggetto contiene:

- oggetti annidati;
- funzioni;
- più livelli di profondità.

Lo spread operator non è sufficiente perché crea una shallow copy.

`structuredClone()` non è utilizzabile perché non supporta le funzioni.

La soluzione più adatta è una funzione ricorsiva personalizzata.

---

## Snack Bonus - Deep copy ricorsiva

Creare una funzione che esegue una copia profonda di un oggetto e mantiene anche le proprietà che contengono funzioni.

```javascript
function deepCopy(value) {
    if (value === null || typeof value !== "object") {
        return value;
    }

    if (value instanceof Date) {
        return new Date(value.getTime());
    }

    if (Array.isArray(value)) {
        return value.map(element => deepCopy(element));
    }

    const copiedObject = {};

    for (const key in value) {
        if (Object.hasOwn(value, key)) {
            copiedObject[key] = deepCopy(value[key]);
        }
    }

    return copiedObject;
}
```

Le funzioni vengono mantenute perché non sono oggetti da clonare ricorsivamente: viene copiato il loro riferimento.

---

## Struttura del progetto

```text
ex-js-objects-snack-2/
├── index.html
├── script.js
└── README.md
```

## Avvio

Aprire `index.html` nel browser e controllare i risultati nella console.

Per aprire la console:

```text
F12 → Console
```

In alternativa, se il codice non usa elementi del DOM, è possibile eseguire lo script con Node.js:

```bash
node script.js
```

## Note

Per evitare errori dovuti alla dichiarazione ripetuta delle stesse variabili, usare nomi diversi per ogni esercizio oppure racchiudere ciascuno snack in un blocco separato.
