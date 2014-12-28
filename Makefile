test:
	@NODE_ENV=testing ./node_modules/.bin/mocha tests

.PHONY: test