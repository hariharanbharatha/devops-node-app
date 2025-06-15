pipeline {
    agent any

    environment {
        IMAGE_NAME = 'devops-node-app'
        CONTAINER_NAME = 'node-app-container'
        PORT = '3000'
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
                    // Stop and remove old container if it exists
                    sh "docker rm -f $CONTAINER_NAME || true"

                    // Run container
                    sh """
                    docker run -d --name $CONTAINER_NAME -p $PORT:$PORT $IMAGE_NAME
                    """
                }
            }
        }

        stage('Run Test') {
            steps {
                script {
                    echo '✅ Running test automation (placeholder)'
                    sh 'echo "Simulated Test Passed!"'
                }
            }
        }
    }
}

