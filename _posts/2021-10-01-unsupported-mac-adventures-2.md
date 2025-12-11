---
title: Unsupported Mac Adventures Part 2
titleshort: Mac Adventures 2
layout: blogpost
icon:
desc:
updated:
---

Wow! There's more.

### Part 2: My First Personal MacBook

The second old (but newer than the other!) Mac that I had was a 2012 Unibody MacBook Pro (Model identifier `MacBookPro9,2`) with 4GB RAM, a 500GB HDD, and a 2.5 GHz Dual-Core Intel Core i5 CPU. This MacBook Pro was the first MacBook that was actually mine as the 2010 White MacBook is still my parents'.

When I got this one, I already knew that I'd need [OpenCore Legacy Patcher](https://github.com/dortania/OpenCore-Legacy-Patcher) to patch it. The nice thing about this Mac is that it supports Apple's Metal API, meaning that it could do graphical acceleration in Big Sur wthout any patches (so I can use System Integrity Protection and Secure Boot Model!). Before patching though, I took the SSD out of my ThinkPad, which is a Samsung EVO 960, and put it in the Mac. I tried using it with the 5400RPM HDD that it came with in Catalina and it was too slow for me, especially coming from an SSD in my old Mac.

The initial patching went fine and I had Big Sur up and running without any issues. However, after updating from Big Sur 11.5.2 to Big Sur 11.6, I started to notice crashing. Apps and system processes would experience a memory leak of some kind, and then would crash itself and other programs until I either rebooted or a kernel panic occurred (I later discovered that the 11.6 update had no relevance). I tried debugging it by changing some OCLP settings and repatching, but it wouldn't help. My next idea was that maybe my backup, which came from my original patched Mojave install and had been updated through every version since, was causing problems because of all the potentially left over patches. Unfortunately a clean install of 11.6 didn't fix it.

After that I decided to wipe and do a fresh install of 11.5.2, because at this point I thought that the software update had caused my issues. Judging from the fact that the crashing still happened, it was safe to say that 11.6 wasn't the issue.

I then turned my attention to potential hardware problems. The first and easiest thing to try was putting the HDD back in and installing Big Sur to that, just in the off chance that something was wrong with my SSD (not that I though there was, since it was relatively new). No luck there. I then ran [memtest86](https://www.memtest86.com), a free bootable environment for testing RAM, and all 4 passes passed the tests. So for the time being, I just gave up and accepted that I'd have to deal with the crashing.

Luckily, someone in the OCLP discord server knew of the issue and said you could use the command `sudo purge` to purge the leaking memory, effectively fixing the issue for the time being (it would still come back eventually). Since I couldn't open apps while it was crashing, I enabled SSH and created a shortcut in the Shortcuts app on my iPhone to run `sudo purge` over SSH right from my home screen whenever I needed it, which worked pretty well. I later created an Automation quick action workflow on the Mac itself so that I could run my workflow just by pressing a key combination. This would let me stop a crash that had already quit all my apps but hadn't killed Finder yet (as I needed at least one app to be open to run the workflow).

So, what now? At this point this is what I was wondering because I just couldn't figure out what was wrong. That is until someone suggested to me that my RAM might be bad, as they had RAM that was bad but could pass memtest86. So, like with the SSD, I stole the 8GB of RAM from my ThinkPad and put it in my Mac.

And that brings us to now, where I'm writing this article on my seemingly no longer crashing Mac. Will this be the end? I hope so. If it's not, expect a part 3 ;)

Another fun fact: most of RNGTool's code was written on this 2012 MacBook Pro! (the entire Jekyll conversion for this site was done on here too!)