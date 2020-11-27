//Required packages
var readLineSync = require('readline-sync');
var fs = require('fs');
const chalk = require('chalk'); 


//Question and answer sets of the Quiz
var quiz = {
  questions: [
   'When was the IPL started?',
   'Which player has the nickname "Mr 360"?',
   'How many times did RCB win IPL? ;)',
   'Which state is MS Dhoni from?',
   'Which team has most IPL trophies?',
   'Which cricketer has the highest individual score in ODI',
   'Who has the highest individual score in Test Cricket?',
   'Which country has the most World cups?',
   'Who is the highest wicket taker in cricket?',
   'Who bowled the fastest ball in cricket?',
   'Which teams played the first international cricket match?',
   'Which year did Sachin Tendulkar retire from ODI?',
   'Which team has the highest score in ODI ?',
   'Which team has the highest sucessful chase in ODI?',
   'Who hit the longest six in cricket history ?'
   ],
  options : [
     ['2007', '2008', '2009', '2006'],
     ['Chris Gayle', 'Adam Gilchrist', 'MS Dhoni', 'AB deVilliers'],
     ['5', '6', '10', '0'],
     ['Maharashtra', 'Jharkhand', 'Uttrakhand', 'Bihar'],
     ['MI', 'CSK', 'KKR', 'RCB'],
     ['Martin Guptill', 'Chris Gayle', 'David Warner', 'Rohit Sharma'],
     ['Martin Guptill', 'Chris Gayle', 'Virender Sehwag', 'Brian Lara'],
     ['West Indies', 'India', 'England', 'Australia'],
     ['Muttaiah Muralitharan', 'Mitchell Stark', 'Ishant Sharma', 'R Ashwin'],
     ['Shoaib Akhtar', 'Brett Lee', 'Shaun Tait', 'Tino Best'],
     ['Australia & England', 'India & England', 'England & South Africa', 'Canada and The USA'],
     ['2012', '2013', '2011', '2014'],
     ['Australia', 'South Africa', 'India', 'England'],
     ['Australia', 'South Africa', 'India', 'West Indies'],
     ['Chris Gayle', 'MS Dhoni', 'Yuvraj Singh', 'Shahid Afridi'] 
    ],
  numOptions :['a', 'b', 'c', 'd'],
  correctOption : ['b', 'd', 'd', 'b', 'a',
  'd', 'd', 'd', 'a', 'a',
  'd', 'a', 'd', 'b', 'd'
  ]


};

//Welcome message before quiz
console.log(chalk.yellow('Heyy there! Lets test your knowledge of'), 'Cricket :D');
console.log(chalk.yellow('Enter the correct option out of'), 'a, b, c, d',chalk.yellow('for every MCQ.'));
console.log(chalk.yellow('Answer at least'), '3', chalk.yellow('questions out of'), '5', chalk.yellow('to move in to the next level!!\n'));

//Taking username and greeting the user
var userName = readLineSync.question('Enter your name to begin...\n');
console.log('All the best', chalk.yellow(userName), "let's go!!\n");

//Quiz processing: Displaying question, their options, and taking user's answers, evaluating them and calcultaing scores and levels
var score = 0;
console.log("-----------------------------------------------------------");
console.log(chalk.red("LEVEL 1"));
console.log("-----------------------------------------------------------");
for(var i = 0; i < 15; i++){
  if(i+1 == 6 && score >= 3){
    console.log(chalk.red("Congrats!! you've made it into the"),("LEVEL 2"));
    console.log(chalk.red("LEVEL 2"));
    console.log();
    console.log("-----------------------------------------------------------");
  }
  if(i+1 == 6 && score < 3){
    console.log(chalk.yellow("Sorry, you couldn't clear Level 1 :("));
    break;
  }
  if(i+1 == 11 && score >= 6){
    console.log(chalk.red("Congrats!! you've made it into the"),("LEVEL 3"));
    console.log(chalk.red("LEVEL 3"));
    console.log();
    console.log("-----------------------------------------------------------");
  }
  if(i+1 == 11 && score < 6){
    console.log(chalk.yellow("Sorry, you couldn't clear Level 2 :("));
    break;
  }
  var qNum = i+1 + ')';
  console.log(chalk.yellow(qNum, quiz.questions[i]));
  for(var j = 0; j < 4; j++){
    var option = quiz.numOptions[j] + '.';
    console.log(option, quiz.options[i][j]);
  }

  console.log();
  var userAns = readLineSync.question('Your answer: ');
  console.log();
  if(userAns === quiz.correctOption[i]){
    score ++;
    console.log(chalk.green('Correct answer!!'));
    console.log(chalk.green('Current Score:', score));

  }else{
    console.log(chalk.blue('Wrong answer :('));
    console.log(chalk.blue('Current Score:', score));
  }
  console.log();
  console.log("----------------------------------------------------------");
 
}

//Displaying final score
console.log("----------------------------------------------------------");
console.log(chalk.red("FINAL SCORE : "), chalk.red(score));
console.log("----------------------------------------------------------");
console.log();

//Checking leaderboard and if the user has made it into the Leaderboard
var read = fs.readFileSync('leaderboard.json');
var lboardRead = JSON.parse(read);

var mn = 4;
var flag = 0;

for(var i = 4; i >= 0; i--){
  if(score >= lboardRead.score[i] && score > 0){
    flag = 1;
    mn = Math.min(mn, i);
  }
}

if(flag == 1){
  console.log(chalk.yellow('Yay!!! You made it into the leaderboard!!!'));
}

if(mn < 4){
  var prevName = lboardRead.name[mn];
  var prevScore = lboardRead.score[mn];
  lboardRead.name[mn + 1] = prevName;
  lboardRead.score[mn + 1] = prevScore;
  lboardRead.name[mn] = userName;
  lboardRead.score[mn] = score;
}else{
  lboardRead.name[mn] = userName;
  lboardRead.score[mn] = score;
}

console.log("Rank         Name          Score")
for(var i = 0; i < 5; i++){
  var rank = i+1;
  console.log(rank,"     ",lboardRead.name[i], "   ", lboardRead.score[i]);
}

const data = JSON.stringify(lboardRead, null, 2);
fs.writeFile('leaderboard.json', data, (err) => {
  if (err) throw err;
  console.log('The Leader Board has been updated successfully!');
});