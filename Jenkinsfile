pipeline {
  agent any

  parameters {
    string(name: 'SPEC', defaultValue: 'cypress/e2e/', description: 'Enter the scripts path you want to execute')
    choice(name: 'BROWSER', choices: ['chrome', 'edge', 'firefox'], description: 'Choose the browser')
  }

  stages {
    stage('Deploying') {
      echo "Building application"
    }
    stage('Testing'){
      steps{
        sh 'npm i'
        sh 'npx cypress run --browser ${BROWSER} --spec ${SPEC}'
      }
    }
    stage('deploying'){
      echo "Deploy the app"
    }
  }
}
