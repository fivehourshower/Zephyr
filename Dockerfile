FROM fedora/couchdb

# Install nvm
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.23.2/install.sh | bash
RUN source ~/.bashrc && nvm install iojs && nvm use iojs && npm i -g add-cors-to-couchdb

# Expose the ports that your app uses. For example:
EXPOSE 8080

CMD nohup couchdb /usr/bin/couchdb > /dev/null 2>&1& add-cors-to-couchdb && npm run start

RUN source ~/.bashrc && npm install