import Router from "./Router"

document.addEventListener('DOMContentLoaded', async () => {
  const router = new Router('app')
  await router.add('/pages/page.html')
  await router.add('/pages/about.html')

  console.log(router.toString())
  
})
