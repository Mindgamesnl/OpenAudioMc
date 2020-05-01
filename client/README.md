# Building the web client. building ONLY works on LINUX or MacOS!
The web client needs to be compiled. You can do this by running
 * npm install
 * npm run-script build
 
 The compiled web client will appear in the target folder.

# Pre compiled
For a pre-compiled recent version, check out the target directory.

# Building?.. wait wahat
Yes. You need to "compile" the web client via webpack.
This is to run babel and minimize everything which improves code quality, browser support and maintainability for the project.
A Windows build script may be added later, but i dont have a computer running windows.
