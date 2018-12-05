# Classic Arcade Game Clone Project

This repository contains the submission for the third project in the Udacity Front-End Web Developer nanodegree course.

HTML file is CaptainCloset.html.  The game is invoked simply by opening that page:

Preview at http://htmlpreview.github.io/?https://github.com/WeaselGizzard/CaptainCloset/blob/master/CaptainCloset.html 

Or view at https://anesi.com/CaptainCloset/CaptainCloset.html

Instructions for use are on the page.  Game navigation is by arrow keys.  The purpose is to reach the pirate ship while getting as high a score as possible by picking up booty and avoiding bites from land sharks.  

The major goal was to produce something that met the specifications outlined in the Project Rubric, but using a pirate theme, with a pirate player, land sharks as enemies, and chests of booty as prizes. This required different images, which are all freeware, transformed to proper size and transparency.  Sound effects (AIEE (bitten), AAAR (booty seized), and background music) were added to simulate a real arcade game experience, and an AIEEE modal is displayed for 500 milliseconds if the player is bitten.  Sound effects are freeware, or in the case of the background music, my own midi production transformed to MP3.  The background music starts when the player makes his first move.

A scoring scheme is used, where each chest of booty picked up adds 20 points to the player's score, and each shark bite decrements the player's score by 20 points. The maximum score is thus 100 points, and the minimum negative infinity (or about negative 10^308, whatever the limit of Javascript floating point notation is, but that limit could not be reached during the remaining life of the solar system.)  Score, number of shark bites, and number of booty chests seized is displayed above the canvas. Given that it is hard enough to get a perfect score without being bitten, I saw no need to impose a time limit on the game.

The game ends when the player boards his ship.  When that happens, a modal is displayed with the player's final scores and a "play again" button.  

I relied pretty heavily on Matthew Cranford's walkthrough since I have never done anything like this before and rarely play video games.  For the audio controls I had to do some mimimal research.

One irritating oddity was that the arrow keys caused page scrolling.  I added a keydown event handler to prevent this.  This is at the bottom of app.js.

Appearance and function have been tested on Edge, Chrome, and Firefox browsers on a Windows laptop.  Since it uses ES6 features, it doesn't work on IE 11, but who cares. I assumed this project was not intended to be mobile-friendly, but was rather to exercise object-oriented skills.
 
My reasons for taking this course:

Get a good, coherent view of modern web development.
Understand the developer tools now in common use.
Upgrade my personal web site, https://anesi.com, which dates to 1995, to modern standards.
