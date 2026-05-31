---
title: ninjacheetah.dev Ultimate Extras™ for Power Users
titleshort: ninjacheetah.dev Ultimate Extras™ for Power Users
layout: blogpost
desc: In this case &quot;power users&quot; means you read my blog from a desktop and not your phone.
updated: 2026-05-31
favorite: false
---

I've been working on a handful of website additions, and I felt like I should note them down in a quick post.

First and foremost, some quick visual changes that make the site easier or nicer to use:
- The width of the entire site on desktop has been expanded! The site is intentionally narrow on desktop to make it easier to read my posts, since you can read faster if your eyes don't have to travel as far on each line, but I felt like it was maybe a little _too_ narrow.
- Tables are like, possible to read now. Only one page properly uses tables as of writing, that being the [FD MealPlanner API Notes]({{ site.baseurl }}/misc/fdmealplanner-api-notes), but now you can actually look at them and tell wtf is happening.
- The footer is a tad more separated and actually centered on mobile instead of only being centered on desktop.
- The weight of the links on the misc page now match the weight of the links on the links page, rather than being one size smaller.
- "Last Updated: Never" is no longer displayed for blog posts that have never been updated.
- The background color used for the dark theme has been made less vibrant, which makes the dark theme easier to look at. I wasn't even using the dark theme myself before because the old one was too much.

I've been meaning to do some of these for a while, I just finally got around to them today. Additionally, I'm introducing the ninjacheetah.dev Ultimate Extras™ for Power Users, which are just some minor additions that apply exclusively to browsers displaying my blog articles at a minimum of 1400 pixels across. Basically if you're on desktop you'll see them, and if you're on a smaller display or your phone then nothing will change.

These features include:
- A table of contents floating to the left of the article, which will appear for any article that I actually used headings in. You'll notice that this article doesn't have it because of a lack of headings, but you can see a good example of how it looks [in this article]({% post_url 2025-03-30-vex-robotics-gripes %}).
- A small "back to top" button now sits in the bottom right corner on all blog posts, because I've started writing longer posts and will continue to do this into the future.

These additions should hopefully be useful to at least some people, and should both help with the gigantic novel that is the upcoming "making of TigerDine" article. The minimum window width should also help to ensure that these never get in the way. If the width of your browser is getting too small, they'll both disappear so nothing clips out of view or overlaps.

## Update: May 31, 2026
So uh, the ToC I had implemented at the time I wrote this article kinda sucked.

I realized pretty quickly after shipping it that it was an unnecessary use of JavaScript that kinda just sucked in terms of actually using the site. So I decided it was probably for the best to rip out the existing table of contents.

Now obviously you're probably seeing the table of contents on the left right now and thinking "hey uh isn't it still here?", and you would be somewhat correct! After using my own site for a little I decided to look into alternatives for building a table of contents, because I figured that there *had* to be a way to have it built by Jekyll at compile time rather than needing to run JavaScript every time a blog post is loaded to create the ToC and add it to the page. And sure enough, there is! Someone named Vladimir Jimenez made a really easy to use Jekyll include that you can drop into your blog post template to generate the table of contents at build time. You can go check that project out [here](https://github.com/allejo/jekyll-toc)! I also adapted the JavaScript that hid the "contents" heading if there were no contents to instead be Liquid that only builds it in if there are headings in the post body. Functionally identical to before (minus the occasional split second of "contents" before the JS ran) but now with 100% less JS!

Anyways, short update done! I now return to the dungeon to continue the TigerDine article (which is now on draft 3!).
