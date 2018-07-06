pipeline {
  agent {
    docker {
      image 'node:8-alpine'
    }

  }
  stages {
    stage('run install') {
      steps {
        sh 'npm install'
      }
    }
    stage('run migration') {
      steps {
        sh 'node_modules/.bin/sequelize db:migrate'
      }
    }
    stage('run test') {
      steps {
        sh 'npm run test'
      }
    }
  }
  environment {
    npm_config_cache = 'npm-cache'
    HOME = '.'
  }
}