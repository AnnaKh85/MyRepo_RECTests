//https://docs.cypress.io/guides/continuous-integration/ci-provider-examples
pipeline {
  agent any
  tools {nodejs "node"}

  environment {
    CHROME_BIN = '/bin/google-chrome'
    CYPRESS_RECORD_KEY = credentials('ec3ec633-8531-472e-a2f7-9efe8b941886')
  }

  stages {
    stage('Dependencies') {
      steps {
        sh 'npm i'
      }
    }

    stage('e2e Tests') {
       steps {
        sh 'npm ci'
        sh "npm run cy:run:qa:run"
      }     
    }
    stage('Deploy') {
      steps {
        echo 'Deploying....'
        }
    }
  }
}