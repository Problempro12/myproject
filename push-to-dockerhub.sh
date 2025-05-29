DOCKER_USERNAME="labearr"
PROJECT_NAME="myproject"

docker-compose build

docker tag myproject-backend $DOCKER_USERNAME/$PROJECT_NAME-backend:latest
docker tag myproject-frontend $DOCKER_USERNAME/$PROJECT_NAME-frontend:latest

docker login

docker push $DOCKER_USERNAME/$PROJECT_NAME-backend:latest
docker push $DOCKER_USERNAME/$PROJECT_NAME-frontend:latest

echo "Образы успешно загружены в док хаб" 