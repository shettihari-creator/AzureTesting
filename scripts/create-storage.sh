#!/usr/bin/env bash
set -euo pipefail

# Helper script to create an Azure Storage account and enable static website hosting.
# Usage: ./scripts/create-storage.sh
# Prerequisites: Azure CLI installed and logged in (az login) and you have access to the subscription.

SUBSCRIPTION_NAME="Azure subscription 1"
RESOURCE_GROUP="DefaultResourceGroup-CCAN"
LOCATION="eastus"
STORAGE_ACCOUNT="hareeshazuretesting"

echo "Using subscription: $SUBSCRIPTION_NAME"
echo "Resource group: $RESOURCE_GROUP"
echo "Location: $LOCATION"
echo "Storage account: $STORAGE_ACCOUNT"

echo "Setting subscription context (attempting to find the subscription id)..."
SUB_ID=$(az account list --query "[?name=='$SUBSCRIPTION_NAME'].id | [0]" -o tsv)
if [ -z "$SUB_ID" ]; then
  echo "Subscription '$SUBSCRIPTION_NAME' not found in 'az account list'. Please ensure you're logged in and the subscription name is correct."
  exit 1
fi

az account set --subscription "$SUB_ID"

echo "Creating storage account (if it doesn't exist)..."
az storage account create \
  --name "$STORAGE_ACCOUNT" \
  --resource-group "$RESOURCE_GROUP" \
  --location "$LOCATION" \
  --sku Standard_LRS \
  --kind StorageV2 \
  --access-tier Hot || echo "Storage account create command returned non-zero (it may already exist)."

echo "Enabling static website..."
az storage blob service-properties update \
  --account-name "$STORAGE_ACCOUNT" \
  --static-website \
  --index-document index.html \
  --404-document index.html

ENDPOINT=$(az storage account show -n "$STORAGE_ACCOUNT" -g "$RESOURCE_GROUP" --query "primaryEndpoints.web" -o tsv)

echo "Static website enabled. Endpoint: $ENDPOINT"
echo "You can upload the built site with:"
echo "  cd student-app && npm run build && az storage blob upload-batch --account-name $STORAGE_ACCOUNT --source dist --destination '\$web'"
