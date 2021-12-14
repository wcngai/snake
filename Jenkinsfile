node ('ubuntu-app-agent'){  
    // def app
    stage('Cloning Git') {
        /* Let's make sure we have the repository cloned to our workspace */
       checkout scm
        
       sh 'echo cloning git'
    }  
    stage('SAST'){
        // build 'SECURITY-SAST-SNYK'
        
        failOnIssues(false)
        failOnError (false)
        
        snykSecurity(
          snykInstallation: 'SAST_SNYK',
          snykTokenId: 'SAST_SNYK_CREDENTIAL',
        )
        
        sh 'echo SAST'
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
