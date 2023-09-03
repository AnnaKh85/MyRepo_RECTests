pipeline {
  agent any

  parameters {
    string(name: 'SPEC', defaultValue: 'cypress/e2e/', description: 'Enter the scripts path you want to execute')
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
          def nodeJSInstallation = tool name: 'NodeJS 14.x', type: 'Tool'
          def npm = "${nodeJSInstallation}/bin/npm"
          def cypress = "${nodeJSInstallation}/bin/npx cypress"

          sh "${npm} install"
          sh "${cypress} run --browser ${BROWSER} --spec ${SPEC}"
        }
      }
    }
    stage('deploying') {
      steps {
        echo "Deploy the app"
      }
    }
  }
}
