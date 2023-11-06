# Directus Project with Extensions Quickstart

![Directus Logo](https://directus.io/_nuxt/logo-dark.8a22a14a.svg) 

## Table of Contents

- [About Directus](#about-directus)
- [Getting Started](#getting-started)
- [Extension Development](#extension-development)
- [Usage](#usage)

## About Directus

[Directus](https://directus.io/) is an open-source headless CMS that provides a powerful and flexible interface for managing your content and databases. It allows you to create, customize, and manage your content models and data with ease, making it a great choice for building content-driven applications - supercharged with APIs.


## Getting Started

To quickly set up a Directus project with extension development capabilities, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine using the following command:
   
git clone https://github.com/Yohita/directus-project-with-extensions-quickstart.git

2. **Install Dependencies**: Navigate to the project directory and install the necessary dependencies using:

cd directus-project-with-extensions-quickstart
npm install

3. Change patth to data.db in .env file to your file path

3. **Start the Development Server**: Start the development server to begin working with Directus:
bash script-quickstart.sh

OR

node index.cjs

**Thats it !**
- Server is running on http://localhost:8055
- my-api on :  http://localhost:8055/my-api
- api raw database access : http://localhost:8055/my-api/product-list-raw-dbaccess-test
- api data access using directus item service : http://localhost:8055/my-api/product-list-item-service-api-test


**Development Mode build and run** : script-quickstart.sh to prepare project and run , do this when we do any changes in extension souce
bash script-quickstart.sh

**Notes**
1. Admin Credentails
   Email : admin@admin.com
   Password : admin123
2. This project uses SQLite for quickstart, but you can connect to any other database simply by configuring the .env file.

## Using Mysql Instead of SQLITe : 
Run command : 'npx directus init'
This will create .env with your mysql credentials

## Using PHP
I work on both NodeJS scripts as well as PHP in my project , 
I have added little helper to help you with that in php folder

## Usage

You can use this Directus project as a foundation for building various content-driven applications. Customize your content models, create data relationships, and extend Directus to suit your specific project requirements.


For detailed information on how to use Directus, refer to the official [Directus Documentation](https://docs.directus.io/).

## Extension Development

This project includes the tools and structure for developing extensions for Directus. You can find extension development resources and examples in the src-extensions directory. To get started with extension development, follow these steps:

1. **Create an Extension**: Inside the `src-extensions/my-bundle` directory.
  1. Install "npm i" 
  2. Start with "npm run add"
    Follow Documentation Here [Directus Bundle Extension](https://docs.directus.io/extensions/bundles.html)

4. **Develop Your Extension**: Add your custom code and logic to your extension directory. You can use the provided examples as a reference.

5. **Test Your Extension**: 
   Run "bash script-quickstart.sh" to build , move and start project with your extension

## Deployment** 
Treat this project as just another Node.js project and follow standard deployment procedures. No special actions are needed; simply update your database configuration accordingly in the .env file.

I suggest using Plesk Obsidian as the server control panel with the Node.js extension for deploying this project. This setup will allow you to establish DevOps processes with ease, ensuring that your server gets updated with each code push. Furthermore, a DigitalOcean droplet with a minimum of 2 GB of RAM should be sufficient to run both MySQL and the Node.js project for moderately heavy traffic. You can utilize the free Plesk Obsidian one-click install available on the DigitalOcean Marketplace.
