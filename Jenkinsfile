pipeline {
  agent any
  tools {
    // Define the Node.js tool with a specific label, e.g., 'nodejs'
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
          // Define npm and cypress based on the Node.js installation
          def npm = tool name: 'nodejs', type: 'NodeJSInstallation'
          def cypress = "${npm}/bin/npx cypress"

          // Run npm install and Cypress tests
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
