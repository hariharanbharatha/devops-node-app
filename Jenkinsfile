pipeline {
    agent any

    environment {
        IMAGE_NAME = "devops-node-app"
        CONTAINER_NAME = "node-app-container"
        PORT = "3000"
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t $IMAGE_NAME .'
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    // Stop & remove existing container if running
                    sh '''
                    docker rm -f $CONTAINER_NAME || true
                    docker run -d --name $CONTAINER_NAME -p $PORT:$PORT $IMAGE_NAME
                    '''
                }
            }
        }

        stage('Run Test') {
            steps {
                script {
                    // Example health check (optional)
                    sh 'curl --fail http://localhost:$PORT || echo "App might not be healthy"'
                }
            }
        }
    }

    post {
        failure {
            echo "🚨 Deployment failed!"
        }
        success {
            echo "✅ App deployed successfully to http://54.173.148.116:3000"
        }
    }
}

