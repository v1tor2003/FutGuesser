// Custom Router class to handle navigation 
export default class Router {
  
  private NOT_FOUND_URL: string = '/404' // URL to be used when a route is not found
  private static FILE_PREFIX: string = '/pages' // Prefix to be added to file paths for routing
  private app: HTMLElement // Reference to the main application container in the DOM
  private homeUrl: string  // The URL for the home page (default is '/')
  // Set of routes available in the application
  private routes: Set<Route> = new Set([
    { path: Router.FILE_PREFIX + this.NOT_FOUND_URL, page: '<h1>404 Not Found</h1>' },
  ])
  
   /**
   * Constructor initializes the Router with the application name and an optional home URL.
   * It also sets up the initial routing logic.
   * 
   * @param appName - The ID of the main application container.
   * @param home - Optional URL for the home page.
   */
  constructor (
    appName: string,
    home?: string
  ) {
    this.app = document.getElementById(appName) as HTMLElement
    this.homeUrl = home ? home : '/'
    this.initRouting()
  }

  /**
   * Initializes the routing by setting up a listener for hash changes in the URL.
   */
  public initRouting(): void {
    window.addEventListener('hashchange', this.syncUrlHash.bind(this))
  }

   /**
   * Renders the page corresponding to the given URL. If the URL doesn't exist in the routes,
   * it renders the 404 page.
   * 
   * @param url - The URL of the page to render.
   */
  public render(url: string): void {
    const path: string = this.routeExists(url) ? url :  Router.FILE_PREFIX + this.NOT_FOUND_URL
    const page = this.retrievePage(path)
    if(page) this.updateDom(page)
  }

  /**
   * Syncs the content of the app with the current URL hash. If the hash matches the home URL,
   * it redirects to the home. Otherwise, it renders the corresponding page.
   */
  public syncUrlHash(): void {
    let hash = document.location.hash.split('#')[1]
    if(hash === this.homeUrl) this.home()
    else if(!hash) return
    else this.render(Router.FILE_PREFIX + hash)
  }


  /**
   * Updates the DOM with the provided page content.
   * 
   * @param page - The HTML content to be rendered inside the app container.
   */
  private updateDom(page: string): void {
    // Note: Since this application is for education only propurses we do not sanitize html to be insert
    // In a production env you should
    // Note: I think there is a better way to do this using the createElement() method
    // but lets keep it simple
    this.app.innerHTML = page.trim()
  }

   /**
   * Checks if the route for the given URL exists in the set of routes.
   * 
   * @param url - The URL to check.
   * @returns True if the route exists, false otherwise.
   */
  private routeExists(url: string): boolean{
    return this.getRoute(url) !== null
  }

  /**
   * Retrieves the HTML content of a page corresponding to the given path.
   * 
   * @param path - The path of the page to retrieve.
   * @returns The HTML content of the page if it exists, undefined otherwise.
   */
  private retrievePage(path: string): string | undefined {
    return this.getRoute(path)?.page
  }

   /**
   * Redirects the user to a different path by updating the URL hash.
   * 
   * @param path - The path to redirect to.
   */
  public redirect(path: string): void {
    window.location.hash = path
  }

  /**
   * Redirects the user to the home page.
   * 
   * @returns The current Router instance.
   */
  public home(): Router {
    window.location.hash = ''
    window.location.href = import.meta.env.VITE_DOMAIN || 'http://localhost:5173/' 
    return this
  }

  /**
   * Updates the URL and page for the 404 (Not Found) route.
   * 
   * @param newNotFoundPath - The new path for the new 404 page.
   * @returns The current Router instance.
   */
  public notFound(newNotFoundPath: string): Router {
    const notFoudRoute = this.getRoute(this.NOT_FOUND_URL) as Route
    this.routes.delete(notFoudRoute)
    this.NOT_FOUND_URL = newNotFoundPath
    return this.add(newNotFoundPath)
  }

   /**
   * Adds a new route to the set of routes. It fetches the HTML content of the page
   * and stores it in the routes set.
   * Note: Every route must be a valid file path to a existing .html file that lives in the /public/pages/
   * Otherwise it can led to app breaks and bugs
   * @param path - The path of the new route.
   * @returns The current Router instance.
   */
  public add(path: string): Router{
    path = Router.FILE_PREFIX + path

    this.fetchPage(path)
        .then(page => {
          this.routes.add({
            path, 
            page
          })

          this.syncUrlHash()
        })
        .catch((error: unknown) => console.error('Error adding route: ', error))
   
    return this
  }

   /**
   * Fetches the HTML content of the page from the server.
   * Note: Sould be nice to return a HTMLElement | DocumentFragment | etc
   * But lets keep it simple as well
   * @param path - The path to the HTML file.
   * @returns A promise that resolves to the HTML content of the page.
   */
  private async fetchPage(path: string): Promise<string> {
    const response = await fetch(path)
    if (!response.ok)
      throw new Error(`Failed to load HTML at '${path}: ${response.statusText}'`)

    return await response.text()
  } 

  /**
   * Retrieves the route object corresponding to the given path.
   * 
   * @param path - The path of the route.
   * @returns The Route object if it exists, null otherwise.
   */
  private getRoute(path: string): Route | null {
    for(const route of this.routes)
      if(route.path === path) return route

    return null
  }
  
  /**
   * Returns a string representation of the Router object, including the entry point 
   * (app container) and the list of routes.
   * 
   * @returns A string representing the Router.
   */
  public toString(): string{
    return `Entry point:\n${this.app.outerHTML}\n` +
            `Routes: Set(${this.routes.size})[${Array.from(this.routes).map((route) => `${route.path}, ${route.page}`).join(', ')}]`
  }
}