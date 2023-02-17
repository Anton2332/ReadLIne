## Get Started guide

> Here is detailed description what you should do before start coding on the project
### Hooks 

1. Make sure that you are located at the root folder of template.  
2. Run the command `configure:hooks` or `configure:hooks:windows`.  
3. You should receive a success message.
### Installation

1. Make sure that you are located at the root folder of template.  
2. You will be able to see in a terminal that dependencies are successfully installed. Also frontend and backend launched in parallel.
3. Now you are ready to work! 

## PR convention

1. For each task you should create separate branch.
2. Your branch should have the following naming `<environment>/<task-type>/<task-id>/<task-name>`

* `<environment>` - backend, contract, frontend
* `<task-type>` - feature, bugfix, improvement, library, prerelease,release, hotfix
* `<task-id>` - you can check it on a project board
* `<task-name>` - should be exact name of task from the project board

3. Commit messages should have the following format `<changes-type>: <Changes-description-start-from-capital-later>` . 

* `<changes-type>` - feat, bug, ref 
* `<Changes-description-start-from-capital-later>` - short description of a changes should start from CAPITAL later 

4. Try to group changes logically by commits. For example:

* `feat: Add Lib dependencies` - should have yarn lock and package.json changes.  
* `feat: Create service` - should have only changes related to new service implementation.  
* `feat: Styles for page` - should contain only style changes.  

## Code style

[**Backend**](packages/backend/README.md)

[**Frontend**](packages/frontend/README.md)

