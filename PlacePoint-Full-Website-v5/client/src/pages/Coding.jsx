import React, { useMemo, useRef, useState } from 'react';
import { currentProfile, saveProgressToServer, studentStorageKey } from '../services/api';

const languages = ['C', 'C++', 'Java', 'Python', 'JavaScript', 'C#', 'PHP', 'Go', 'SQL', 'Kotlin', 'Rust'];
const levels = ['Beginner', 'Intermediate', 'Advanced'];
const problemBank = {
  Beginner: [
    {title:'Sum of Two Numbers',topic:'Input / Output',time:'10 min',desc:'Read two integers and print their sum.',input:'4 7',output:'11',hint:'Read both values and add them.'},
    {title:'Even or Odd',topic:'Conditionals',time:'10 min',desc:'Determine whether an integer is even or odd.',input:'14',output:'Even',hint:'Use the remainder after division by two.'},
    {title:'Factorial of a Number',topic:'Loops',time:'15 min',desc:'Calculate the factorial of a non-negative integer.',input:'5',output:'120',hint:'Multiply the integers from 1 through n.'},
    {title:'Reverse a Number',topic:'Loops',time:'15 min',desc:'Print the digits of an integer in reverse order.',input:'1234',output:'4321',hint:'Extract the last digit repeatedly.'},
    {title:'Sum of Array Elements',topic:'Arrays',time:'15 min',desc:'Return the sum of all integers in an array.',input:'1 2 3 4 5',output:'15',hint:'Maintain a running total.'},
    {title:'Count Vowels',topic:'Strings',time:'15 min',desc:'Count vowels (a, e, i, o, u) in a given string.',input:'placement',output:'3',hint:'Convert to lowercase and test each character.'},
    {title:'FizzBuzz',topic:'Conditionals',time:'15 min',desc:'For numbers 1 to n, print Fizz for multiples of 3, Buzz for 5, and FizzBuzz for both.',input:'5',output:'1 2 Fizz 4 Buzz',hint:'Check divisibility by 15 before 3 and 5.'},
    {title:'Find the Minimum',topic:'Arrays',time:'15 min',desc:'Find the smallest integer in an array.',input:'4 8 2 9 1',output:'1',hint:'Track the smallest value while traversing.'},
    {title:'Count Digits',topic:'Loops',time:'15 min',desc:'Count the number of digits in a non-negative integer.',input:'90821',output:'5',hint:'Repeatedly divide by 10, handling zero as a special case.'},
  ],
  Intermediate: [
    {title:'Find the Largest Element',topic:'Arrays',time:'20 min',desc:'Find the maximum value in an array of integers.',input:'5\n3 9 2 8 4',output:'9',hint:'Track the largest value while traversing the array.'},
    {title:'Check for a Palindrome',topic:'Strings',time:'20 min',desc:'Check whether a word reads the same forward and backward.',input:'level',output:'Palindrome',hint:'Compare the string with its reverse.'},
    {title:'Character Frequency',topic:'Strings / Maps',time:'25 min',desc:'Count how many times a given character appears in a string.',input:'banana\na',output:'3',hint:'Traverse the string and count matching characters.'},
    {title:'Merge Two Sorted Arrays',topic:'Arrays',time:'25 min',desc:'Combine two sorted arrays into one sorted array.',input:'[1,3,5]\n[2,4,6]',output:'[1,2,3,4,5,6]',hint:'Use two pointers to compare the current elements.'},
    {title:'Remove Duplicates',topic:'Arrays',time:'20 min',desc:'Return unique values from an array while preserving order.',input:'1 2 2 3 1 4',output:'1 2 3 4',hint:'Use a Set or a lookup structure.'},
    {title:'Second Largest Element',topic:'Arrays',time:'20 min',desc:'Find the second distinct largest number in an array.',input:'8 3 6 8 5',output:'6',hint:'Track largest and second-largest distinct values.'},
    {title:'Valid Anagram',topic:'Strings',time:'25 min',desc:'Check whether two strings contain the same character counts.',input:'listen silent',output:'true',hint:'Compare frequency maps.'},
    {title:'First Non-Repeating Character',topic:'Strings / Maps',time:'25 min',desc:'Return the first character that occurs exactly once.',input:'swiss',output:'w',hint:'Count first, then scan in original order.'},
    {title:'Move Zeroes',topic:'Arrays',time:'25 min',desc:'Move all zeroes to the end while preserving non-zero order.',input:'0 1 0 3 12',output:'1 3 12 0 0',hint:'Use a write pointer for non-zero elements.'},
    {title:'Valid Parentheses',topic:'Stack',time:'25 min',desc:'Determine whether brackets are correctly balanced.',input:'({[]})',output:'true',hint:'Use a stack and match closing brackets.'}
  ],
  Advanced: [
    {title:'Two Sum',topic:'Arrays & Hashing',time:'30 min',desc:'Find the indices of two elements whose sum equals a target.',input:'4 9\n2 7 11 15',output:'0 1',hint:'Store previously seen values and their indices.'},
    {title:'Longest Unique Substring',topic:'Sliding Window',time:'35 min',desc:'Find the length of the longest substring without repeating characters.',input:'abcabcbb',output:'3',hint:'Use a sliding window and remember the last seen positions.'},
    {title:'Binary Search',topic:'Searching',time:'30 min',desc:'Input format: first line is a space-separated sorted array; second line is the target. Print the zero-based index, or -1 if absent.',input:'1 3 5 7 9\n7',output:'3',hint:'Repeatedly halve the search interval.'},
    {title:'Coin Change',topic:'Dynamic Programming',time:'40 min',desc:'Input format: first line contains coin values separated by spaces; second line is the amount. Print the minimum number of coins, or -1 if impossible.',input:'1 2 5\n11',output:'3',hint:'Build a DP table for each amount using smaller subproblems.'},
    {title:'Maximum Subarray Sum',topic:'Dynamic Programming',time:'35 min',desc:'Find the largest sum among all contiguous subarrays.',input:'-2 1 -3 4 -1 2 1 -5 4',output:'6',hint:'Use Kadane’s algorithm.'},
    {title:'Number of Islands',topic:'Graph Traversal',time:'40 min',desc:'Input format: a JSON 2D array of 0/1 values. Print the number of connected groups of 1s using four-direction adjacency.',input:'[[1,1,0],[0,1,0],[1,0,1]]',output:'3',hint:'Run DFS or BFS from each unvisited land cell.'},
    {title:'LRU Cache',topic:'Data Structures',time:'45 min',desc:'MANUAL CHECK: implement an LRU cache with get/put operations in O(1). Explain your data structure and test sequence; this portal does not auto-grade this design question.',input:'capacity=2; put(1,1), put(2,2), get(1), put(3,3), get(2)',output:'1, -1',hint:'Combine a hash map with a doubly linked list.',manualCheck:true},
    {title:'Longest Increasing Subsequence',topic:'Dynamic Programming',time:'40 min',desc:'Find the length of the longest strictly increasing subsequence.',input:'10 9 2 5 3 7 101 18',output:'4',hint:'Use a tails array with binary search for O(n log n).'},
    {title:'Kth Largest Element',topic:'Heap / Selection',time:'35 min',desc:'MANUAL CHECK: explain and implement an approach to find the kth largest value. Input format: first line is the integer array; second line is k. Compare the result with the sample.',input:'3 2 1 5 6 4\n2',output:'5',hint:'Use a min-heap of size k or quickselect.',manualCheck:true},
    {title:'Course Schedule',topic:'Graph / Topological Sort',time:'45 min',desc:'MANUAL CHECK: input is JSON: {"n":2,"prerequisites":[[1,0]]}. Explain whether all courses can be completed and how cycle detection works.',input:'{"n":2,"prerequisites":[[1,0]]}',output:'true',hint:'Detect cycles using DFS states or Kahn’s algorithm.',manualCheck:true}
  ]
};

export const CODING_PROBLEM_COUNT = Object.values(problemBank).reduce((total, levelProblems) => total + levelProblems.length, 0);
const inputFormats = {
  'Sum of Two Numbers':'Two integers separated by spaces.', 'Even or Odd':'One integer.', 'Factorial of a Number':'One non-negative integer.', 'Reverse a Number':'One non-negative integer.', 'Sum of Array Elements':'One or more integers separated by spaces.', 'Count Vowels':'One line containing the text to inspect.', 'FizzBuzz':'One integer n; print the sequence from 1 through n.', 'Find the Minimum':'One or more integers separated by spaces.', 'Count Digits':'One non-negative integer.',
  'Find the Largest Element':'First token is n (array length); the next n tokens are the integers.', 'Check for a Palindrome':'One word with no spaces.', 'Character Frequency':'Line 1 is the text; line 2 is the single character to count.', 'Merge Two Sorted Arrays':'Line 1 is a JSON array; line 2 is a second JSON array.', 'Remove Duplicates':'One or more integers separated by spaces.', 'Second Largest Element':'One or more integers separated by spaces; duplicates may appear, but return the second distinct largest value.', 'Valid Anagram':'Two words separated by whitespace.', 'First Non-Repeating Character':'One string with no spaces.', 'Move Zeroes':'One or more integers separated by spaces.', 'Valid Parentheses':'One string containing bracket characters.',
  'Two Sum':'Line 1: n and target. Line 2: n array integers. Return the two zero-based indices.', 'Longest Unique Substring':'One string with no spaces.', 'Binary Search':'Line 1: sorted integers separated by spaces. Line 2: target integer.', 'Coin Change':'Line 1: coin denominations separated by spaces. Line 2: target amount.', 'Maximum Subarray Sum':'One or more integers separated by spaces.', 'Number of Islands':'One JSON 2D array containing 0 and 1 values.', 'LRU Cache':'Manual review: capacity followed by an ordered sequence of put(key,value) and get(key) operations.', 'Longest Increasing Subsequence':'One or more integers separated by spaces.', 'Kth Largest Element':'Manual review: line 1 is the integer array; line 2 is k.', 'Course Schedule':'Manual review: JSON object with n and prerequisites, e.g. {"n":2,"prerequisites":[[1,0]]}.'
};
const outputFormats = {
  'Sum of Two Numbers':'One integer: the sum.', 'Even or Odd':'Exactly `Even` or `Odd`.', 'Factorial of a Number':'One integer: n factorial.', 'Reverse a Number':'One integer containing the reversed digits.', 'Sum of Array Elements':'One integer: the array sum.', 'Count Vowels':'One integer: the vowel count.', 'FizzBuzz':'One line of tokens from 1 to n, separated by single spaces.', 'Find the Minimum':'One integer: the smallest array value.', 'Count Digits':'One integer: the number of digits (zero has one digit).',
  'Find the Largest Element':'One integer: the maximum array value.', 'Check for a Palindrome':'Exactly `Palindrome` or `Not Palindrome`.', 'Character Frequency':'One integer: the number of matching characters.', 'Merge Two Sorted Arrays':'One JSON array containing the merged sorted values.', 'Remove Duplicates':'Unique integers in first-seen order, separated by spaces.', 'Second Largest Element':'One integer: the second distinct largest value.', 'Valid Anagram':'Exactly `true` or `false`.', 'First Non-Repeating Character':'The first unique character, or the literal `None` when no such character exists.', 'Move Zeroes':'All non-zero values followed by zeroes, separated by spaces.', 'Valid Parentheses':'Exactly `true` or `false`.',
  'Two Sum':'Two zero-based indices separated by one space.', 'Longest Unique Substring':'One integer: the maximum substring length.', 'Binary Search':'One integer: the zero-based index, or -1 when absent.', 'Coin Change':'One integer: minimum coin count, or -1 when impossible.', 'Maximum Subarray Sum':'One integer: the maximum contiguous subarray sum.', 'Number of Islands':'One integer: the number of four-direction connected land groups.', 'LRU Cache':'Manual check: print the result of each get operation in order, separated by commas.', 'Longest Increasing Subsequence':'One integer: the length of the longest strictly increasing subsequence.', 'Kth Largest Element':'Manual check: one integer, the kth largest value.', 'Course Schedule':'Manual check: exactly `true` or `false`.'
};
for (const levelProblems of Object.values(problemBank)) for (const problem of levelProblems) {
  problem.inputFormat = inputFormats[problem.title] || 'Use the complete raw input shown in the sample. Your solution receives it as a string.';
  problem.outputFormat = outputFormats[problem.title] || 'Print or return only the expected result shown in the sample.';
}

const testCases = {
  'Sum of Two Numbers': [['4 7','11'],['-2 9','7'],['0 0','0']],
  'Even or Odd': [['14','Even'],['7','Odd'],['0','Even']],
  'Factorial of a Number': [['5','120'],['0','1'],['3','6']],
  'Reverse a Number': [['1234','4321'],['900','9'],['7','7']],
  'Sum of Array Elements': [['1 2 3 4 5','15'],['-1 2 3','4'],['0 0','0']],
  'Count Vowels': [['placement','3'],['hello','2'],['rhythm','0']],
  'FizzBuzz': [['5','1 2 Fizz 4 Buzz'],['3','1 2 Fizz'],['1','1']],
  'Find the Minimum': [['4 8 2 9 1','1'],['-3 5 0','-3'],['7','7']],
  'Count Digits': [['90821','5'],['0','1'],['100','3']],
  'Find the Largest Element': [['5\n3 9 2 8 4','9'],['3\n-2 -8 -1','-1'],['1\n6','6']],
  'Check for a Palindrome': [['level','Palindrome'],['hello','Not Palindrome'],['madam','Palindrome']],
  'Character Frequency': [['banana\na','3'],['apple\np','2'],['hello\nz','0']],
  'Merge Two Sorted Arrays': [['[1,3,5]\n[2,4,6]','[1,2,3,4,5,6]'],['[1,4]\n[2,3]','[1,2,3,4]'],['[]\n[1]','[1]']],
  'Remove Duplicates': [['1 2 2 3 1 4','1 2 3 4'],['5 5 5','5'],['1 2 3','1 2 3']],
  'Second Largest Element': [['8 3 6 8 5','6'],['1 9 4','4'],['-1 -5 -3','-3']],
  'Valid Anagram': [['listen silent','true'],['rat car','false'],['a a','true']],
  'First Non-Repeating Character': [['swiss','w'],['aabbc','c'],['aabb','None']],
  'Move Zeroes': [['0 1 0 3 12','1 3 12 0 0'],['0 0 1','1 0 0'],['1 2 3','1 2 3']],
  'Valid Parentheses': [['({[]})','true'],['([)]','false'],['()[]{}','true']],
  'Two Sum': [['4 9\n2 7 11 15','0 1'],['3 6\n3 2 4','1 2'],['2 6\n3 3','0 1']],
  'Longest Unique Substring': [['abcabcbb','3'],['bbbbb','1'],['pwwkew','3']],
  'Binary Search': [['1 3 5 7 9\n7','3'],['2 4 6 8\n5','-1'],['1 2 3\n1','0']],
  'Coin Change': [['1 2 5\n11','3'],['2\n3','-1'],['1 3 4\n6','2']],
  'Maximum Subarray Sum': [['-2 1 -3 4 -1 2 1 -5 4','6'],['1 2 3','6'],['-5 -2 -8','-2']],
  'Number of Islands': [['[[1,1,0],[0,1,0],[1,0,1]]','3'],['[[1,1],[1,1]]','1'],['[[0,0],[0,0]]','0']],
  'Longest Increasing Subsequence': [['10 9 2 5 3 7 101 18','4'],['0 1 0 3 2 3','4'],['7 7 7','1']]
};
const starterCode = 'function solution(input) {\n  // input is the raw text shown in the problem statement. Parse it here.\n  return input;\n}';
const runnerWorkerSource = `self.onmessage = ({ data }) => {\n  try {\n    const execute = new Function('input', data.code + '; return typeof solution === "function" ? solution(input) : (typeof main === "function" ? main(input) : undefined);');\n    const results = data.tests.map((test, index) => {\n      const actual = execute(test.input);\n      const actualText = Array.isArray(actual) ? actual.join(' ') : (actual && typeof actual === 'object' ? JSON.stringify(actual) : String(actual ?? ''));\n      const expectedText = String(test.output);\n      const clean = value => value.replace(/[\\[\\],]/g, ' ').replace(/\\s+/g, ' ').trim();\n      return { index: index + 1, actual: actualText, expected: expectedText, ok: clean(actualText) === clean(expectedText) };\n    });\n    self.postMessage({ status: results.every(item => item.ok) ? 'correct' : 'wrong', results });\n  } catch (error) { self.postMessage({ status: 'error', message: error?.message || 'Execution error' }); }\n};`;

export default function Coding(){
  const [language,setLanguage]=useState('JavaScript'); const [level,setLevel]=useState('Beginner'); const [selected,setSelected]=useState(null); const [showHint,setShowHint]=useState(false); const [runResult,setRunResult]=useState(null); const workerRef=useRef(null); const timeoutRef=useRef(null); const workerUrlRef=useRef(null);
  const profile=currentProfile(); const email=profile?.email || 'guest';
  const codeStorageKey=studentStorageKey('placepoint-coding-code',email); const completedStorageKey=studentStorageKey('placepoint-coding-completed',email);
  const [codeByProblem,setCodeByProblem]=useState(()=>{try{return JSON.parse(localStorage.getItem(codeStorageKey)||'{}')}catch{return {}}});
  const [completed,setCompleted]=useState(()=>{try{return JSON.parse(localStorage.getItem(completedStorageKey)||'{}')}catch{return {}}});
  const problems=useMemo(()=>problemBank[level],[level]); const keyFor=p=>`${language}::${level}::${p.title}`; const activeKey=selected?keyFor(selected):''; const code=codeByProblem[activeKey] ?? starterCode; const done=problems.filter(p=>completed[keyFor(p)]).length;
  function updateCode(value){const next={...codeByProblem,[activeKey]:value};setCodeByProblem(next);localStorage.setItem(codeStorageKey,JSON.stringify(next));setRunResult(null);}
  function stopWorker(){if(timeoutRef.current)clearTimeout(timeoutRef.current);timeoutRef.current=null;if(workerRef.current){workerRef.current.terminate();workerRef.current=null;}if(workerUrlRef.current){URL.revokeObjectURL(workerUrlRef.current);workerUrlRef.current=null;}}
  React.useEffect(()=>()=>stopWorker(),[]);
  function runCode(){
    if(language!=='JavaScript'||!selected||selected.manualCheck)return;
    stopWorker(); setRunResult({status:'running'});
    const workerUrl=URL.createObjectURL(new Blob([runnerWorkerSource],{type:'text/javascript'})); workerUrlRef.current=workerUrl; const worker=new Worker(workerUrl); workerRef.current=worker;
    worker.onmessage=event=>{stopWorker();setRunResult(event.data);};
    worker.onerror=()=>{stopWorker();setRunResult({status:'error',message:'The runner could not execute this code.'});};
    const tests=testCases[selected.title] || [[selected.input,selected.output]];
    worker.postMessage({code,tests});
    timeoutRef.current=setTimeout(()=>{stopWorker();setRunResult({status:'timeout',message:'Time limit exceeded.'});},2000);
  }
  function markComplete(problem){const next={...completed,[keyFor(problem)]:true};setCompleted(next);localStorage.setItem(completedStorageKey,JSON.stringify(next));saveProgressToServer({codingCompleted:next}).catch(error=>console.error('Progress sync failed; saved locally for retry:',error.message));}
  return <div className="learning-page">
    <div className="page-intro"><div><div className="eyebrow">SKILL DEVELOPMENT / 02</div><h1>Code your <em>way forward.</em></h1><p>Choose a language, select a difficulty and build problem-solving confidence.</p></div><div className="intro-stamp code-stamp"><span>{'</>'}</span><small>BUILD<br/>SKILLS</small></div></div>
    <div className="code-toolbar"><div><span className="panel-kicker">CHOOSE A PROGRAMMING LANGUAGE</span><div className="language-options language-wrap">{languages.map(l=><button key={l} className={language===l?'active':''} onClick={()=>{stopWorker();setLanguage(l);setSelected(null);setShowHint(false);setRunResult(null)}}>{l}</button>)}</div></div><div className="code-note"><span aria-hidden="true">⌘</span><div><strong>{done} / {problems.length} completed</strong><small>{language} · {level} practice</small></div></div></div>
    <div className="section-heading compact"><div><div className="eyebrow">DIFFICULTY LEVEL</div><h2>Choose your challenge</h2></div><span className="muted-note">Progress is tracked by language and level</span></div>
    <div className="coding-levels">{levels.map((l,i)=><button key={l} className={`level-button ${level===l?'active':''}`} onClick={()=>{stopWorker();setLevel(l);setSelected(null);setShowHint(false);setRunResult(null)}}><span>0{i+1}</span>{l}</button>)}</div>
    <div className="coding-progress-line"><span style={{width:`${Math.round(done/problems.length*100)}%`}}></span></div><div className="coding-progress-caption">{Math.round(done/problems.length*100)}% of {language} {level.toLowerCase()} problems marked complete</div>
    <div className="problem-layout"><div className="problem-list">{problems.map((p,i)=><button key={p.title} className={`problem-row ${selected?.title===p.title?'selected':''}`} onClick={()=>{stopWorker();setSelected(p);setShowHint(false);setRunResult(null)}}><span className="problem-index">{String(i+1).padStart(2,'0')}</span><span className="problem-info"><strong>{p.title}</strong><small>{p.topic} <i>·</i> {p.time}</small></span>{completed[keyFor(p)]&&<span className="completed-tick">✓</span>}<span className="problem-arrow">→</span></button>)}</div>
      <aside className="problem-detail">{selected?<><div className="detail-top"><span className="panel-kicker">{language.toUpperCase()} · {level.toUpperCase()}</span><button onClick={()=>setSelected(null)} aria-label="Close problem">×</button></div><h3>{selected.title}</h3><p>{selected.desc}</p><div className="sample-block"><span>INPUT FORMAT</span><code>{selected.inputFormat}</code><span>SAMPLE INPUT</span><code>{selected.input}</code><span>OUTPUT FORMAT</span><code>{selected.outputFormat}</code><span>SAMPLE OUTPUT</span><code>{selected.output}</code></div><p className="planned-note">Your JavaScript function is called as <code>solution(input)</code>. The input argument is the complete input text shown above. Parse lines/tokens/JSON according to the problem statement. Output arrays may be returned as arrays or space-separated strings.</p><button className="hint-toggle" onClick={()=>setShowHint(v=>!v)}>{showHint?'Hide hint −':'Show hint + '}</button>{showHint&&<div className="hint-box">{selected.hint}</div>}
        {selected.manualCheck&&<div className="hint-box"><strong>Manual check:</strong> this design problem is not automatically graded. Explain your approach and test it locally against the stated format.</div>}
        <div className="code-editor-panel"><div className="editor-heading"><strong>Write your program</strong><span>{language} editor</span></div><textarea className="code-editor" spellCheck="false" value={code} onChange={e=>updateCode(e.target.value)} aria-label="Write your code here"/><div className="editor-actions"><button className="btn-primary" onClick={runCode} disabled={language!=='JavaScript'||!code.trim()||selected.manualCheck}>Run & check code →</button><span className="planned-note">{language==='JavaScript'?(selected.manualCheck?'Manual review required.':'JavaScript runs in a Web Worker with a 2-second time limit and multiple test cases.'):'You can write code in this editor. Automatic execution is currently supported only for JavaScript.'}</span></div>
          {runResult&&<div className={`code-run-result ${runResult.status==='correct'?'success':runResult.status==='wrong'||runResult.status==='error'||runResult.status==='timeout'?'error':''}`}><strong>{runResult.status==='correct'?'Correct! All test cases passed.':runResult.status==='wrong'?'Wrong answer — one or more test cases failed.':runResult.status==='timeout'?'Time limit exceeded.':runResult.status==='error'?'Runtime error':runResult.status==='running'?'Running your code…':'Result'}</strong>{runResult.results?.map(test=><p key={test.index}>Test {test.index}: {test.ok?'Passed':'Failed'} · Your output: {test.actual || '(empty)'} · Expected: {test.expected}</p>)}{runResult.message&&<p>{runResult.message}</p>}</div>}
        </div><div className="coding-action-row"><span className="planned-note">Mark complete after you have solved and understood the problem.</span><button className="btn-primary" onClick={()=>markComplete(selected)} disabled={!!completed[keyFor(selected)]}>{completed[keyFor(selected)]?'Completed ✓':'Mark complete'}</button></div>
      </>:<div className="empty-detail"><div aria-hidden="true">⌘</div><strong>Select a problem</strong><p>View the problem statement, input format, sample output and hint.</p></div>}</aside></div>
    <div className="progress-disclaimer"><strong>Runner support and limitations</strong><p>JavaScript solutions using <code>solution(input)</code> run in a Web Worker with a 2-second time limit and multiple sample/hidden-style checks. Other languages can be typed and copied into a local compiler, but are not executed by this page. LRU Cache, Kth Largest and Course Schedule are marked for manual review. This browser runner is for practice, not a secure production-grade judge.</p></div>
  </div>;
}
