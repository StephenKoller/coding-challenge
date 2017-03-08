# Grapeviin
#### Ambassador Coding Challenge

`"I heard it through the grapevine"`

-_Marvin Gaye_

## The Problem
Build a basic referral system: track the number of times a link has been clicked, and allow the administration of links with a data table, including a way to create new links, update link text, and delete links.

## The Solution
My solution focuses on the front-end.

#### Structure
I used the MVC pattern to set up `home` and `landing` pages - each with corresponding view and controller files. I set up services to store and retrieve the `links` data as well as options for sorting the data table on `home`.

The Angular community has moved to a more component-based architecture in the past few years, which comes with pros and cons. When working on small, simple apps I prefer to stick with using slim controllers, logic in the service layer, and using built-in directives for DOM manipulation, rather than writing a number of custom directives/components.

#### Challenges / Omissions
I initially opted for the more advanced [ui-router](https://ui-router.github.io/) package for routing, but had some trouble getting redirection to work properly. At that point, I reverted to the official [angular-route](https://www.npmjs.com/package/angular-route) package and was able to get a redirect from `/{linkName}` to `/landing/{linkName}` working.

Unfortunately, I was unable to implement a redirect to `/landing/?link={linkName}`, or to remove the Angular hashbang (`#!`) as part of the URL (and still have the redirect work).

If I were to spend more time on this, I would like to add form validation to prevent users from entering duplicate links or whitespace characters. I would also like to wire it up to a Node / Express API and a Postgres database to make it a full-stack project.

#### Tech Stack:
* Angular 1.6
* Angular Route
* Gulp for SCSS compilation & resource prep
* HTML5 localStorage for data persistence
* Firebase CLI for deployment

While the directions asked for a deployment on Heroku, I went with Firebase due to the static nature of my site (dynos and DBs are not needed to run Grapeviin).

### Application Link
[https://grapevi.in/](https://grapevi.in/)
