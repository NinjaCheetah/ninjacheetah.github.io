---
title: Bringing RNGTool to Your Wrist (Maybe)
titleshort: Bringing RNGTool to Apple Watches
layout: blogpost
icon: https://cdn.ncxprogramming.com/file/blog/2022-02-01/rngtool-wrist-dice-mode.png
desc:
updated:
---

Hmm this title sounds familiar...

More RNGTool updates! This time I'm porting RNGTool to watchOS rather than iOS. And it's interesting. The most difficult part of this is dealing with the limited screen real estate that the Apple Watch has. The solution? Cutting out the fat.

RNGTool is by no means a visually simple app. I've definitely overcomplicated its UI. This gives me a good chance to really cut out any parts of the app's UI that aren't needed so that you can fit the parts that matter. The actual process of porting the app's code was a lot easier than from macOS to iOS because most of the parts that aren't support on watchOS were being removed anyway, so I won't go over it here.

Here's the interesting part, a comparison of the iOS and watchOS apps:

![](https://cdn.ncxprogramming.com/file/blog/2022-02-01/rngtool-mobile-number-mode.png) ![](https://cdn.ncxprogramming.com/file/blog/2022-02-01/rngtool-wrist-number-mode.png)

![](https://cdn.ncxprogramming.com/file/blog/2022-02-01/rngtool-mobile-dice-mode.png) ![](https://cdn.ncxprogramming.com/file/blog/2022-02-01/rngtool-wrist-dice-mode.png)

![](https://cdn.ncxprogramming.com/file/blog/2022-02-01/rngtool-mobile-about.png) ![](https://cdn.ncxprogramming.com/file/blog/2022-02-01/rngtool-wrist-about.png)

Unfortunately those are all of the screens I've completely finished at this point. I will likely make a post updating on when I finish the rest.