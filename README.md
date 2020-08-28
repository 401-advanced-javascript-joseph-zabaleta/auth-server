# Authentication Server / Module

## Table of Contents
- [Authentication Server / Module](#authentication-server-/-module)
    - [Overview](#overview)
    - [Development Process](#development-process)
        - [Phase 1: Basic Authentication](#phase-1-basic-authentication)
        - [Phase 2: OAuth](#phase-2-OAuth)
        - [Phase 3: Bearer Authentication](#phase-3-bearer-authentication)
        - [Phase 4: Authorization](#phase-4-authorization)
    - [Installation](#installation)
    - [Author](#author)
    - [Collaborations](#collaborations)
    - [License](#license)
    - [Acknowledgements / Resources](#acknowledgements-/-resources)

## Overview

An Express/Node.js based server using a custom “authentication” module that is designed to handle user registration and sign in using Basic, Bearer, or OAuth along with a custom “authorization” module that will grant/deny users access to the server based on their role or permissions level.

## Development Process
Current Phase: 4

#### Phase 1: Basic Authentication

- Create a basic express server with the following features:
    - Users Model (Mongoose Schema)
    - `/signup` route that creates a user
    - `/signin` route that attempts to log a user in
    - `BasicAuth` middleware that validates the user as a part of the `/signin` process
    - Returning a JSON Web Token on valid sign in attempts

#### Phase 2: OAuth
- Complete the full OAuth handshaking process
- Create or validate a local user account matching the remote userid
- Returning a JSON Web Token on valid sign in attempts

#### Phase 3: Bearer Authentication
- Re-Authenticate Users
- Accepts a TOKEN in the <b>Authorization: Bearer</b> header
- Validates the user
- Allows or Denies access to the route handler

#### Phase 4: Authorization
- Implement a Role Based Authorization System
- Combines the Bearer Token with User roles to give fine grained access control

## Installation
- Clone down a copy of the repository.
- First step is to run `npm install` to receive all the dependencies
- To start this server the following commands are supported:
    - `npm start`
    - `node index.js`
- Do not forget to provide the following environment variables:
    - `PORT`= Set a default port value, if not added, 3000 will be used.
    - `SECRET`= A secret key used to sign/verify json web tokens
    - `GH_ID`= OAuth routes are using an application, this is a github oauth app id
    - `GH_SECRET`= This is the github oauth app secret key

## Author
- Software Developer: Joseph Zabaleta
  - [Official Github](https://github.com/joseph-zabaleta)

## Collaborations
- none

## License
This project is under the MIT License.

## Acknowledgements / Resources
- none
