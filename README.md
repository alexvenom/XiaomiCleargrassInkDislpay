# XiaomiCleargrassInkDislpay

Notes: 
- I could make it run on Mac OSX but it never retrieved the advertising data. On Linux it works.
- You must run it with sudo as it needs superuser access to read from Bluetooth the command is:
   sudo node XiaomiClearGrassInk.js
- You must have Noble installed. I used NPM to install it:
   npm install noble
- Sometimes it takes a few seconds (~20s) to start retrieving the values
