---
title: The Future of libWiiPy, WiiPy, and NUSGet
titleshort: The Future of libWiiPy, WiiPy, and NUSGet
layout: blogpost
desc: The winds are changing, and libWiiPy has an uncertain future ahead.
updated: 2026-03-21
date: 2026-03-11 19:00:00 -04:00
series_prev: the-history-of-libwiipy
---

Hey there! I strongly suggest that you read the previous article I published, "The History of libWiiPy, WiiPy, and NUSGet", before reading this one. It provides a lot of the context behind why I started on libWiiPy and its related projects. Assuming you've done that, let's talk about the unfortunately growing list of concerns that I have with these projects, and where I'm planning to go with them.

**Also, a quick note:** if you read this article prior to March 21, 2026, you might want to read it again. The initial version of this article felt like a draft to me, and so I rewrote a huge amount of it and think that it's a much better piece now.

## The State of libWiiPy

libWiiPy is a mess inside.

This isn't me trying to be self-deprecating or anything, it's just a fact that a lot of the code that I wrote for libWiiPy is messy and largely not very good. There are a lot of questionable design choices, and it makes the library both hard to work with and difficult to maintain. The biggest reason behind this is simple: I barely knew Python when I started libWiiPy. My largest Python experience prior to deciding to embark on a quest to make an entire Wii library was making [Ah Counter](https://github.com/NinjaCheetah/AhCounter), a Discord bot that counts words. That's not nothing, but it's also not super relevant when it comes to working with a lot of binary file formats, and it had been a couple of years so the knowledge I did have had mostly left me. When I was starting out I had no idea how to do something like read a file into memory, parse it into fields that could be modified, and then put it all back together when I was done. I learned as I went, and I can't deny that in the end I was able to create a fairly competent library. But again, it's messy and clearly the product of someone who had a good idea but started on it without having the fundamentals down. Like hey, who needs encapsulation when you can just allow direct reads and writes to all your class' attributes!

Then I took my first real computer science class this Fall.

This was a Python class, and while a large amount of what I was taught wasn't new to me because of what I did successfully learn from working on libWiiPy, there were a number of concepts that _were_ new. Primarily those related to encapsulation, like always using getters and setters. This is something that libWiiPy largely doesn't use. You want the Title ID? Just use `tmd.title_id`! You want to set the Title ID? Well you're _supposed_ to use `set_title_id()`, but you could just do `tmd.title_id = something` instead and bypass any checks. That's less than desirable, especially given how many things break when you don't guarantee that the lengths of the fields in a TMD or a Ticket are exact, or that the data written to them is valid. It's a binary format of a specified length, you make one field a little shorter and you throw the entire thing off. Not to mention that the Wii's software is incredibly touchy, so if things aren't perfect it's probably just going to crash. 

There are a number of fairly major issues that I've identified in libWiiPy, and I'd like to go over them here just to try and set the scene for why I think some major work needs to be done. In no particular order:
- As previously mentioned, there is little to no encapsulation. I know that technically everything in Python is always public no matter what, but no fields are marked as private to at least hint that you're not supposed to touch them. Fields where the data needs to be interpreted first have getters, and fields were the data needs to be put into a specific format have settings, but beyond that you're expected to access the fields of every class directly. This means essentially no input validation, which is scary.

- Not everything in life is a `ValueError`, but in libWiiPy, and this isn't a joke, almost every single error thrown by any part of the library is. You can go [look at the search results yourself](https://github.com/search?q=repo%3ANinjaCheetah%2FlibWiiPy%20ValueError&type=code) and see just how many times it appears. `content.py` alone has 19 instances of it. This makes it really frustrating to handle errors in a program written on top of it.

- When you load a title, the content records are duplicated from where they are loaded in an instance of `TMD` into an instance of `ContentRegion`. This means that when you make changes to a title's content, the appropriate edits to the records are made only to the copy in the `ContentRegion`, requiring you to sync them back over to the `TMD` later or else the data written won't match what you changed in memory. Having two copies of that data that you need to pass back and forth is really bad, and opens the door for lots of weird bugs where you think something was updated correctly, but then it's later overwritten or dropped.

- The typing of the same data found in multiple places in inconsistent. The primary example of this is the Title ID, which is stored as a string in `TMD` but as bytes in `Ticket`, which is really confusing if you're not aware of that, because you'd expect to see the same type for the same data in both files.

- The LZ77 compression function is genuinely unusable. The algorithm works fine, but having it implemented in pure Python means it's too slow to actually be used to compress anything meaningful, which unfortunately makes it not very useful for compressing the assets that Nintendo generally ships compressed.

- And lots more smaller things, like the overall amount of code duplication and really inconsistent formatting of code between files that just make working on the library a pain.

My point here is that libWiiPy needs a lot of changes, to the point where it really needs some major rewrites rather than just refactors. This is more than just optimizing a module here and there. Large chunks of the core features like TMDs and Tickets need to be redesigned to work in a way that's logical and ensures that data is validated where necessary.

I could absolutely sit down and rewrite libWiiPy in place and finally push a solid v1.0.0 release. But then I would have to keep working in Python, which I really haven't been keen on recently. So what if there was a better way forward?

## Rewrite in Rust

I think they finally got me.

I believe that fundamentally, libWiiPy being a Python library at the start made sense. There are a lot of file operations you'd want to do that probably make the most sense to implement as a quick Python script. The problem is that quick scripts make up only a small chunk of the libWiiPy-dependent code I've written. WiiPy and NUSGet, the two biggest libWiiPy based projects, are both designed to function the way that you would expect a native executable to function. Neither a desktop app nor a command line tool should be a compiled Python executable that has to self-extract every time you launch it. I also don't think that a command line tool should be upwards of 35MB. That seems excessive! But unfortunately, that's how big WiiPy on Linux is right now.

So I here I am, faced with a choice. I could rewrite libWiiPy (and as a result, WiiPy, since I would be changing a lot about the API) in place, or I could start fresh and rewrite them in a new language. I've wanted to learn Rust properly for a while, and this seemed like the perfect opportunity to do so. And so I chose the latter option, and started on my port of libWiiPy and WiiPy to Rust.

## Enter rustwii

rustwii (formerly "rustii" until I learned that that name was already in use by an ASCII art library) is essentially a direct port of both libWiiPy and WiiPy to Rust. Instead of being separate projects, the CLI and library both exist as targets in the same crate. This makes working on them much easier, and will also make distribution easier, as you can either get the loose binary or install the CLI through cargo. Fancy, I know!

As for its creation, technically I was skewing the timeline in the last section a little bit. I actually started on a Rust port way back in March 2025, but it stalled out when I got busy and distracted by other stuff and so it had been left in a somewhat functional but entirely abandoned state for many months. I decided that rather than start from scratch again, I'd pick up from the same codebase and save myself some time. It took some effort, but before working on anything new I went back and redesigned the API to function like ones I had seen in class. My structs' fields were private, getters and setters were provided, and all was well. My design goals for rustwii were to keep things similar to libWiiPy where possible, but also to be willing to tear everything out and start from scratch where necessary. For example, the general idea of how the `TMD` struct is stored in memory and the methods it offers are the same, but then the way that a U8 archive is handled is entirely different. Overall I wanted to focus more on creating a library that seemed like it would make sense to use above making one that was similar to libWiiPy. The TL;DR of all that is that anyone who has any familiarity with the libWiiPy API should have a decent time adjusting. Docs will of course also be published when I have things ready and publish the first release of the library, just like I've had with libWiiPy.

### So how far along is this?

Actually uh quite far. At the time I'm finally getting around to writing this, I just reached feature parity between the rustwii CLI and WiiPy earlier today. Extensive testing will be needed to ensure that everything behaves the same way in rustwii that it did in WiiPy, but my quick side by side comparisons have shown that everything seems to be good. Not everything is one-to-one though, and that's by design. Since I had a blank canvas, I followed the same route as I did on the library side and made changes where I saw fit to make things function in what I consider a more logical way. This mostly means changing parameters, but it did also mean changing some default behaviors here or there.

Essentially, it isn't quite ready for a release yet, but you can go download the latest nightly build (or build it yourself if that's what you prefer) and it _should_ be able to do anything that WiiPy could for you. And if it doesn't, please do let me know!

## What This Means for (lib)WiiPy

And now for the part that most people probably came here for. To put it simply, rustwii's release will deprecate both libWiiPy and WiiPy.

For WiiPy, this is really easy to justify because everything you'd use WiiPy for you can just do with rustwii. It's less than 1/3 the size, is a truly native executable, and I can see a speedup even on my fastest machine (and commands like `lz77 compress` are actually fast enough to be used at all with a Rust backend). If I remember, I can try to publish some stats later on, but if you just run one after the other I promise you that you'll be able to see the difference.

For libWiiPy, though, the deprecation process won't be quite as smooth. Deprecating libWiiPy is going to cut off both NUSGet and the WiiLink GUI Patcher, and that's going to be rough. I don't want to leave both WiiLink and myself with orphaned applications, so my current plan is to create a Python wrapper for rustwii that can be used in lieu of rewriting those apps in Rust. It will of course be inheriting the improved API from rustwii, so it should be nicer to interface with than libWiiPy and will hopefully be a fairly straightforward transition.

But what about long term?

Ideally, NUSGet will become a native Rust application too. I'm looking into learning [egui](https://github.com/emilk/egui), or maybe even [iced](https://github.com/iced-rs/iced) because I've seen some really nice looking apps made with that. Depending on how I do it, I might even be able to get a new desktop app looking mostly the same as the old one, which would be ideal. A desktop app that requires compiled Python was never long for this world, and being able to replace that with something smaller, quicker to build, and easier to ship would make me very happy.

I hope that you're excited to join me on this expedition into the land of crustaceans so that I can offer a much more polished Wii library for all of your Wii library needs. I know that I'm certainly excited for it!

You can check out rustwii [here](https://github.com/NinjaCheetah/rustwii).
