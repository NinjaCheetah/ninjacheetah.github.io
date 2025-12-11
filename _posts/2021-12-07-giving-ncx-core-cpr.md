---
title: Giving NCX-Core Some CPR
titleshort: Giving NCX-Core CPR
layout: blogpost
icon:
desc:
updated:
---

_Welcome back to another edition of I Don't Stick With Anything._

I went back on my decision to completely stop using Windows because some stuff still absolutely requires it. _Chilling, isn't it?_

### Atrocity #1: The Code

Since I was already here using Windows 10 again (however it's the LTSC 2021 version so less telemetry and no Windows Store at least) I figured that I'd pop in and look at how NCX-Core's code was holding up (with the "new" and exciting VS2022!); this was my first mistake. Now to be fair I acknowledged that the code was bad when I first wrote it, but I hadn't quite realized just how severe it truly was. Most likely the worst (publically available) code I've ever written and ever will write. But hey, it was one of my first major projects so I can't be too hard on it.

Honestly I didn't do a lot to fix the code, but I did finally correct all of the incorrect file paths that would cause the program to inexplicably crash whenever it tried to access them since I continue to put off error handling. I also fixed a decent bit of inefficient code and removed a bunch of feature stubs that were just taking up space. Oh and button code stubs. There was a large amount of those for some reason.

### Atrocity #2: The GUI

The GUI was the next thing I took another look at. Now, _overall_ the GUI isn't awful. Yes, the fact that the Library has hardcoded icon positions is dumb and since even _I_ don't have CSharpCollection installed, there's always an awkward gap in the first slot. The About screen is also not nice to look at. Oh and the Settings screen is far too empty. Like really.

The real issue with the GUI is all of the photo-based elements. This includes all of the buttons, menu bar items and program icons. If you weren't already aware, all of the buttons are PNGs. Really big PNGs. Like, really big.

![Image showing the resolution of the image is 1700x1100.](https://cdn.ncxprogramming.com/file/blog/2021-12-07/what-is-this-res.png)

Yeah... And for some reason, I expected this to scale down to 104x66 for some reason (let's just ignore this bizarre resolution). I believe I though that the bigger the image the better it would scale down? I'm not even really sure at this point. So I decided step one for fixing this mess would be to create some brand new assets, this time as vector graphics so they'd scale down nicely. (Read 'A Love Letter to Vector Graphics' which may or may not ever come out for that backstory.) Since these are vector graphics, it means geometric shapes, which means that not only do they scale better but they also just look nicer to begin with. If you'd like to see a fun comparison, [click here](https://cdn.ncxprogramming.com/file/internal/NCX-Core%20Asset%20Pack.zip) to download `NCX-Core Asset Pack.zip` from our not-CDN that has the old assets and the new ones.

With all of the new assets in, I can say that NCX-Core is now at least slightly less painful to use (not that anyone does anyway). Yay.

### The State of NCX-Core and its Future

**Can it be used?**

Yes, but it's not very useful to anyone. I've made enough changes that it's now relatively usable. The issue is just that there's no real need for it.

**If that's the case then what's going to happen to it?**

I honestly don't know. My current plan is to finish polishing what's there and release it as v3.2, and then leave it. It's an important piece of "programmer history" so it's not going to get deleted or be privated. For now it's also not going to be archived. So if I ever decide to pick it up and use it's code for something new it's there.

### Wow this was kind of sad

Yeah I know. But, officially saying this is done-ish means I'm finally going to stop holding out on NCX-Core-Lite and work on a proper big program, so stay tuned!