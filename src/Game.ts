export default class Game {
  private static apiKey: string = import.meta.env.VITE_API_KEY // API key for accessing team data from the external API
  // Maximum possible ID for teams, used to generate random team IDs 
  // Setting as 1000 there should be a lot more teams in the api
  private static MAX_ID: number = 1000 
  private teams: Team[] // Array to hold the team data fetched from the API
  
  /**
   * Constructor initializes the game with a specified number of options (teams).
   * It also initializes the teams array.
   * 
   * @param options - The number of teams to fetch and use in the game (default is 2).
   */
  constructor(
    private options: number = 2
  ){
    this.teams = []
  }

   /**
   * Starts the game by fetching data for multiple teams and setting them in the teams array.
   * 
   * @returns A promise that resolves when the teams have been successfully fetched and set.
   */
  public async start(): Promise<void> {
    this.setTeams(await this.fetchMultipleTeams())
  }

   /**
   * Sets the internal teams array with the provided team data.
   * 
   * @param teams - An array of Team objects to set in the game.
   */
  private setTeams(teams: Team[]): void {
    this.teams = teams
  }

  /**
   * Returns the array of teams currently in the game.
   * 
   * @returns An array of Team objects.
   */
  public getTeams(): Team[]{
    return this.teams
  }

   /**
   * Fetches data for a single team by its ID from the API.
   * 
   * @param teamId - The ID of the team to fetch data for.
   * @returns A promise that resolves to a Team object with the fetched data.
   * @throws Error if the request to the API fails.
   */
  public async fetchTeamData(teamId: number | string): Promise<Team> {
    const apiUrl: string = import.meta.env.VITE_PROXY_API_URL
    const response = await fetch(apiUrl+teamId.toString(), {
      headers: {
        'X-Auth-Token': Game.apiKey,
      }
    })

    if(!response.ok) 
      throw new Error(`Error fetching team dat: ${response.statusText}`)

    const data: Team = await response.json()

    return {
      crest: data.crest,
      name: data.name
    }   
  }
    /**
   * Fetches data for multiple teams by generating random team IDs.
   * It keeps fetching until the desired number of teams (based on options) is reached.
   * If an error occurs while fetching a team (e.g., invalid team ID), it retries with a new ID.
   * 
   * @returns A promise that resolves to an array of Team objects.
   */
  private async fetchMultipleTeams() : Promise<Team[]> {
    const teams: Team[] = []

    while(teams.length < this.options){
      const teamId = this.getRandomTeamId()

      try {
        const team = await this.fetchTeamData(teamId)
        if(!(teams.find((t) => t.name === team.name))) // Ensure that the same team isn't added more than once
          teams.push(team)
      } catch (error: unknown) {
        console.log(error) // Log the error and continue trying
      }
    }

    return teams
  }

   /**
   * Generates a random team ID within the range of valid IDs (0 to MAX_ID).
   * 
   * @returns A random team ID as a number.
   */
  private getRandomTeamId(): number {
    return Math.floor(Math.random() * Game.MAX_ID)
  }

  /**
   * Returns a random team from the array of teams currently in the game.
   * 
   * @returns A randomly selected Team object.
   */
  public getRandomTeam(): Team {
    const randomIndex = Math.floor(Math.random() * this.teams.length);
    return this.teams[randomIndex];
  }

   /**
   * Returns a string representation of the Game object, listing all teams.
   * 
   * @returns A string representing the teams in the game.
   */
  public toString(): string {
    return this.teams.toString()
  }

}