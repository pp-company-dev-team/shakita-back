network:
	docker network create shakita-network

postgres:
	docker pull postgres && docker run --name shakita --network=shakita-network -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -e POSTGRES_DB=shakita -p 5432:5432 -d postgres


