pipeline {

    agent any

    tools {
        nodejs 'NodeJS-26'
    }

    parameters {

        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'all'],
            description: 'Browser for Playwright execution'
        )

        booleanParam(
            name: 'HEADLESS',
            defaultValue: true,
            description: 'Execute tests in headless mode'
        )

        choice(
            name: 'TEST_SUITE',
            choices: ['all', 'smoke', 'regression'],
            description: 'Test suite to execute'
        )
    }

    stages {

        stage('Environment') {
            steps {
                bat 'node --version'
                bat 'call npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'call npm ci'
            }
        }

        stage('Install Browsers') {
            steps {
                bat 'call npx playwright install'
            }
        }

        stage('Execute Tests') {
            steps {
                script {

                    def browserArg = ''
                    def suiteArg = ''

                    if (params.BROWSER != 'all') {
                        browserArg = "--project=${params.BROWSER}"
                    }

                    if (params.TEST_SUITE != 'all') {
                        suiteArg = "--grep=@${params.TEST_SUITE}"
                    }

                    withEnv([
                        "HEADLESS=${params.HEADLESS}"
                    ]) {
                        bat """
                            call npx playwright test ${browserArg} ${suiteArg}
                        """
                    }
                }
            }
        }
    }
}