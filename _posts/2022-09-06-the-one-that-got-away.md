---
title: The One That Got Away (Dolphin NAND Manager)
titleshort: The One That Got Away
layout: blogpost
icon: https://cdn.ncxprogramming.com/file/blog/2022-09-06/dnm-main-menu-empty.png
desc:
updated:
---

It's time to talk about my lost project: Dolphin NAND Manager, one of the most useful programs I've ever made.

## What (and why) is Dolphin NAND Manager?

Dolphin NAND Manager was a .NET 5 app written in C# that allowed you to backup and quickly load Wii NAND images into the Wii emulator [Dolphin](https://dolphin-emu.org). It was created at a time when I was really into messing around with the Wii (see "Enabling the Hidden Wii DVD Icon" parts [1](https://ncxprogramming.com/2021/01/30/wii-dvd-p1.html) and [2](https://ncxprogramming.com/2021/04/08/wii-dvd-p2.html)), as well as the Wii Startup Menu after the Wii Startup Disc leaked. Having this program made it really easy to reset whenever anything went wrong.

## The Interface

Dolphin NAND Manager came at a time when I was really starting to care about making a nice looking UI for my apps. While I tried (and failed) to make some of my other apps like NCX-Core and the CSharpCollection look nice, I have to say that I think I really succeeded with DNM. The interface was very clean and everything was actually lined up correctly for once. I even attempted to add a sense of depth by using a fake blur effect behind the edit NAND popup. (In reality, there's just a screenshot of the main menu that I blurred in GIMP in the background.)

There are, of course, shortcomings with the interface. For one, I put a lot of work into an easter egg of sorts (more on that later), which led to the position of the blurred background image changing based on how much of the easter egg is showing, due to my poor cropping skills. There was also not proper text wrapping so if your path was too long it would just awkwardly get cut off by the buttons.

![An image of DNM's main menu.](https://cdn.ncxprogramming.com/file/blog/2022-09-06/dnm-main-menu-empty.png)

![An image of DNM's NAND editor.](https://cdn.ncxprogramming.com/file/blog/2022-09-06/dnm-edit-nand-blank.png)

## How It Worked

To use Dolphin NAND Manager, you'd input your ZIP's, as well as the absolute path to that ZIP, as shown below. This ZIP should contain the contents of the `Wii` folder in Dolphin's files, as that is a complete NAND. When you press load, the program checks to make sure that your ZIP exists, and if it does, will delete the `Wii` folder, recreate it, and then extract the contents of your NAND into it. Once that's done, you can launch it through Dolphin and it should all be working.

![An image of DNM's NAND editor.](https://cdn.ncxprogramming.com/file/blog/2022-09-06/dnm-edit-nand-filled.png)

![An image of DNM's main menu.](https://cdn.ncxprogramming.com/file/blog/2022-09-06/dnm-main-menu-filled.png)

![An image of DNM's confirm reset screen.](https://cdn.ncxprogramming.com/file/blog/2022-09-06/dnm-confirm-reset.png)

### Issues

Like everything I create, Dolphin NAND Manager had some issues. The first major issue is that it didn't use the Windows file selection system for choosing your ZIP. The only option was to enter the path manually, which left a lot of room for error (and in early versions would mean that a bad path would leave you with no NAND since it would erase the old one without checking your path). The other one is that it didn't confirm loading a NAND, only removing one from the list, meaning a misclick could lead to a loss of data.

### The Easter Egg

I'd like to quickly mention the easter egg that I spent so much time making. As you filled up slots, the image used behind the edit NAND popup would change. Filled slots would show other text as the file name and path, that when all shown, reads "Is this an Easter Egg? I'm not sure if this really counts". Note that this only really worked correctly if you went from top to bottom and never left a slot empty.

![An image of DNM's easter egg.](https://cdn.ncxprogramming.com/file/blog/2022-09-06/dnm-easter-egg-background.png)

![An image of DNM's easter egg.](https://cdn.ncxprogramming.com/file/blog/2022-09-06/dnm-easter-egg-zoomed.png)

## Why is it lost?

Dolphin NAND Manager is essentially lost because all of its source code was unintentionally deleted when I reformatted my laptop. I thought every project I had locally was also on GitHub, but I was mistaken. Because of this, it doesn't have a repository and no public releases were ever officially made. To my knowledge, only two builds still exist. One that is also effectively lost on Discord somewhere, and a build named v1.0 that I rediscovered in the encrypted "Project Deployment.zip.gpg" file on the CDN. I've decided to make this version public in case there's anyone out there who might find it useful. If you'd like to download it, it can be found [here](https://cdn.ncxprogramming.com/file/software/windows/Dolphin%20NAND%20Manager%20v1.0.zip).

Maybe someday I'll revisit this project, but for now, that is where the story of Dolphin NAND Manager ends. Until next time, NinjaCheetah.