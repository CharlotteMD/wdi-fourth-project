![getaroom](https://user-images.githubusercontent.com/32647222/37030907-880e564c-2134-11e8-8b11-75e806a84e38.png)
<a href="https://getaroom-charmd.herokuapp.com/">GetARoom on Heroku</a>

<a href="https://github.com/CharlotteMD/wdi-fourth-project">Github</a>

<h1>An auction site for hotels.<h1>

<h3>The biggest pain point for hotels is not filling rooms, particularly the fancy expensive rooms.  This app allows them to auction the room last minute if they cant fill it through their existing booking systems.  It also offers hotel guests great bargains on the nicest hotel rooms.</h3>

<h4>On the app guests can:
<li>Browse current auctions and view the hotel facilities in more detail.</li>
<li>Place a bid on a room of interest and see when you have been outbid.</li>

On the app hotels can:
<li>Create a show page for their hotel.</li>
<li>Create auctions linked with your hotel.</li>
<li>See the current highest bid.</li></h4>

<h3>How I came up with it</h3>
Whilst this wasn’t my first idea, I felt it was the most realistic to create in a week.

My original idea was a crowd funding app for homeless people - watch this space… I decided against it for my final project as there were many intricacies to it that I couldn’t give proper consideration to in a week.

Having worked in the hotel industry, I understand a little more about the business of hotels and their pain points.

I thought it was a simple enough idea and not really yet in existence in this form.

<h3>Planning</h3>
I really utilised Trello for this project since it had worked so well in the first project.

<img width="1103" alt="screen shot 2018-03-06 at 11 56 36" src="https://user-images.githubusercontent.com/32647222/37031187-bc6c2c1a-2135-11e8-98d1-188ab8e90840.png">

I also made extensive use of Keynote. It was great for using as a note pad to jot things down and draw out diagrams of how things were going to work.


<img width="993" alt="screen shot 2018-03-06 at 11 57 19" src="https://user-images.githubusercontent.com/32647222/37031400-8440f248-2136-11e8-80b0-339274f9bb1b.png">


<img width="994" alt="screen shot 2018-03-06 at 11 57 29" src="https://user-images.githubusercontent.com/32647222/37031417-915e7522-2136-11e8-9340-05aeb7d8ebaf.png">

The most complicated part of the planning for me was working out how the models would relate to each other. I set on 3 models:

<li>User</li>
<li>Hotel (owned by a User)</li>
<li>Auction (owned by a Hotel with bids embedded into this - this later changed to be part of the auction schema)</li>


<h3>Wire Frames</h3>

<img width="990" alt="screen shot 2018-03-06 at 11 58 20" src="https://user-images.githubusercontent.com/32647222/37031462-bd3ef338-2136-11e8-91bc-a042b7763aae.png">


<img width="1014" alt="screen shot 2018-03-06 at 11 58 28" src="https://user-images.githubusercontent.com/32647222/37031469-c80f4c9a-2136-11e8-8066-1e1403c17cb9.png">


<h3>Technologies Used</h3>

  <li>axios</li>
  <li>bcrypt</li>
  <li>body-parser</li>
  <li>bootstrap</li>
  <li>express</li>
  <li>jsonwebtoken</li>
  <li>moment</li>
  <li>mongoose</li>
  <li>morgan</li>
  <li>react</li>
  <li>react-dom</li>
  <li>react-router-dom</li>
  <li>supertest</li>
  <li>babel</li>
  <li>chai</li>
  <li>enzyme</li>
  <li>mocha</li>
  <li>node-sass</li>
  <li>nyc</li>
  <li>sinon</li>
  <li>canva</li>
  <li>coolors</li>
  <li>favicon generator</li>


<h3>Wins</h3>
<li>I’m pleased with how my app looks - in particular the hover animations</li>
<li>I loved using REACT - it’s certainly my favourite technology studied on the course.  I find it very user friendly and logical to use.</li>
<li>I really enjoyed running tests! I hope I can get more of these done for this app after the course has finished.</li>


<h3>Blockers</h3>
<li>Working out the Functionality of the auction was really tricky, particularly showing and hiding different bids. It really tested my JavaScript ability!</li>
<li>I think I set myself a lot to create in a week!</li>

<h3>Future Functionality</h3>

<li>I had planned to add filters to the Auctions Index but I ran out of time.  They would filter by current highest bid, location and facilities.</li>
<li>I wanted to add the ability for hotels to message the winning bidder.</li>
<li>I'd really like the auction to automatically end after a set time and then delete itself a week or so later.</li>
<li>I have started developing another side of the site where users can set a budget and the kind of hotel they are looking for for a specific date and if a hotel can fulfil this they can message the guest. Watch this space!</li>
