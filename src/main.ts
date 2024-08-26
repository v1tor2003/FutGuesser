import Game from "./Game"
import Router from "./Router"

// Declare a global router variable to handle routing within the application
let router: Router 
// Event listener to initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
  // Event listener to initialize the application when the DOM is fully loaded
  router = new Router('app')
  router.add('/tutorial.html')
        .add('/game.html')
        .add('/winner.html')
        .add('/loser.html')
        .notFound('/not-found.html')

   // Initialize global functions accessible throughout the application
  initGlobalFunctions()
})

/**
 * Initializes global functions to be accessible through the window object.
 */
function initGlobalFunctions(): void {
  (window as any).startGame = startGame
}

/**
 * Starts a new game, redirects to the game page, initializes the game, 
 * and sets up the UI with team options and event listeners.
 */
export async function startGame(): Promise<void> {
  router.redirect('/game.html')
  // Initialize the game with 3 team options
  const game = new Game(3)
  // Setup the teams to be considered to display as the options as well as the team awnser
  await game.start()
  const randomTeam = game.getRandomTeam()
  // Wait for 1 sec to the DOM be properly loaded from the game.html
  await new Promise((res) => setTimeout(res, 1000))

  renderTeamImg(randomTeam)
  renderOptions(game.getTeams())
  // Set up listeners for user's guess selection and waits for fire the processAwnser()
  await setupOptionListeners(randomTeam.name)
}

/**
 * Checks if the user's guess matches the correct answer.
 * 
 * @param expected - The correct answer.
 * @param guess - The user's guess.
 * @returns True if the guess is correct, false otherwise.
 */
function isCorrectAnswer(expected: string, guess: string): boolean {
  return expected === guess
}

/**
 * Redirects the user to the winner or loser page based on the result.
 * 
 * @param winner - Boolean indicating if the user won or lost.
 */
function showResults(winner: boolean): void {
  return winner ? router.redirect('/winner.html') : router.redirect('/loser.html')
}

/**
 * Renders the image of the randomly selected team.
 * 
 * @param randomTeam - The team object containing the team's crest image.
 */
function renderTeamImg(randomTeam: Team): void {
  const img = document.getElementById('teamImg') as HTMLImageElement
  const loadingImg = document.getElementById('loadingImg') as HTMLElement
  loadingImg.remove()
  img.src = randomTeam.crest
  img.style.opacity = '1'
}

/**
 * Renders the list of teams as options for the user to guess.
 * 
 * @param options - An array of team objects to be displayed as options.
 */
function renderOptions(options: Team[]): void {
  const list = document.getElementById('optionsList') as HTMLUListElement
  list.innerHTML = ''
  options.forEach((option) => {
    const li = document.createElement('li')
    li.textContent = option.name
    list.appendChild(li)
  })
}

/**
 * Highlights the correct and incorrect answers after a guess is made.
 * 
 * @param answer - The correct answer.
 */
function showAnswer(answer: string): void{
  const list = document.getElementById('optionsList') as HTMLUListElement
  const options = list.querySelectorAll('li')
  options.forEach((option: HTMLElement) => {
    option.style.backgroundColor = isCorrectAnswer(answer, option.textContent as string) ? 'green' : 'red'
  })
}

/**
 * Processes the user's guess, showing the correct answer and then 
 * redirecting based on whether the guess was correct or not.
 * 
 * @param answer - The correct answer.
 * @param guess - The user's guess.
 */
async function processResults(answer: string, guess: string): Promise<void> {
  showAnswer(answer)
  await new Promise((res) => setTimeout(res, 500))
  showResults(isCorrectAnswer(answer, guess))
}

/**
 * Processes the user's guess, showing the correct answer and then 
 * redirecting based on whether the guess was correct or not.
 * 
 * @param answer - The correct answer.
 * @param guess - The user's guess.
 */
async function setupOptionListeners(correctAnswer: string) {
  const list = document.getElementById('optionsList') as HTMLUListElement
  
  list.addEventListener('click', async (event) => {
    const target = event.target as HTMLElement
    if (target.tagName === 'LI') 
      await processResults(correctAnswer, target.textContent?.trim() || '')
  })
}

