pipeline {
    agent any

    environment {
        IMAGE_NAME = "devops-node-app"
        CONTAINER_NAME = "node-app-container"
        APP_PORT = "3000"
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

                    // Free up port if container exists
                    sh """
                    if docker ps -q --filter "name=$CONTAINER_NAME" | grep -q .; then
                      docker rm -f $CONTAINER_NAME
                    fi

                    PORT_IN_USE=\$(lsof -t -i:$APP_PORT)
                    if [ ! -z "\$PORT_IN_USE" ]; then
                      echo "⚠️ Port $APP_PORT is in use by PID \$PORT_IN_USE, killing..."
                      sudo kill -9 \$PORT_IN_USE
                    fi
                    """

                    echo "📦 Running Docker container..."
                    sh "docker run -d --name $CONTAINER_NAME -p $APP_PORT:$APP_PORT $IMAGE_NAME"
                }
            }
        }

        stage('Run Test') {
            steps {
                script {
                    echo "🧪 Running health test..."
                    sh "curl -f http://localhost:$APP_PORT || (echo '❌ App is not responding!' && exit 1)"
                }
            }
        }
    }

    post {
        failure {
            echo "🚨 Deployment failed!"
        }
        success {
            echo "✅ Deployment succeeded! Visit http://<YOUR_PUBLIC_IP>:3000"
        }
    }
}

