pipeline {
  agent {
    docker {
      image 'node:8-alpine'
    }

  }
  stages {
    stage('run test') {
      steps {
        sh 'npm run test'
      }
    }
  }
}