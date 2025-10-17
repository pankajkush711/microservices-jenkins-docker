pipeline {
    agent any

    environment {
        // Jenkins Docker Hub credentials ID
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-login')
        // Docker Hub username
        DOCKERHUB_REPO = 'pankajkush711'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/pankajkush711/microservices-jenkins-docker.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    bat "docker build -t ${env.DOCKERHUB_REPO}/user-service ./user-service"
                    bat "docker build -t ${env.DOCKERHUB_REPO}/order-service ./order-service"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    // Docker login using credentials
                    bat "echo ${env.DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${env.DOCKERHUB_CREDENTIALS_USR} --password-stdin"
                    bat "docker push ${env.DOCKERHUB_REPO}/user-service"
                    bat "docker push ${env.DOCKERHUB_REPO}/order-service"
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                script {
                    // Stop & remove old containers (ignore errors if not exist)
                    bat 'docker stop user-service || exit 0'
                    bat 'docker rm user-service || exit 0'
                    bat 'docker stop order-service || exit 0'
                    bat 'docker rm order-service || exit 0'

                    // Run new containers
                    bat "docker run -d -p 5000:5000 --name user-service ${env.DOCKERHUB_REPO}/user-service"
                    bat "docker run -d -p 6000:6000 --name order-service ${env.DOCKERHUB_REPO}/order-service"
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
