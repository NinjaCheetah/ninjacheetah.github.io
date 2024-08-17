---
title: The Story of Finishing fake-apt
titleshort: Finishing fake-apt
author: NinjaCheetah
layout: blogpost
icon:
---

Well, after about a year and a half of work and 107 commits, fake-apt has finally reached a state where I feel alright calling it completed. It may not truly have all of APT's features, namely features like updating and upgrading just print out text, and edit-sources just spits out an error, but overall it's a pretty solid recreation, in my opinion at least.

One thing I've always thought about myself while working on fake-apt is why I was using C. I could have easily written fake-apt in a language that would have made it much simpler like Python, but I didn't. I honestly never had a good reason for this, it was just the language I was working with at the time (it was the same deal for the original fakeApt that was written in C#) and I wanted fake-apt to be a compiled binary that would run just like real APT. I also was far more comfortable with C at the time than I was with Python (that didn't really change until I started putting more work into Ah Counter), so it seemed like the easier option in the long run.

However, to be completely honest, I feel like it wasn't easier in the end. Windows being... _windows_ (you can hear me gripe about that [here](https://ncxprogramming.com/2021/08/16/c-on-windows.html)) made me have to deal with issues that otherwise would not have been present. The most obnoxious one appeared when I rewrote my Makefile so that it worked more traditionally and would be nicer to use (since `make` would actually be able to tell what was up-to-date and what wasn't). This was all fine and good until it came to Windows. My Makefile was completely incompatible since it used `gcc` so I had to write a brand new Makefile that would need to be manually updated every time a new file was added to keep things working. If I had access to a Windows machine I maybe could've come up with something better since I could test things faster but it just wasn't worth it. My stance on Windows support the whole time was that if it ever made the project not fun to work on, it would be dropped. Honestly a miracle it made it to the end.

Now to be fair, it's not like the other platforms didn't need extra work. For macOS I had to create a second `make` target that worked like my old Makefiles so that I could make a Universal Binary. The difference here is that I could instantly test that so I had far more patience for when it didn't work.

Alright, my rant is over.

### The History of fake-apt

fake-apt (originally stylized as fakeApt) was originally created in C# on my old ThinkPad while I was bored during online school. It was the first (and only) C# console app I made and released on GitHub. It was also the final C#-based app that I published, however it was not the last C# app made. As far as I'm aware, that title goes to the semi-lost "Dolphin NAND Manager", which I plan to do a writeup about soon.

Version 1.0, intended to be the only version, was released on December 15, 2020 and supported every platform that supported .NET 5.0. A couple months later, on March 11, 2021, I began rewriting the program in C. On April 14, 2021 Version 1.1 was released, and because of my lack of C experience at the time, no Windows build was possible. On a side note, no idea why I released it on April 14. At that point, the last commit was April 4, so it's not like anything was changing.

Over 6 months later, Version 1.2 was released, with more optimized code and the return of a Windows version. At the time of writing, this is still the most recent release, however I intend to release a new version soon. Later releases were planned since major updates were added just under 2 weeks later, but none ever happened. Progress then slower to a crawl through 2022, minus February which was super active, until I finally finished it up this month.

And with that, we come to the end of the interesting details of fake-apt's story, and as a consequence, this article. This is, I believe, the longest maintained program that I have, and I want to make sure I do it justice.