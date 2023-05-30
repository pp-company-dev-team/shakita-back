network:
	docker network create shakita-network

upx:
	docker-compose up $(NAME)

upl:
	docker compose up $(NAME)

build-dev:
	cd $(NAME) && docker build -t pp-$(NAME) -f Dockerfile.dev . 
