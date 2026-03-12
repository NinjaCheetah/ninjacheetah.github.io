---
title: The Future of libWiiPy, WiiPy, and NUSGet
titleshort: The Future of libWiiPy, WiiPy, and NUSGet
layout: blogpost
desc: The winds are changing, and libWiiPy has an uncertain future ahead.
updated:
date: 2026-03-11 19:00:00 -04:00
series_prev: the-history-of-libwiipy
---

Okay first thing's first, NUSGet is **not** going anywhere right now. It's going to be impacted by the changes I'm here to discuss, but don't worry. I'm not going to toss the most successful project I have unless I have something equally as robust to replace it.

With that out of the way, I strongly suggest that you read the previous article I published, "The History of libWiiPy, WiiPy, and NUSGet", before reading this one. It provides a lot of the context behind libWiiPy and its related projects, and why I created them in the first place. Assuming you've done that, let's talk about the concerns that I have with these projects, and where I'm planning to go with them.

## The State of libWiiPy

libWiiPy is a mess inside.

This isn't me trying to be self-deprecating or anything, it's just a fact that a lot of the code that I wrote for libWiiPy is messy and not very good. There are a lot of questionable design choices, and it makes the library both hard to work with and hard to maintain. The biggest reason behind this is simple: I barely knew Python when I started libWiiPy. My largest Python experience prior to deciding to embark on a quest to make an entire Wii library was making [Ah Counter](https://github.com/NinjaCheetah/AhCounter), a Discord bot that counts words. That's not nothing, but it's also not super relevant when it comes to working with a lot of binary file formats. When I was starting out, I had no idea how to read a file into memory and then parse the data in that file into usable information to store in memory, and also put it all back into a file when I was done. I learned as I went, and it got me pretty far. I can't deny that libWiiPy as a whole is fairly competent all things considered, but again it's messy and clearly the product of someone who hadn't taken any computer science classes. Who needs encapsulation when you can just allow direct reads and writes to all your class' attributes!

Then I took Computer Science I this Fall.

This was a Python class, and while a large amount of what I was taught wasn't new to me because of what I needed to learn for libWiiPy, a good chunk of things were. Concepts like getters and setters, something that libWiiPy largely doesn't use. You want the Title ID? Just use `tmd.title_id`! You want to set the Title ID? Well you can use `set_title_id()`, or you could just do `tmd.title_id = something` instead. That's less than desirable, especially given how many things break when you don't guarantee that the lengths of the fields in a TMD or a Ticket are exact. It's a binary format of a specified length, you make one field a little shorter and you throw the entire thing off. Also, not everything in life is a `ValueError`, but in libWiiPy, and this isn't a joke, almost every single error thrown by any part of the library is. You can go [look at the search results yourself](https://github.com/search?q=repo%3ANinjaCheetah%2FlibWiiPy%20ValueError&type=code) and see just how many times it appears. `content.py` alone has 19 instances of it. 

When you load a title, the content records are duplicated between an instance of `TMD` and an instance of `ContentRegion`. This means that when you make changes to a title's content, it only effects the copy in the `ContentRegion`, and has to be synced back over the copy in the `TMD` or else the written data won't match what was used in memory. Having two copies of that data that you need to pass back and forth is really bad, and opens the door for lots of weird bugs where you think you made a change, but then it was overwritten or dropped.

Essentially, my point here is that libWiiPy needs to be rewritten. This is more than a refactor, large chunks of the core features like TMDs and Tickets need to be redone to work in a way that's logical and ensures that data is checked where necessary.

I could sit down, and rewrite libWiiPy in place and finally push a solid v1.0.0 release. But maybe there's a better choice.

## Rewrite in Rust?

They got me.

I think that fundamentally, libWiiPy being a Python library made sense. There are a lot of operations you'd want to do that probably make sense to just implement in a quick Python script. The problem is that's only a small chunk of the libWiiPy-dependent code I wrote. WiiPy and NUSGet, the two biggest libWiiPy based projects, both need to be native executables to be practical. Neither a desktop app nor a command line tool should be a compiled Python executable that has to self-extract every time you launch it. I also don't think that a command line tool should be upwards of 35MB. That seems excessive! But that's how big WiiPy on Linux is right now.

So I was faced with a choice. I could rewrite libWiiPy (and as a result, WiiPy, since I would be changing a lot about the API) in place, or I could rewrite them in a new language. I've wanted to learn Rust properly for a while, and this seemed like the right opportunity. And so I chose the latter option, and started my port of libWiiPy and WiiPy to Rust.

Although technically that isn't quite true. I actually started on a Rust port back in March 2025, but it stalled out when I got busy and distracted by other stuff. When I decided that libWiiPy was in desperate need of a rewrite, I picked that existing port back up, and continued on it from where it was, rewriting a lot of the base code that was already there to match my updated expectations.

## Enter rustwii

rustwii (formerly "rustii" until I learned that that name was already in use by an ASCII art library) is essentially just a port of both libWiiPy and WiiPy to Rust. Instead of being separated, the CLI and library both exist as targets in the same crate. This makes working on them much easier, and will also make distribution easier, as you can either get the loose binary or install the CLI through cargo. Fancy, I know!

My goal for rustwii has been to keep the API the same where that makes sense, and to completely change anything that needs it. That means that things like the basic types are the same as their Python counterparts, but everything is properly encapsulated now, so you need to use getter and setter methods to get and update the fields on those types. The TL;DR is that those familiar with Rust and libWiiPy should have little trouble working with it, as long as they take note of the differences. Proper documentation will be available when I'm ready to give rustii its first release, just like with libWiiPy.

### So this is still in its early stages, right?

Actually uh, no. At the time I'm finally getting around to writing this, I just reached feature parity between the rustwii CLI and WiiPy earlier today. Extensive testing will be needed to ensure that everything behaves correctly. In some cases this means behaving exactly the same as the matching command in WiiPy, but in other cases this means intentionally behaving differently. Since I had a blank canvas, I followed the same route as I did on the library side and made changes where I saw fit to make things function in what I consider a more logical way.

Essentially, it isn't release yet but you can go download the latest nightly build or build it yourself and it'll probably do anything that WiiPy did for you.

## What This Means for (lib)WiiPy

To put it simply, rustwii's release will deprecate both libWiiPy and WiiPy.

For WiiPy, this is easy to justify because everything you'd use WiiPy for you can just do with rustwii. It's less than 1/3 the size and is a truly native executable, and I can see a speedup even on my fastest machine. If I remember, I can try to publish some stats later on (but you can also compare them yourself, and depending on the command you can literally _see_ the difference).

For libWiiPy, though, this is going to be a bit rougher. Deprecating libWiiPy is going to cut off both NUSGet and the WiiLink GUI Patcher. So what's the solution there? Well, for now, my plan is to create a Python wrapper for rustwii. I'll wrap everything you could possibly need from it, and that will exist as a stopgap to allow anyone in need of a Python backend to have one. NUSGet will get switched over to this as soon as it's ready. My goal is to make it as seamless as possible, with the new Rust-backend NUSGet working exactly the same as the current version.

But what about long term?

Ideally, NUSGet will become a native Rust application too. I would like to learn egui, and I've seen a lot of really nice looking Rust desktop apps. Depending on how I do it, I might even be able to get a new desktop app looking mostly the same as the old one, which would be ideal. A desktop app that requires compiled Python was never long for this world, and being able to replace that with something smaller, quicker to build, and easier to ship would make me very happy.

I hope that you're excited to join me on this expedition into crustacean land so that we all have a much less cursed Wii library available to us. I know I'm certainly excited for it.

You can check out rustwii [here](https://github.com/NinjaCheetah/rustwii).
