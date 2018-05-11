import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _7ee889b2 = () => import('../src/client/pages/upload.vue' /* webpackChunkName: "pages/upload" */).then(m => m.default || m)
const _e092ce6c = () => import('../src/client/pages/bus.vue' /* webpackChunkName: "pages/bus" */).then(m => m.default || m)
const _456b0809 = () => import('../src/client/pages/github.vue' /* webpackChunkName: "pages/github" */).then(m => m.default || m)
const _77408684 = () => import('../src/client/pages/mongo.vue' /* webpackChunkName: "pages/mongo" */).then(m => m.default || m)
const _10f8b4c8 = () => import('../src/client/pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/upload",
			component: _7ee889b2,
			name: "upload"
		},
		{
			path: "/bus",
			component: _e092ce6c,
			name: "bus"
		},
		{
			path: "/github",
			component: _456b0809,
			name: "github"
		},
		{
			path: "/mongo",
			component: _77408684,
			name: "mongo"
		},
		{
			path: "/",
			component: _10f8b4c8,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
