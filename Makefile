.PHONY: install build publish test

test: build
	npm run test

build: node_modules bin/main.js

bin/main.js: bin/main.ts
	tsc

install: build node_modules
	npm install -g .

publish: build
	npx np

node_modules: package.json package-lock.json
	npm install
	touch node_modules