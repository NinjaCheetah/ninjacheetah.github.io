---
title: fake-apt
layout: project
icon: placeholder.png
short-desc:  A clone of apt that pretends to do things.
repo: https://github.com/NinjaCheetah/fake-apt
releases:
  - name: All Platforms
    bin: fake-apt-ALL.zip 
  - name: Windows
    platform: windows
    bin: fake-apt-windows.zip
  - name: Linux
    platform: linux
    bin: fake-apt-linux.tar
  - name: macOS (x86_64)
    platform: macos
    bin: fake-apt-macOS.tar
platform: Windows, macOS, Linux (Officially) 3DS (Unofficially)
language: C#, C (Officially) C++ (Unofficially)
---

### About
fake-apt is my fake version of APT, the package manager used in Debian- and Ubuntu-based Linux distros.

fake-apt sets out to imitate most of APT's features, such as <code>install</code>, <code>update</code>, <code>remove</code>, etc. While it's meant to look like the program is doing something, it doesn't really do anything, and is just for looks.

### Platform Support
fake-apt is one of the only completely cross-platform apps that I've written. Windows support has taken considerably more work to maintain than macOS and Linux support, but as I'm creating this page all platforms are still supported.

### Making it Seem Real
Making fake-apt seem convincing was something I really wanted to achieve. In the original .NET version and early C versions, a fake prompt would be shown that would change based on your OS. In more recent versions, I made the executable take arguments directly, so you can use your real prompt and real password prompt to make it seem more real. On any non-Debian/non-Ubuntu systems (macOS included), you can rename the binary to <code>apt</code> and put it in <code>/usr/local/bin/</code> and run it exactly how you would run the real APT.

### Ports
In March 2021, GitHub user <a href="https://github.com/LinUwUxCat">LinUwUxCat</a> ported fake-apt to C++, and to the 3DS. The C++ version can be run the same way as the C version, and the 3DS version is compiled as a 3DSX file and can be run on a modded 3DS or in a 3DS emulator. You can find this port <a href="https://github.com/LinUwUxCat/fake-apt">here</a>. (Note that it is a little outdated now.)