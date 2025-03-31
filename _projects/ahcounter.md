---
title: Ah Counter
layout: project
icon: AhCounter.png
short-desc: A customizable Discord bot for counting words (such as "Ah"!)
repo: https://github.com/NinjaCheetah/AhCounter
---

### About
Ah Counter is a Discord bot made to count words said in Discord servers. Originally made for the Nintendo 3DS Homebrew group [Universal-Team](https://universal-team.net)'s Discord server but was later open sourced and modified so that it could be configured and used by anyone.

By default, Ah Counter only watches for the word "Ah", but can somewhat easily be configured to count other words. Documentation on that can be found [here](https://github.com/NinjaCheetah/AhCounter/wiki/Configuring-the-Bot).

The original version of Ah Counter relied on a JSON file to save word counts and was designed to only work with one server and had to be configured with files. The bot was later reworked to use an SQLite database for the word counts and server settings. One table is made for the word counts and keeps a record of the count, word, regex and server ID for every entry, and another table is made for server settings that can be configured by bot managers (which are set in `config.json`) or server mods.

Another feature that was added later was the ability to create a list of banned words, so that people using your instance of the bot can't count those words in their server.
