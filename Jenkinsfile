node ('master'){  
    // def app
    stage('Cloning Git') {
        /* Let's make sure we have the repository cloned to our workspace */
       checkout scm
    }  
    stage('SAST'){
        build 'SECURITY-SAST-SNYK'
    }
    stage('Build-and-Tag') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */
        //   app = docker.build("amrit96/snake")
        
        sh 'echo build-and-tag'
    }
    stage('Post-to-dockerhub') {
        /*
            docker.withRegistry('https://registry.hub.docker.com', 'training_creds') {
            app.push("latest")
        			} */
        sh 'echo post-to-dockerhub'    
    } 
    stage('SECURITY-IMAGE-SCANNER'){
      //  build 'SECURITY-IMAGE-SCANNER-AQUAMICROSCANNER'
        sh 'echo SECURITY-IMAGE-SCANNER'    
    }
    stage('Pull-image-server') {
    /*
         sh "docker-compose down"
         sh "docker-compose up -d"	*/
    
        sh 'echo Post-to-dockerhub'
    }
    stage('DAST')
    {
        //  build 'SECURITY-DAST-OWASP_ZAP'
        sh 'echo DAST'
    }
}
