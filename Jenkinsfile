pipeline {
    agent any

    environment {
        // Use your Jenkins Docker Hub credentials ID
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-login')
        // Replace with your Docker Hub username
        DOCKERHUB_REPO = 'pankajkush711'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/pankajkush711/microservices-jenkins-docker.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    bat 'docker build -t %DOCKERHUB_REPO%/user-service ./user-service'
                    bat 'docker build -t %DOCKERHUB_REPO%/order-service ./order-service'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    bat "echo %DOCKERHUB_CREDENTIALS_PSW% | docker login -u %DOCKERHUB_CREDENTIALS_USR% --password-stdin"
                    bat 'docker push %DOCKERHUB_REPO%/user-service'
                    bat 'docker push %DOCKERHUB_REPO%/order-service'
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                script {
                    // Stop and remove old containers if already running
                    bat 'docker stop user-service || echo "No existing user-service container"'
                    bat 'docker rm user-service || echo "No existing user-service container"'
                    bat 'docker stop order-service || echo "No existing order-service container"'
                    bat 'docker rm order-service || echo "No existing order-service container"'

                    // Run new containers
                    bat 'docker run -d -p 5000:5000 --name user-service %DOCKERHUB_REPO%/user-service'
                    bat 'docker run -d -p 6000:6000 --name order-service %DOCKERHUB_REPO%/order-service'
                }
            }
        }

    }

    post {
        success {
            echo '🎉 Deployment Successful!'
        }
        failure {
            echo '❌ Pipeline Failed!'
        }
    }
}
