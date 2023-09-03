pipeline {
  agent any
  tools {
    nodejs 'nodejs'
  }

  parameters {
    choice(name: 'BROWSER', choices: ['chrome', 'edge', 'firefox'], description: 'Choose the browser')
  }

  stages {
    stage('Deploying') {
      steps {
        echo "Building application"
      }
    }
    stage('Testing') {
      steps {
        script {
          sh "${npm}/bin/npm install"
          sh "${cypress} run --browser ${BROWSER}"
        }
      }
    }
    stage('Deploy the app') {
      steps {
        echo "Deploy the app"
      }
    }
  }
}
