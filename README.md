# Xeneta Coding Challenge

## Description

This project was built for a coding challenge. The client is a CRA React application. The proxy was built using Node js and Express. This project uses Sass modules for the styling.

**Note** Please see this [file](https://github.com/Safro94/xeneta-challenge/blob/master/Notes.md) before using the app.

## Folder structure

    root
      ├── client
      │   ├── proxy
      │   │   └── src
      │   │       └── index.js
      │   ├── public
      │   └── src
      │       ├── mocks
      │       ├── assets
      │       ├── components
      │       ├── constants
      │       ├── containers
      │       ├── hooks
      │       ├── pages
      │       ├── styles
      │       ├── utils
      │       └── index.js
      │
      └── README.md

## Stack

### Proxy

    - Node JS
    - Express

### Frontend

    - React + hooks
    - Context API
    - Sass Modules
    - Jest + React testing library

## How to start

### Clone

You can clone the repo using this url: https://github.com/Safro94/xeneta-challenge

```
git clone https://github.com/Safro94/xeneta-challenge.git
```

### Install dependencies

Make sure you are using the correct Node version(v12). If using NVM, just type

```
nvm use
```

Go to the client folder

```
cd xeneta-challenge
```

Run

```
npm install
```

Go to the proxy folder

```
cd xeneta-challenge/proxy
```

Run

```
npm install
```

Add .env file with this keys

```
API_URL=https://685rp9jkj1.execute-api.eu-west-1.amazonaws.com/prod
API_KEY=the_api_key_you_sent_by_email
PORT=9000
```

To run both projects at the same time, go to the proxy folder and run

```
npm run dev
```

the proxy should be running on http://localhost:9000 and the client http://localhost:3000

## Test

The frontend uses Jest + React testing library. You can run this command on each project

```
npm test
```

to run the tests.

## Task 2

See this [file](https://github.com/Safro94/xeneta-challenge/blob/master/Task2.md) for the explanation.
