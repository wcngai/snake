//node ('ubuntu-app-agent'){
node {      
    def app
    try {
      notifyBuild("STARTED") 
	    
    stage('Cloning Git') {
        /* Let's make sure we have the repository cloned to our workspace */
       checkout scm
        
       sh 'echo cloning git'
    }  
    stage('SAST-SNYK'){
        // build 'SECURITY-SAST-SNYK'
        snykSecurity(
          snykInstallation: 'SAST_SNYK',
          snykTokenId: 'SAST_SNYK_CREDENTIAL',
          failOnIssues: false,
          failOnError: false,
        )
        
        sh 'echo SAST SNYK'
    }
    stage('SAST-SONAR'){
        // build 'SECURITY-SAST-SONAR'        
        script{
            def scannerHome = tool 'SAST_SONAR';
            withSonarQubeEnv('sonarqube') {
                //sh "npm run sonar"
                sh "${tool("SAST_SONAR")}/bin/sonar-scanner \
                    -Dsonar.projectKey=4382a7d033e50c760d559c4d1b70c29c4fbd42b3 \
                    -Dsonar.projectName=node-multiplayer-snake"
            }
        }

        sh 'echo SAST SONAR'
    }     
    stage('Build-and-Tag') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */
        //app = docker.build("wcngai/snake")
        app = docker.build('wcngai/snake')
        
        sh 'echo build-and-tag'
    }
	
    stage('DAST-Trivy-Docker-Image-Scanning') {
	sh "trivy image wcngai/snake > scanning.txt"
	
        sh 'echo Docker-image-scanning'    
    } 
	
    stage('Post-to-dockerhub') {
        docker.withRegistry('https://registry.hub.docker.com', 'Jenkins_DevSecOps') {
            app.push("latest")
        }
        sh 'echo post-to-dockerhub'    
    } 
    stage('SECURITY-IMAGE-SCANNER'){
      //  build 'SECURITY-IMAGE-SCANNER-AQUAMICROSCANNER'
        sh 'echo SECURITY-IMAGE-SCANNER'    
    }
    stage('Pull-image-server') {
        sh "docker-compose down"
        sh "docker-compose up -d"
    
        sh 'echo Post-to-dockerhub'
    }
    stage('DAST')
    {
        //  build 'SECURITY-DAST-OWASP_ZAP'
        sh 'echo DAST'
    }
	   
    } catch (e) {
        currentBuild.result = "FAILED"
	throw e
    } finally {
	notifyBuild(currentBuild.result)
    }	
}

def notifyBuild(String buildStatus = 'STARTED') {
	buildStatus = buildStatus ?: 'SUCCESSFUL'
	
	def subject = "${buildStatus}: Job ${env.JOB_NAME} [${env.BUILD_NUMBER}]"
	
	def details = "Job execution status"
	
	emailext (
		subject: subject,
		body: details,
		mimeType: 'text/html',
		to: 'wcngai@gmail.com'
	)
		

	
	
}
