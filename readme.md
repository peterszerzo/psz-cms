# peterszerzo.com

My current personal website - an evolving experiment with designs and technologies that tends to not sit still for more than 2 weeks (read its story [here](/docs/story.md)).

## Development environment

Clone the repository and provide a ``.env`` file at the root with the environment variables. These are currently the following:

	NODE_ENV=development
	PORT=3000
	DATABASE_URL=postgres://localhost/peterszerzo

Run ``npm install`` and ``npm install webpack -g``. This sets up all modules needed for the build.

Finally, run two terminal windows with the following scripts:

* ``webpack --watch``
* ``node app.js``

This will be a little more streamlined shortly.

## Docs

Are right here:
* [Testing](/docs/testing.md)