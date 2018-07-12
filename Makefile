
help:						## Show this help.
	@echo ''
	@echo 'Available commands:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo ''
.PHONY: help

gen-readme:			## Generate the README.md (using docker-verb)
	npm run docs
.PHONY: gen-readme

build:
	docker build -t sammlerio/scheduler-service .
.PHONY: build
