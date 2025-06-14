# Start dev container (hot reload)
dev: ./api/.env
	docker compose -f ./docker-compose.yml up

# Delete containers
dev-delete-container:
	docker compose down --rmi all

# Delete containers and volumes
dev-delete-all:
	docker compose down -v --rmi all

# Start dev container with schemaspy
# dev-schemaspy: ./api/.env
# 	docker compose -f ./docker-compose-schemaspy.yml up -w

# # Delete containers
# dev-schemaspy-delete-container:
# 	docker compose -f ./docker-compose-schemaspy.yml down --rmi all

# # Delete containers and volumes
# dev-schemaspy-delete-all:
# 	docker compose -f ./docker-compose-schemaspy.yml down -v --rmi all
