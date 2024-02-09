import "./App.css";
import Confetti from "react-confetti";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

function App() {
    const rollDice = () => {
        return Math.floor(Math.random() * 6) + 1;
    };

    const initializeDice = () => {
        const diceArray = [];
        for (let i = 1; i <= 10; i++) {
            diceArray.push({ id: nanoid(), num: rollDice(), isFrozen: false });
        }
        return diceArray;
    };

    // RECALL: Lazy State Initialization
    //         We only want to run the initializeDice() function on the inital render
    //         We just pass in the function name without executing it! This tells React
    //         to only run the function on initializeDice() on the inital render
    //         NOTE: this is the same as () => initializeDice()
    const [dice, setDice] = useState(initializeDice);

    const [tenzies, setTenzies] = useState(false);

    // Keeping two internal pieces of state in sync with each other is a really common reason to use a useEffect
    // we talk about it being a side-effect as if it only concerned things outside of this function entirely, but
    // keeping two pieces of eternal state in sync is another good reason for it
    useEffect(() => {
        const allFrozen = dice.every((die) => die.isFrozen);
        const firstNum = dice[0].num;
        const allSameNum = dice.every((die) => die.num === firstNum);
        setTenzies(allFrozen && allSameNum);
    }, [dice]);

    const freezeDie = (id) => {
        setDice((oldDice) =>
            oldDice.map((die) => {
                if (die.id === id) {
                    return { ...die, isFrozen: !die.isFrozen };
                }
                return die;
            })
        );
    };

    const rerollDice = () => {
        if (tenzies) {
            setDice(initializeDice());
        } else {
            setDice((oldDice) => {
                return oldDice.map((die) => {
                    if (!die.isFrozen) {
                        return { ...die, num: rollDice() };
                    } else {
                        return die;
                    }
                });
            });
        }
    };

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
            </p>
            <div className="dice-container">
                {dice.map((die) => {
                    const { id, num, isFrozen } = die;
                    return <Die key={id} num={num} isFrozen={isFrozen} freezeDie={() => freezeDie(id)} />;
                })}
            </div>
            <button onClick={rerollDice}>{tenzies ? "New Game" : "Roll"}</button>
        </main>
    );
}

export default App;
