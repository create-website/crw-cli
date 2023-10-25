const chalk = require('chalk')
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs-extra')
const { checkCrwVersion, compareVersion } = require('../utils/checkVersion')
const packageJson = require('../package.json')
/**
 * 1. 检测crw版本是否是最新的
 * 2. 选择模版语言
 * 3. 判断是否存在该文件夹
 * 4. 拷贝模版到该文件夹中
 */

const createApp = async (projectName) => {
    const { language } = await inquirer.prompt({
        type: 'list',
        name: 'language',
        message: '请选择模版语言：',
        choices: ['JavaScript', 'TypeScript'],
        default: 'JavaScript',
    })

    // 当前根目录
    const rootPath = path.resolve()
    const projectPath = path.resolve(projectName)
    if (fs.pathExistsSync(projectPath)) {
        const { exist } = await inquirer.prompt({
            type: 'confirm',
            name: 'exist',
            message: `当前目录已存在${chalk.red(projectName)}文件夹, 是否重写?`,
            default: false,
        })
        if (!exist) return
        // 重写 => 删除目录
        fs.removeSync(projectPath)
    }
    fs.mkdirp(projectPath)

    console.log(language, projectName)
}

/**
 * 入口文件
 * @param projectName 项目名称
 * @returns {Promise<void>}
 */
module.exports = async (projectName) => {
    const latest = await checkCrwVersion()

    if (compareVersion(latest, packageJson.version)) {
        console.error(chalk.yellow(`You are running crw-cli ${packageJson.version}.\ncrw-cli latest release ${latest}.\nPlease update crw-cli version.`))
        return
    }

    await createApp(projectName)
}
