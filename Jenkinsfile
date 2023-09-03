pipeline {
  agent {
    docker {
      image 'cypress/base:18.14.1'
    }
  }

  stages {
    stage('build and test') {
        steps {
          stage('e2e Tests') {
            steps {
              sh 'npm ci'
              sh "npm run test:ci:record:chrome"
            }
          }
        }
    }
    stage('Deploy') {
      steps {
        echo 'Deploying....'
      }
    }
  }
}
