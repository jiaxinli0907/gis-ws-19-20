# gis-19-20
group project for geographic information system-WS2019

### Here are some commands I used to use. Not totally correct but you can have a try.

- procedures to use the project
### step 1: clone this project to your laptop (make sure you have install git on your laptop)
- change directory to where you want to put this project
example:  cd git 
- then clone the project
example: git clone https://github.com/jiaxinli0907/gis-ws-19-20
- Then fetch from the repository: git fetch —all
- git stauts
it should be:

On branch master
Your branch is up to date with 'origin/master'.
nothing to commit, working tree clean

### step 2: create you own branch
- git checkout -b <your branch name>
example: git checkout -b jiaxin
* use your own branch to store code and dont forget to push to master branch.
  
### push to master
1. change your branch to master
-example: git checkout master
2. check the changes: git status
3. add the changes: git add *
4. commit: git commit -m "your message"
5. push: git push origin master

* change back to your own branch: git checkout <your branch name>

### pull from repository: git pull

### push to your repository
1. check the changes: git status
2. add the changes: git add *
3. commit: git commit -m "your message"
4. push: git push origin <your branch name>
