# CraftBuddy-frontend

Copyright (C) 2025 Jacob Farnsworth

Have you ever played a game with some kind of crafting system? Have you ever found yourself struggling to plan your crafting goals in such a game? Maybe you've wondered, "How much stone do I need to make 1000 slabs?" or "How many sticks and ingots do I need to make 4 pickaxes?"

CraftBuddy is a web app that can help with a variety of crafting and resource management-related math. CraftBuddy can help with all kinds of queries related to crafting in your favorite games, and more!

This project contains the frontend service of the CraftBuddy app. The frontend service is built with Vite + React and uses the Mantine component library.

The CraftBuddy project consists of the following repositories:
* [CraftBuddy-frontend](https://github.com/JFarNTIG/CraftBuddy-frontend), frontend server built with React + Vite.
* [CraftBuddy-backend](https://github.com/JFarNTIG/CraftBuddy-backend), backend API server built with Flask.
* [CraftBuddy](https://github.com/JFarNTIG/CraftBuddy), environment and docker compose script for deploying the CraftBuddy app

CraftBuddy also depends on [crafterlib](https://github.com/JFarNTIG/crafterlib), a Python library that provides game item and recipe data and has a variety of functions for crafting-related math.

## Getting Started

If you want to deploy the CraftBuddy app, then it's recommended to do so via the docker compose script. See the instructions in [the main CraftBuddy repository](https://github.com/JFarNTIG/CraftBuddy).

Otherwise, follow the instructions below to create a development environment for the frontend service.

### Creating a Development Environment

Clone the repository:
```
git clone https://github.com/JFarNTIG/CraftBuddy-frontend frontend && cd frontend
```

Install dependencies:
```
yarn install
```

Yarn will take some time to download and install packages. Once it's finished, you can start the development server:
```
yarn dev
```

Now you can navigate to the development server on your local machine, which can usually be found at the following address:
```
http://localhost:5173/
```

Thanks to Vite, any changes saved in the code will be immediately visible in your browser, so it's pretty easy to test your changes.

## For Developers

The frontend service normally depends on the backend service for game and item data as well as more complex crafting math. During development, it can be a pain to run both the frontend and backend server together, so mocks (built using MSW) are utilized heavily.

Mock handlers can be found in `src/mocks/handlers.ts`. These provide mock API responses, for example for querying games, items and recipes. These mocks should follow the actual design of the backend as strictly as possible.

If a new feature is planned in the frontend service that would require a new API endpoint, then a new mock can be added. Generally this should follow one of two approaches:
* Design of the frontend component starts first. A new mock is added to support developing and testing the component. Later, the real API endpoint is implemented in the backend server, with the mock serving as a prototype to help design the API.
* An API endpoint is implemented first in the backend server. Then a frontend component is designed, referencing the actual API spec. A mock is created based as closely as possible on the real API, so that the component can be easily tested.

## Resources

* [React reference](https://react.dev/reference/react)
* [Mantine Core documentation](https://mantine.dev/core/package/)
* [React Router documentation](https://reactrouter.com/home)
* [MSW (API mocking framework) documentation](https://mswjs.io/docs/)

## License

CraftBuddy is licensed under the terms of the GNU General Public License, version 2. See the file `LICENSE` for the full license text.
