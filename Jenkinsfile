pipeline {
    agent any

    environment {
        // Jenkins Docker Hub credentials ID (PAT)
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-login')
        // Docker Hub username / repository prefix
        DOCKERHUB_REPO = 'pankajkush711'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/pankajkush711/microservices-jenkins-docker.git'
            }
        }

        stage('Docker Login') {
            steps {
                script {
                    bat "echo ${env.DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${env.DOCKERHUB_CREDENTIALS_USR} --password-stdin"
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    bat "docker build -t ${env.DOCKERHUB_REPO}/user-service:latest ./user-service"
                    bat "docker build -t ${env.DOCKERHUB_REPO}/order-service:latest ./order-service"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    bat "docker push ${env.DOCKERHUB_REPO}/user-service:latest"
                    bat "docker push ${env.DOCKERHUB_REPO}/order-service:latest"
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                script {
                    // Stop & remove old containers
                    bat 'docker stop user-service || echo "No running user-service container"'
                    bat 'docker rm user-service || echo "No existing user-service container"'
                    bat 'docker stop order-service || echo "No running order-service container"'
                    bat 'docker rm order-service || echo "No existing order-service container"'

                    // Run new containers
                    bat "docker run -d -p 5000:5000 --name user-service ${env.DOCKERHUB_REPO}/user-service:latest"
                    bat "docker run -d -p 6000:6000 --name order-service ${env.DOCKERHUB_REPO}/order-service:latest"
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
