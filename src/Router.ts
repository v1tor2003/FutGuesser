export default class Router {
  private app: HTMLElement
  private routes: Set<Route> = new Set([
    { path: '/404', page: '<h1>404 Not Found</h1>' }
  ])
  
  constructor (
    appName: string
  ) {
    this.app = document.getElementById(appName) as HTMLElement
    this.initRouting()
    this.syncUrlHash()
  }

  private initRouting(): void {
    window.addEventListener('hashchange', this.syncUrlHash.bind(this))
  }

  public render(url: string): void {
    const page = this.retrievePage(url)
    if(!page) throw new Error(`Failed to retrive page from: ${url}`)

    this.updateDom(page)
  }

  private syncUrlHash(): void {
    let hash = document.location.hash.split('#')[1]
    console.log('hash: ', hash)
    if(!hash) return
    this.render(hash)
  }

  private updateDom(page: string): void {
    this.app.innerHTML = page
  }

  private retrievePage(path: string): string | undefined {
    for(const element of this.routes)
      if(element.path === path) return element.page 
      
    return undefined
  }

  public async add(path: string): Promise<Router>{
    try {
      const response = await fetch(path)  
      if(!response.ok) 
        throw new Error(`Failed to load HTML at '${path}: ${response.statusText}'`)
     
      const page = await response.text()
      
      this.routes.add({
        path,
        page
      })
    } catch (error: unknown) {
      console.error('Error adding route: ', error)
    }finally{
      return this
    }
  }

  public toString(): string{
    return `Entry point: ${this.app.outerHTML}\n` +
            `Routes: Set(${this.routes.size})[${Array.from(this.routes).map((route) => route.path).join(', ')}]`
  }
}