# XALA Web

This workspace contains frontend side of the application developed for website environment

## Requirements to run this project

---

- You need to add [**Prettier**](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) as an extension to your IDE
- You need to add [**ESLint**](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) as an extension to your IDE
- You need to have installed [**Yarn package manager**](https://classic.yarnpkg.com/en/docs/install/#windows-stable)

## CORS

---

Sometimes client's API doesn't trust localhost domain and queries are blocked by CORS  
In this case application should be run in the chrome browser with security control disabled

**Windows**  
`chrome.exe --args --disable-web-security --allow-file-access-from-files --user-data-dir="C:\my\data"`

**MAC**  
`open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security`

## API Integration

---

To work with different version of API you have to chose an **.env.** file from **/web** directory  
Then overwrite properties in **.env** file with properties from chosen file  
Do not remove extra properties from **.env** file that don't exist in the selected file

## Available Scripts

Before running any scripts make sure you are in the `..\vidneo-xala-app\packages\web` path.

In the project directory, you can run:

### `yarn start:<ENV>`

To start the application, type the `yarn start:<ENV>` command. The `ENV` property is the value based on which environment we want to start the. Environments will vary based on other API endpoints and configurations.

Available environments:

- `prod`
- `staging`

After the application has loaded correctly, you can go to the given address `http://localhost:3000/` in the browser.

The page will reload if you make edits.  
You will also see any lint errors in the console.

### `yarn build:<ENV>`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn test`

Launches the test runner in the interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Folder structure

---

- /public - public react files, fonts etc.
- /ci - CI files
- /src - frontend source of the application

## Deploy

You can find informations about manual deploy for frontend apps in [Xalott - manual deploy for frontend apps.pdf](./Xalott%20-%20manual%20deploy%20for%20frontend%20apps.pdf) file.
