#!/bin/bash

# Create smaller icon sizes from the 1024x1024 icon
# This script would typically use ImageMagick or similar tools
# For now, we'll create placeholder files

# Create directories if they don't exist
mkdir -p /home/z/my-project/public/icons

# Copy the large icon as placeholder for smaller sizes
# In a real implementation, you'd resize these properly
cp /home/z/my-project/public/icons/icon-1024x1024.png /home/z/my-project/public/icons/icon-512x512.png
cp /home/z/my-project/public/icons/icon-1024x1024.png /home/z/my-project/public/icons/icon-384x384.png
cp /home/z/my-project/public/icons/icon-1024x1024.png /home/z/my-project/public/icons/icon-192x192.png
cp /home/z/my-project/public/icons/icon-1024x1024.png /home/z/my-project/public/icons/icon-152x152.png
cp /home/z/my-project/public/icons/icon-1024x1024.png /home/z/my-project/public/icons/icon-144x144.png
cp /home/z/my-project/public/icons/icon-1024x1024.png /home/z/my-project/public/icons/icon-128x128.png
cp /home/z/my-project/public/icons/icon-1024x1024.png /home/z/my-project/public/icons/icon-96x96.png
cp /home/z/my-project/public/icons/icon-1024x1024.png /home/z/my-project/public/icons/icon-72x72.png

echo "Icon placeholders created. In production, use ImageMagick to properly resize:"
echo "convert icon-1024x1024.png -resize 512x512 icon-512x512.png"