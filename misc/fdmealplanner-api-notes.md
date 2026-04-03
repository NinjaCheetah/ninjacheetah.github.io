---
title: FD MealPlanner API Notes
desc: Notes I took on the FDMealPlanner API for RIT when I was figuring out how to add menu browsing to TigerDine.
layout: default
---

# FD MealPlanner API Notes
Notes here were gathered by going to the FD MealPlanner website and poking around while watching the network inspector to see what APIs it called out to and with what parameters. This page isn't designed to act as direct documentation, it's just meant to be a general overview of the API endpoints that I discovered and tinkered with. I mostly wrote these for myself, but hopefully they will still be helpful to others.

## Search API
Search URL that returns the list of locations at RIT on fdmealplanner: [(masked because long)](https://locations.fdmealplanner.com/api/v1/location-data-webapi/search-locationByAccount?AccountShortName=RIT&isActive=1&IsPlannerLocation=1&pageIndex=1&pageSize=0&isWeb=1&_=1762194905658)

Appears as though I'd want to fetch this endpoint and try to match dining locations I got from TigerCenter with locations listed in the search results, and then mark those as having a menu available from fdmealplanner. Will be somewhat annoying to try and match since these use somewhat different names with extra things added, so this might take some tinkering. I wish I had IDs to match.
### Search API URL Documentation

| Key               | Description                                                             | Value                                        |
| ----------------- | ----------------------------------------------------------------------- | -------------------------------------------- |
| AccountShortName  | The fdmealplanner account to get locations for                          | `RIT`                                        |
| isActive          | ?                                                                       | Presumably `1`, not required                 |
| IsPlannerLocation | If this location is on fdmealplanner? Seems not very useful             | Presumably `1`, not required                 |
| pageIndex         | Likely has to do with organizing displayed results                      | `1` works, returns an error if not filled in |
| pageSize          | Likely has to do with organizing displayed results                      | `1` works, returns an error if not filled in |
| isWeb             | Probably differentiating types of results but makes no difference here? | Presumably `1`, not required                 |
| _                 | Nonce to prevent caching                                                | Not required                                 |

Minimum viable URL from what I can tell (generic URL): [(masked because long)](https://locations.fdmealplanner.com/api/v1/location-data-webapi/search-locationByAccount?AccountShortName=RIT&pageIndex=1&pageSize=0)

## Meal Periods API
Meal periods API that returns the meal periods that a location is open for: [(masked because long)](https://apiservicelocatorstenantrit.fdmealplanner.com/api/v1/data-locator-webapi/20/mealPeriods?IsActive=1&LocationId=2&_=1762194905659)

This would let me fetch the meal periods that a location is open for in a day to either find the single period to pass along to the meals API or to present the user with options if there are multiple periods.
### Meal Periods API URL Documentation

| Key        | Description                                         | Value                                                         |
| ---------- | --------------------------------------------------- | ------------------------------------------------------------- |
| isActive   | ?                                                   | Presumably `1`, not required                                  |
| locationId | The ID of the location we want the meal periods for | Fill in from using the ID in the response from the search API |
| _          | Nonce to prevent caching                            | Not required                                                  |

Minimum viable URL from what I can tell (using Beanz here): [(masked because long)](https://apiservicelocatorstenantrit.fdmealplanner.com/api/v1/data-locator-webapi/20/mealPeriods?LocationId=2)

## Meals API
Example meals URL for Beanz from fdmealplanner: [(masked because REALLY long)](https://apiservicelocatorstenantrit.fdmealplanner.com/api/v1/data-locator-webapi/20/meals?menuId=0&accountId=2&locationId=2&mealPeriodId=8&tenantId=20&monthId=9&fromDate=2025%2F09%2F01&endDate=2025%2F09%2F30&timeOffset=300&_=1757473674300)

Once I have the information for what dining location I need, I can use some of the information returned by the search API to make a request to the actual meals API. There might be another step in between to get the valid opening periods, however, since they differ based on locations (and some locations actually have multiple opening periods to offer to the user). Lots of keys but most of them should be filled out pretty easily when actually used in context.
### Meals API URL Documentation

| Key          | Description                               | Value                                                                                                                                 |
| ------------ | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| menuId       | ?                                         | Seems to always be `0`                                                                                                                |
| accountId    | ?                                         | accountId and locationId seem to match, likely both referring to what location we're looking at. Provided by the search API response. |
| locationId   | ?                                         | ^                                                                                                                                     |
| mealPeriodId | The meal period we're looking at          | Likely an ID that maps to a period like "All Day", "Lunch", etc., values need to be mapped out.                                       |
| tenantId     | Possibly refers to RIT Dining as a whole? | Seems to always be `20`, provided by the search API response.                                                                         |
| monthId      | Month we're looking at                    | The current month, i.e. `9` for September                                                                                             |
| fromDate     | Starting date of data to return           | Set fromDate and endDate to the same value (formatted `YYYY/MM/DD`) to get data for just the current date                             |
| endDate      | Ending date of data to return             | ^                                                                                                                                     |
| timeOffset   | ?                                         | Seemingly not required                                                                                                                |
| _            | Nonce to prevent caching                  | Not required                                                                                                                          |

Minimum viable URL from what I can tell (Beanz for November 3rd): [(masked because long)](https://apiservicelocatorstenantrit.fdmealplanner.com/api/v1/data-locator-webapi/20/meals?menuId=0&accountId=2&locationId=2&mealPeriodId=8&tenantId=20&monthId=11&startDate=2025/11/03&endDate=2025/11/03)