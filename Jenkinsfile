def gitUrl = "http://192.168.126.25/git/scri/our-dev-group/chartEditor.git "
def branch = "master"
def credentialsId = "c078ac92-89dd-4842-8292-5e348e68db08"
def rootPath= "./xslab-editor"
def rootPath_api= "./xslab-xslab-rearend"
def appName = "xslab"
def appName_api = "xsCollect"
def bakPath = "/home/jenkins_bak"
def putPath = "/home/jenkins_put"
def publishPath= "/usr/local/nginx/html/iplatform/xslab"
def publishPath_api= "/etc/soft/xsCollect"
def robot = "360ac2ce-efe5-4478-8703-7cd3bd463044"

pipeline {
    agent any
    stages {
            stage('拉取代码') {
                steps {
                    git branch: "$branch", credentialsId: "$credentialsId", url: "$gitUrl"
                }
            }
            stage('项目编译') {
                steps {
                    script{
                        sh "cd ${rootPath} && npm install && npm run build"
                        sh "cd ${rootPath_api} && npm install"
                    }
                }
            }
            stage('项目部署') {
                steps {
                    script {
                         def remote = [:]
                         remote.name = 'remote'
                         remote.host ='192.168.126.25'
                         remote.user = 'root'
                         remote.password ='kjjsyf#0512'
                         remote.allowAnyHosts= true
                         stage ('备份') {
                            sshCommand remote: remote,command: "mkdir -p ${bakPath}/${appName}"
                            sshCommand remote: remote,command: "cp -r ${publishPath} ${bakPath}/${appName}/${BUILD_NUMBER}"
                            sshCommand remote: remote,command: "cp -r ${publishPath_api} ${bakPath}/${appName_api}/${BUILD_NUMBER}"
                         }
                         stage ('更新') {
                            sshCommand remote: remote,command: "mkdir -p ${putPath}/${appName}"
                            sshCommand remote: remote,command: "mkdir -p ${putPath}/${appName_api}"
                            sshPut remote: remote,from: "${rootPath}/build",into:"${putPath}/${appName}"
                            sshPut remote: remote,from: "${rootPath_api}",into:"${putPath}/${appName_api}"
                         }
                         stage ('启动') {
                            sshCommand remote: remote,command: "pm2 stop xsCollect"
                            sshCommand remote: remote,command: "rm -rf ${publishPath}"
                            sshCommand remote: remote,command: "rm -rf ${publishPath_api}"
                            sshCommand remote: remote,command: "mv ${putPath}/${appName}/build ${publishPath}"
                            sshCommand remote: remote,command: "mv ${putPath}/${appName_api} ${publishPath_api}"
                            sshCommand remote: remote,command: "pm2 start xsCollect"
                         }
                    }
                }
            }
    }
//     post {
//         success {
//             script {
//                     dingtalk(robot: robot,
//                                 type: 'ACTION_CARD',
//                                 at: [],
//                                 atAll: false,
//                                 title: "",
//                                 text: [
//                                 "<font color=#0089ff >${appName}项目部署</font>",
//                                 "",
//                                 "----",
//                                 "",
//                                 "* 任务：#${BUILD_NUMBER}",
//                                 "* 项目：${appName}",
//                                 "* 状态：<font color=#00EE00 >部署成功</font>",
//                                 "* 持续时间：${currentBuild.durationString}".split("and counting")[0],
//                                 "* 执行人：${currentBuild.buildCauses.shortDescription}",
//                                 ],
//                                 messageUrl: '',
//                                 picUrl: '',
//                                 singleTitle: '',
//                                 btns: [],
//                                 btnLayout: 'H',
//                                 hideAvatar: false
//                                 )
//             }
//         }
//         failure {
//             script {
//                     dingtalk(robot: robot,
//                                 type: 'ACTION_CARD',
//                                 at: [],
//                                 atAll: false,
//                                 title: "",
//                                 text: [
//                                 "<font color=#0089ff >${appName}项目部署</font>",
//                                 "",
//                                 "----",
//                                 "",
//                                 "* 任务：#${BUILD_NUMBER}",
//                                 "* 项目：${appName}",
//                                 "* 状态：<font color=#EE0000 >部署失败</font>",
//                                 "* 持续时间：${currentBuild.durationString}".split("and counting")[0],
//                                 "* 执行人：${currentBuild.buildCauses.shortDescription}",
//                                 ],
//                                 messageUrl: '',
//                                 picUrl: '',
//                                 singleTitle: '',
//                                 btnLayout: 'H',
//                                 hideAvatar: false
//                                 )
//             }
//         }
//     }
}
