//https://docs.cypress.io/guides/continuous-integration/ci-provider-examples
pipeline {
  agent {
    // this image provides everything needed to run Cypress
    docker {
      image 'cypress/base:18.14.1'
    }
  }

  stages {
    stage('build and test') {
      environment {
        CYPRESS_RECORD_KEY = credentials('ec3ec633-8531-472e-a2f7-9efe8b941886')
      }

    stage('e2e Tests') {
       steps {
        sh 'npm ci'
        sh "npm run test:ci:record:chrome"
      }     
    }
    stage('Deploy') {
      steps {
        echo 'Deploying....'
        }
      }
    }
  }
}