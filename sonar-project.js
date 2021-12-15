const sonarqubeScanner = require('sonarqube-scanner');
     sonarqubeScanner({
       serverUrl: 'http://192.168.40.103:9000',
       options : {
       'sonar.sources': '.',
       'sonar.login':'admin',
       'sonar.password':'Admin,1',
  
       //'sonar.inclusions' : '.' // Entry point of your code
       }
     }, () => {});
