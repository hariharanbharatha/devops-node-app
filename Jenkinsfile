pipeline {
    agent any

    environment {
        IMAGE_NAME = "devops-node-app"
        CONTAINER_NAME = "node-app-container"
        APP_PORT = "3000"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "🛠️ Building Docker image..."
                    sh "docker build -t $IMAGE_NAME ."
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    echo "🚀 Stopping and removing any existing container named $CONTAINER_NAME..."

                    sh """
                        # Find if container (running or stopped) exists
                        CONTAINER_ID=\$(docker ps -aq --filter "name=$CONTAINER_NAME")
                        if [ ! -z "\$CONTAINER_ID" ]; then
                            echo "🧹 Removing existing container \$CONTAINER_ID"
                            docker rm -f \$CONTAINER_ID
                        fi

                        echo "🚀 Starting new container on port $APP_PORT..."
                        docker run -d --name $CONTAINER_NAME -p $APP_PORT:$APP_PORT $IMAGE_NAME
                    """
                }
            }
        }

        stage('Run Test') {
            steps {
                echo "✅ Tests would run here (add your test script if needed)"
            }
        }
    }

    post {
        failure {
            echo "🚨 Deployment failed!"
        }
        success {
            echo "✅ Deployment successful and app is running on port $APP_PORT!"
        }
    }
}

