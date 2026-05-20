# Student App

A minimal React app (Vite) that shows sample student details.

Getting started

1. Install dependencies

```bash
cd student-app
npm install
```

2. Run dev server

```bash
npm run dev
```

3. Build

```bash
npm run build
npm run preview
```

This project is intentionally minimal — just enough to demonstrate rendering student id, name, address and class.

Azure Pipelines / Deployment

This repository contains an `azure-pipelines.yml` at the repo root that builds the `student-app` and can optionally deploy the production build to an Azure Storage static website.

Required pipeline variables for deployment (set in Azure DevOps pipeline variables or variable group):
- `AZURE_SERVICE_CONNECTION` - name of the Azure service connection in your Azure DevOps project (Service connection must have access to the subscription/resource group).
- `AZURE_RESOURCE_GROUP` - (optional) resource group of the storage account.
- `AZURE_STORAGE_ACCOUNT` - storage account name to host the static website (must have static website feature enabled).

How the deploy step works
- The pipeline builds `student-app/dist` and then runs an Azure CLI step which enables static website on the storage account and uploads the `dist` contents to the `$web` container.

Creating a service connection
1. In Azure DevOps go to Project settings → Service connections → New service connection → Azure Resource Manager.
2. Choose the recommended authentication method (Service principal (automatic) is easiest) and follow the wizard to create the connection.
3. Use the service connection name as `AZURE_SERVICE_CONNECTION` in the pipeline variables.

Notes
- Ensure the storage account exists and you have contributor rights.
- The pipeline deploy step is conditional and only runs if `AZURE_SERVICE_CONNECTION` is set.
- If you prefer Azure Static Web Apps or App Service, tell me and I can switch the deployment step.

