.PHONY: install build publish

build: node_modules
	tsc

install: build node_modules
	npm install -g .

publish: build
	npx np

node_modules: package.json package-lock.json
	npm install
	touch node_modules