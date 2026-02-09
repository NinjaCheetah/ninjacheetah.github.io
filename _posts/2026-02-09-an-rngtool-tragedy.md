---
title: An RNGTool Tragedy (Oops, your App Store app, it's deleted!)
titleshort: An RNGTool Tragedy (Oops, your App Store app, it's deleted!)
layout: blogpost
desc: RNGTool suddenly vanished off of the App Store a couple months ago. What happened to it?
updated:
---

If you're an avid reader of my fantastic blog, then you're surely familiar with RNGTool. It was my first real Apple app, and after only being available on macOS and via sideloading on iOS, I was given the opportunity to publish it on the App Store thanks to the generosity of [ny](https://github.com/nythepegasus), one of the lead developers of [SideStore](https://sidestore.io). She allowed me to publish the app on SideStore Apple development team. I of course shared the app with all my friends and family, and ended up with an okay number of downloads.

When I got to RIT this Fall, I continued to promote it as a small brag like "hey I've got an app an on the App Store", and shared it with a few of my friends. Then, one night, it was announced in the SideStore Discord server that StosVPN, the VPN used to create a loopback connection to your own device to allow SideStore to work its magic, had been taken down from the App Store.

Since I was a member of the team, I logged into App Store Connect to see what was up, and there I was greeted with something quite alarming: the team name was now displayed as "SideStore, LLC - CLOSED 11-04-2025-135350". Apple had terminated the entire team.

I went and talked to ny, and she was equally in the dark about what was actually wrong. The termination notice that Apple had sent basically just said "you violated the part of the terms where you agreed to not use our services wrong", which isn't super helpful. There was no actual insight into what the issue was, who might've caused it, or what should be changed. No warning, just an instant termination.

Obviously this problem didn't only affect me, and so I don't want to make it sound like the termination of the SideStore team is all about me losing out on my one silly app being on the App Store, but it was still quite frustrating. I reached out to ny about the situation, and she was of course very apologetic about the whole thing, and I absolutely don't want to imply that I have any ill will towards ny at all, she tried her hardest to get things sorted out and was of course incredibly generous in letting me publish the app in the first place. Any frustration I have is directly at Apple exclusively for causing this whole mess.

## That sucks, but can't you just republish it on your personal account?

If only it were that easy.

By the time all of this happened, I did already have my own personal Apple Developer Program membership, because I needed to be able to share [TigerDine](https://github.com/NinjaCheetah/TigerDine) with other students. I assumed I'd be able to just transfer the app over from the SideStore team to my team and then I could continue publishing it from there.

Well, you see, there's a catch. When a team gets terminated, the apps get delisted from the App Store, but they don't get erased from App Store Connect. RNGTool and its bundle ID `com.ncxprogramming.RNGTool` were still stuck to the SideStore development team. If the team was still active, transferring this information over to my account would've been easy. Apple allows moving apps to a new developer's account, and all the information is preserved. You just need an admin from the source account to approve it.

See the issue there?

With the team terminated, nobody could actually access the options needed to transfer the app out, so it was stuck. Even then, I figured it wasn't a huge deal and I'd just have to deal with re-registering the app on my account and publishing it there from scratch. Sure, I'd lose the ratings and reviews, and people would have to explicitly download it again, but it wouldn't be too big of a deal.

But that's where I was wrong _again_. Obviously I knew that I wasn't going to be able to register the same bundle ID that I knew was being held hostage, but I assumed that I would at least be able to re-use the name. But nope. Because the app was still technically registered with App Store Connect, I couldn't register a new app with the same name. I understand this is probably a fraud-prevention system, you can't steal an app name from someone if the app gets delisted and put something malicious there in its place, but like cmon, RNGTool had under 100 downloads. The only way you can claim a name from an existing app is if you own the legal trademark and present documentation of that to Apple, and unfortunately I don't exactly own the trademark for "RNGTool" (because what).

So that left me with one annoyingly time-consuming option.

## The Great Rebrand

If I wanted to publish the app again, it would need a new name.

Which sucks, because I'm actually quite attached to the name RNGTool. It's really not that creative, not in the slightest, but I've used it for _years_ now and so I'm pretty fond of it.

But oh well, if I ever wanted anyone to be able to use RNGTool again, I'd have to part ways with the branding. I asked my friends for some inspiration, and we landed at "RNGadget". It's not perfect, but it's about as similar as I think I can get, and it keeps the basic format of the name alive. It's good enough for me.

Frustratingly, there's more to changing the app name than just changing one value. I had to go through all the various Xcode targets for each platform and replace every single instance of "RNGTool" with "RNGadget" so that the source code was freed of the old name and nothing had any chance of acting weird. (whaaaaaaaat Xcode acting weird? never!) Then from there, I registered a new bundle ID on my developer account (`dev.ninjacheetah.RNGadget`), created the app entry in App Store Connect, and shipped an iOS build off to publish through TestFlight. If you want to get back to generating random numbers, you can join said TestFlight right [here](https://testflight.apple.com/join/M3gfdQ6j).

## And For the Future

In regards to publishing to the App Store again, I've got a little ways to go. Due to the way RNGTool's navigation was layed out, _every single App Store screenshot_ contains the word "RNGTool" in the corner. Is this likely to matter? Probably not, but I'm also really not looking to take any chances here. I'd rather wait longer and put in the time to redo literally every App Store screenshot for every platform than put it out as is and risk angering Apple again for no reason. I don't want to put RNGTool on the line again, and I especially don't want to put my entire developer account on the line. Am I a little paranoid here? Maybe, but I've got a lot of cool stuff in progress, and I'd rather be safe than sorry. (Also as a side note, I likely would've wanted to redo the screenshots anyway since they're from iOS 18 and not representative of what the app looks like on iOS 26. Though if I wasn't worried about the name, I'd probably publish to the App Store as-is and _then_ go back and update them for a future release.)

As far as future development goes, I'm really uncertain. Having my app ripped from my hands, pulled from the store, and even flagged as malware on macOS was really demotivating. Go figure.

<img src="/assets/blog-imgs/an-rngtool-tragedy/RNGTool-isnt-malware-but-okay.png" style="width: 50%" />
<em>Yes, this is actually what you're presented with if you try and launch a notarized non-App Store version of RNGTool for macOS. Revoked developer certificate = malware, I guess.</em>

I had some stuff in the piepeline, but I'm uncertain if it will end up seeing the light of day now. Unfortunate circumstances aside, I have a lot of other projects I want to work on right now between TigerDine, NUSGet, and some long-overdue improvements to both libWiiPy and hopefully rustii, and so when I want to work on a project those all get my attention first (that's also why it took so long to actually do the rebranding and write this post-mortem on RNGTool). But hey, if you know how to enable developer mode, you can screw with all of my yet-unfinished features. This will be true for the released App Store build as well! You just need to know the [right place to look](https://github.com/NinjaCheetah/RNGadget/blob/c99537f5118a6c7b98a10ec3a3934863bb9b41ba/Global/Settings/AdvancedSettings.swift#L24) :3
