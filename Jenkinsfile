pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/hariharanbharatha/devops-node-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t devops-node-app .'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh 'docker rm -f devops-node-container || true'
                sh 'docker run -d -p 3000:3000 --name devops-node-container devops-node-app'
            }
        }
    }
}

