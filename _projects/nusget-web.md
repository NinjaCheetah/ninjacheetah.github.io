---
title: NUSGet Web
layout: project
icon: NUSGet-Web.png
short-desc:  A web UI for NUSGet, allowing for NUS downloads without a desktop app.
repo: https://github.com/NinjaCheetah/NUSGet-Web
releases:
  - name: Stable (Server-Client Version)
    platform: web
    url: https://nusget.ninjacheetah.dev
  - name: Beta (Client-side WASM Version)
    platform: web
    url: https://beta.nusget.ninjacheetah.dev
---

# NUSGet Web
NUSGet Web is actually a collection of projects aimed at creating a web version of NUSGet, so that you don't need to install an entire app on your computer to download titles from the NUS.

There are two versions of NUSGet Web: the original server-client version that uses JavaScript to make requests to an API (released as NUSGet Web Stable), and a newer WebAssembly-based version that does not rely on an external server for downloads and can be run fully client-side (released as NUSGet Web Beta).

### Links
- Server-Client Web UI: [Repository](https://github.com/NinjaCheetah/NUSGet-Web), [Deployment](https://nusget.ninjacheetah.dev)
- Server-Client FastAPI Server: [Repository](https://github.com/NinjaCheetah/NUSGet-Web-Backend), [Deployment](https://api.nusget.ninjacheetah.dev)
- WASM Web UI w/ Backend: [Repository](https://github.com/NinjaCheetah/NUSGet-Web-WASM), [Deployment](https://beta.nusget.ninjacheetah.dev)
- WASM CORS Proxy Server: [Deployment](https://proxy.beta.nusget.ninjacheetah.dev) (Will reject external requests)
