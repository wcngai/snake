const sonarqubeScanner = require('sonarqube-scanner');
     sonarqubeScanner({
       serverUrl: 'http://192.168.40.103:9000',
       options : {
       'sonar.sources': '.',
       //'sonar.inclusions' : '.' // Entry point of your code
       }
     }, () => {});
