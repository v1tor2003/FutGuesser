export default class Router {
  private NOT_FOUND_URL: string = '/404'
  private static FILE_PREFIX: string = '/pages'
  private app: HTMLElement
  private homeUrl: string
  private routes: Set<Route> = new Set([
    { path: Router.FILE_PREFIX + this.NOT_FOUND_URL, page: '<h1>404 Not Found</h1>' },
  ])
  
  constructor (
    appName: string,
    home?: string
  ) {
    this.app = document.getElementById(appName) as HTMLElement
    this.homeUrl = home ? home : '/'
    this.initRouting()
  }

  public initRouting(): void {
    window.addEventListener('hashchange', this.syncUrlHash.bind(this))
  }

  public render(url: string): void {
    const path: string = this.routeExists(url) ? url :  Router.FILE_PREFIX + this.NOT_FOUND_URL
    const page = this.retrievePage(path)
    if(page) this.updateDom(page)
  }

  public syncUrlHash(): void {
    let hash = document.location.hash.split('#')[1]
    if(hash === this.homeUrl) this.home()
    else if(!hash) return
    else this.render(Router.FILE_PREFIX + hash)
  }

  private updateDom(page: string): void {
    this.app.style.opacity = '0'
    setTimeout(() => {
      // should sanitize the page
      this.app.innerHTML = page.trim()
      this.app.style.opacity = '1'
    }, 300)
  }

  private routeExists(url: string): boolean{
    return this.getRoute(url) !== null
  }

  private retrievePage(path: string): string | undefined {
    return this.getRoute(path)?.page
  }

  public redirect(path: string): void {
    window.location.hash = path
  }

  public home(): Router {
    window.location.hash = ''
    window.location.href = 'http://localhost:5173/' // could be a .env var
    return this
  }

  public notFound(newNotFoundPath: string): Router {
    const notFoudRoute = this.getRoute(this.NOT_FOUND_URL) as Route
    this.routes.delete(notFoudRoute)
    this.NOT_FOUND_URL = newNotFoundPath
    return this.add(newNotFoundPath)
  }

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

  private async fetchPage(path: string): Promise<string> {
    const response = await fetch(path)
    if (!response.ok)
      throw new Error(`Failed to load HTML at '${path}: ${response.statusText}'`)

    return await response.text()
  } 

  private getRoute(path: string): Route | null {
    for(const route of this.routes)
      if(route.path === path) return route

    return null
  }

  public toString(): string{
    return `Entry point:\n${this.app.outerHTML}\n` +
            `Routes: Set(${this.routes.size})[${Array.from(this.routes).map((route) => `${route.path}, ${route.page}`).join(', ')}]`
  }
}