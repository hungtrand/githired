# githired
Git-Hired is a web application built on NodeJS, AngularJS, and mySQL to deliver responsive service to both employers and employees to create jobs, find jobs, and git hired!.

# Dependencies
## NodeJS - Linux Ubuntu or Debian
    curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
    sudo apt-get install -y nodejs
    sudo apt-get install -y build-essential

# Optional tool to access database
## mySQL Workbench
    sudo apt-get install mysql-workbench
    
# navigate to your local projects folder ex: "cd /opt/"
# clone repository
    git clone https://github.com/hungtrand/githired.git githired

# navigate to project folder
    cd githired
    
# Setup
    sudo npm install
    sudo npm update
    
# Run NodeJS web server (the first one is for development environment, to display bugs on the browser)
    sudo DEBUG=dev npm start        ### development
    sudo npm start                  ### production

# by default the server will run on your localhost location or 127.0.0.1 port 80
# if you have apache server on your computer, you can run on an alternate IP address with this command
    sudo IP=127.1.1.2 DEBUG=dev npm start
