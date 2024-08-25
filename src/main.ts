import Router from "./Router"

document.addEventListener('DOMContentLoaded', async () => {
  const router = new Router('app')
  router.add('/page.html')
        .add('/about.html')
        .notFound('/not-found.html')
})
