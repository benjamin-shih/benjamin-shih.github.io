.PHONY: install dev preview build validate install-hooks clean

install:
	npm install

dev:
	npm run dev -- --host 127.0.0.1

preview:
	npm run preview -- --host 127.0.0.1

build:
	npm run build

validate:
	npm run validate

install-hooks:
	git config core.hooksPath .githooks

clean:
	rm -rf dist .astro
