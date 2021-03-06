# Made with StyLivJek

## Install ruby

* Required version is `ruby 2.4.2p198`

## Install ruby dependencies

* `bundle install`
  * permission problems ? `bundle install --path ./vendor/bundle/`


## Install chrome necessary extensions

* Install chrome extension [link](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en)
* Activate the extension by clicking on the Livereload icon in the browser

## Run with the admin (for content editors)

* `bundle exec jekyll serve --watch`

## Run dev mode (developers)
* `bundle exec jekyll liveserve`
  * using vscode there is the task LiveServe

## Deploy with travis-ci

When merging on master branch it will deploy the resultant build.

## Deploy manually 

* `jekyll build`
* drop `./_site` where you need

## Adding data

### Events

The events are in the `/_posts/events/`

They are jekyll posts so you have to give them a name with this structure: `YEAR-MONTH-DAY-title.md`

Where `YEAR-MONTH-DAY` are the data of the starting day of the Event.
(The latest will be put in the homepage as the current/next event)

NB: The structure of the data bust be the same

### Homepage

* OUR PHILOSOPHY: `/_data/philosophies.json`
* THE HIKE: `/_data/hikes.json`

### Footer

* MAIN SPONSOR: `/_data/main_sponsors.json`
* GOT A QUESTIONS?: `/_data/organization_data.yml`
* USEFUL LINKS: `/_data/useful_links.json`

## Modify data

Use jekyll-admin to modify the data `http://localhost:4000/admin`

There is a section for everything:
* Events are `posts` so they are in the sections posts, from the list select the folder `events`
* The other data are in the `Data Files` collection with the name listed here above (Adding data)