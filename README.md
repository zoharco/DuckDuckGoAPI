## DuckDuckGo Search API.

### Introduction
This is a Search API for some of the instant answers by DuckDuckGo API (not full search result).
Developed By **Node.js**, **React.js**, **Redux**.


- Search for a term in the search field to get results, for each page the results amount are limited to 15. 
In addition, the searched term is saved to a list of the last searched terms, limited to 10 terms.
For each request from the server, we send the 'Term' with 'Limit' and 'Offset', to get results only for the current page.

- Click on one of the terms in the list will make a new API request to the server and will return results to the screen.

- After searching made for a term, the results are shown below a 'Find' field. By typing a term in the 'Find' field, 
the result list will paint the searched term with yellow (highlight mark) and will count the appearances.

- By clicking on a page number a new API request is sending.
- Click 'Save Quieries' to save the last queires to the server, It's will copy to json file and saved in the a local folder in the server,
next time the application runs, it will load the list of the last searched terms.

### Quick start
Clone this repo to your local machine 

```
git clone https://github.com/zoharco/DuckDuckGoAPI.git
```

Next first let's install all the dependencies for client and server, 
Open the terminal (Command Line), and navigate into the DuckDuckGo APP folder.
It's recommended to use 2 terminals, one for the client, and the other for the server.
```bash
# install client dependencies

cd client && npm i

# install server dependencies

cd server && npm i
```

Now after the instalaion let's run,

```bash
# run client

cd client && npm start

# run server 

cd server && npm start
```


