pipeline {
    // WHERE should this pipeline run?
    agent any
    
    // WHAT environment variables do we need?
    environment {
        // Docker image configuration
		DOCKER_HOST = 'tcp://host.docker.internal:2375'
        DOCKER_IMAGE = 'abhinavsachdeva/job-portal'
        DOCKER_TAG = "${BUILD_NUMBER}"
        DOCKER_LATEST = 'latest'
        
        // Azure configuration
        AZURE_RESOURCE_GROUP = 'job-portal-dev'
        AZURE_APP_NAME = 'job-portal-dev-app'
        AZURE_SUBSCRIPTION_ID = credentials('azure-subscription-id')
        
        // Build information
        BUILD_TIMESTAMP = sh(returnStdout: true, script: 'date +%Y%m%d-%H%M%S').trim()
    }
    
    // WHAT tools do we need?
    tools {
        dockerTool 'docker'
    }
    
    // WHAT stages should we execute?
    stages {
        // STAGE 1: Get code from GitHub
        stage('📥 Checkout Code') {
            steps {
                echo "🚀 Starting CI/CD pipeline for Job Portal"
                echo "📋 Build #${BUILD_NUMBER} at ${BUILD_TIMESTAMP}"
                
                // Clean workspace and get fresh code
                cleanWs()
                checkout scm
                
                // Show what we got
                sh 'echo "📂 Repository contents:"'
                sh 'ls -la'
                sh 'echo "🔍 Dockerfile check:"'
                sh 'head -5 Dockerfile'
            }
        }
        
        // STAGE 2: Build Docker image
        stage('🐳 Build Docker Image') {
            steps {
                script {
                    echo "🔨 Building Docker image: ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    
                    // Build with two tags: build number and latest
                    def customImage = docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                    customImage.tag("${DOCKER_LATEST}")
                    
                    echo "✅ Docker image built successfully!"
                    
                    // Show image details
                    sh "docker images | grep ${DOCKER_IMAGE}"
                }
            }
        }
        
        // STAGE 3: Test Application (Simple Success Test)
        stage('🧪 Test Application') {
            steps {
                script {
                    echo "🔍 Testing Docker container startup..."
                    
                    try {
                        // Start container
                        def testContainer = docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}")
                            .run("-d --name test-container-${BUILD_NUMBER} " +
                                 "-e NODE_ENV=test " +
                                 "-e JWT_SECRET=test-secret " +
                                 "-e ACCESS_TOKEN_EXPIRES_IN=86400 " +
                                 "-e BCRYPT_SALT_ROUNDS=10 " +
                                 "-e PORT=3000")
                        
                        // Wait and verify
                        sh '''
                            echo "⏱️ Waiting for application startup..."
                            sleep 25
                            
                            echo "🔍 Checking container health..."
                            
                            # Check if container is still running
                            if ! docker ps | grep test-container-${BUILD_NUMBER}; then
                                echo "❌ Container stopped running!"
                                docker logs test-container-${BUILD_NUMBER}
                                exit 1
                            fi
                            
                            # Check if app started successfully
                            if docker logs test-container-${BUILD_NUMBER} | grep "Server is running"; then
                                echo "✅ Application started successfully!"
                            else
                                echo "❌ Application failed to start!"
                                docker logs test-container-${BUILD_NUMBER}
                                exit 1
                            fi
                            
                            # Check if process is running
                            docker exec test-container-${BUILD_NUMBER} ps aux | grep node || {
                                echo "❌ Node process not found!"
                                exit 1
                            }
                            
                            echo "🎉 All tests passed! Container is healthy."
                        '''
                        
                    } finally {
                        sh """
                            docker stop test-container-${BUILD_NUMBER} || true
                            docker rm test-container-${BUILD_NUMBER} || true
                        """
                    }
                }
            }
        }
        
        // STAGE 4: Push to Docker Hub
        stage('📤 Push to Docker Hub') {
            steps {
                script {
                    echo "📤 Pushing image to Docker Hub..."
                    
                    // Login to Docker Hub and push both tags
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        def image = docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}")
                        image.push()
                        image.push("${DOCKER_LATEST}")
                        
                        echo "✅ Image pushed successfully!"
                        echo "🏷️ Tags: ${DOCKER_TAG}, ${DOCKER_LATEST}"
                    }
                }
            }
        }
        
        // STAGE 5: Deploy to Azure
        stage('🚀 Deploy to Azure') {
            when {
                branch 'main'  // Only deploy from main branch
            }
            steps {
                script {
                    echo "🚀 Deploying to Azure Web App..."
                    
                    try {
                        // Restart Azure Web App to pull new image
                        sh '''
                            echo "🔄 Restarting Azure Web App to pull latest image..."
                            curl -X POST \
                                -H "Authorization: Bearer ${AZURE_ACCESS_TOKEN}" \
                                -H "Content-Type: application/json" \
                                -w "HTTP Status: %{http_code}\\n" \
                                "https://management.azure.com/subscriptions/${AZURE_SUBSCRIPTION_ID}/resourceGroups/${AZURE_RESOURCE_GROUP}/providers/Microsoft.Web/sites/${AZURE_APP_NAME}/restart?api-version=2018-02-01"
                        '''
                        
                        echo "⏱️ Waiting for deployment to complete..."
                        sleep(time: 60, unit: 'SECONDS')
                        
                        // Verify deployment
                        sh '''
                            echo "✅ Verifying deployment..."
                            curl -f https://${AZURE_APP_NAME}.azurewebsites.net/ || {
                                echo "❌ Deployment verification failed!"
                                exit 1
                            }
                            echo "🎉 Deployment successful!"
                        '''
                        
                    } catch (Exception e) {
                        echo "⚠️ Azure deployment failed: ${e.getMessage()}"
                        echo "📝 Check Azure portal for details"
                        error("Deployment failed")
                    }
                }
            }
        }
    }
    
    // WHAT to do after pipeline completes?
    post {
        always {
            echo "🧹 Cleaning up workspace and temporary containers..."
            
            // Clean up any leftover containers
            sh '''
                docker ps -a | grep test-container || true
                docker rm -f $(docker ps -aq --filter "name=test-container") 2>/dev/null || true
            '''
            
            // Archive build artifacts
            archiveArtifacts artifacts: 'Dockerfile, package.json', allowEmptyArchive: true
            
            // Clean workspace
            cleanWs()
        }
        
        success {
            echo "🎉 SUCCESS: Pipeline completed successfully!"
            echo "✅ Build #${BUILD_NUMBER} deployed to production"
            echo "🌐 Live URL: https://${AZURE_APP_NAME}.azurewebsites.net/"
            
            // You could send success notifications here
            // emailext to: 'your-email@example.com', subject: 'Deployment Success', body: '...'
        }
        
        failure {
            echo "❌ FAILURE: Pipeline failed!"
            echo "🔍 Check the logs above for error details"
            echo "🛠️ Fix the issues and push again"
            
            // Clean up failed build images
            sh '''
                docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG} 2>/dev/null || true
            '''
            
            // You could send failure notifications here
        }
        
        unstable {
            echo "⚠️ UNSTABLE: Pipeline completed with warnings"
        }
    }
}