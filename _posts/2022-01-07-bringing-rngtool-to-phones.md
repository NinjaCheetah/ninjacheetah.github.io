---
title: Bringing RNGTool to Your Pocket (Kinda)
titleshort: Bringing RNGTool to Phones
layout: blogpost
icon: https://cdn.ncxprogramming.com/file/blog/2022-01-07/rngtool-mobile-mode-list-beta.jpg
desc:
updated:
---

hey look, the first article of the year! happy new year!

So, what have I been up to recently (in terms of programming)? Mostly improving RNGTool. Since I've gotten more comfortable with Swift, it's started to push me away from C a little bit. Now I'm sure I'll return to it eventually, but for now this means I'm working on RNGTool and my websites exclusively. But hey, that means that RNGTool is becoming more usable!

**Some quick clarification:** since this is Swift, the only pockets RNGTool is coming to are the ones with iPhones (or iPods (or even iPads if you have _really_ big pockets)) in them. Sorry Android users.

So I finally made the realization that one can actually deploy iOS apps to their iDevices for testing. For some reason I genuinely thought you had to be an Apple Developer to even run your own app on your phone. Whoops. I also realized like 2 months later that I can actually run iDevice simulators on my Mac without much trouble so this wasn't even really an issue in the end.

Armed with this new information, I decided it was about time that I tried to port RNGTool to iOS. It's something that I've always wanted to do since I first created it but because of the afformentioned testing issues I didn't have a good way to make sure it actually did what it was supposed to. The basic porting process wasn't actually too hard. The beauty of Swift is that _most_ code will work on all Apple platforms (especially since macOS 11.0, which added some previously iOS-specific features to Mac). At first the iOS version was actually just the macOS Swift files for the modes and settings with a new view listing. And then it got hard.

While my basic direct code porting was fine to get a working prototype, most of the UI was not really that usable. You can see this early UI below.

![](https://cdn.ncxprogramming.com/file/blog/2022-01-07/rngtool-mobile-mode-list-beta.jpg) ![](https://cdn.ncxprogramming.com/file/blog/2022-01-07/rngtool-mobile-marble-mode-beta.jpg)

And thus began the quest to make RNGTool usable. I started with the settings, as they were a trainwreck that I unfortunately don't have any pictures of (and it was never committed to GitHub so it's long gone). These actually came out pretty well in the end. I managed to keep using the exact same code in both the macOS and iOS versions, just with different wrappings around the actual settings in the two `SettingsView.swift` files. The result is something arguably nicer to use than the macOS version, though I'll let you judge that for yourself.

![](https://cdn.ncxprogramming.com/file/blog/2022-01-07/rngtool-mobile-settings1.png) ![](https://cdn.ncxprogramming.com/file/blog/2022-01-07/rngtool-mobile-settings2.png)

Next on the to-do list was to make brand new mobile-focused UIs for the actual generator modes. I tried to do what I did with the settings but it just wasn't working out; the UI needed to be basically redesigned from the ground up to work well on screens as small as 4 inches diagonally (looking at you, iPod Touch 7th gen). The easiest place to start was the text, so I shrank it all down until it was small enough to fit comfortably without being so small that it was hard to read. Then it was time to address the controls.

The annoying thing with the controls is that on macOS you really _have_ to add extra properties to make them look decent. On iOS, however, that isn't an issue an raw controls look fine, excluding the buttons. The buttons needed some extra tinkering but what I came up with ended up looking pretty good, which is really only because all of my buttons use SF Symbols rather than text, so adding a rounded border was enough to make them big enough to press.

So by this point we've got working settings and working control (and of course functional number generation). What could possibly be left? Images.

While I briefly considered dropping the the dice and card images, I just felt like it would be weird since that was a feature I put a lot of time into on macOS. Thankfully, for literally the first time ever (that I can remember), math was useful in my code. Incredible, isn't it? I figured out how to read the usable screen size, and then used some fancy math to scale the dice and cards (as well as set the card offsets) to fit your screen nicely. The results can be seen below.

![](https://cdn.ncxprogramming.com/file/blog/2022-01-07/rngtool-mobile-dice-mode.png) ![](https://cdn.ncxprogramming.com/file/blog/2022-01-07/rngtool-mobile-card-mode.png)

So with that, RNGTool on iOS reached what it is today (more or less, new features have been added that I'm not mentioning here because they weren't part of the inital port). Now, about the "Kinda" in the title. Unfortunately, as I'm not an Apple Developer, I can't publish the app on the App Store or really distribute it at all. So if you want to run it, you'll either need a Jailbroken device on iOS 15 (which is not currently possible) or a sideloading method like [Sideloadly!](https://sideloadly.io) or [AltStore](https://altstore.io). I won't be covering that here, but neither of those programs are particularly hard to use, so it shouldn't be hard to get RNGTool installed. Downloads can be found in the [latest release](https://github.com/NCX-Programming/RNGTool/releases/latest) or as a build artifact in the latest [GitHub Actions run](https://github.com/NCX-Programming/RNGTool/actions).

That's all for now! Hopefully it won't be a full month between articles next time.