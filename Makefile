# Variables
DOCKER_USERNAME = nonzod
IMAGE_NAME = scmapping-nodejs
VERSION ?= 0.0.1

# Full image names with platform tags
AMD64_IMAGE = $(DOCKER_USERNAME)/$(IMAGE_NAME):$(VERSION)-amd64
ARM64_IMAGE = $(DOCKER_USERNAME)/$(IMAGE_NAME):$(VERSION)-arm64v8

# Default target
.DEFAULT_GOAL := help

.PHONY: help
help: ## Display this help message
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@awk '/^[a-zA-Z0-9_-]+:.*?## .*$$/ {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: buildx-init
buildx-init: ## Initialize buildx builder
	docker buildx create --name multiarch-builder --use || true

.PHONY: build-amd64
build-amd64: buildx-init ## Build for AMD64 (PC standard)
	docker buildx build --platform linux/amd64 -t $(AMD64_IMAGE) --load .

.PHONY: build-arm64
build-arm64: buildx-init ## Build for ARM64 (Raspberry Pi 4)
	docker buildx build --platform linux/arm64/v8 -t $(ARM64_IMAGE) --load .

.PHONY: push-amd64
push-amd64: ## Push AMD64 image
	docker push $(AMD64_IMAGE)

.PHONY: push-arm64
push-arm64: ## Push ARM64 image
	docker push $(ARM64_IMAGE)

.PHONY: build-all
build-all: build-amd64 build-arm64 ## Build both architectures

.PHONY: push-all
push-all: push-amd64 push-arm64 ## Push both architectures

.PHONY: clean
clean: ## Remove local Docker images and buildx builder
	docker rmi $(AMD64_IMAGE) $(ARM64_IMAGE) || true
	docker buildx rm multiarch-builder || true