// script.js
// Handles dynamic loading of schedule, user selection and pick saving

// Immediately invoked function to avoid polluting global scope
(function () {
  // DOM references
  const userSelect = document.getElementById('user-select');
  const weekNav = document.getElementById('week-nav');
  const scheduleContainer = document.getElementById('schedule-container');

  // Users list as provided by the customer
  const users = ['Brandon', 'Brittany', 'Jeff', 'Kayla', 'Karen', 'Gilbert'];

  // Team abbreviations mapping and schedule data are embedded directly in this script.
  // This avoids cross-origin issues when serving from the file system.
  const teamAbbr = {
    "Arizona Cardinals":"ARI","Atlanta Falcons":"ATL","Baltimore Ravens":"BAL","Buffalo Bills":"BUF","Carolina Panthers":"CAR","Chicago Bears":"CHI","Cincinnati Bengals":"CIN","Cleveland Browns":"CLE","Dallas Cowboys":"DAL","Denver Broncos":"DEN","Detroit Lions":"DET","Green Bay Packers":"GB","Houston Texans":"HOU","Indianapolis Colts":"IND","Jacksonville Jaguars":"JAX","Kansas City Chiefs":"KC","Las Vegas Raiders":"LV","Los Angeles Chargers":"LAC","Los Angeles Rams":"LAR","Miami Dolphins":"MIA","Minnesota Vikings":"MIN","New England Patriots":"NE","New Orleans Saints":"NO","New York Giants":"NYG","New York Jets":"NYJ","Philadelphia Eagles":"PHI","Pittsburgh Steelers":"PIT","San Francisco 49ers":"SF","Seattle Seahawks":"SEA","Tampa Bay Buccaneers":"TB","Tennessee Titans":"TEN","Washington Commanders":"WAS"
  };
  const schedule = {"Week 1":[{"date":"Thu Sep 4","time":"20:20:00","away_team":"Dallas Cowboys","home_team":"Philadelphia Eagles"},{"date":"Fri Sep 5","time":"20:00:00","away_team":"Kansas City Chiefs","home_team":"Los Angeles Chargers ¹"},{"date":"Sun Sep 7","time":"13:00:00","away_team":"Arizona Cardinals","home_team":"New Orleans Saints"},{"date":"","time":"13:00:00","away_team":"Carolina Panthers","home_team":"Jacksonville Jaguars"},{"date":"","time":"13:00:00","away_team":"Cincinnati Bengals","home_team":"Cleveland Browns"},{"date":"","time":"13:00:00","away_team":"Las Vegas Raiders","home_team":"New England Patriots"},{"date":"","time":"13:00:00","away_team":"Miami Dolphins","home_team":"Indianapolis Colts"},{"date":"","time":"13:00:00","away_team":"New York Giants","home_team":"Washington Commanders"},{"date":"","time":"13:00:00","away_team":"Pittsburgh Steelers","home_team":"New York Jets"},{"date":"","time":"13:00:00","away_team":"Tampa Bay Buccaneers","home_team":"Atlanta Falcons"},{"date":"","time":"16:05:00","away_team":"San Francisco 49ers","home_team":"Seattle Seahawks"},{"date":"","time":"16:05:00","away_team":"Tennessee Titans","home_team":"Denver Broncos"},{"date":"","time":"16:25:00","away_team":"Detroit Lions","home_team":"Green Bay Packers"},{"date":"","time":"16:25:00","away_team":"Houston Texans","home_team":"Los Angeles Rams"},{"date":"","time":"20:20:00","away_team":"Baltimore Ravens","home_team":"Buffalo Bills"},{"date":"Mon Sep 8","time":"20:15:00","away_team":"Minnesota Vikings","home_team":"Chicago Bears"}],"Week 2":[{"date":"Thu Sep 11","time":"20:15:00","away_team":"Washington Commanders","home_team":"Green Bay Packers"},{"date":"Sun Sep 14","time":"13:00:00","away_team":"Buffalo Bills","home_team":"New York Jets"},{"date":"","time":"13:00:00","away_team":"Chicago Bears","home_team":"Detroit Lions"},{"date":"","time":"13:00:00","away_team":"Cleveland Browns","home_team":"Baltimore Ravens"},{"date":"","time":"13:00:00","away_team":"Jacksonville Jaguars","home_team":"Cincinnati Bengals"},{"date":"","time":"13:00:00","away_team":"Los Angeles Rams","home_team":"Tennessee Titans"},{"date":"","time":"13:00:00","away_team":"New England Patriots","home_team":"Miami Dolphins"},{"date":"","time":"13:00:00","away_team":"New York Giants","home_team":"Dallas Cowboys"},{"date":"","time":"13:00:00","away_team":"San Francisco 49ers","home_team":"New Orleans Saints"},{"date":"","time":"13:00:00","away_team":"Seattle Seahawks","home_team":"Pittsburgh Steelers"},{"date":"","time":"16:05:00","away_team":"Carolina Panthers","home_team":"Arizona Cardinals"},{"date":"","time":"16:05:00","away_team":"Denver Broncos","home_team":"Indianapolis Colts"},{"date":"","time":"16:25:00","away_team":"Philadelphia Eagles","home_team":"Kansas City Chiefs"},{"date":"","time":"20:20:00","away_team":"Atlanta Falcons","home_team":"Minnesota Vikings"},{"date":"Mon Sep 15","time":"19:00:00","away_team":"Tampa Bay Buccaneers","home_team":"Houston Texans"},{"date":"","time":"22:00:00","away_team":"Los Angeles Chargers","home_team":"Las Vegas Raiders"}],"Week 3":[{"date":"Thu Sep 18","time":"20:15:00","away_team":"Miami Dolphins","home_team":"Buffalo Bills"},{"date":"Sun Sep 21","time":"13:00:00","away_team":"Arizona Cardinals","home_team":"Washington Commanders"},{"date":"","time":"13:00:00","away_team":"Baltimore Ravens","home_team":"Cincinnati Bengals"},{"date":"","time":"13:00:00","away_team":"Carolina Panthers","home_team":"Philadelphia Eagles"},{"date":"","time":"13:00:00","away_team":"Indianapolis Colts","home_team":"Jacksonville Jaguars"},{"date":"","time":"13:00:00","away_team":"Kansas City Chiefs","home_team":"Cleveland Browns"},{"date":"","time":"13:00:00","away_team":"Minnesota Vikings","home_team":"San Francisco 49ers"},{"date":"","time":"13:00:00","away_team":"New England Patriots","home_team":"New York Jets"},{"date":"","time":"13:00:00","away_team":"New Orleans Saints","home_team":"Pittsburgh Steelers"},{"date":"","time":"13:00:00","away_team":"Tampa Bay Buccaneers","home_team":"Atlanta Falcons"},{"date":"","time":"16:05:00","away_team":"Houston Texans","home_team":"Los Angeles Rams"},{"date":"","time":"16:05:00","away_team":"Las Vegas Raiders","home_team":"Denver Broncos"},{"date":"","time":"16:25:00","away_team":"Dallas Cowboys","home_team":"Seattle Seahawks"},{"date":"","time":"20:20:00","away_team":"Buffalo Bills","home_team":"Detroit Lions"},{"date":"Mon Sep 22","time":"20:15:00","away_team":"New York Giants","home_team":"Chicago Bears"},{"date":"","time":"20:15:00","away_team":"Green Bay Packers","home_team":"Tennessee Titans"}],"Week 4":[{"date":"Thu Sep 25","time":"20:15:00","away_team":"Denver Broncos","home_team":"Kansas City Chiefs"},{"date":"Sun Sep 28","time":"01:00:00","away_team":"Houston Texans","home_team":"Detroit Lions"},{"date":"","time":"01:00:00","away_team":"Indianapolis Colts","home_team":"Miami Dolphins"},{"date":"","time":"01:00:00","away_team":"Jacksonville Jaguars","home_team":"Dallas Cowboys"},{"date":"","time":"01:00:00","away_team":"New Orleans Saints","home_team":"Minnesota Vikings"},{"date":"","time":"01:00:00","away_team":"Philadelphia Eagles","home_team":"Cincinnati Bengals"},{"date":"","time":"01:00:00","away_team":"Seattle Seahawks","home_team":"Arizona Cardinals"},{"date":"","time":"01:00:00","away_team":"Tampa Bay Buccaneers","home_team":"Atlanta Falcons"},{"date":"","time":"04:05:00","away_team":"Carolina Panthers","home_team":"Baltimore Ravens"},{"date":"","time":"04:25:00","away_team":"New England Patriots","home_team":"Buffalo Bills"},{"date":"","time":"04:25:00","away_team":"New York Jets","home_team":"Los Angeles Chargers"},{"date":"","time":"08:20:00","away_team":"Pittsburgh Steelers","home_team":"San Francisco 49ers"},{"date":"Mon Sep 29","time":"08:15:00","away_team":"Cleveland Browns","home_team":"Las Vegas Raiders"},{"date":"","time":"11:15:00","away_team":"Los Angeles Rams","home_team":"Washington Commanders"},{"date":"","time":"19:00:00","away_team":"Chicago Bears","home_team":"Green Bay Packers"},{"date":"","time":"22:00:00","away_team":"Detroit Lions","home_team":"New York Giants"}],"Week 5":[{"date":"Thu Oct 2","time":"20:15:00","away_team":"Los Angeles Rams","home_team":"Arizona Cardinals"},{"date":"Sun Oct 5","time":"13:00:00","away_team":"Atlanta Falcons","home_team":"Carolina Panthers"},{"date":"","time":"13:00:00","away_team":"Baltimore Ravens","home_team":"Houston Texans"},{"date":"","time":"13:00:00","away_team":"Chicago Bears","home_team":"Washington Commanders"},{"date":"","time":"13:00:00","away_team":"Cleveland Browns","home_team":"Los Angeles Chargers"},{"date":"","time":"13:00:00","away_team":"Denver Broncos","home_team":"Pittsburgh Steelers"},{"date":"","time":"13:00:00","away_team":"Kansas City Chiefs","home_team":"New Orleans Saints"},{"date":"","time":"13:00:00","away_team":"Miami Dolphins","home_team":"Tampa Bay Buccaneers"},{"date":"","time":"13:00:00","away_team":"Minnesota Vikings","home_team":"San Francisco 49ers"},{"date":"","time":"13:00:00","away_team":"New York Giants","home_team":"Detroit Lions"},{"date":"","time":"13:00:00","away_team":"Seattle Seahawks","home_team":"Dallas Cowboys"},{"date":"","time":"16:05:00","away_team":"Buffalo Bills","home_team":"Las Vegas Raiders"},{"date":"","time":"16:05:00","away_team":"Tennessee Titans","home_team":"Indianapolis Colts"},{"date":"","time":"16:25:00","away_team":"Houston Texans","home_team":"Jacksonville Jaguars"},{"date":"","time":"20:20:00","away_team":"Philadelphia Eagles","home_team":"Cincinnati Bengals"},{"date":"Mon Oct 6","time":"20:15:00","away_team":"New England Patriots","home_team":"Green Bay Packers"}],"Week 6":[{"date":"Thu Oct 9","time":"20:15:00","away_team":"Los Angeles Chargers","home_team":"Pittsburgh Steelers"},{"date":"Sun Oct 12","time":"01:00:00","away_team":"Arizona Cardinals","home_team":"Seattle Seahawks"},{"date":"","time":"01:00:00","away_team":"Carolina Panthers","home_team":"Philadelphia Eagles"},{"date":"","time":"01:00:00","away_team":"Denver Broncos","home_team":"Cleveland Browns"},{"date":"","time":"01:00:00","away_team":"Houston Texans","home_team":"Kansas City Chiefs"},{"date":"","time":"01:00:00","away_team":"Jacksonville Jaguars","home_team":"Indianapolis Colts"},{"date":"","time":"01:00:00","away_team":"Los Angeles Rams","home_team":"Detroit Lions"},{"date":"","time":"01:00:00","away_team":"Miami Dolphins","home_team":"New York Giants"},{"date":"","time":"01:00:00","away_team":"New England Patriots","home_team":"Tampa Bay Buccaneers"},{"date":"","time":"01:00:00","away_team":"Tennessee Titans","home_team":"Chicago Bears"},{"date":"","time":"04:05:00","away_team":"Atlanta Falcons","home_team":"Las Vegas Raiders"},{"date":"","time":"04:05:00","away_team":"Baltimore Ravens","home_team":"Buffalo Bills"},{"date":"","time":"04:25:00","away_team":"Cincinnati Bengals","home_team":"New Orleans Saints"},{"date":"","time":"20:20:00","away_team":"New York Jets","home_team":"San Francisco 49ers"},{"date":"Mon Oct 13","time":"20:15:00","away_team":"Kansas City Chiefs","home_team":"Minnesota Vikings"},{"date":"","time":"20:15:00","away_team":"Dallas Cowboys","home_team":"Green Bay Packers"}],"Week 7":[{"date":"Thu Oct 16","time":"20:15:00","away_team":"Green Bay Packers","home_team":"Detroit Lions"},{"date":"Sun Oct 19","time":"13:00:00","away_team":"Buffalo Bills","home_team":"Chicago Bears"},{"date":"","time":"13:00:00","away_team":"Cincinnati Bengals","home_team":"Houston Texans"},{"date":"","time":"13:00:00","away_team":"Cleveland Browns","home_team":"Philadelphia Eagles"},{"date":"","time":"13:00:00","away_team":"Kansas City Chiefs","home_team":"Tampa Bay Buccaneers"},{"date":"","time":"13:00:00","away_team":"Minnesota Vikings","home_team":"Arizona Cardinals"},{"date":"","time":"13:00:00","away_team":"New York Giants","home_team":"Washington Commanders"},{"date":"","time":"13:00:00","away_team":"New York Jets","home_team":"New England Patriots"},{"date":"","time":"13:00:00","away_team":"San Francisco 49ers","home_team":"Atlanta Falcons"},{"date":"","time":"13:00:00","away_team":"Seattle Seahawks","home_team":"Baltimore Ravens"},{"date":"","time":"16:05:00","away_team":"Miami Dolphins","home_team":"Tennessee Titans"},{"date":"","time":"16:05:00","away_team":"Pittsburgh Steelers","home_team":"Los Angeles Rams"},{"date":"","time":"16:25:00","away_team":"Las Vegas Raiders","home_team":"Denver Broncos"},{"date":"","time":"20:20:00","away_team":"Los Angeles Chargers","home_team":"Indianapolis Colts"},{"date":"Mon Oct 20","time":"20:15:00","away_team":"Carolina Panthers","home_team":"Dallas Cowboys"},{"date":"","time":"20:15:00","away_team":"Jacksonville Jaguars","home_team":"New Orleans Saints"}],"Week 8":[{"date":"Thu Oct 23","time":"20:15:00","away_team":"Minnesota Vikings","home_team":"New York Jets"},{"date":"Sun Oct 26","time":"01:00:00","away_team":"Atlanta Falcons","home_team":"Los Angeles Chargers"},{"date":"","time":"01:00:00","away_team":"Baltimore Ravens","home_team":"Seattle Seahawks"},{"date":"","time":"01:00:00","away_team":"Chicago Bears","home_team":"Tennessee Titans"},{"date":"","time":"01:00:00","away_team":"Cincinnati Bengals","home_team":"New York Giants"},{"date":"","time":"01:00:00","away_team":"Houston Texans","home_team":"Green Bay Packers"},{"date":"","time":"01:00:00","away_team":"Kansas City Chiefs","home_team":"Las Vegas Raiders"},{"date":"","time":"01:00:00","away_team":"Miami Dolphins","home_team":"Washington Commanders"},{"date":"","time":"01:00:00","away_team":"Philadelphia Eagles","home_team":"Jacksonville Jaguars"},{"date":"","time":"01:00:00","away_team":"Tampa Bay Buccaneers","home_team":"Carolina Panthers"},{"date":"","time":"01:00:00","away_team":"Tennessee Titans","home_team":"Pittsburgh Steelers"},{"date":"","time":"04:05:00","away_team":"Denver Broncos","home_team":"Los Angeles Rams"},{"date":"","time":"04:05:00","away_team":"San Francisco 49ers","home_team":"New England Patriots"},{"date":"","time":"04:25:00","away_team":"Los Angeles Chargers","home_team":"Buffalo Bills"},{"date":"","time":"20:20:00","away_team":"New York Jets","home_team":"Arizona Cardinals"},{"date":"Mon Oct 27","time":"20:15:00","away_team":"Detroit Lions","home_team":"Cleveland Browns"}],"Week 9":[{"date":"Thu Oct 30","time":"20:15:00","away_team":"Detroit Lions","home_team":"Cincinnati Bengals"},{"date":"Sun Nov 2","time":"13:00:00","away_team":"Atlanta Falcons","home_team":"Seattle Seahawks"},{"date":"","time":"13:00:00","away_team":"Baltimore Ravens","home_team":"Kansas City Chiefs"},{"date":"","time":"13:00:00","away_team":"Buffalo Bills","home_team":"Indianapolis Colts"},{"date":"","time":"13:00:00","away_team":"Chicago Bears","home_team":"Washington Commanders"},{"date":"","time":"13:00:00","away_team":"Cleveland Browns","home_team":"Miami Dolphins"},{"date":"","time":"13:00:00","away_team":"Denver Broncos","home_team":"Tampa Bay Buccaneers"},{"date":"","time":"13:00:00","away_team":"Green Bay Packers","home_team":"New York Jets"},{"date":"","time":"13:00:00","away_team":"New Orleans Saints","home_team":"New England Patriots"},{"date":"","time":"13:00:00","away_team":"San Francisco 49ers","home_team":"Philadelphia Eagles"},{"date":"","time":"16:05:00","away_team":"Carolina Panthers","home_team":"Las Vegas Raiders"},{"date":"","time":"16:05:00","away_team":"Los Angeles Chargers","home_team":"Houston Texans"},{"date":"","time":"16:25:00","away_team":"Minnesota Vikings","home_team":"Dallas Cowboys"},{"date":"","time":"20:20:00","away_team":"Tennessee Titans","home_team":"Seattle Seahawks"},{"date":"Mon Nov 3","time":"20:15:00","away_team":"Los Angeles Rams","home_team":"Arizona Cardinals"},{"date":"","time":"20:15:00","away_team":"Pittsburgh Steelers","home_team":"Jacksonville Jaguars"}],"Week 10":[{"date":"Thu Nov 6","time":"20:15:00","away_team":"Baltimore Ravens","home_team":"Cleveland Browns"},{"date":"Sun Nov 9","time":"01:00:00","away_team":"Arizona Cardinals","home_team":"Kansas City Chiefs"},{"date":"","time":"01:00:00","away_team":"Buffalo Bills","home_team":"Minnesota Vikings"},{"date":"","time":"01:00:00","away_team":"Chicago Bears","home_team":"New Orleans Saints"},{"date":"","time":"01:00:00","away_team":"Cincinnati Bengals","home_team":"Carolina Panthers"},{"date":"","time":"01:00:00","away_team":"Houston Texans","home_team":"Seattle Seahawks"},{"date":"","time":"01:00:00","away_team":"Jacksonville Jaguars","home_team":"Tampa Bay Buccaneers"},{"date":"","time":"01:00:00","away_team":"Los Angeles Chargers","home_team":"New York Giants"},{"date":"","time":"01:00:00","away_team":"New England Patriots","home_team":"Philadelphia Eagles"},{"date":"","time":"01:00:00","away_team":"Pittsburgh Steelers","home_team":"Tennessee Titans"},{"date":"","time":"04:05:00","away_team":"Atlanta Falcons","home_team":"Dallas Cowboys"},{"date":"","time":"04:05:00","away_team":"Los Angeles Rams","home_team":"Green Bay Packers"},{"date":"","time":"04:25:00","away_team":"Kansas City Chiefs","home_team":"Las Vegas Raiders"},{"date":"","time":"04:25:00","away_team":"Miami Dolphins","home_team":"Indianapolis Colts"},{"date":"","time":"20:20:00","away_team":"Denver Broncos","home_team":"San Francisco 49ers"},{"date":"Mon Nov 10","time":"20:15:00","away_team":"New York Jets","home_team":"Detroit Lions"}],"Week 11":[{"date":"Thu Nov 13","time":"20:15:00","away_team":"Indianapolis Colts","home_team":"Houston Texans"},{"date":"Sun Nov 16","time":"01:00:00","away_team":"Arizona Cardinals","home_team":"Pittsburgh Steelers"},{"date":"","time":"01:00:00","away_team":"Baltimore Ravens","home_team":"Dallas Cowboys"},{"date":"","time":"01:00:00","away_team":"Buffalo Bills","home_team":"Jacksonville Jaguars"},{"date":"","time":"01:00:00","away_team":"Carolina Panthers","home_team":"Minnesota Vikings"},{"date":"","time":"01:00:00","away_team":"Cincinnati Bengals","home_team":"Philadelphia Eagles"},{"date":"","time":"01:00:00","away_team":"New England Patriots","home_team":"Atlanta Falcons"},{"date":"","time":"01:00:00","away_team":"San Francisco 49ers","home_team":"Seattle Seahawks"},{"date":"","time":"04:05:00","away_team":"Cleveland Browns","home_team":"New Orleans Saints"},{"date":"","time":"04:05:00","away_team":"Detroit Lions","home_team":"Green Bay Packers"},{"date":"","time":"04:25:00","away_team":"Kansas City Chiefs","home_team":"Miami Dolphins"},{"date":"","time":"04:25:00","away_team":"Las Vegas Raiders","home_team":"Denver Broncos"},{"date":"","time":"20:20:00","away_team":"Los Angeles Chargers","home_team":"Tampa Bay Buccaneers"},{"date":"Mon Nov 17","time":"20:15:00","away_team":"New York Jets","home_team":"Chicago Bears"},{"date":"","time":"20:15:00","away_team":"Tennessee Titans","home_team":"Los Angeles Rams"},{"date":"","time":"20:15:00","away_team":"Washington Commanders","home_team":"Cleveland Browns"}],"Week 12":[{"date":"Thu Nov 20","time":"20:15:00","away_team":"Tampa Bay Buccaneers","home_team":"Kansas City Chiefs"},{"date":"Sun Nov 23","time":"13:00:00","away_team":"Arizona Cardinals","home_team":"Miami Dolphins"},{"date":"","time":"13:00:00","away_team":"Chicago Bears","home_team":"Carolina Panthers"},{"date":"","time":"13:00:00","away_team":"Cincinnati Bengals","home_team":"Philadelphia Eagles"},{"date":"","time":"13:00:00","away_team":"Houston Texans","home_team":"Green Bay Packers"},{"date":"","time":"13:00:00","away_team":"Jacksonville Jaguars","home_team":"Seattle Seahawks"},{"date":"","time":"13:00:00","away_team":"Los Angeles Chargers","home_team":"Indianapolis Colts"},{"date":"","time":"13:00:00","away_team":"Los Angeles Rams","home_team":"Cleveland Browns"},{"date":"","time":"13:00:00","away_team":"Minnesota Vikings","home_team":"Buffalo Bills"},{"date":"","time":"13:00:00","away_team":"New England Patriots","home_team":"Pittsburgh Steelers"},{"date":"","time":"13:00:00","away_team":"New York Jets","home_team":"Baltimore Ravens"},{"date":"","time":"16:05:00","away_team":"Atlanta Falcons","home_team":"Las Vegas Raiders"},{"date":"","time":"16:05:00","away_team":"Dallas Cowboys","home_team":"Tennessee Titans"},{"date":"","time":"16:25:00","away_team":"Indianapolis Colts","home_team":"Los Angeles Rams"},{"date":"","time":"20:20:00","away_team":"Denver Broncos","home_team":"San Francisco 49ers"},{"date":"Mon Nov 24","time":"20:15:00","away_team":"Seattle Seahawks","home_team":"New Orleans Saints"}],"Week 13":[{"date":"Thu Nov 27","time":"12:30:00","away_team":"Kansas City Chiefs","home_team":"Chicago Bears"},{"date":"","time":"16:30:00","away_team":"Denver Broncos","home_team":"New Orleans Saints"},{"date":"","time":"20:20:00","away_team":"Baltimore Ravens","home_team":"Seattle Seahawks"},{"date":"Fri Nov 28","time":"15:00:00","away_team":"Buffalo Bills","home_team":"Miami Dolphins"},{"date":"Sun Nov 30","time":"13:00:00","away_team":"Atlanta Falcons","home_team":"Minnesota Vikings"},{"date":"","time":"13:00:00","away_team":"Carolina Panthers","home_team":"Los Angeles Chargers"},{"date":"","time":"13:00:00","away_team":"Cincinnati Bengals","home_team":"Tampa Bay Buccaneers"},{"date":"","time":"13:00:00","away_team":"Cleveland Browns","home_team":"Pittsburgh Steelers"},{"date":"","time":"13:00:00","away_team":"Houston Texans","home_team":"Jacksonville Jaguars"},{"date":"","time":"13:00:00","away_team":"Indianapolis Colts","home_team":"New England Patriots"},{"date":"","time":"13:00:00","away_team":"Las Vegas Raiders","home_team":"Denver Broncos"},{"date":"","time":"13:00:00","away_team":"Los Angeles Rams","home_team":"San Francisco 49ers"},{"date":"","time":"16:05:00","away_team":"New York Jets","home_team":"Arizona Cardinals"},{"date":"","time":"16:05:00","away_team":"New York Giants","home_team":"Philadelphia Eagles"},{"date":"","time":"16:25:00","away_team":"Dallas Cowboys","home_team":"Seattle Seahawks"},{"date":"","time":"20:20:00","away_team":"Green Bay Packers","home_team":"Detroit Lions"}],"Week 14":[{"date":"Thu Dec 4","time":"20:15:00","away_team":"Tampa Bay Buccaneers","home_team":"Atlanta Falcons"},{"date":"Sun Dec 7","time":"13:00:00","away_team":"Arizona Cardinals","home_team":"Los Angeles Rams"},{"date":"","time":"13:00:00","away_team":"Baltimore Ravens","home_team":"Cincinnati Bengals"},{"date":"","time":"13:00:00","away_team":"Chicago Bears","home_team":"Jacksonville Jaguars"},{"date":"","time":"13:00:00","away_team":"Cleveland Browns","home_team":"Buffalo Bills"},{"date":"","time":"13:00:00","away_team":"Houston Texans","home_team":"Indianapolis Colts"},{"date":"","time":"13:00:00","away_team":"Kansas City Chiefs","home_team":"Carolina Panthers"},{"date":"","time":"13:00:00","away_team":"Las Vegas Raiders","home_team":"New York Jets"},{"date":"","time":"13:00:00","away_team":"Miami Dolphins","home_team":"Denver Broncos"},{"date":"","time":"13:00:00","away_team":"San Francisco 49ers","home_team":"Minnesota Vikings"},{"date":"","time":"16:05:00","away_team":"Green Bay Packers","home_team":"Seattle Seahawks"},{"date":"","time":"16:05:00","away_team":"New England Patriots","home_team":"Los Angeles Chargers"},{"date":"","time":"16:25:00","away_team":"Dallas Cowboys","home_team":"New Orleans Saints"},{"date":"","time":"16:25:00","away_team":"Detroit Lions","home_team":"Tampa Bay Buccaneers"},{"date":"","time":"20:20:00","away_team":"Pittsburgh Steelers","home_team":"Philadelphia Eagles"},{"date":"Mon Dec 8","time":"20:15:00","away_team":"Buffalo Bills","home_team":"Miami Dolphins"}],"Week 15":[{"date":"Thu Dec 11","time":"20:15:00","away_team":"Cincinnati Bengals","home_team":"Cleveland Browns"},{"date":"Sat Dec 13","time":"13:00:00","away_team":"Detroit Lions","home_team":"Chicago Bears"},{"date":"","time":"13:00:00","away_team":"Green Bay Packers","home_team":"Arizona Cardinals"},{"date":"","time":"13:00:00","away_team":"Indianapolis Colts","home_team":"Pittsburgh Steelers"},{"date":"","time":"13:00:00","away_team":"Los Angeles Rams","home_team":"Buffalo Bills"},{"date":"","time":"13:00:00","away_team":"New York Giants","home_team":"Tampa Bay Buccaneers"},{"date":"","time":"13:00:00","away_team":"Tennessee Titans","home_team":"Kansas City Chiefs"},{"date":"","time":"16:05:00","away_team":"Carolina Panthers","home_team":"Houston Texans"},{"date":"","time":"16:05:00","away_team":"Jacksonville Jaguars","home_team":"Las Vegas Raiders"},{"date":"","time":"16:05:00","away_team":"Minnesota Vikings","home_team":"Seattle Seahawks"},{"date":"","time":"16:25:00","away_team":"Atlanta Falcons","home_team":"San Francisco 49ers"},{"date":"","time":"16:25:00","away_team":"Baltimore Ravens","home_team":"Dallas Cowboys"},{"date":"","time":"20:20:00","away_team":"Kansas City Chiefs","home_team":"Denver Broncos"},{"date":"Sun Dec 14","time":"20:20:00","away_team":"Las Vegas Raiders","home_team":"Los Angeles Chargers"},{"date":"Mon Dec 15","time":"20:15:00","away_team":"Miami Dolphins","home_team":"New York Jets"},{"date":"","time":"20:15:00","away_team":"New England Patriots","home_team":"Seattle Seahawks"}],"Week 16":[{"date":"Thu Dec 18","time":"20:15:00","away_team":"Tampa Bay Buccaneers","home_team":"Jacksonville Jaguars"},{"date":"Sat Dec 20","time":"13:00:00","away_team":"Atlanta Falcons","home_team":"Washington Commanders"},{"date":"","time":"13:00:00","away_team":"Carolina Panthers","home_team":"Denver Broncos"},{"date":"","time":"13:00:00","away_team":"Cleveland Browns","home_team":"Buffalo Bills"},{"date":"","time":"13:00:00","away_team":"Houston Texans","home_team":"Tennessee Titans"},{"date":"","time":"13:00:00","away_team":"Las Vegas Raiders","home_team":"Indianapolis Colts"},{"date":"","time":"13:00:00","away_team":"Los Angeles Chargers","home_team":"Kansas City Chiefs"},{"date":"","time":"13:00:00","away_team":"New Orleans Saints","home_team":"Green Bay Packers"},{"date":"","time":"13:00:00","away_team":"Pittsburgh Steelers","home_team":"Baltimore Ravens"},{"date":"","time":"16:05:00","away_team":"San Francisco 49ers","home_team":"Dallas Cowboys"},{"date":"","time":"16:05:00","away_team":"Seattle Seahawks","home_team":"Detroit Lions"},{"date":"","time":"16:25:00","away_team":"Chicago Bears","home_team":"Arizona Cardinals"},{"date":"","time":"16:25:00","away_team":"Cincinnati Bengals","home_team":"Philadelphia Eagles"},{"date":"","time":"20:20:00","away_team":"Buffalo Bills","home_team":"New England Patriots"},{"date":"Sun Dec 21","time":"20:20:00","away_team":"Indianapolis Colts","home_team":"Miami Dolphins"},{"date":"Mon Dec 22","time":"20:15:00","away_team":"New York Jets","home_team":"San Francisco 49ers"}],"Week 17":[{"date":"Thu Dec 25","time":"16:30:00","away_team":"Kansas City Chiefs","home_team":"Pittsburgh Steelers"},{"date":"Sat Dec 27","time":"01:00:00","away_team":"Atlanta Falcons","home_team":"Las Vegas Raiders"},{"date":"","time":"01:00:00","away_team":"Baltimore Ravens","home_team":"Indianapolis Colts"},{"date":"","time":"01:00:00","away_team":"Detroit Lions","home_team":"Houston Texans"},{"date":"","time":"01:00:00","away_team":"Green Bay Packers","home_team":"Carolina Panthers"},{"date":"","time":"01:00:00","away_team":"Jacksonville Jaguars","home_team":"Chicago Bears"},{"date":"","time":"01:00:00","away_team":"Minnesota Vikings","home_team":"Tampa Bay Buccaneers"},{"date":"","time":"01:00:00","away_team":"New York Giants","home_team":"Baltimore Ravens"},{"date":"","time":"01:00:00","away_team":"Philadelphia Eagles","home_team":"Dallas Cowboys"},{"date":"","time":"01:00:00","away_team":"Seattle Seahawks","home_team":"Arizona Cardinals"},{"date":"","time":"04:05:00","away_team":"Carolina Panthers","home_team":"Los Angeles Rams"},{"date":"","time":"04:25:00","away_team":"Buffalo Bills","home_team":"Los Angeles Chargers"},{"date":"","time":"08:20:00","away_team":"Houston Texans","home_team":"Tennessee Titans"},{"date":"Sun Dec 28","time":"16:30:00","away_team":"Las Vegas Raiders","home_team":"Kansas City Chiefs"},{"date":"","time":"16:30:00","away_team":"Los Angeles Rams","home_team":"San Francisco 49ers"},{"date":"","time":"16:30:00","away_team":"New York Jets","home_team":"Green Bay Packers"}],"Week 18":[{"date":"Sat Jan 3","time":"16:30:00","away_team":"Atlanta Falcons","home_team":"Kansas City Chiefs"},{"date":"Sun Jan 4","time":"13:00:00","away_team":"Arizona Cardinals","home_team":"Seattle Seahawks"},{"date":"","time":"13:00:00","away_team":"Baltimore Ravens","home_team":"Houston Texans"},{"date":"","time":"13:00:00","away_team":"Buffalo Bills","home_team":"Cleveland Browns"},{"date":"","time":"13:00:00","away_team":"Chicago Bears","home_team":"Tampa Bay Buccaneers"},{"date":"","time":"13:00:00","away_team":"Cincinnati Bengals","home_team":"Tennessee Titans"},{"date":"","time":"13:00:00","away_team":"Denver Broncos","home_team":"New Orleans Saints"},{"date":"","time":"13:00:00","away_team":"Green Bay Packers","home_team":"Minnesota Vikings"},{"date":"","time":"13:00:00","away_team":"Indianapolis Colts","home_team":"Jacksonville Jaguars"},{"date":"","time":"13:00:00","away_team":"Los Angeles Chargers","home_team":"Carolina Panthers"},{"date":"","time":"13:00:00","away_team":"New England Patriots","home_team":"Miami Dolphins"},{"date":"","time":"13:00:00","away_team":"New York Giants","home_team":"Philadelphia Eagles"},{"date":"","time":"13:00:00","away_team":"Pittsburgh Steelers","home_team":"New York Jets"},{"date":"","time":"13:00:00","away_team":"San Francisco 49ers","home_team":"Dallas Cowboys"},{"date":"","time":"13:00:00","away_team":"Washington Commanders","home_team":"Los Angeles Rams"},{"date":"","time":"13:00:00","away_team":"Detroit Lions","home_team":"Cincinnati Bengals"}]};

  // Utility to clean team names by removing footnote symbols and extra whitespace
  function cleanTeamName(name) {
    return name
      .replace(/[\*¹²³⁴⁵⁶⁷⁸⁹⁰]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Build the URL for a team's logo based on its cleaned name
  function getLogoUrl(teamName) {
    const cleanName = cleanTeamName(teamName);
    const abbr = teamAbbr[cleanName];
    if (abbr) {
      return `logos/${abbr}.png`;
    }
    return '';
  }

  // Convert an Eastern Time string (HH:MM:SS) to Pacific Time string in 12‑hour format.
  // The returned string always includes the (PST) suffix to clearly denote the timezone.
  function convertToPST(timeStr) {
    // Expect format HH:MM:SS
    const parts = timeStr.split(':');
    if (parts.length < 2) return `${timeStr} (PST)`;
    let hours = parseInt(parts[0], 10);
    const minutes = parts[1];
    // subtract 3 hours to convert Eastern to Pacific (during DST)
    hours = (hours - 3 + 24) % 24;
    // Determine AM/PM and 12‑hour clock
    const period = hours >= 12 ? 'PM' : 'AM';
    const hr12 = hours % 12 || 12;
    return `${hr12}:${minutes} ${period} (PST)`;
  }

  // Initialize the user selection dropdown
  function initUserSelect() {
    // Populate options
    users.forEach((user) => {
      const option = document.createElement('option');
      option.value = user;
      option.textContent = user;
      userSelect.appendChild(option);
    });
    // Restore previous user selection from localStorage if available
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser && users.includes(savedUser)) {
      userSelect.value = savedUser;
    }
    // Listen for changes
    userSelect.addEventListener('change', () => {
      localStorage.setItem('currentUser', userSelect.value);
      // After selecting a new user, reload schedule to show picks
      renderWeek(currentWeekKey);
    });
  }

  // Build week navigation buttons
  let currentWeekKey = '';
  function initWeekNav() {
    weekNav.innerHTML = '';
    const weekKeys = Object.keys(schedule);
    weekKeys.forEach((weekKey, index) => {
      const button = document.createElement('button');
      button.textContent = weekKey;
      button.addEventListener('click', () => {
        currentWeekKey = weekKey;
        renderWeek(weekKey);
        // Update active state
        document
          .querySelectorAll('#week-nav button')
          .forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
      });
      weekNav.appendChild(button);
      // Activate first week by default
      if (index === 0) {
        currentWeekKey = weekKey;
        button.classList.add('active');
      }
    });
  }

  // Retrieve picks from localStorage
  function getPicks() {
    try {
      const picks = JSON.parse(localStorage.getItem('picks') || '{}');
      return picks;
    } catch (err) {
      return {};
    }
  }

  // Retrieve pick timestamps from localStorage.  This object mirrors the
  // structure of the picks object but stores when each selection was made.
  function getPickTimes() {
    try {
      const times = JSON.parse(localStorage.getItem('pickTimes') || '{}');
      return times;
    } catch (err) {
      return {};
    }
  }


  // Save pick timestamps to localStorage
  function savePickTimes(times) {
    localStorage.setItem('pickTimes', JSON.stringify(times));
  }

  // Save picks to localStorage
  function savePicks(picks) {
    localStorage.setItem('picks', JSON.stringify(picks));
  }


  // Temporary storage for the user’s current week picks until they submit
  let pendingPicks = {};

  // Object to store the actual winners for each game.  Each key is a week name
  // (e.g. "Week 1") and the value is an object where the numeric index of the
  // game maps to the winning side: either 'home' or 'away'.
  // Populate this object as game results become available to enable accurate
  // score tracking. If a week is not present or a game index is missing,
  // that game will not be scored.
  const weekWinners = {};

  /**
   * Compute the win-loss record for each team based on the data in weekWinners.
   * The returned object maps a cleaned team name to an object with wins and
   * losses counts. Teams with no recorded games will have 0 wins and 0 losses.
   */
  function computeTeamRecords() {
    const records = {};
    // Initialize records for each team in the schedule to 0-0
    Object.keys(teamAbbr).forEach((teamName) => {
      const cleanName = cleanTeamName(teamName);
      records[cleanName] = { wins: 0, losses: 0 };
    });
    // Iterate over each week and each recorded winner
    Object.keys(weekWinners).forEach((wk) => {
      const winners = weekWinners[wk];
      const games = schedule[wk];
      if (!winners || !games) return;
      Object.keys(winners).forEach((gameIndex) => {
        const idx = parseInt(gameIndex, 10);
        const result = winners[gameIndex];
        const game = games[idx];
        if (!game) return;
        const awayTeam = cleanTeamName(game.away_team);
        const homeTeam = cleanTeamName(game.home_team);
        if (result === 'home') {
          // Home team won
          if (!records[homeTeam]) records[homeTeam] = { wins: 0, losses: 0 };
          if (!records[awayTeam]) records[awayTeam] = { wins: 0, losses: 0 };
          records[homeTeam].wins += 1;
          records[awayTeam].losses += 1;
        } else if (result === 'away') {
          // Away team won
          if (!records[homeTeam]) records[homeTeam] = { wins: 0, losses: 0 };
          if (!records[awayTeam]) records[awayTeam] = { wins: 0, losses: 0 };
          records[awayTeam].wins += 1;
          records[homeTeam].losses += 1;
        }
      });
    });
    return records;
  }

  /**
   * Generates a random bright color for confetti pieces. Used by the
   * fireworks animation displayed after a user submits their picks.
   */
  function randomConfettiColor() {
    const colors = ['#ff4d4d', '#ffb84d', '#ffe04d', '#4dff88', '#4dccff', '#b84dff'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  /**
   * Display a full‑screen overlay with a celebratory confetti animation.
   * A message will appear in the center of the overlay. The overlay
   * automatically removes itself after a few seconds.
   *
   * @param {string} message The message to display.
   */
  function showFireworks(message) {
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'fireworks-overlay';
    // Create message element
    const msg = document.createElement('div');
    msg.className = 'fireworks-message';
    msg.textContent = message;
    overlay.appendChild(msg);
    // Generate a collection of confetti pieces that explode outward from the center
    const confettiCount = 180;
    for (let i = 0; i < confettiCount; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      // Randomize color for each piece
      piece.style.backgroundColor = randomConfettiColor();
      // Randomize size between 15 and 35 pixels for a bolder effect
      const size = 15 + Math.random() * 20;
      piece.style.setProperty('--size', size + 'px');
      // Determine a random destination relative to the viewport size
      // These offsets will be applied via CSS transform in the confetti-move keyframe
      const destX = (Math.random() - 0.5) * window.innerWidth;
      const destY = (Math.random() - 0.5) * window.innerHeight;
      piece.style.setProperty('--dest-x', destX + 'px');
      piece.style.setProperty('--dest-y', destY + 'px');
      // Randomize duration between 0.8s and 1.5s
      const duration = 0.8 + Math.random() * 0.7;
      piece.style.setProperty('--duration', duration + 's');
      overlay.appendChild(piece);
    }
    // Append overlay to body
    document.body.appendChild(overlay);
    // Remove overlay after animations complete (e.g. after 2.5 seconds)
    setTimeout(() => {
      overlay.remove();
    }, 2500);
  }

  /**
   * Update the scoreboard table based on saved picks and actual winners.
   *
   * The scoreboard displays each user across columns for each week and
   * calculates how many correct picks they have once winners are provided.
   * A total column aggregates correct picks across all weeks. When there are
   * no winners for a game yet, users simply see blanks for that game. This
   * function can be called whenever picks or winners change to refresh the
   * scoreboard.
   */
  function updateScoreboard() {
    const scoreboardContainer = document.getElementById('scoreboard-content');
    if (!scoreboardContainer) return;
    // Clear previous content
    scoreboardContainer.innerHTML = '';

    const weekKeys = Object.keys(schedule);
    // Build table
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    // First header cell is for user names
    const firstTh = document.createElement('th');
    firstTh.textContent = 'User';
    headerRow.appendChild(firstTh);
    // Create a header cell for each week (shortened form like W1, W2) and a total column
    weekKeys.forEach((wk, i) => {
      const th = document.createElement('th');
      th.textContent = `W${i + 1}`;
      headerRow.appendChild(th);
    });
    const totalTh = document.createElement('th');
    totalTh.textContent = 'Total';
    headerRow.appendChild(totalTh);
    table.appendChild(headerRow);

    // Build rows for each user
    users.forEach((usr) => {
      const row = document.createElement('tr');
      // Name cell
      const nameTd = document.createElement('td');
      nameTd.textContent = usr;
      row.appendChild(nameTd);
      let totalCorrect = 0;
      weekKeys.forEach((wk) => {
        const cell = document.createElement('td');
        const userPicks = getPicks()[usr] && getPicks()[usr][wk];
        const winners = weekWinners[wk];
        let correctCount = 0;
        if (userPicks && winners) {
          Object.keys(winners).forEach((gameIndex) => {
            const winnerSide = winners[gameIndex];
            if (userPicks[gameIndex] && userPicks[gameIndex] === winnerSide) {
              correctCount += 1;
            }
          });
        }
        // Add to total
        totalCorrect += correctCount;
        // Display the number of correct picks if winners exist, otherwise blank
        cell.textContent = winners ? correctCount.toString() : '';
        row.appendChild(cell);
      });
      // Total cell
      const totalTd = document.createElement('td');
      totalTd.textContent = totalCorrect > 0 ? totalCorrect.toString() : '';
      row.appendChild(totalTd);
      table.appendChild(row);
    });
    scoreboardContainer.appendChild(table);
  }

  // Save pending picks for the current user/week to localStorage
  function savePendingPicks(weekKey) {
    const currentUser = userSelect.value;
    if (!currentUser) return;
    const picks = getPicks();
    if (!picks[currentUser]) picks[currentUser] = {};
    picks[currentUser][weekKey] = { ...pendingPicks };
    savePicks(picks);

    // Record the timestamp for each selection.  We overwrite any existing
    // timestamp for the same pick when the user submits again.  The
    // timestamp is stored in ISO 8601 format for portability.
    const pickTimes = getPickTimes();
    if (!pickTimes[currentUser]) pickTimes[currentUser] = {};
    if (!pickTimes[currentUser][weekKey]) pickTimes[currentUser][weekKey] = {};
    Object.keys(pendingPicks).forEach((index) => {
      pickTimes[currentUser][weekKey][index] = new Date().toISOString();
    });
    savePickTimes(pickTimes);
    // Refresh scoreboard after saving picks
    updateScoreboard();
    // Celebrate submission with a fireworks animation and message
    showFireworks('Are You Ready For Some Football?!');
  }

  // Handle selection of a pick for a particular game
  function handlePick(weekKey, gameIndex, selectedTeam) {
    const currentUser = userSelect.value;
    if (!currentUser) return;
    const picks = getPicks();
    if (!picks[currentUser]) picks[currentUser] = {};
    if (!picks[currentUser][weekKey]) picks[currentUser][weekKey] = {};
    picks[currentUser][weekKey][gameIndex] = selectedTeam;
    savePicks(picks);
  }

  // Render a particular week’s games
  function renderWeek(weekKey) {
    scheduleContainer.innerHTML = '';
    const games = schedule[weekKey] || [];
    const picks = getPicks();
    const currentUser = userSelect.value;
    const userPicks = (picks[currentUser] && picks[currentUser][weekKey]) || {};

    // Compute current win/loss records for all teams
    const teamRecords = computeTeamRecords();

    // Reset pending picks to previously saved picks
    pendingPicks = { ...userPicks };

    // Determine day-of-week sections
    // We will create sections for common NFL game days in order: Thursday, Friday, Saturday, Sunday, Monday
    const dayOrder = ['Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'];
    const daySections = {};
    dayOrder.forEach((dayName) => {
      const section = document.createElement('div');
      section.className = 'day-section';
      const header = document.createElement('h3');
      header.textContent = dayName;
      section.appendChild(header);
      const gamesContainer = document.createElement('div');
      gamesContainer.className = 'day-games';
      section.appendChild(gamesContainer);
      scheduleContainer.appendChild(section);
      daySections[dayName] = gamesContainer;
    });

    // Map abbreviations to full day names
    const dayMap = {
      Thu: 'Thursday',
      Fri: 'Friday',
      Sat: 'Saturday',
      Sun: 'Sunday',
      Mon: 'Monday'
    };
    let currentDayAbbr = '';
    let currentDateStr = '';
    // Iterate games and append to appropriate day section
    games.forEach((game, index) => {
      // Update day-of-week abbreviation when a new date is provided
      if (game.date && game.date.trim() !== '') {
        const parts = game.date.split(' ');
        currentDayAbbr = parts[0];
        currentDateStr = game.date;
      }
      const dayName = dayMap[currentDayAbbr] || 'Thursday';
      // Build the game element
      const gameDiv = document.createElement('div');
      // Apply both game and card classes for consistent styling
      gameDiv.className = 'game card';
      // Away team
      const awayDiv = document.createElement('div');
      awayDiv.className = 'team';
      const awayImg = document.createElement('img');
      awayImg.src = getLogoUrl(game.away_team);
      awayImg.alt = game.away_team + ' logo';
      const awayName = document.createElement('span');
      {
        const cleanName = cleanTeamName(game.away_team);
        const rec = teamRecords[cleanName] || { wins: 0, losses: 0 };
        awayName.textContent = `${cleanName} (${rec.wins}-${rec.losses})`;
      }
      awayDiv.appendChild(awayImg);
      awayDiv.appendChild(awayName);
      // Home team
      const homeDiv = document.createElement('div');
      homeDiv.className = 'team';
      const homeImg = document.createElement('img');
      homeImg.src = getLogoUrl(game.home_team);
      homeImg.alt = game.home_team + ' logo';
      const homeName = document.createElement('span');
      {
        const cleanNameH = cleanTeamName(game.home_team);
        const recH = teamRecords[cleanNameH] || { wins: 0, losses: 0 };
        homeName.textContent = `${cleanNameH} (${recH.wins}-${recH.losses})`;
      }
      // Add a small football icon next to the home team to denote home status
      const homeIcon = document.createElement('img');
      homeIcon.className = 'home-icon';
      homeIcon.src = 'icons/football.svg';
      homeIcon.alt = 'Home';
      homeDiv.appendChild(homeImg);
      homeDiv.appendChild(homeName);
      homeDiv.appendChild(homeIcon);
      // Build time string (date and converted PST time)
      const pstTime = convertToPST(game.time);
      const dateStr = game.date ? game.date : '';
      // Create a top time element displaying date and time
      const timeDiv = document.createElement('div');
      timeDiv.className = 'game-time';
      timeDiv.textContent = `${dateStr}${dateStr ? ' ' : ''}${pstTime}`;
      // Separator element between teams
      const vsDiv = document.createElement('div');
      vsDiv.className = 'versus';
      vsDiv.textContent = 'vs';
      // Pre-select previously saved pick by adding the selected class
      if (userPicks && userPicks[index] === 'away') {
        awayDiv.classList.add('selected');
      } else if (userPicks && userPicks[index] === 'home') {
        homeDiv.classList.add('selected');
      }
      // Determine if this game is within 30 minutes of its start time; if so, lock selections
      // Only attempt to parse date/time if a date is available
      let gameLocked = false;
      if (currentDateStr && game.time) {
        const parseGameDateTime = (dateStr, timeStr) => {
          // Example dateStr: "Thu Sep 4". Extract month and day
          const parts = dateStr.split(' ');
          const monthMap = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
          const monthAbbr = parts[1];
          const day = parseInt(parts[2], 10);
          const monthIndex = monthMap[monthAbbr];
          const timeParts = timeStr.split(':');
          let h = parseInt(timeParts[0], 10);
          const m = parseInt(timeParts[1], 10);
          const s = parseInt(timeParts[2], 10);
          // Create a Date object in local time (Pacific) by using the schedule year (2025)
          const dt = new Date(2025, monthIndex, day, h, m, s);
          // Convert Eastern to Pacific by subtracting 3 hours
          dt.setHours(dt.getHours() - 3);
          return dt;
        };
        try {
          const start = parseGameDateTime(currentDateStr, game.time);
          const lockTime = new Date(start.getTime() - 30 * 60 * 1000);
          const now = new Date();
          if (now >= lockTime) {
            gameLocked = true;
          }
        } catch (e) {
          console.error('Error parsing game date/time', e);
        }
      }
      // Click handlers for picks
      if (!gameLocked) {
        awayDiv.addEventListener('click', () => {
          pendingPicks[index] = 'away';
          awayDiv.classList.add('selected');
          homeDiv.classList.remove('selected');
        });
        homeDiv.addEventListener('click', () => {
          pendingPicks[index] = 'home';
          homeDiv.classList.add('selected');
          awayDiv.classList.remove('selected');
        });
      } else {
        awayDiv.classList.add('locked');
        homeDiv.classList.add('locked');
      }
      // For all games, stack the time above both teams and list teams vertically with a separator
      // Append time at the top
      gameDiv.appendChild(timeDiv);
      // Append the away team
      gameDiv.appendChild(awayDiv);
      // Append the versus separator
      gameDiv.appendChild(vsDiv);
      // Append the home team
      gameDiv.appendChild(homeDiv);
      // Append to appropriate day section; if section doesn't exist (unexpected day), append to Thursday by default
      const container = daySections[dayName] || daySections['Thursday'];
      container.appendChild(gameDiv);
    });

    // Hide day sections that have no games for this week to avoid empty headings
    dayOrder.forEach((dayName) => {
      const container = daySections[dayName];
      // container.parentNode is the section element
      if (container && container.childNodes.length === 0) {
        container.parentNode.style.display = 'none';
      }
    });

    // Add submit button at the bottom of the schedule container
    const submitContainer = document.createElement('div');
    submitContainer.className = 'submit-container';
    const submitBtn = document.createElement('button');
    submitBtn.id = 'submit-btn';
    submitBtn.textContent = 'Submit Picks';
    // Always allow submitting picks; actual locking is handled per game based on time
    submitBtn.addEventListener('click', () => savePendingPicks(weekKey));
    submitContainer.appendChild(submitBtn);
    scheduleContainer.appendChild(submitContainer);
  }

  // Initialise the interface after the DOM has loaded
  document.addEventListener('DOMContentLoaded', () => {
    initUserSelect();
    initWeekNav();
    renderWeek(currentWeekKey);
    // Initialise scoreboard on first load
    updateScoreboard();
  });
})();