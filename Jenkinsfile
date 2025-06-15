pipeline {
    agent any

    environment {
        IMAGE_NAME = 'devops-node-app'
        CONTAINER_NAME = 'node-app-container'
        APP_PORT = '3000'
    }

    stages {
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
                    echo "🚀 Stopping any existing container on port $APP_PORT..."

                    // ✅ Safe cleanup if port or container already in use
                    sh """
                        CONTAINER_ID=\$(docker ps -q --filter "name=$CONTAINER_NAME")
                        if [ ! -z "\$CONTAINER_ID" ]; then
                            echo "🧹 Removing existing container: \$CONTAINER_ID"
                            docker rm -f \$CONTAINER_ID
                        fi

                        PORT_IN_USE=\$(lsof -t -i:$APP_PORT || true)
                        if [ ! -z "\$PORT_IN_USE" ]; then
                            echo "⚠️ Port $APP_PORT in use by PID \$PORT_IN_USE, killing it..."
                            sudo kill -9 \$PORT_IN_USE
                        fi

                        echo "🚀 Starting new container on port $APP_PORT..."
                        docker run -d --name $CONTAINER_NAME -p $APP_PORT:$APP_PORT $IMAGE_NAME
                    """
                }
            }
        }

        stage('Run Test') {
            steps {
                echo "✅ You can add test steps here, like: npm test"
            }
        }
    }

    post {
        success {
            echo "✅ Deployment succeeded!"
        }
        failure {
            echo "🚨 Deployment failed!"
        }
    }
}

