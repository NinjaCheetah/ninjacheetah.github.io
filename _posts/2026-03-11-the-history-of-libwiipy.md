---
title: The History of libWiiPy, WiiPy, and NUSGet
titleshort: The History of libWiiPy, WiiPy, and NUSGet
layout: blogpost
desc: NUSGet is undoubtedly the most well known thing I've made, but where exactly did it and its dependencies start?
updated:
date: 2026-03-11 14:00:00 -04:00
series_next: the-future-of-libwiipy
---

I sat down to write about the future of my Python Wii projects, but I realized that to understand where they're going, you kinda need to understand the history first. I've never formally written down what started the libWiiPy project, so I figured that now would be a great time to do so.

## The Early Days

A little backstory that I think is helpful for understanding everything else is the context in which libWiiPy was created. 

Way back in 2021, I had been using NUSD to obtain the Wii Menu for my [hidden DVD experiments]({% post_url 2021-01-30-wii-dvd-p1 %}), and was always a little frustrated by having to run such an ancient app through WINE just to download some files. I left it alone at the time though, because I was more focused on actually unhiding the DVD above everything else. Finally, in 2023, I cracked the code and got the DVD showing up, and at that point I wanted to automate the process in case anyone else wanted to mess around with it. Initially this was just a bash script (see [wii-menu-visual-patcher](https://github.com/NinjaCheetah/wii-menu-visual-patcher)), but I later tried making a Qt desktop app using PySide to make it a little easier to use and apply more modifications (see [Wii-Menu-Patcher](https://github.com/NinjaCheetah/Wii-Menu-Patcher)). I quickly ran into an issue with making that though, which was that I had to perform all of the operations by running tools like `ASH.exe` and Sharpii as subprocesses, as there wasn't a library that I could hook into to do things myself. This was awkward and was really frustrating to work with, even for simple tasks like just checking the Title ID of the WAD that the user provided to make sure it was actually the Wii Menu. I settled on some workarounds like hashing the WAD and checking it against a list of known hashes, but it was clear that this idea wasn't really going to work out as-is.

I needed a library.

## Enter libWiiPy

Before starting on my own library, I did look around to see what my options were. Unfortunately, the only properly usable Wii library is libWiiSharp, and I was absolutely not going to be working in C#. I did find an older library called Wii.py that libWiiSharp was based off of, but it was ancient Python 2 and the only attempt at updating it didn't support newer than Python 3.4 and had been abandoned many years prior. So it looked like I was going to be on my own.

I started work pretty much right after I realized this, with the final Wii-Menu-Patcher commit being on February 2, 2024, and libWiiPy being born with the addition of the first actual module on [February 6, 2024](https://github.com/NinjaCheetah/libWiiPy/commit/397c2a8e38647743042e7b92ba223a7a5742b3d8). There was then a bit of a pause before the earliest incredibly rough implementation of the TMD class appeared on [February 25, 2024](https://github.com/NinjaCheetah/libWiiPy/commit/8b05dc178451a79feefd4ee52e92d85f98512a92). This kicked off some incredibly fast paced work over the next few months, with lots of the library's core features being implemented and multiple releases pushed to PyPI.

Eventually, though, I needed a real way to be able to test the features that I was implementing in libWiiPy in a real world scenario. Coincidentally, I also wanted a brand new CLI so that I could replace Sharpii in any of my workflows that required WAD packing, U8 packing, etc. So I decided to kill two birds with one stone.

## Enter WiiPy

What good is a library meant to offer comprehensive support for the Wii's file formats if there isn't a handy CLI to interact with those file formats? That's pretty much what I thought, and so on March 5, 2024 I created WiiPy and gave it the ability to unpack WADs with what I had implemented in libWiiPy at that point. And that pretty much sums up the majority of the development of WiiPy, if I'm being honest. I either implement a new feature in libWiiPy that I want to test and make usable, or I find a feature that another ancient Wii command line tool offers, and then I implement that feature in WiiPy. Rinse and repeat. This is also why I've always considered WiiPy to be the reference implementation of libWiiPy, because it uses (I believe) every single major library feature somewhere.

## My Most Well Known Program: NUSGet

NUSGet is undoubtedly my biggest success in terms of all the code I've written. Since officially replacing NUSD in the Wii guide at the start of 2026, it's gotten thousands of downloads, and I watched the latest release (v1.5.0 at the time of writing) cross 19k downloads while writing this portion of the article.

But I'm getting ahead of myself.

Once libWiiPy was in a functional state that could manage titles, I had the idea of making my own NUSD replacement. NUSD is really, really old, having been created in 2009 and last officially updated in 2011.<sup>[[source]](https://wiibrew.org/wiki/NUS_Downloader)</sup> It was kinda clunky to use, and as previously established, is a Windows app, and as an exclusively non-Windows user, this is a nuisance. Rather than continue to complain about it like I had done for the previous 3 years, I chose to actually do something about it! And thus, NUSGet (or at that point in time, NUSD-Py) was born.

The initial UI that I created was designed to look just like NUSD's, because I find UI design quite challenging. The entire original goal was pretty much just to clone NUSD, but make it cross platform and based on libWiiPy. As I worked though, I decided that there had to be a better way to design some of the components than the way NUSD had. For one, I hated the way that the entire title list was held within the menu bar. So for NUSGet, I instead opted for a tree on the left side of the window that was always visible. Some of these changes were more major like that, but there were also plenty of little ones, like having "Pack WAD" enabled by default when available.

Aside from UI design, the other major difficulty with actually starting NUSGet was figuring out how I'd be shipping it. By default, a PySide app has the downside of well, being based on Python. You need Python and all the app's modules installed or you're not going to be able to run it. This is sort of doable on Linux, there are a lot of apps that are Python based that install their scripts somewhere and then use system-wide Python modules to run, but for macOS and Windows it's kind of a dealbreaker. You're not going to be able to instruct every single user to set up a `venv` and then launch NUSGet from the command line every single time they want to use it. So I had to figure out a new plan. My solution? Compile it!

The [page on deployment](https://doc.qt.io/qtforpython-6/deployment/index.html#deployment-guides) in the PySide 6 docs has a nice little chart of different tools you can use to package or compile your app to distribute it. I looked at this, saw that Nuitka was the only option that had checkmarks all the way across, and decided that would be what I used. There really wasn't much more to it then that, I just looked at the chart and chose the one with the most green. Aside from [a](https://github.com/Nuitka/Nuitka/issues/3021) [few](https://github.com/Nuitka/Nuitka/issues/3028) [notable](https://github.com/NinjaCheetah/NUSGet/commit/bf09f3b18e297f47893db6522d9cd4845b315aaf) [issues](https://github.com/NinjaCheetah/NUSGet/commit/51529c2d3b5af2968136103ecb65bb25473b5e3b), this choice has served me decently well and has allowed me to ship a kinda-sorta native executable that runs faster and is easier to distribute than any other option. I'd be lying if I said I wasn't still a _little_ fuzzy on how Nuitka works, I just know that it does produce a native executable in some capacity. (I also later copied this method of distribution over to WiiPy so that I could start shipping that as a semi-native executable as well, since I wanted WiiPy to be a command line tool that could be easily installed and used system wide.)

After many, many months of work and lots of fixes and improvements, I finally got NUSGet to the point it's at today, which I consider a worthy replacement for NUSD. But more on that part soon.

## The WiiLink GUI Patcher

Now for a quick pause from my stuff to mention one very notable project _not_ made by me that utilizes libWiiPy: the [WiiLink GUI Patcher](https://github.com/WiiLink24/WiiLink-Patcher-GUI)!

In early 2025, I had been in contact with some of the WiiLink developers about libWiiPy hoping that maybe they would have a use for it. I'd be lying if I said that I wasn't really hoping a notable Wii developer would pick it up and do something with it. My wish was granted in May 2025, when WiiLink developer [Harry Walker](https://github.com/hwalker56) began working on a new graphical version of the WiiLink patcher to replace the old TUI one that was written in C#. This patcher was designed pretty much the same as NUSGet, being a PySide 6 application compiled for distribution with Nuitka. It was super cool to see my library get used as the base for something that so many people would use, especially since it was the first application not written by me to make use of it.

## Inclusion in the Wii Guide

The last notable event in libWiiPy and co's history, as of writing, is the inclusion of NUSGet in the Wii guide. During some major updates to the guide in the beginning of 2026, NUSGet officially replaced NUSD in the instructions for installed cIOSes. You can go see it yourself [right here](https://wii.hacks.guide/cios?tab=wii/family-edition)!

This was huge to me, because my goal for NUSGet was always to create a NUSD replacement. Obviously people will continue to recommend NUSD in various places no matter what, but NUSGet's inclusion in the official Wii guide, at least to me, cements it as having replaced NUSD. The vast majority of Wii users will only ever use the tools listed in the guide, and so if NUSGet is the only NUS downloader they're instructed to download, then it will be the only one that they use. I realize that the NUS downloader market is quite a niche place to worry about having the largest share of, but it still feels really cool for that to be the case. My downloads also skyrocketed after NUSGet was added to the guide. Prior to that, the average NUSGet release got between 800-1000 downloads. v1.4.3, the update that was already out when the guide was updated, got a respectable 2,544. v1.5.0, which released on January 5, 2026, firmly after the update, is currently sitting at 19,017 downloads as of writing. That feels absolutely insane to me. It's such an honor to have people use the stuff you make, so thank you to each and every NUSGet user <3

Alright, I think that covers all of the bases of how we got where we are today. If I've forgotten any events that I remember later, I'll come back and add them as I see fit. I want this to be the most comprehensive history of why I started all of these projects, because documenting the thought process behind stuff is cool. I love reading other people's articles about how and why they did something, so I'm sure someone out there will love reading this.

I can't help but feel like there's something looming though. Something orange and metallic.

Oh no.
