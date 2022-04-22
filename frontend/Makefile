all: build

serve:
	npm install
	npm start

build:
	npm install
	yarn build
	yarn global add serve
	serve -s build

.PHONY: build serve
