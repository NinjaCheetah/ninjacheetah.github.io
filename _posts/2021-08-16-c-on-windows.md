---
title: The Problems With C On Windows
titleshort: C On Windows
layout: blogpost
icon:
desc:
updated:
---

_This will be a short article._

As much as I like using C, I have one big issue with it. And that problem is Windows.

**1\. Libraries**

Compared to macOS and Linux, installing/obtaining libraries to use on Windows is difficult. If you're on a Debian or Arch system, you have `apt` or `pacman`, respectively. If you're on macOS, you have a few options, such as my package manager of choice, `brew`. But on Windows? You don't have those options. You have to find and download those libraries yourself in order to use them in your program. Now is this a huge deal? No, not really. It's just inconvenient, compared to macOS and Linux where you'll always be using the latest libraries, and they can be installed with one command.

**2\. POSIX Compliance**

Windows is not POSIX Compliant.\[1\] Now what does this mean? ["The Portable Operating System Interface (POSIX) is a family of standards specified by the IEEE Computer Society for maintaining compatibility between operating systems."](https://en.wikipedia.org/wiki/POSIX)\[1\] One particular POSIX standard that it doesn't meet is the C POSIX standard,\[2\] which is what causes me issues. Because Windows does not follow these standards, it doesn't include many of the standard C libraries, and instead forces you to use the proprietary Windows libraries. While this isn't inherently a bad thing, it does kill compatibility between Linux/macOS and Windows. This deters me from making Windows-compatible software because I need to rework a lot of code to do it. With macOS and Linux the changes I need to make are often either minor or nonexistent.

**3\. Compiler**

Tying in with the previous section, Windows requires its own proprietary compiler because it needs to be able to include the Windows libraries.

**Finishing Off**

Overall, if you intend to only make Windows programs, there's no reason to not use C. However if, like me, you want to make programs that run on multiple operating systems, you'll have to write completely different versions for POSIX compliant and non-POSIX compliant systems.

- - -

**Sources**

1\. [POSIX](https://en.wikipedia.org/wiki/POSIX) Wikipedia, retrieved on August 15, 2021.

2\. [C POSIX library](https://en.wikipedia.org/wiki/C_POSIX_library) Wikipedia, retrieved on August 16, 2021.