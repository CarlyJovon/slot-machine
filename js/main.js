//Starting Balance - this amount will change as bets are placed and money is won or lost
let balance = 1000; 

//Current Bet - will change based on bet amount chosen by user
let currentBet = 5; 

//5 options for the reels - will stay the same (the 5 symbols are an array)
//An Array is a container that holds multiple values
//each item is assigned an index aka the position in the array - ARRAYS START AT "0"
const symbols = ["💸", "2️⃣1️⃣", "🐆", "🎹", "🍼"]

//Age Verification 
const ageVerification = document.getElementById('age-verification'); 
const yesButton = document.getElementById('yes-button'); 
const noButton = document.getElementById('no-button');
const ageMessage = document.getElementById('age-message');

//Slot Machine 
const slotMachine = document.getElementById('slot-machine');
const balanceDisplay = document.getElementById('current-balance');

//HIDE SLOT MACHINE TO BEGIN WITH UNTILE USER CONFIRMS AGE
slotMachine.style.display = "none"; 


//The 3 Reels 
const reel1 = document.getElementById('reel-1'); 
const reel2 = document.getElementById('reel-2'); 
const reel3 = document.getElementById('reel-3'); 

//BETS - Minimum Amount and Maximum Amount
const currentBetDisplay = document.getElementById('current-bet-display');
const minBet = document.getElementById('min-bet');
const maxBet = document.getElementById('max-bet');

//SPIN BUTTON & Message to be displayed
const spinButton = document.getElementById('spin-button');
const message = document.getElementById('result-message');


//Starting display 
balanceDisplay.textContent = `Balance: $${balance}`;
currentBetDisplay.textContent = `Current Bet: $${currentBet}`;

//When user clicks "Yes", hide age verification -->(style.display) and show the slot machine
yesButton.addEventListener ("click", function () { 
    ageVerification.style.display= "none";
    slotMachine.style.display = "block";
});

//When user clicks "No", display age restriction message
//text.Content - 
noButton.addEventListener ("click", function() { 
    ageMessage.textContent = "Sorry! You must be 21 or older to play."
    slotMachine.style.display = "none"; 
});

//BETTING 
//_____________________________________________________________________________
//When the user clicks "Bet $5", set currentBet to $5
minBet.addEventListener("click", function() { 
    currentBet = 5; 
    currentBetDisplay.textContent = "Current Bet: $5";
});

//When the user clicks "Bet $50", set currentBet to $50
maxBet.addEventListener("click", function() { 
    currentBet = 50; 
    currentBetDisplay.textContent = "Current Bet: $50";
});

//Randomizing the Symobols on the Reels
//____________________________________________________________________________________________________
//Symbols are stored in an array --> ( const symbols = ["1", "2", "3", "4", "5"] ) 
//Function randomly selects a symbol from the symbols array
//Math.random() gives a random decimal number between 0 and 1
//Multiplying * symbols.length gives a number within the array's index range
//Math.floor() rounds a decimal down to nearest whole number
//randomIndex stores the randomly generated index inside a variable
function getRandomSymbol(){ 
    const randomIndex = Math.floor(Math.random() * symbols.length); 
    return symbols[randomIndex];
}

//SPIN 

//Spin the 3 reels 
function spin() { 
    //Check if user has enough money
    if (balance < currentBet) {
         message.textContent = "You don't have enough money to place this bet."; 
        return;
    }


    //Subtract the bet from the balance
    balance = balance - currentBet;

    //Get random symbol for each reel at the same time
    let result1 = getRandomSymbol();
    let result2 = getRandomSymbol();
    let result3 = getRandomSymbol();

    const winChance = Math.random();

    //Choose a percetange that more closely simulates the chances of slot machine
    if (winChance <0.10) { 
        const winningSymbol = getRandomSymbol();

        result1=winningSymbol
        result2=winningSymbol
        result3=winningSymbol
    } else { 
        result1 = getRandomSymbol();
        result2 = getRandomSymbol();
        result3 = getRandomSymbol();
    }

    //Disaply random symbols on the reels together
    reel1.textContent = result1
    reel2.textContent = result2
    reel3.textContent = result3
 

    //Update balance - find current balance and store it balanceDisplay and display text
    balanceDisplay.textContent = `Balance:$${balance}`;

    //Check if the player won
    checkWin(result1, result2, result3);
}

    //Check if all 3 reels match 
    function checkWin(result1, result2, result3) { 
        if (result1 === result2 && result2 === result3) { 
            let winnings; 

            if (currentBet === 5) { 
                winnings = 100;
            } else { 
                winnings = 1000; 
            }
            balance = balance + winnings; 

            message.textContent = `You won $${winnings}!`;
            balanceDisplay.textContent = `Balance:$${balance}`;

        } else { 

            message.textContent = "Better luck next time!";
            balanceDisplay.textContent = `Balance:$${balance}`;

        }
}

        //When the user clicks SPIN, run the spin function 
        spinButton.addEventListener("click", function(){ 
            spin();
        });


//Sept 3 at 9:30 pm
//Issues with code: need to hide "Latto Slots" Game until after user clicks Yes AND remains hidden when user clicks "No" and display "Sorry" message
//When the page loads, we don't want the user to see any elements of the slot machine game - JUST the Age Verificatoin
