//node ('ubuntu-app-agent'){
node {  
    // def app
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
        app = docker.build("wcngai/snake")
        
        sh 'echo build-and-tag'
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
}
