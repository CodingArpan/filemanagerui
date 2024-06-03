# File Storage Manager

This project is a file storage manager application built with Next.js. It allows users to sign up, sign in, upload files, and view all uploaded files. The application ensures that files larger than 1MB are not uploaded.

## Table of Contents

- [File Storage Manager](#file-storage-manager)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Sign Up](#sign-up)
    - [Sign In](#sign-in)
    - [File Upload](#file-upload)
    - [Fetching Files](#fetching-files)
  - [Contributing](#contributing)
  - [License](#license)

## Project Overview

The File Storage Manager is a web application that provides users with the ability to manage their files online. Users can create an account, log in, upload files, and view their uploaded files. The application is built using Next.js and includes the following features:

- User authentication (Sign Up and Sign In)
- File upload with size validation
- Display of all uploaded files

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine. You can download them from [Node.js official website](https://nodejs.org/).
- A running instance of the backend server that handles authentication and file storage. Ensure you have the server URL.

## Installation

To install and set up the project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/file-storage-manager.git
    ```

2. Navigate to the project directory:

    ```bash
    cd file-storage-manager
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Create a `.env.local` file in the root directory and add your environment variables:

    ```env
    NEXT_PUBLIC_SERVER_URL=http://your-backend-server-url
    ```

5. Start the development server:

    ```bash
    npm run dev
    ```

6. Open your browser and navigate to `http://localhost:3000`.

## Usage

### Sign Up

1. Navigate to the Sign Up page (`/signup`).
2. Fill in the required fields (email, password, confirm password).
3. Click on the "Sign Up" button to create an account.

### Sign In

1. Navigate to the Sign In page (`/signin`).
2. Enter your email and password.
3. Click on the "Sign In" button to log in.

### File Upload

1. After signing in, you will be redirected to the home page.
2. Click on the "Choose File" button to select a file from your computer.
3. Ensure the file size is less than 1MB.
4. Click on the "Upload" button to upload the file.
5. You will receive a notification once the file is successfully uploaded.

### Fetching Files

1. Upon successful login, all previously uploaded files will be displayed on the home page.
2. You can view, download, or delete files as needed.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
