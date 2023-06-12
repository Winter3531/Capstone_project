Game and Greens Capstone Project
https://github.com/Winter3531/Capstone_project/wiki

https://game-and-greens.onrender.com

This project is in short a recipes app. It allows a user to view all of the recipes added to the app, add their own recipes and leave comments about the recipes they like or dislike.

Screenshots of your app in action (once completed)

Instructions on how to build/run the project (installation instructions)

The app was written using multiple languages. All of the backend was written using Python and the frontend using React and JSX.

In the future I will be adding the users ability to like recipes, with shortcuts to view all of a users liked recipes. Users will be able to follow other users again with a shortcut in the navigation bar to the liked users page showing all of the users created recipes.

Technical implementation details

    There is more data than im accustomed to dealing with in regards to the recipe and so I spent a bit of time deciding how I was going to go about storing the different parts of the recipe in the database. My original intent was to store it all under one table. That ended up not working due to the amoount of data handling that was required to properly edit/update data the way I wanted users to be able to. I ended up spliting the three primary pieces of the recipe (details, ingredients and instructions) with those split it was much easier to handle those pieces and mainly be able to update and edit them the way I intended.
