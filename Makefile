.PHONY: install build

build: node_modules
	tsc

install: build node_modules
	npm install -g .

node_modules: package.json package-lock.json
	npm install
	touch node_modules