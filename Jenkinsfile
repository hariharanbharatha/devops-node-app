pipeline {
    agent any

    environment {
        IMAGE_NAME = "devops-node-app"
        CONTAINER_NAME = "devops-node-container"
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t $IMAGE_NAME ."
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    // Stop and remove old container if running
                    sh """
                    if [ \$(docker ps -q -f name=$CONTAINER_NAME) ]; then
                        docker stop $CONTAINER_NAME
                        docker rm $CONTAINER_NAME
                    fi
                    docker run -d -p 3000:3000 --name $CONTAINER_NAME $IMAGE_NAME
                    """
                }
            }
        }
    }
}

