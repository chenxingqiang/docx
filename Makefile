.PHONY: install dev build test clean

install:
	npm install

dev:
	npm run dev

build:
	npm run build

test:
	npm run test

clean:
	rm -rf node_modules
	rm -rf client/node_modules
	rm -rf server/node_modules
	rm -rf shared/node_modules
