pipeline {
    agent any

    parameters {
    choice(
        name: 'SUITE',
        choices: ['smoke', 'regression'],
        description: 'Select suite to execute'
    )
}
    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                bat "npx playwright test --grep @${params.SUITE}"
            }
        }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        }

    }
}