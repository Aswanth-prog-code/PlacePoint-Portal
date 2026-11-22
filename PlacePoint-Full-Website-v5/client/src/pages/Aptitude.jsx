import React, { useMemo, useState } from 'react';
import { currentProfile, saveProgressToServer, studentStorageKey } from '../services/api';

const questionBank = {
  Beginner: {
    Quantitative: [
      {q:'What is 25% of 200?',options:['25','40','50','75'],answer:2,explain:'25% is one-fourth. 200 ÷ 4 = 50.'},
      {q:'A pen costs ₹12. What is the cost of 5 pens?',options:['₹50','₹55','₹60','₹65'],answer:2,explain:'12 × 5 = ₹60.'}
    ],
    'Logical Reasoning': [
      {q:'Find the next number: 2, 4, 6, 8, ?',options:['9','10','11','12'],answer:1,explain:'The sequence increases by 2 each time. The next number is 10.'},
      {q:'Which one is different: Apple, Mango, Carrot, Banana?',options:['Apple','Mango','Carrot','Banana'],answer:2,explain:'Carrot is a vegetable; the others are fruits.'}
    ],
    Verbal: [
      {q:'Choose the synonym of “happy”.',options:['Angry','Joyful','Tired','Nervous'],answer:1,explain:'Joyful means feeling or expressing happiness.'},
      {q:'Choose the correct sentence in the simple present tense.',options:['He play cricket.','He plays cricket.','He playing cricket.','He played cricket every day.'],answer:1,explain:'For “he” in the simple present tense, use “plays”.'}
    ]
  },
  Intermediate: {
    Quantitative: [
      {q:'A product marked at ₹800 is sold at a 10% discount. What is its selling price?',options:['₹700','₹720','₹740','₹760'],answer:1,explain:'10% of ₹800 is ₹80. Selling price = ₹800 − ₹80 = ₹720.'},
      {q:'A train travels 150 km in 3 hours. What is its average speed?',options:['40 km/h','45 km/h','50 km/h','60 km/h'],answer:2,explain:'Average speed = distance ÷ time = 150 ÷ 3 = 50 km/h.'}
    ],
    'Logical Reasoning': [
      {q:'Find the next number: 2, 6, 12, 20, 30, ?',options:['36','40','42','44'],answer:2,explain:'The differences are 4, 6, 8, 10. The next difference is 12, so 30 + 12 = 42.'},
      {q:'If all roses are flowers and some flowers fade quickly, which statement must be true?',options:['All roses fade quickly','Some roses fade quickly','All roses are flowers','No flowers are roses'],answer:2,explain:'The first statement directly tells us that all roses belong to the category of flowers.'}
    ],
    Verbal: [
      {q:'Choose the word closest in meaning to “concise”.',options:['Lengthy','Brief','Unclear','Difficult'],answer:1,explain:'Concise means giving information clearly in a few words; brief is the closest meaning.'},
      {q:'Choose the grammatically correct sentence.',options:['She go to college daily.','She going to college daily.','She goes to college daily.','She gone to college daily.'],answer:2,explain:'With the singular subject “she”, the simple present verb takes -s: goes.'}
    ]
  },
  Advanced: {
    Quantitative: [
      {q:'A sum amounts to ₹12,100 in 2 years at 10% compound interest annually. What was the principal?',options:['₹9,000','₹10,000','₹10,500','₹11,000'],answer:1,explain:'Amount = P × 1.1². Therefore P = 12,100 ÷ 1.21 = ₹10,000.'},
      {q:'A can complete a job in 12 days and B in 18 days. How long will they take working together?',options:['6 days','7.2 days','8 days','9 days'],answer:1,explain:'Combined rate = 1/12 + 1/18 = 5/36. Time = 36/5 = 7.2 days.'}
    ],
    'Logical Reasoning': [
      {q:'If 3 workers complete 3 units in 3 hours, how many hours do 6 workers take to complete 6 units at the same rate?',options:['1.5 hours','3 hours','6 hours','9 hours'],answer:1,explain:'Each worker completes one unit in 3 hours. Six workers can complete six units in 3 hours.'},
      {q:'Find the next term: AZ, BY, CX, DW, ?',options:['EV','FU','EX','EW'],answer:0,explain:'The first letter moves forward alphabetically while the second moves backward: E and V.'}
    ],
    Verbal: [
      {q:'Choose the best replacement: “Despite of the rain, the match continued.”',options:['Despite the rain','Despite from the rain','Although of the rain','No correction'],answer:0,explain:'“Despite” is followed directly by a noun phrase; “of” is not used after it.'},
      {q:'Choose the antonym of “mitigate”.',options:['Reduce','Relieve','Aggravate','Soften'],answer:2,explain:'Mitigate means make less severe; aggravate means make worse.'}
    ]
  }
};

// Additional questions keep each topic and difficulty useful for repeated practice.
questionBank.Beginner.Quantitative.push(
  {q:'A student scores 18 out of 20. What percentage is this?',options:['80%','85%','90%','95%'],answer:2,explain:'18 ÷ 20 × 100 = 90%.'},
  {q:'What is the average of 4, 6 and 8?',options:['5','6','7','8'],answer:1,explain:'(4 + 6 + 8) ÷ 3 = 6.'}
);
questionBank.Beginner['Logical Reasoning'].push(
  {q:'Which number is missing: 5, 10, 15, __, 25?',options:['18','19','20','22'],answer:2,explain:'The sequence increases by 5, so the missing number is 20.'},
  {q:'If MONDAY is coded as NPOEBZ by shifting each letter forward by one, how is CAT coded?',options:['DBU','DBS','CBU','EBU'],answer:0,explain:'C→D, A→B and T→U.'}
);
questionBank.Beginner.Verbal.push(
  {q:'Choose the antonym of “expand”.',options:['Increase','Enlarge','Contract','Extend'],answer:2,explain:'Contract means to become smaller, the opposite of expand.'},
  {q:'Choose the correctly spelled word.',options:['Accomodation','Accommodation','Acommodation','Acomodation'],answer:1,explain:'Accommodation is spelled with double c and double m.'}
);
questionBank.Intermediate.Quantitative.push(
  {q:'A number increases from 80 to 100. What is the percentage increase?',options:['20%','25%','30%','40%'],answer:1,explain:'Increase = 20. Percentage increase = 20 ÷ 80 × 100 = 25%.'},
  {q:'The ratio of boys to girls is 3:2. If there are 25 students, how many are girls?',options:['10','12','15','18'],answer:0,explain:'There are 5 total parts; each part is 25 ÷ 5 = 5. Girls = 2 × 5 = 10.'}
);
questionBank.Intermediate['Logical Reasoning'].push(
  {q:'All engineers are graduates. Some graduates are artists. Which statement must be true?',options:['All artists are engineers','Some engineers are artists','All engineers are graduates','No graduate is an engineer'],answer:2,explain:'The first premise directly states that all engineers are graduates.'},
  {q:'Find the next number: 3, 9, 27, 81, ?',options:['162','189','216','243'],answer:3,explain:'Each term is multiplied by 3; 81 × 3 = 243.'}
);
questionBank.Intermediate.Verbal.push(
  {q:'Choose the correct passive voice: “The team completed the task.”',options:['The task completed the team.','The task was completed by the team.','The task is completing by the team.','The team was completed by the task.'],answer:1,explain:'Simple past active changes to was/were + past participle in passive voice.'},
  {q:'Choose the closest meaning of “abundant”.',options:['Rare','Plentiful','Limited','Insufficient'],answer:1,explain:'Abundant means existing in large quantities; plentiful is closest.'}
);
questionBank.Advanced.Quantitative.push(
  {q:'If x:y = 4:7 and y = 35, what is x?',options:['15','20','25','28'],answer:1,explain:'One ratio part is 35 ÷ 7 = 5. Therefore x = 4 × 5 = 20.'},
  {q:'A 20% discount is followed by a 10% discount on ₹1,000. What is the final price?',options:['₹700','₹720','₹750','₹800'],answer:1,explain:'After 20% off: ₹800. Then 10% off ₹800 gives ₹720.'}
);
questionBank.Advanced['Logical Reasoning'].push(
  {q:'In a code, TABLE is written as UBCMF by shifting every letter forward by one. How is CHAIR written?',options:['DIBJS','DIBIR','DHBJS','DIBJT'],answer:0,explain:'Shift each letter forward: C→D, H→I, A→B, I→J, R→S.'},
  {q:'A is older than B. C is younger than B. D is older than A. Who is the oldest?',options:['A','B','C','D'],answer:3,explain:'D is older than A, and A is older than B; B is older than C. Thus D is oldest.'}
);
questionBank.Advanced.Verbal.push(
  {q:'Choose the grammatically correct sentence.',options:['Neither of the answers are correct.','Neither of the answers is correct.','Neither answers is correct.','Neither of answers are correct.'],answer:1,explain:'Neither is treated as singular in this construction, so use “is”.'},
  {q:'Choose the closest meaning of “pragmatic”.',options:['Idealistic','Practical','Emotional','Theoretical'],answer:1,explain:'Pragmatic describes an approach concerned with practical results.'}
);

const levels = ['Beginner','Intermediate','Advanced'];
const topics = [{name:'Quantitative',sub:'Numbers, percentages and problem solving',icon:'∑',count:'Arithmetic • Numbers'}, {name:'Logical Reasoning',sub:'Patterns, sequences and analytical thinking',icon:'⌘',count:'Patterns • Logic'}, {name:'Verbal',sub:'Grammar, vocabulary and comprehension',icon:'Aa',count:'English • Language'}];

export default function Aptitude() {
  const [level,setLevel] = useState('Beginner'); const [topic,setTopic] = useState('Quantitative'); const [started,setStarted] = useState(false); const [index,setIndex] = useState(0); const [choice,setChoice] = useState(null); const [checked,setChecked] = useState(false); const [score,setScore] = useState(0); const [completed,setCompleted] = useState(false);
  const questions = useMemo(()=>questionBank[level][topic] || questionBank.Beginner.Quantitative,[level,topic]); const current=questions[index];
  function changeTopic(name){setTopic(name);setStarted(false);setIndex(0);setChoice(null);setChecked(false);setScore(0);setCompleted(false);}
  function checkAnswer(){if(choice===null)return;setChecked(true);if(choice===current.answer)setScore(s=>s+1);}
  function nextQuestion(){if(index+1<questions.length){setIndex(i=>i+1);setChoice(null);setChecked(false);}else{setCompleted(true);try{const email=currentProfile()?.email||'guest'; const scoreKey=studentStorageKey('placepoint-aptitude-score',email); const percentKey=studentStorageKey('placepoint-aptitude-percent',email); const detailKey=studentStorageKey('placepoint-aptitude-detail',email); const resultsKey=studentStorageKey('placepoint-aptitude-results',email); localStorage.setItem(scoreKey,String(score)); localStorage.setItem(percentKey,String(Math.round((score/questions.length)*100))); const detail={level,topic,score,total:questions.length,percent:Math.round((score/questions.length)*100),completedAt:new Date().toISOString()}; localStorage.setItem(detailKey,JSON.stringify(detail)); const all=JSON.parse(localStorage.getItem(resultsKey)||'{}'); all[`${level}::${topic}`]=detail; localStorage.setItem(resultsKey,JSON.stringify(all)); saveProgressToServer({ aptitudeResults: all, aptitudeLatest: detail }).catch(error => console.error('Progress sync failed; saved locally for retry:', error.message));}catch{}}}
  return <div className="learning-page"><div className="page-intro"><div><div className="eyebrow">SKILL DEVELOPMENT / 01</div><h1>Aptitude <em>arena.</em></h1><p>Train your thinking. Improve your accuracy. Get placement-ready.</p></div><div className="intro-stamp"><span>03</span><small>CORE<br/>AREAS</small></div></div>
    <div className="level-panel"><div><span className="panel-kicker">SELECT YOUR CURRENT LEVEL</span><h2>Start at your pace</h2><p>You can move up as your confidence grows.</p></div><div className="level-options">{levels.map((l,i)=><button key={l} onClick={()=>{setLevel(l);setStarted(false);setIndex(0);setChoice(null);setChecked(false);setScore(0);setCompleted(false)}} className={`level-button ${level===l?'active':''}`}><span>0{i+1}</span>{l}{level===l&&<b>✓</b>}</button>)}</div></div>
    <div className="section-heading compact"><div><div className="eyebrow">PRACTICE CATEGORIES</div><h2>Pick a subject</h2></div><span className="muted-note">Choose one to begin a sample practice</span></div>
    <div className="topic-grid">{topics.map((t,i)=><button key={t.name} onClick={()=>changeTopic(t.name)} className={`topic-card ${topic===t.name?'chosen':''}`}><span className={`topic-icon topic-${i}`} aria-hidden="true">{t.icon}</span><span className="topic-number">0{i+1}</span><strong>{t.name}</strong><small>{t.sub}</small><span className="topic-foot">{t.count}<b>↗</b></span></button>)}</div>
    <section className="practice-panel"><div className="practice-heading"><div><div className="eyebrow">QUICK PRACTICE</div><h2>{topic} <span>· {level}</span></h2><p>Each topic and difficulty has 10 placement-style questions. Your score is saved to your performance report.</p></div><span className="question-count">{started&&!completed?`${index+1} / ${questions.length}`:`${questions.length} QUESTIONS`}</span></div>
      {!started?<div className="practice-start"><div className="practice-start-icon">✎</div><div><strong>Ready for a quick challenge?</strong><p>Answer {questions.length} multiple-choice questions and review the explanations.</p></div><button className="btn-primary" onClick={()=>setStarted(true)}>Start practice <span>→</span></button></div>:completed?<div className="result-state"><div className="result-score">{score}<small>/{questions.length}</small></div><div><strong>Practice completed</strong><p>You answered {score} out of {questions.length} correctly. Review the explanations and try again to improve.</p><button className="btn-primary" onClick={()=>{setStarted(false);setIndex(0);setChoice(null);setChecked(false);setScore(0);setCompleted(false)}}>Try again ↻</button></div></div>:<div className="quiz-area"><div className="quiz-progress"><span style={{width:`${((index+1)/questions.length)*100}%`}}></span></div><div className="quiz-question"><span>QUESTION {String(index+1).padStart(2,'0')}</span><h3>{current.q}</h3></div><div className="answer-grid">{current.options.map((o,i)=><button key={o} disabled={checked} onClick={()=>setChoice(i)} className={`answer-option ${choice===i?'picked':''} ${checked&&i===current.answer?'correct':''} ${checked&&choice===i&&i!==current.answer?'incorrect':''}`}><b>{String.fromCharCode(65+i)}</b>{o}{checked&&i===current.answer&&<span>✓</span>}</button>)}</div>{checked&&<div className={`answer-explain ${choice===current.answer?'answer-explain-correct':'answer-explain-wrong'}`}><strong>{choice===current.answer?'Correct answer':'Wrong answer — review the correct answer'}</strong><p>{current.explain}</p></div>}<div className="quiz-controls"><span>{checked?'Review the explanation before continuing.':'Select one answer to continue.'}</span>{!checked?<button className="btn-primary" disabled={choice===null} onClick={checkAnswer}>Check answer →</button>:<button className="btn-primary" onClick={nextQuestion}>{index+1===questions.length?'See result':'Next question →'}</button>}</div></div>}
    </section>
  </div>;
}

// Expanded placement aptitude practice: ten questions per topic and difficulty.
questionBank['Beginner']['Quantitative'].push({q:'A shirt costs ₹500 and has a 10% discount. What is the final price?',options:['₹400', '₹450', '₹475', '₹490'],answer:1,explain:'10% of ₹500 is ₹50; final price is ₹450.'},
{q:'What is 3/4 of 80?',options:['40', '50', '60', '70'],answer:2,explain:'80 × 3/4 = 60.'},
{q:'A number is increased from 40 to 50. What is the increase?',options:['5', '10', '15', '20'],answer:1,explain:'50 − 40 = 10.'},
{q:'If 5 notebooks cost ₹75, what is the cost of one?',options:['₹10', '₹12', '₹15', '₹20'],answer:2,explain:'₹75 ÷ 5 = ₹15.'},
{q:'Find the simple interest on ₹1,000 at 5% per year for 1 year.',options:['₹25', '₹50', '₹75', '₹100'],answer:1,explain:'SI = P×R×T/100 = ₹50.'},
{q:'What is the ratio 12:18 in simplest form?',options:['2:3', '3:2', '4:5', '6:9'],answer:0,explain:'Divide both terms by 6 to get 2:3.'});
questionBank['Beginner']['Logical Reasoning'].push({q:'Find the next number: 1, 4, 7, 10, ?',options:['11', '12', '13', '14'],answer:2,explain:'Add 3 each time; next is 13.'},
{q:'Which item does not belong: square, triangle, circle, table?',options:['Square', 'Triangle', 'Circle', 'Table'],answer:3,explain:'Table is not a geometric shape.'},
{q:'If A=1, B=2, C=3, what is the value of CAB?',options:['312', '321', '123', '213'],answer:0,explain:'C=3, A=1 and B=2, so CAB is 312.'},
{q:'Complete the pattern: AB, BC, CD, DE, ?',options:['DF', 'EF', 'FG', 'EE'],answer:1,explain:'Both letters move one step forward; next is EF.'},
{q:'Ravi faces north and turns right. Which direction is he facing?',options:['West', 'East', 'South', 'North'],answer:1,explain:'A right turn from north points east.'},
{q:'Find the missing number: 2, 4, 8, 16, ?',options:['20', '24', '30', '32'],answer:3,explain:'Each term is doubled; next is 32.'});
questionBank['Beginner']['Verbal'].push({q:'Choose the synonym of “rapid”.',options:['Slow', 'Quick', 'Weak', 'Late'],answer:1,explain:'Rapid means quick or fast.'},
{q:'Choose the antonym of “ancient”.',options:['Old', 'Historic', 'Modern', 'Past'],answer:2,explain:'Modern is the opposite of ancient.'},
{q:'Fill in: She is good ___ mathematics.',options:['on', 'at', 'in', 'for'],answer:1,explain:'The standard phrase is “good at mathematics”.'},
{q:'Choose the correctly spelled word.',options:['Separate', 'Seperate', 'Seperete', 'Separete'],answer:0,explain:'Separate is the correct spelling.'},
{q:'Choose the plural of “child”.',options:['Childs', 'Childes', 'Children', 'Childrens'],answer:2,explain:'The irregular plural of child is children.'},
{q:'Choose the correct article: He bought ___ umbrella.',options:['a', 'an', 'the only', 'no article'],answer:1,explain:'Umbrella begins with a vowel sound, so use “an”.'});
questionBank['Intermediate']['Quantitative'].push({q:'A train 120 m long crosses a pole in 6 seconds. What is its speed?',options:['15 m/s', '20 m/s', '25 m/s', '30 m/s'],answer:1,explain:'Speed = 120/6 = 20 m/s.'},
{q:'The average of five numbers is 18. What is their total?',options:['72', '80', '90', '100'],answer:2,explain:'Total = average × count = 18 × 5 = 90.'},
{q:'A shopkeeper buys an item for ₹400 and sells it for ₹460. Find profit percentage.',options:['10%', '12%', '15%', '20%'],answer:2,explain:'Profit is ₹60; 60/400 × 100 = 15%.'},
{q:'A can finish work in 10 days and B in 15 days. What is their combined daily work rate?',options:['1/25', '1/15', '1/6', '1/5'],answer:2,explain:'1/10 + 1/15 = 1/6 of the work per day.'},
{q:'A sum of ₹2,000 earns 8% simple interest for 2 years. Find the interest.',options:['₹160', '₹240', '₹320', '₹400'],answer:2,explain:'SI = 2000×8×2/100 = ₹320.'},
{q:'If 40% of a number is 72, what is the number?',options:['160', '170', '180', '200'],answer:2,explain:'Number = 72/0.4 = 180.'});
questionBank['Intermediate']['Logical Reasoning'].push({q:'Find the next term: 4, 9, 19, 39, ?',options:['59', '69', '79', '89'],answer:2,explain:'Each term is ×2 + 1; 39×2+1 = 79.'},
{q:'If P is taller than Q and Q is taller than R, who is shortest?',options:['P', 'Q', 'R', 'Cannot say'],answer:2,explain:'R is shorter than Q, and Q is shorter than P.'},
{q:'Find the odd pair.',options:['2–4', '3–9', '4–16', '5–20'],answer:3,explain:'The first three map n to n²; 5² should be 25, not 20.'},
{q:'If yesterday was Monday, what day is the day after tomorrow?',options:['Tuesday', 'Wednesday', 'Thursday', 'Friday'],answer:2,explain:'Yesterday Monday means today Tuesday; day after tomorrow is Thursday.'},
{q:'Complete: AZ, BY, CX, ?',options:['DW', 'EV', 'DU', 'EW'],answer:0,explain:'First letters advance and second letters retreat; next is DW.'},
{q:'A is the brother of B; B is the mother of C. How is A related to C?',options:['Father', 'Uncle', 'Brother', 'Grandfather'],answer:1,explain:'A is the maternal uncle of C.'});
questionBank['Intermediate']['Verbal'].push({q:'Choose the closest meaning of “reluctant”.',options:['Willing', 'Uncertain or unwilling', 'Excited', 'Careless'],answer:1,explain:'Reluctant means hesitant or unwilling.'},
{q:'Choose the correct sentence.',options:['Each of the boys have a pen.', 'Each of the boys has a pen.', 'Each boys has a pen.', 'Each boy have a pen.'],answer:1,explain:'Each is singular, so use “has”.'},
{q:'Fill in: The manager insisted ___ punctuality.',options:['at', 'on', 'for', 'with'],answer:1,explain:'The correct collocation is “insisted on”.'},
{q:'Choose the antonym of “scarce”.',options:['Rare', 'Limited', 'Abundant', 'Insufficient'],answer:2,explain:'Abundant means plentiful, opposite to scarce.'},
{q:'Choose the correct passive voice: “They are building a bridge.”',options:['A bridge is built by them.', 'A bridge was built by them.', 'A bridge is being built by them.', 'A bridge has built by them.'],answer:2,explain:'Present continuous passive uses “is being + past participle”.'},
{q:'Choose the correctly punctuated sentence.',options:['Lets eat, Grandma.', 'Let’s eat Grandma.', 'Lets eat Grandma.', 'Let’s eat, Grandma.'],answer:3,explain:'The comma separates the person being addressed.'});
questionBank['Advanced']['Quantitative'].push({q:'A and B invest ₹5,000 and ₹8,000. If profit is ₹3,900, what is B’s share?',options:['₹1,500', '₹2,000', '₹2,400', '₹2,600'],answer:2,explain:'Investment ratio 5:8; B gets 8/13 × 3900 = ₹2,400.'},
{q:'A pipe fills a tank in 6 hours and a leak empties it in 9 hours. How long to fill the tank?',options:['12 h', '15 h', '18 h', '20 h'],answer:2,explain:'Net rate = 1/6 − 1/9 = 1/18 tank per hour.'},
{q:'If x% of 250 is 75, find x.',options:['20', '25', '30', '35'],answer:2,explain:'x = 75/250 × 100 = 30%.'},
{q:'A 20% increase followed by a 20% decrease gives what net change?',options:['No change', '4% decrease', '4% increase', '2% decrease'],answer:1,explain:'1.2 × 0.8 = 0.96, which is a 4% decrease.'},
{q:'Two numbers are in ratio 5:7 and their sum is 96. Find the larger number.',options:['40', '48', '56', '60'],answer:2,explain:'12 parts = 96, one part = 8; larger = 7×8 = 56.'},
{q:'A vehicle covers half a distance at 40 km/h and half at 60 km/h. Find average speed.',options:['45 km/h', '48 km/h', '50 km/h', '52 km/h'],answer:1,explain:'For equal distances, average speed = 2ab/(a+b) = 48 km/h.'});
questionBank['Advanced']['Logical Reasoning'].push({q:'Find the next number: 1, 2, 6, 24, 120, ?',options:['240', '360', '600', '720'],answer:3,explain:'Terms are factorials: 1!, 2!, 3!, 4!, 5!, then 6! = 720.'},
{q:'In a code, MANGO becomes NBOHP. How does APPLE become encoded?',options:['BQQMF', 'BQQLE', 'CQQMF', 'BPPMF'],answer:0,explain:'Each letter shifts forward by one: A→B, P→Q, P→Q, L→M, E→F.'},
{q:'Four people sit in a row. A is left of B; C is right of B; D is left of A. Which order is possible?',options:['D A B C', 'A D B C', 'B A D C', 'D C A B'],answer:0,explain:'D is left of A, A is left of B, and C is right of B.'},
{q:'If all Zips are Zaps and no Zaps are Zops, which must be true?',options:['Some Zips are Zops', 'No Zips are Zops', 'All Zops are Zips', 'Some Zaps are Zips only'],answer:1,explain:'Every Zip is a Zap, and no Zap is a Zop; therefore no Zip is a Zop.'},
{q:'Find the missing pair: (2,4), (3,9), (4,16), (5,?)',options:['20', '25', '30', '36'],answer:1,explain:'The second value is the square of the first; 5² = 25.'},
{q:'A clock shows 3:30. What is the smaller angle between the hands?',options:['60°', '75°', '90°', '105°'],answer:1,explain:'Minute hand is 180°, hour hand is 105°; difference is 75°.'});
questionBank['Advanced']['Verbal'].push({q:'Choose the closest meaning of “ubiquitous”.',options:['Rare', 'Present everywhere', 'Temporary', 'Unclear'],answer:1,explain:'Ubiquitous means found or existing everywhere.'},
{q:'Choose the grammatically correct sentence.',options:['Hardly had he arrived when it started raining.', 'Hardly he had arrived when it started raining.', 'Hardly had he arrive than it started raining.', 'Hardly he arrived than it started raining.'],answer:0,explain:'The construction is “Hardly had … when …”.'},
{q:'Choose the antonym of “ambiguous”.',options:['Vague', 'Uncertain', 'Clear', 'Doubtful'],answer:2,explain:'Clear means unambiguous.'},
{q:'Choose the correct word: The new policy will ___ all employees.',options:['effect', 'affect', 'effects', 'affects'],answer:1,explain:'Affect is the verb meaning to influence.'},
{q:'Choose the best replacement: “He is senior than me.”',options:['senior to me', 'senior from me', 'more senior than me', 'No correction'],answer:0,explain:'Senior is conventionally followed by “to”, not “than”.'},
{q:'Identify the correctly structured sentence.',options:['Despite he was tired, he worked.', 'Although he was tired, he worked.', 'Although of being tired, he worked.', 'Despite of tiredness, he worked.'],answer:1,explain:'Although introduces a clause; despite is followed by a noun phrase or gerund.'});
