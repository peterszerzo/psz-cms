import fs from 'fs';

function readAndMatchEntries(options, next) {

	var { collectionName } = options;

	fs.readFile(`${__dirname}/../${collectionName}/index.json`, (err, data) => {

		if (err) { return next(err); }

		data = JSON.parse(data);

		var count = data.length,
			matchedCount = 0;

		function checkDone() {
			if ((matchedCount === count) && next) {
				console.log('finishing');
				return next(data);
			}
		}

		data.forEach((datum) => {
			
			fs.readFile(`${__dirname}/../md_content/${datum.id}.md`, 'utf-8', (err, body_text) => {

				matchedCount += 1;

				if (err) { 
					console.dir(err); return checkDone(); 
				}

				datum.body_text = body_text;
				return checkDone();
			});

		});

	});

};

export default function buildSeeds(options, next) {

	readAndMatchEntries(options, (data) => {

		fs.writeFile(`${__dirname}/../seeds/${options.collectionName}.json`, JSON.stringify(data), (err) => {

			console.log('done');
			next(err);

		});

	});

};